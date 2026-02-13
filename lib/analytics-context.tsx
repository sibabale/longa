import {
  createContext,
  useMemo,
  useContext,
  useEffect,
  type ReactNode,
} from 'react';
import * as Sentry from '@sentry/react-native';

type TrackScreenFn = (screenName: string) => void;
type CaptureEventFn = (event: string, properties?: Record<string, unknown>) => void;

type AnalyticsContextValue = {
  trackScreen: TrackScreenFn;
  capture: CaptureEventFn;
};

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

export function usePageTracking(screenName: string) {
  const analytics = useContext(AnalyticsContext);

  useEffect(() => {
    analytics?.trackScreen(screenName);
  }, [analytics, screenName]);

  useEffect(() => {
    Sentry.setTag('screen', screenName);
  }, [screenName]);
}

export function useCaptureEvent() {
  const analytics = useContext(AnalyticsContext);
  return analytics?.capture ?? (() => {});
}

type AnalyticsProviderProps = {
  children: ReactNode;
  trackScreen: TrackScreenFn;
  capture?: CaptureEventFn;
};

export function AnalyticsProvider({
  children,
  trackScreen,
  capture = () => {},
}: AnalyticsProviderProps) {
  const value = useMemo(
    () => ({ trackScreen, capture }),
    [trackScreen, capture]
  );
  return (
    <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>
  );
}
