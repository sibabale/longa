import { DateTimePage } from '@/components/pages';
import { useLocalSearchParams } from 'expo-router';

export default function DateTimeScreen() {
  const { destinationName, pickupLocation } = useLocalSearchParams<{
    destinationName?: string;
    pickupLocation?: string;
  }>();

  return (
    <DateTimePage
      destinationName={destinationName}
      pickupLocation={pickupLocation}
    />
  );
}
