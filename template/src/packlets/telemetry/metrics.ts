import http from 'http';
import prometheus from 'prom-client';
import { telemetryEnv } from './env';
import { logger } from './logger';

if (telemetryEnv.PUSHGATEWAY_URL) {
  const gateway: prometheus.Pushgateway = new prometheus.Pushgateway(
    telemetryEnv.PUSHGATEWAY_URL,
    {
      timeout: 5000, //Set the request timeout to 5000ms
      agent: new http.Agent({
        keepAlive: true,
        keepAliveMsecs: 10000,
        maxSockets: 5,
      }),
    },
  );
  setInterval(async () => {
    try {
      await gateway.pushAdd({
        jobName: telemetryEnv.SERVICE_NAME,
      });
      logger.silly('Pushed metrics to Prometheus');
    } catch (err) {
      logger.error('Failed to push metrics to Prometheus', { err });
    }
  }, 5000);
}

export { prometheus };
