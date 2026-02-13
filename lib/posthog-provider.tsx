import PostHog, { PostHogProvider, usePostHog } from 'posthog-react-native';
import { useCallback, useMemo, type ReactNode } from 'react';

import { AnalyticsProvider } from '@/lib/analytics-context';
import { analyticsConfig, isPostHogEnabled } from './analytics-config';

type PostHogProviderWrapperProps = {
  children: ReactNode;
};

function PostHogTrackScreen({ children }: { children: ReactNode }) {
  const posthog = usePostHog();
  const trackScreen = useCallback(
    (screenName: string) => {
      posthog?.screen(screenName);
    },
    [posthog]
  );
  const capture = useCallback(
    (event: string, properties?: Record<string, unknown>) => {
      posthog?.capture(event, properties);
    },
    [posthog]
  );
  return (
    <AnalyticsProvider trackScreen={trackScreen} capture={capture}>
      {children}
    </AnalyticsProvider>
  );
}

export function PostHogProviderWrapper({ children }: PostHogProviderWrapperProps) {
  const posthogClient = useMemo(() => {
    if (!isPostHogEnabled()) {
      return null;
    }
    return new PostHog(analyticsConfig.posthog.apiKey, {
      host: analyticsConfig.posthog.host,
      captureNativeAppLifecycleEvents: true,
    });
  }, []);

  const noop = useCallback(() => {}, []);

  if (!posthogClient) {
    return (
      <AnalyticsProvider trackScreen={noop} capture={noop}>
        {children}
      </AnalyticsProvider>
    );
  }

  return (
    <PostHogProvider client={posthogClient} autocapture>
      <PostHogTrackScreen>{children}</PostHogTrackScreen>
    </PostHogProvider>
  );
}
