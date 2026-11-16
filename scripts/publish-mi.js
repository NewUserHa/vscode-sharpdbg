'use strict';

const { spawnSync } = require('child_process');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const projectPath = path.join(repoRoot, 'sharpdbg.mi', 'src', 'SharpDbg.MiWrapper', 'SharpDbg.MiWrapper.csproj');
const outputDir = path.join(repoRoot, 'dist', 'sharpdbg-mi');

const args = [
  'publish',
  projectPath,
  '-c',
  'Release',
  '-f',
  'net11.0',
  '-o',
  outputDir,
  '--self-contained',
  'false',
  '-p:UseAppHost=true',
];

const result = spawnSync('dotnet', args, {
  cwd: repoRoot,
  stdio: 'inherit',
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
