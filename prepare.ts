import { exec } from 'child_process';
import { platform } from 'os';
import { install } from 'husky';

const isDocker = !!process.env.IS_DOCKER;
const isCi = !!process.env.CI;
const isHuskyNotFound = !install;

if (!isDocker && !isCi && !isHuskyNotFound) {
  install();
  if (platform() !== 'win32') {
    exec('chmod ug+x .husky/*');
  }
}
