#!/usr/bin/env node

/**
 * Prepare script for npm package
 * Runs before publishing
 */

const fs = require('fs');
const path = require('path');

console.log('Preparing Antigravity Tool Kit for publishing...');

const requiredDirs = ['.agent', '.agent/agents', '.agent/skills', '.agent/workflows'];

requiredDirs.forEach(dir => {
  const dirPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(dirPath)) {
    console.error(`Error: Required directory ${dir} not found`);
    process.exit(1);
  }
});

console.log('All required directories present');
console.log('Package ready for publishing');
