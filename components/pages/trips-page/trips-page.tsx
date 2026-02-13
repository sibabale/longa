import { Trips } from "@/components/organisms";
import { usePageTracking } from "@/hooks/use-page-tracking";

export function TripsPage() {
  usePageTracking("Trips");

  return (
    <Trips
      testID="trips-page"
      pickupHref="/(flow)/pickup"
    />
  );
}
