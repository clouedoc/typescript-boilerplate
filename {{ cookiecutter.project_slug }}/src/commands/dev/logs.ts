import { Command } from '@oclif/core';
import { logger } from '../../packlets/telemetry';

export default class DevLogs extends Command {
  static description = 'Send test logs to Loki';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  public async run(): Promise<void> {
    setInterval(() => {
      logger.info('Ceci est un log de test');
      logger.debug('coucou les amis!!');
    }, 1000);
  }
}
