import { platform } from 'os';
import { browserEnv } from '../env';

export const CHROME_ARGS: string[] = [
  '--enable-logging',
  '--v1=1',
  '--no-first-run',
];

export const CHROME_IGNORE_DEFAULT_ARGS: string[] = [
  '--disable-ipc-flooding-protection',
];

if (platform() === 'darwin' || browserEnv.CONTAINER_DEV_SHM_ENABLED) {
  CHROME_IGNORE_DEFAULT_ARGS.push('--disable-dev-shm-usage');
}

if (platform() === 'linux' && !browserEnv.CONTAINER_PRIVILEGED) {
  CHROME_ARGS.push('--no-sandbox');
}
