/**
 * Analytics configuration. Set these in .env or app.json extra:
 * - EXPO_PUBLIC_POSTHOG_API_KEY
 * - EXPO_PUBLIC_SENTRY_DSN
 */
export const analyticsConfig = {
  posthog: {
    apiKey: process.env.EXPO_PUBLIC_POSTHOG_API_KEY ?? '',
    host: process.env.EXPO_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
  },
  sentry: {
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN ?? '',
  },
} as const;

export const isPostHogEnabled = () =>
  Boolean(analyticsConfig.posthog.apiKey);

export const isSentryEnabled = () => Boolean(analyticsConfig.sentry.dsn);
