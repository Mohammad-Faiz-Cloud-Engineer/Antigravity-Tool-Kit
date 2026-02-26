#!/usr/bin/env node

/**
 * Validation script for Antigravity Tool Kit
 * Checks the integrity of agents, skills, and workflows
 */

'use strict';

const fs = require('fs');
const path = require('path');

const AGENT_DIR = path.join(__dirname, '..', '.agent');
const MIN_AGENT_CONTENT_LENGTH = 100;
const MIN_WORKFLOW_CONTENT_LENGTH = 50;

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  if (colors[color]) {
    console.log(`${colors[color]}${message}${colors.reset}`);
  } else {
    console.log(message);
  }
}

function validateAgents() {
  const agentsDir = path.join(AGENT_DIR, 'agents');
  
  if (!fs.existsSync(agentsDir)) {
    log('Error: agents directory not found', 'red');
    return false;
  }

  const agents = fs.readdirSync(agentsDir).filter(f => f.endsWith('.md'));
  log(`\nValidating ${agents.length} agents...`, 'cyan');

  if (agents.length === 0) {
    log('  Error: No agent files found', 'red');
    return false;
  }

  let valid = true;
  agents.forEach(agent => {
    try {
      const agentPath = path.join(agentsDir, agent);
      const content = fs.readFileSync(agentPath, 'utf8');
      if (content.length < MIN_AGENT_CONTENT_LENGTH) {
        log(`  Warning: ${agent} seems incomplete (${content.length} chars)`, 'yellow');
        valid = false;
      }
    } catch (error) {
      log(`  Error reading ${agent}: ${error.message}`, 'red');
      valid = false;
    }
  });

  if (valid) {
    log('  All agents valid', 'green');
  }

  return valid;
}

function validateSkills() {
  const skillsDir = path.join(AGENT_DIR, 'skills');
  
  if (!fs.existsSync(skillsDir)) {
    log('Error: skills directory not found', 'red');
    return false;
  }

  const skills = fs.readdirSync(skillsDir).filter(f => {
    const fullPath = path.join(skillsDir, f);
    return fs.statSync(fullPath).isDirectory();
  });
  
  log(`\nValidating ${skills.length} skills...`, 'cyan');

  if (skills.length === 0) {
    log('  Error: No skill directories found', 'red');
    return false;
  }

  let valid = true;
  skills.forEach(skill => {
    try {
      const skillMd = path.join(skillsDir, skill, 'SKILL.md');
      if (!fs.existsSync(skillMd)) {
        log(`  Error: ${skill}/SKILL.md not found`, 'red');
        valid = false;
      } else {
        const content = fs.readFileSync(skillMd, 'utf8');
        if (content.length < MIN_AGENT_CONTENT_LENGTH) {
          log(`  Warning: ${skill}/SKILL.md seems incomplete`, 'yellow');
        }
      }
    } catch (error) {
      log(`  Error validating ${skill}: ${error.message}`, 'red');
      valid = false;
    }
  });

  if (valid) {
    log('  All skills valid', 'green');
  }

  return valid;
}

function validateWorkflows() {
  const workflowsDir = path.join(AGENT_DIR, 'workflows');
  
  if (!fs.existsSync(workflowsDir)) {
    log('Error: workflows directory not found', 'red');
    return false;
  }

  const workflows = fs.readdirSync(workflowsDir).filter(f => f.endsWith('.md'));
  log(`\nValidating ${workflows.length} workflows...`, 'cyan');

  if (workflows.length === 0) {
    log('  Error: No workflow files found', 'red');
    return false;
  }

  let valid = true;
  workflows.forEach(workflow => {
    try {
      const workflowPath = path.join(workflowsDir, workflow);
      const content = fs.readFileSync(workflowPath, 'utf8');
      if (content.length < MIN_WORKFLOW_CONTENT_LENGTH) {
        log(`  Warning: ${workflow} seems incomplete (${content.length} chars)`, 'yellow');
        valid = false;
      }
    } catch (error) {
      log(`  Error reading ${workflow}: ${error.message}`, 'red');
      valid = false;
    }
  });

  if (valid) {
    log('  All workflows valid', 'green');
  }

  return valid;
}

function main() {
  log('\nAntigravity Tool Kit Validator', 'cyan');
  log('==============================\n');

  if (!fs.existsSync(AGENT_DIR)) {
    log('Error: .agent directory not found', 'red');
    log('Run from project root or install first\n', 'yellow');
    process.exit(1);
  }

  const agentsValid = validateAgents();
  const skillsValid = validateSkills();
  const workflowsValid = validateWorkflows();

  log('\n==============================');
  if (agentsValid && skillsValid && workflowsValid) {
    log('Validation passed!', 'green');
    log('All components are valid\n', 'green');
    process.exit(0);
  } else {
    log('Validation failed', 'red');
    log('Some components have issues\n', 'yellow');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { validateAgents, validateSkills, validateWorkflows };
