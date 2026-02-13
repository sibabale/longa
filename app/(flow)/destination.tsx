import { DestinationPage } from '@/components/pages';
import { useLocalSearchParams } from 'expo-router';

export default function DestinationScreen() {
  const { pickupLocation } = useLocalSearchParams<{ pickupLocation?: string }>();

  return <DestinationPage pickupLocation={pickupLocation} />;
}
