import { RideDetailsPage } from "@/components/pages";
import { useLocalSearchParams } from "expo-router";

export default function RideDetailsScreen() {
  const { pickupLocation, destinationName, selectedIndex } =
    useLocalSearchParams<{
      pickupLocation?: string;
      destinationName?: string;
      selectedIndex?: string;
    }>();

  return (
    <RideDetailsPage
      pickupLocation={pickupLocation as string | undefined}
      destinationName={destinationName as string | undefined}
      selectedIndex={selectedIndex as string | undefined}
    />
  );
}
