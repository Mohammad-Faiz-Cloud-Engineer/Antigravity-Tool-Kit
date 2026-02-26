#!/usr/bin/env node

/**
 * Prepare script for npm package
 * Runs before publishing to validate package structure
 */

'use strict';

const fs = require('fs');
const path = require('path');

const REQUIRED_DIRS = ['.agent', '.agent/agents', '.agent/skills', '.agent/workflows'];
const REQUIRED_FILES = ['README.md', 'LICENSE', 'package.json'];

function validateStructure() {
  console.log('Preparing Antigravity Tool Kit for publishing...\n');

  let hasErrors = false;

  // Check directories
  REQUIRED_DIRS.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(dirPath)) {
      console.error(`✗ Error: Required directory ${dir} not found`);
      hasErrors = true;
    } else {
      console.log(`✓ Directory ${dir} exists`);
    }
  });

  // Check files
  REQUIRED_FILES.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) {
      console.error(`✗ Error: Required file ${file} not found`);
      hasErrors = true;
    } else {
      console.log(`✓ File ${file} exists`);
    }
  });

  if (hasErrors) {
    console.error('\n✗ Package validation failed');
    process.exit(1);
  }

  console.log('\n✓ All required components present');
  console.log('✓ Package ready for publishing');
}

if (require.main === module) {
  validateStructure();
}

module.exports = { validateStructure };
