#!/usr/bin/env node

/**
 * Antigravity Tool Kit CLI
 * Author: Mohammad Faiz
 * 
 * Command-line interface for installing and managing AI agent templates
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const VERSION = '2.1.0';
const REPO_URL = 'https://github.com/Mohammad-Faiz-Cloud-Engineer/antigravity-tool-kit.git';
const TEMP_DIR_PREFIX = '.temp_ag_kit';
const AGENT_FOLDER = '.agent';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

/**
 * Log a message with color formatting
 * @param {string} message - The message to log
 * @param {string} color - Color name from colors object
 */
function log(message, color = 'reset') {
  if (colors[color]) {
    console.log(`${colors[color]}${message}${colors.reset}`);
  } else {
    console.log(message);
  }
}

/**
 * Display help information for the CLI
 */
function showHelp() {
  log('\nAntigravity Tool Kit CLI v' + VERSION, 'bright');
  log('Author: Mohammad Faiz\n', 'cyan');
  
  console.log('Usage: antigravity-tool-kit <command> [options]\n');
  console.log('Commands:');
  console.log('  init              Install .agent folder into your project');
  console.log('  update            Update to the latest version');
  console.log('  status            Check installation status');
  console.log('  version, -v       Show version number');
  console.log('  help, -h          Show this help message\n');
  
  console.log('Options:');
  console.log('  --force           Overwrite existing .agent folder');
  console.log('  --path <dir>      Install in specific directory');
  console.log('  --branch <name>   Use specific branch');
  console.log('  --quiet           Suppress output');
  console.log('  --dry-run         Preview actions without executing\n');
  
  console.log('Examples:');
  console.log('  antigravity-tool-kit init');
  console.log('  antigravity-tool-kit init --force');
  console.log('  antigravity-tool-kit init --path ./myapp');
  console.log('  antigravity-tool-kit update\n');
}

/**
 * Parse command line arguments
 * @param {string[]} args - Command line arguments
 * @returns {Object} Parsed options object
 */
function parseArgs(args) {
  const options = {
    command: args[0] || 'help',
    force: args.includes('--force'),
    quiet: args.includes('--quiet'),
    dryRun: args.includes('--dry-run'),
    path: null,
    branch: 'main',
  };

  const pathIndex = args.indexOf('--path');
  if (pathIndex !== -1 && args[pathIndex + 1]) {
    const providedPath = args[pathIndex + 1];
    if (!providedPath.startsWith('-')) {
      options.path = path.resolve(providedPath);
    } else {
      log('Error: --path requires a valid directory path', 'red');
      process.exit(1);
    }
  }

  const branchIndex = args.indexOf('--branch');
  if (branchIndex !== -1 && args[branchIndex + 1]) {
    const providedBranch = args[branchIndex + 1];
    if (!providedBranch.startsWith('-')) {
      options.branch = providedBranch;
    } else {
      log('Error: --branch requires a valid branch name', 'red');
      process.exit(1);
    }
  }

  return options;
}

/**
 * Check installation status and display component statistics
 * @param {string} targetPath - Path to check for installation
 * @returns {boolean} True if installed, false otherwise
 */
function checkStatus(targetPath) {
  if (!targetPath || typeof targetPath !== 'string') {
    log('Error: Invalid target path', 'red');
    return false;
  }

  const agentPath = path.join(targetPath, AGENT_FOLDER);
  
  if (!fs.existsSync(agentPath)) {
    log('\nStatus: Not installed', 'yellow');
    log('Run "antigravity-tool-kit init" to install\n', 'cyan');
    return false;
  }

  log('\nStatus: Installed', 'green');
  log(`Location: ${agentPath}`, 'cyan');
  
  const stats = {
    agents: 0,
    skills: 0,
    workflows: 0,
  };

  try {
    const agentsPath = path.join(agentPath, 'agents');
    const skillsPath = path.join(agentPath, 'skills');
    const workflowsPath = path.join(agentPath, 'workflows');

    if (fs.existsSync(agentsPath)) {
      const files = fs.readdirSync(agentsPath);
      stats.agents = files.filter(f => f.endsWith('.md')).length;
    }
    if (fs.existsSync(skillsPath)) {
      const files = fs.readdirSync(skillsPath);
      stats.skills = files.filter(f => {
        const fullPath = path.join(skillsPath, f);
        return fs.statSync(fullPath).isDirectory();
      }).length;
    }
    if (fs.existsSync(workflowsPath)) {
      const files = fs.readdirSync(workflowsPath);
      stats.workflows = files.filter(f => f.endsWith('.md')).length;
    }

    log('\nComponents:', 'bright');
    log(`  Agents: ${stats.agents}`, 'cyan');
    log(`  Skills: ${stats.skills}`, 'cyan');
    log(`  Workflows: ${stats.workflows}\n`, 'cyan');
  } catch (error) {
    log(`Warning: Could not read component statistics - ${error.message}`, 'yellow');
  }

  return true;
}

/**
 * Clean up temporary directory
 * @param {string} tempDir - Path to temporary directory
 * @param {boolean} quiet - Suppress output if true
 */
function cleanupTempDir(tempDir, quiet) {
  try {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  } catch (error) {
    if (!quiet) {
      log(`Warning: Could not clean up temporary directory - ${error.message}`, 'yellow');
    }
  }
}

/**
 * Validate target path for installation
 * @param {string} targetPath - Path to validate
 * @returns {boolean} True if valid
 * @throws {Error} If path is invalid or not writable
 */
function validateTargetPath(targetPath) {
  try {
    const stats = fs.statSync(targetPath);
    if (!stats.isDirectory()) {
      throw new Error('Target path is not a directory');
    }
    fs.accessSync(targetPath, fs.constants.W_OK);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('Target directory does not exist');
    } else if (error.code === 'EACCES') {
      throw new Error('No write permission for target directory');
    }
    throw error;
  }
}

/**
 * Initialize and install the .agent folder
 * @param {Object} options - Installation options
 * @param {string} options.path - Target installation path
 * @param {boolean} options.force - Force overwrite existing installation
 * @param {boolean} options.quiet - Suppress output
 * @param {boolean} options.dryRun - Preview without executing
 * @param {string} options.branch - Git branch to use
 */
function init(options) {
  const targetPath = options.path || process.cwd();
  const agentPath = path.join(targetPath, AGENT_FOLDER);
  const tempDir = path.join(targetPath, TEMP_DIR_PREFIX);

  if (!options.quiet) {
    log('\nAntigravity Tool Kit Installer', 'bright');
    log(`Target: ${targetPath}\n`, 'cyan');
  }

  try {
    validateTargetPath(targetPath);
  } catch (error) {
    log(`Error: ${error.message}`, 'red');
    process.exit(1);
  }

  if (fs.existsSync(agentPath) && !options.force) {
    log('Error: .agent folder already exists', 'red');
    log('Use --force to overwrite\n', 'yellow');
    process.exit(1);
  }

  if (options.dryRun) {
    log('[DRY RUN] Would install .agent folder', 'yellow');
    log(`[DRY RUN] Target: ${agentPath}\n`, 'yellow');
    return;
  }

  try {
    cleanupTempDir(tempDir, options.quiet);
    
    if (!options.quiet) log('Downloading from GitHub...', 'blue');
    
    const gitCommand = `git clone --depth 1 --branch ${options.branch} ${REPO_URL} "${tempDir}"`;
    execSync(gitCommand, {
      stdio: options.quiet ? 'ignore' : 'inherit',
    });

    const sourceAgent = path.join(tempDir, AGENT_FOLDER);
    
    if (!fs.existsSync(sourceAgent)) {
      throw new Error('.agent folder not found in repository');
    }

    if (fs.existsSync(agentPath)) {
      fs.rmSync(agentPath, { recursive: true, force: true });
    }

    if (!options.quiet) log('Installing .agent folder...', 'blue');
    
    fs.cpSync(sourceAgent, agentPath, { recursive: true });
    cleanupTempDir(tempDir, options.quiet);

    log('\nSuccess! Antigravity Tool Kit installed', 'green');
    log(`Location: ${agentPath}\n`, 'cyan');
    log('Next steps:', 'bright');
    log('  1. Open your AI coding assistant', 'cyan');
    log('  2. Start using agents, skills, and workflows', 'cyan');
    log('  3. Check ARCHITECTURE.md for documentation\n', 'cyan');

  } catch (error) {
    cleanupTempDir(tempDir, options.quiet);
    log(`\nError: ${error.message}`, 'red');
    
    if (error.message.includes('git')) {
      log('Hint: Make sure git is installed and you have internet connection', 'yellow');
    }
    
    log('Installation failed\n', 'red');
    process.exit(1);
  }
}

/**
 * Update existing installation to latest version
 * @param {Object} options - Update options
 */
function update(options) {
  const targetPath = options.path || process.cwd();
  const agentPath = path.join(targetPath, AGENT_FOLDER);

  if (!fs.existsSync(agentPath)) {
    log('\nError: .agent folder not found', 'red');
    log('Run "antigravity-tool-kit init" first\n', 'yellow');
    process.exit(1);
  }

  if (!options.quiet) {
    log('\nUpdating Antigravity Tool Kit...', 'bright');
  }

  const updateOptions = { ...options, force: true };
  init(updateOptions);
}

/**
 * Main entry point for the CLI
 */
function main() {
  try {
    const args = process.argv.slice(2);
    
    if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
      showHelp();
      return;
    }

    if (args.includes('-v') || args.includes('--version') || args[0] === 'version') {
      log(`v${VERSION}`, 'bright');
      return;
    }

    const options = parseArgs(args);

    switch (options.command) {
      case 'init':
        init(options);
        break;
      case 'update':
        update(options);
        break;
      case 'status':
        checkStatus(options.path || process.cwd());
        break;
      case 'help':
        showHelp();
        break;
      default:
        log(`Unknown command: ${options.command}`, 'red');
        log('Run "antigravity-tool-kit help" for usage\n', 'yellow');
        process.exit(1);
    }
  } catch (error) {
    log(`\nUnexpected error: ${error.message}`, 'red');
    if (process.env.DEBUG) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
