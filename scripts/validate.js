#!/usr/bin/env node

/**
 * Validation script for Antigravity Tool Kit
 * Checks the integrity of agents, skills, and workflows
 */

const fs = require('fs');
const path = require('path');

const AGENT_DIR = path.join(__dirname, '..', '.agent');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateAgents() {
  const agentsDir = path.join(AGENT_DIR, 'agents');
  
  if (!fs.existsSync(agentsDir)) {
    log('Error: agents directory not found', 'red');
    return false;
  }

  const agents = fs.readdirSync(agentsDir).filter(f => f.endsWith('.md'));
  log(`\nValidating ${agents.length} agents...`, 'cyan');

  let valid = true;
  agents.forEach(agent => {
    const content = fs.readFileSync(path.join(agentsDir, agent), 'utf8');
    if (content.length < 100) {
      log(`  Warning: ${agent} seems incomplete`, 'yellow');
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

  const skills = fs.readdirSync(skillsDir).filter(f => 
    fs.statSync(path.join(skillsDir, f)).isDirectory()
  );
  
  log(`\nValidating ${skills.length} skills...`, 'cyan');

  let valid = true;
  skills.forEach(skill => {
    const skillMd = path.join(skillsDir, skill, 'SKILL.md');
    if (!fs.existsSync(skillMd)) {
      log(`  Error: ${skill}/SKILL.md not found`, 'red');
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

  let valid = true;
  workflows.forEach(workflow => {
    const content = fs.readFileSync(path.join(workflowsDir, workflow), 'utf8');
    if (content.length < 50) {
      log(`  Warning: ${workflow} seems incomplete`, 'yellow');
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

main();
