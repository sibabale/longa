import * as Sentry from '@sentry/react-native';

import { analyticsConfig, isSentryEnabled } from './analytics-config';

export function initSentry() {
  if (!isSentryEnabled()) {
    return;
  }

  Sentry.init({
    dsn: analyticsConfig.sentry.dsn,
    environment: __DEV__ ? 'development' : 'production',
    tracesSampleRate: __DEV__ ? 1.0 : 0.2,
    enableAutoPerformanceTracing: true,
    enableNativeCrashHandling: true,
    debug: __DEV__,
  });
}
