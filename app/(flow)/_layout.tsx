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
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="destination" />
      <Stack.Screen name="pickup" />
      <Stack.Screen name="datetime" />
      <Stack.Screen name="select-ride" />
      <Stack.Screen name="terms" />
      <Stack.Screen name="ride-details" />
    </Stack>
  );
}
