import type { RideItem } from "@/components/organisms/location-search-content";
import { SelectRide } from "@/components/organisms";
import { usePageTracking } from "@/hooks/use-page-tracking";

export type SelectRidePageProps = {
  pickupLocation?: string;
  destinationName?: string;
  selectedDateTime?: string;
  items?: RideItem[];
  isLoading?: boolean;
};

export function SelectRidePage({
  pickupLocation,
  destinationName,
  selectedDateTime,
  items,
  isLoading,
}: SelectRidePageProps = {}) {
  usePageTracking("SelectRide");

  return (
    <SelectRide
      testID="select-ride-page"
      screenName="select_ride"
      title="Select ride"
      pickupLocation={pickupLocation}
      destinationName={destinationName}
      selectedDateTime={selectedDateTime}
      primaryActionLabel="Confirm ride"
      items={items}
      isLoading={isLoading}
    />
  );
}
