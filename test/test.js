#!/usr/bin/env node

/**
 * Test suite for Antigravity Tool Kit
 * Basic validation tests
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    log(`✓ ${name}`, 'green');
    passed++;
  } catch (error) {
    log(`✗ ${name}`, 'red');
    log(`  ${error.message}`, 'red');
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

// Tests
log('\nRunning Antigravity Tool Kit Tests\n', 'cyan');

test('package.json exists', () => {
  assert(fs.existsSync('package.json'), 'package.json not found');
});

test('package.json has correct name', () => {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  assert(pkg.name === 'antigravity-tool-kit', 'Incorrect package name');
});

test('package.json has author', () => {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  assert(pkg.author === 'Mohammad Faiz', 'Incorrect author');
});

test('.agent directory exists', () => {
  assert(fs.existsSync('.agent'), '.agent directory not found');
});

test('agents directory exists', () => {
  assert(fs.existsSync('.agent/agents'), 'agents directory not found');
});

test('skills directory exists', () => {
  assert(fs.existsSync('.agent/skills'), 'skills directory not found');
});

test('workflows directory exists', () => {
  assert(fs.existsSync('.agent/workflows'), 'workflows directory not found');
});

test('ARCHITECTURE.md exists', () => {
  assert(fs.existsSync('.agent/ARCHITECTURE.md'), 'ARCHITECTURE.md not found');
});

test('CLI exists', () => {
  assert(fs.existsSync('bin/cli.js'), 'CLI not found');
});

test('CLI is executable', () => {
  const stats = fs.statSync('bin/cli.js');
  const content = fs.readFileSync('bin/cli.js', 'utf8');
  assert(content.startsWith('#!/usr/bin/env node'), 'CLI missing shebang');
});

test('README.md exists', () => {
  assert(fs.existsSync('README.md'), 'README.md not found');
});

test('LICENSE exists', () => {
  assert(fs.existsSync('LICENSE'), 'LICENSE not found');
});

test('At least 10 agents exist', () => {
  const agents = fs.readdirSync('.agent/agents').filter(f => f.endsWith('.md'));
  assert(agents.length >= 10, `Only ${agents.length} agents found`);
});

test('At least 20 skills exist', () => {
  const skills = fs.readdirSync('.agent/skills').filter(f => 
    fs.statSync(path.join('.agent/skills', f)).isDirectory()
  );
  assert(skills.length >= 20, `Only ${skills.length} skills found`);
});

test('At least 5 workflows exist', () => {
  const workflows = fs.readdirSync('.agent/workflows').filter(f => f.endsWith('.md'));
  assert(workflows.length >= 5, `Only ${workflows.length} workflows found`);
});

// Summary
log('\n' + '='.repeat(40));
log(`Tests passed: ${passed}`, 'green');
if (failed > 0) {
  log(`Tests failed: ${failed}`, 'red');
  process.exit(1);
} else {
  log('All tests passed!', 'green');
}
log('='.repeat(40) + '\n');
