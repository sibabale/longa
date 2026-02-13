import { SelectRidePage } from "@/components/pages";
import { useLocalSearchParams } from "expo-router";

export default function SelectRideScreen() {
  const {
    pickupLocation,
    destinationName,
    selectedDateTime,
  } = useLocalSearchParams<{
    pickupLocation?: string;
    destinationName?: string;
    selectedDateTime?: string;
  }>();

  return (
    <SelectRidePage
      pickupLocation={pickupLocation}
      destinationName={destinationName}
      selectedDateTime={selectedDateTime}
    />
  );
}
