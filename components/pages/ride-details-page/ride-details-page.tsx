import { RideDetails } from "@/components/organisms";
import { usePageTracking } from "@/hooks/use-page-tracking";

export type RideDetailsPageProps = {
  pickupLocation?: string;
  destinationName?: string;
  selectedDateTime?: string;
  selectedIndex?: string;
};

export function RideDetailsPage({
  pickupLocation,
  destinationName,
  selectedDateTime,
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
      selectedDateTime={selectedDateTime}
      selectedIndex={selectedIndexNum}
    />
  );
}
