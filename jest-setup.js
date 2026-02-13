import '@testing-library/jest-native/extend-expect';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children }) => children,
}));

jest.mock('@/components/atoms/icon/material-icons-sharp', () => {
  const { View } = require('react-native');
  return View;
});

jest.mock('@expo/vector-icons/MaterialCommunityIcons', () => {
  const { View } = require('react-native');
  return View;
});

jest.mock('posthog-react-native', () => ({
  PostHogProvider: ({ children }) => children,
  usePostHog: () => null,
  default: jest.fn(),
}));

jest.mock('@sentry/react-native', () => ({
  init: jest.fn(),
  setTag: jest.fn(),
}));

jest.mock('react-content-loader/native', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: View,
    Rect: View,
    Circle: View,
    Path: View,
  };
});

const mockRouterPush = jest.fn();
const mockRouterBack = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({ back: mockRouterBack, push: mockRouterPush }),
  router: { push: jest.fn(), back: jest.fn() },
  useSegments: () => [],
  usePathname: () => '/',
}));
