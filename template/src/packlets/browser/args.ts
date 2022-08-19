import { platform } from 'os';

export const CHROME_ARGS: string[] = [
  '--enable-logging',
  '--v1=1',
  '--no-first-run',
];

export const CHROME_IGNORE_DEFAULT_ARGS: string[] = [
  '--disable-ipc-flooding-protection',
];

if (platform() !== 'darwin') {
  // disable --dev-shm-usage on non-darwin boxes
  CHROME_ARGS.push('--disable-dev-shm-usage', '--no-sandbox');
} else {
  CHROME_IGNORE_DEFAULT_ARGS.push('--disable-dev-shm-usage');
}
