import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  type ReactNode,
} from 'react';
import * as Sentry from '@sentry/react-native';

type TrackScreenFn = (screenName: string) => void;

const AnalyticsContext = createContext<TrackScreenFn | null>(null);

export function usePageTracking(screenName: string) {
  const trackScreen = useContext(AnalyticsContext);

  useEffect(() => {
    trackScreen?.(screenName);
  }, [trackScreen, screenName]);

  useEffect(() => {
    Sentry.setTag('screen', screenName);
  }, [screenName]);
}

type AnalyticsProviderProps = {
  children: ReactNode;
  trackScreen: TrackScreenFn;
};

export function AnalyticsProvider({
  children,
  trackScreen,
}: AnalyticsProviderProps) {
  const value = useCallback(trackScreen, [trackScreen]);
  return (
    <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>
  );
}
