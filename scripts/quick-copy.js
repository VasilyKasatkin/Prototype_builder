#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules and dist folders
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') {
        continue;
      }
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function updatePackageJson(filePath, newName) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  packageJson.name = newName;
  packageJson.version = '0.1.0';
  fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2) + '\n');
}

async function main() {
  const sourcePrototype = process.argv[2];

  if (!sourcePrototype) {
    console.error('❌ Error: Please provide a source prototype name');
    console.log('Usage: npm run quick [source-prototype-name]');
    console.log('Example: npm run quick ander_metrics');
    process.exit(1);
  }

  const prototypesDir = path.join(__dirname, '..', 'prototypes');
  const sourcePath = path.join(prototypesDir, sourcePrototype);

  // Check if source prototype exists
  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Error: Prototype "${sourcePrototype}" not found`);
    console.log('\nAvailable prototypes:');
    const prototypes = fs.readdirSync(prototypesDir)
      .filter(name => fs.statSync(path.join(prototypesDir, name)).isDirectory());
    prototypes.forEach(name => console.log(`  - ${name}`));
    process.exit(1);
  }

  // Ask for new prototype name
  const newName = await question('Enter name for the new prototype: ');

  if (!newName || !newName.trim()) {
    console.error('❌ Error: Prototype name cannot be empty');
    process.exit(1);
  }

  const newPath = path.join(prototypesDir, newName.trim());

  // Check if destination already exists
  if (fs.existsSync(newPath)) {
    console.error(`❌ Error: Prototype "${newName}" already exists`);
    process.exit(1);
  }

  console.log(`\n📦 Copying ${sourcePrototype} to ${newName}...`);

  try {
    // Copy the directory
    copyDirectory(sourcePath, newPath);

    // Update package.json if it exists
    const packageJsonPath = path.join(newPath, 'package.json');
    updatePackageJson(packageJsonPath, newName);

    // Also check for nested package.json (like in react-app subfolder)
    const reactAppPath = path.join(newPath, 'react-app', 'package.json');
    updatePackageJson(reactAppPath, `${newName}-app`);

    console.log('✅ Prototype created successfully!\n');
    console.log('Next steps:');
    console.log(`  1. cd prototypes/${newName}`);

    // Detect if there's a nested structure
    if (fs.existsSync(path.join(newPath, 'react-app'))) {
      console.log(`  2. cd react-app`);
    }

    console.log('  3. npm install');
    console.log('  4. npm start\n');
  } catch (error) {
    console.error('❌ Error copying prototype:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main().catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
