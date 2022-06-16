import stringify from 'fast-safe-stringify';
import winston, { createLogger, format, Logger, transports } from 'winston';
import { consoleFormat } from 'winston-console-format';
import LokiTransport from 'winston-loki';
import { env } from '../utils';
import os from 'os';

export const logger: Logger = createLogger({
  level: 'silly',
  format: format.combine(
    format.timestamp(),
    format.ms(),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: '{{ cookiecutter.project_slug }}' },
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true }),
        format.padLevels(),
        consoleFormat({
          showMeta: true,
          metaStrip: ['timestamp', 'service'],
          inspectOptions: {
            depth: Infinity,
            colors: true,
            maxArrayLength: Infinity,
            breakLength: 120,
            compact: Infinity,
          },
        }),
      ),
    }),
  ],
});

function tryJSONStringify(obj: Record<string, unknown>): string | undefined {
  try {
    return JSON.stringify(obj);
  } catch (_) {
    return;
  }
}

export function formatError(error: Error): Record<string, unknown> {
  const enumeratedErrorObject: Record<string, unknown> = {};
  Object.getOwnPropertyNames(error).forEach((key: string) => {
    enumeratedErrorObject[key] = (error as unknown as Record<string, unknown>)[
      key
    ];
  });

  // remove circular dependencies so that Winston can process the error
  const serialized: string =
    tryJSONStringify(enumeratedErrorObject) || stringify(enumeratedErrorObject);

  return JSON.parse(serialized);
}

/**
 * Enumerable properties show up in for...in loops
 * but the Error object properties are set not to be Enumerable.
 * While calling JSON.stringify(err), most of it's properties don't show
 * because JSON.stringify internally uses something like for...in or Object.keys(err)
 * Bellow we replace the Error with new object which all it's properties are enumerable.
 */
const errorObjectFormat: winston.Logform.FormatWrap = winston.format((info) => {
  // Don't want to Object.keys() on the info object to find Error instances,
  // because this function will run before every logging
  // So we assume that the error will be under 'error' or 'err' key
  if (info.err instanceof Error) {
    info.error = info.err;
    delete info.err;
  }

  if (info.error instanceof Error) {
    info.error = formatError(info.error);
  }
  return info;
});

if (env.LOKI_URL) {
  logger.add(
    new LokiTransport({
      format: winston.format.combine(
        errorObjectFormat(),
        winston.format.json(),
      ),
      host: env.LOKI_URL,
      basicAuth: env.LOKI_BASIC_AUTH,
      labels: {
        service: '{{ cookiecutter.project_slug }}',
        hostname: os.hostname(),
      },
      json: true,
      replaceTimestamp: true,
    }),
  );
  logger.debug('Added loki transport');
}
