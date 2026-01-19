#!/usr/bin/env node

/**
 * Antigravity Tool Kit CLI
 * Author: Mohammad Faiz
 * 
 * Command-line interface for installing and managing AI agent templates
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const VERSION = '2.1.0';
const REPO_URL = 'https://github.com/Mohammad-Faiz-Cloud-Engineer/antigravity-tool-kit.git';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

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
    options.path = args[pathIndex + 1];
  }

  const branchIndex = args.indexOf('--branch');
  if (branchIndex !== -1 && args[branchIndex + 1]) {
    options.branch = args[branchIndex + 1];
  }

  return options;
}

function checkStatus(targetPath) {
  const agentPath = path.join(targetPath, '.agent');
  
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
      stats.agents = fs.readdirSync(agentsPath).filter(f => f.endsWith('.md')).length;
    }
    if (fs.existsSync(skillsPath)) {
      stats.skills = fs.readdirSync(skillsPath).filter(f => fs.statSync(path.join(skillsPath, f)).isDirectory()).length;
    }
    if (fs.existsSync(workflowsPath)) {
      stats.workflows = fs.readdirSync(workflowsPath).filter(f => f.endsWith('.md')).length;
    }

    log(`\nComponents:`, 'bright');
    log(`  Agents: ${stats.agents}`, 'cyan');
    log(`  Skills: ${stats.skills}`, 'cyan');
    log(`  Workflows: ${stats.workflows}\n`, 'cyan');
  } catch (error) {
    log('Warning: Could not read component statistics', 'yellow');
  }

  return true;
}

function init(options) {
  const targetPath = options.path || process.cwd();
  const agentPath = path.join(targetPath, '.agent');

  if (!options.quiet) {
    log('\nAntigravity Tool Kit Installer', 'bright');
    log(`Target: ${targetPath}\n`, 'cyan');
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
    const tempDir = path.join(targetPath, '.temp_ag_kit');
    
    if (!options.quiet) log('Downloading from GitHub...', 'blue');
    
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }

    execSync(`git clone --depth 1 --branch ${options.branch} ${REPO_URL} ${tempDir}`, {
      stdio: options.quiet ? 'ignore' : 'inherit',
    });

    const sourceAgent = path.join(tempDir, '.agent');
    
    if (!fs.existsSync(sourceAgent)) {
      throw new Error('.agent folder not found in repository');
    }

    if (fs.existsSync(agentPath)) {
      fs.rmSync(agentPath, { recursive: true, force: true });
    }

    if (!options.quiet) log('Installing .agent folder...', 'blue');
    
    fs.cpSync(sourceAgent, agentPath, { recursive: true });
    fs.rmSync(tempDir, { recursive: true, force: true });

    log('\nSuccess! Antigravity Tool Kit installed', 'green');
    log(`Location: ${agentPath}\n`, 'cyan');
    log('Next steps:', 'bright');
    log('  1. Open your AI coding assistant', 'cyan');
    log('  2. Start using agents, skills, and workflows', 'cyan');
    log('  3. Check ARCHITECTURE.md for documentation\n', 'cyan');

  } catch (error) {
    log(`\nError: ${error.message}`, 'red');
    log('Installation failed\n', 'red');
    process.exit(1);
  }
}

function update(options) {
  const targetPath = options.path || process.cwd();
  const agentPath = path.join(targetPath, '.agent');

  if (!fs.existsSync(agentPath)) {
    log('\nError: .agent folder not found', 'red');
    log('Run "antigravity-tool-kit init" first\n', 'yellow');
    process.exit(1);
  }

  if (!options.quiet) {
    log('\nUpdating Antigravity Tool Kit...', 'bright');
  }

  init({ ...options, force: true });
}

function main() {
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
}

main();
