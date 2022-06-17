# telemetry

This Rush Stack packlet contains everything you need to do basic [telemetry](https://en.wikipedia.org/wiki/Telemetry) with [Loki](https://github.com/grafana/loki).

## Usage

### Logging

We are using a simple

```ts
import { logger } from '../telemetry';

logger.info('Hello there!');
logger.info('You can log metrics here', { metricName: 1337 });
```

#### Sending logs to Loki

To send logs to Loki, set the following environment variables.

| Name              | Description                                             | Example                      | Default |
| ----------------- | ------------------------------------------------------- | ---------------------------- | ------- |
| `LOKI_URL`        | The URL of your Loki instance                           | https://loki.yourcompany.com | _Empty_ |
| `LOKI_BASIC_AUTH` | Basic authentication credentials for your Loki instance | username:password            | _Empty_ |

### Traces and metrics

_To be added in a future release_

## What is Telemetry?

Telemetry is a software engineering techniques which places emphasis on collecting information
about the internal state of your software.

There are three main ways to do that:

- logging
- tracing
- collecting metrics

## FAQ

### This packages doesn't send metrics

Logs that are sent to Loki can easily be [converted into metrics](https://grafana.com/blog/2021/03/23/how-i-fell-in-love-with-logs-thanks-to-grafana-loki/).

Metrics are useful when you are getting serious about your infrastructure, but are a burden to maintain when starting out a project.

### This package doesn't send traces

This is to be added.

However, be informed that traces are mostly useful to debug distributed systems. (not that useful when starting out)

### I want to implement metrics and traces. How should I go about it?

I highly recommend instrumenting this app using [OpenTelemetry](https://opentelemetry.io/) combined with an [OpenTelemetry-Collector server](https://github.com/open-telemetry/opentelemetry-collector).
