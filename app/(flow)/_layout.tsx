import { Stack } from 'expo-router';

export default function FlowLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="driver-or-rider" />
    </Stack>
  );
}
