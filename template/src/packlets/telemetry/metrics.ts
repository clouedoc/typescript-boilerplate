import execa from 'execa';
import express, { Express } from 'express';
import basicAuth from 'express-basic-auth';
import os from 'os';
import { collectDefaultMetrics, register } from 'prom-client';
import { telemetryEnv } from './env';
import { logger } from './logger';

const api: Express = express();
api.use(
  basicAuth({
    users: { [telemetryEnv.METRICS_USERNAME]: telemetryEnv.METRICS_PASSWORD },
  }),
);

api.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

let prepared: boolean = false;
export function preparePrometheus(): void {
  if (prepared) {
    return;
  }

  let gitCommitHash: string = 'unknown';
  try {
    gitCommitHash =
      execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 8) ?? 'unknown';
  } catch (err) {
    // logger.warn('Could not get git commit hash', { err });
  }

  register.setDefaultLabels({
    service: telemetryEnv.SERVICE_NAME,
    hostname: os.hostname(),
    commit: gitCommitHash,
    instance: os.hostname() + ':' + process.pid,
  });
  collectDefaultMetrics();
  api.listen(telemetryEnv.METRICS_PORT);
  logger.debug('Prepared Prometheus client');
  prepared = true;
}
