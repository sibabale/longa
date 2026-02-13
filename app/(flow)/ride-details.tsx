import { RideDetailsPage } from "@/components/pages";
import { useLocalSearchParams } from "expo-router";

export default function RideDetailsScreen() {
  const { pickupLocation, destinationName, selectedDateTime, selectedIndex } =
    useLocalSearchParams<{
      pickupLocation?: string;
      destinationName?: string;
      selectedDateTime?: string;
      selectedIndex?: string;
    }>();

  return (
    <RideDetailsPage
      pickupLocation={pickupLocation as string | undefined}
      destinationName={destinationName as string | undefined}
      selectedDateTime={selectedDateTime as string | undefined}
      selectedIndex={selectedIndex as string | undefined}
    />
  );
}
