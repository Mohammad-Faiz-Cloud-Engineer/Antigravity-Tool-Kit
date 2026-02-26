#!/usr/bin/env node

/**
 * Test suite for Antigravity Tool Kit
 * Comprehensive validation tests for package integrity
 */

'use strict';

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  bright: '\x1b[1m',
};

function log(message, color = 'reset') {
  if (colors[color]) {
    console.log(`${colors[color]}${message}${colors.reset}`);
  } else {
    console.log(message);
  }
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

function fileExists(filePath, description) {
  assert(fs.existsSync(filePath), `${description} not found at ${filePath}`);
}

function runTests() {
  log('\nRunning Antigravity Tool Kit Tests\n', 'cyan');

  // Package tests
  test('package.json exists', () => {
    fileExists('package.json', 'package.json');
  });

  test('package.json is valid JSON', () => {
    const content = fs.readFileSync('package.json', 'utf8');
    JSON.parse(content);
  });

  test('package.json has correct name', () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    assert(pkg.name === 'antigravity-tool-kit', `Expected name 'antigravity-tool-kit', got '${pkg.name}'`);
  });

  test('package.json has author', () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    assert(pkg.author === 'Mohammad Faiz', `Expected author 'Mohammad Faiz', got '${pkg.author}'`);
  });

  test('package.json has version', () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    assert(pkg.version && /^\d+\.\d+\.\d+$/.test(pkg.version), 'Invalid version format');
  });

  test('package.json has required scripts', () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    assert(pkg.scripts && pkg.scripts.test, 'Missing test script');
    assert(pkg.scripts.validate, 'Missing validate script');
    assert(pkg.scripts.prepare, 'Missing prepare script');
  });

  // Directory structure tests
  test('.agent directory exists', () => {
    fileExists('.agent', '.agent directory');
  });

  test('agents directory exists', () => {
    fileExists('.agent/agents', 'agents directory');
  });

  test('skills directory exists', () => {
    fileExists('.agent/skills', 'skills directory');
  });

  test('workflows directory exists', () => {
    fileExists('.agent/workflows', 'workflows directory');
  });

  test('ARCHITECTURE.md exists', () => {
    fileExists('.agent/ARCHITECTURE.md', 'ARCHITECTURE.md');
  });

  // CLI tests
  test('CLI exists', () => {
    fileExists('bin/cli.js', 'CLI');
  });

  test('CLI has shebang', () => {
    const content = fs.readFileSync('bin/cli.js', 'utf8');
    assert(content.startsWith('#!/usr/bin/env node'), 'CLI missing shebang');
  });

  test('CLI has strict mode', () => {
    const content = fs.readFileSync('bin/cli.js', 'utf8');
    assert(content.includes("'use strict'"), 'CLI missing strict mode');
  });

  // Documentation tests
  test('README.md exists', () => {
    fileExists('README.md', 'README.md');
  });

  test('README.md has content', () => {
    const content = fs.readFileSync('README.md', 'utf8');
    assert(content.length > 500, 'README.md seems too short');
  });

  test('LICENSE exists', () => {
    fileExists('LICENSE', 'LICENSE');
  });

  test('LICENSE has content', () => {
    const content = fs.readFileSync('LICENSE', 'utf8');
    assert(content.includes('MIT License'), 'LICENSE missing MIT License text');
  });

  // Component count tests
  test('At least 10 agents exist', () => {
    const agents = fs.readdirSync('.agent/agents').filter(f => f.endsWith('.md'));
    assert(agents.length >= 10, `Expected at least 10 agents, found ${agents.length}`);
  });

  test('At least 20 skills exist', () => {
    const skills = fs.readdirSync('.agent/skills').filter(f => {
      const fullPath = path.join('.agent/skills', f);
      return fs.statSync(fullPath).isDirectory();
    });
    assert(skills.length >= 20, `Expected at least 20 skills, found ${skills.length}`);
  });

  test('At least 5 workflows exist', () => {
    const workflows = fs.readdirSync('.agent/workflows').filter(f => f.endsWith('.md'));
    assert(workflows.length >= 5, `Expected at least 5 workflows, found ${workflows.length}`);
  });

  // Script tests
  test('prepare.js exists', () => {
    fileExists('scripts/prepare.js', 'prepare.js');
  });

  test('validate.js exists', () => {
    fileExists('scripts/validate.js', 'validate.js');
  });

  // Summary
  log('\n' + '='.repeat(50));
  log(`Tests passed: ${passed}`, passed > 0 ? 'green' : 'reset');
  if (failed > 0) {
    log(`Tests failed: ${failed}`, 'red');
    log('='.repeat(50) + '\n');
    process.exit(1);
  } else {
    log('All tests passed!', 'bright');
    log('='.repeat(50) + '\n');
    process.exit(0);
  }
}

if (require.main === module) {
  runTests();
}

module.exports = { test, assert, runTests };
