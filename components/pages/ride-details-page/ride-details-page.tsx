import { RideDetails } from "@/components/organisms";
import { usePageTracking } from "@/hooks/use-page-tracking";

export type RideDetailsPageProps = {
  pickupLocation?: string;
  destinationName?: string;
  selectedIndex?: string;
};

export function RideDetailsPage({
  pickupLocation,
  destinationName,
  selectedIndex,
}: RideDetailsPageProps = {}) {
  usePageTracking("RideDetails");

  const selectedIndexNum =
    selectedIndex != null ? parseInt(selectedIndex, 10) : undefined;

  return (
    <RideDetails
      testID="ride-details-page"
      screenName="ride_details"
      pickupLocation={pickupLocation}
      destinationName={destinationName}
      selectedIndex={selectedIndexNum}
    />
  );
}
