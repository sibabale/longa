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
  return <AnalyticsProvider trackScreen={trackScreen}>{children}</AnalyticsProvider>;
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

  const noopTrackScreen = useCallback(() => {}, []);

  if (!posthogClient) {
    return <AnalyticsProvider trackScreen={noopTrackScreen}>{children}</AnalyticsProvider>;
  }

  return (
    <PostHogProvider client={posthogClient} autocapture>
      <PostHogTrackScreen>{children}</PostHogTrackScreen>
    </PostHogProvider>
  );
}
