import { Home } from "@/components/organisms";
import { usePageTracking } from "@/hooks/use-page-tracking";

export function TripsPage() {
  usePageTracking("Trips");

  return (
    <Home
      testID="trips-page"
      screenName="trips"
      title="Your trips"
      searchPlaceholder="Start a new trip"
      pickupHref="/(flow)/pickup"
    />
  );
}
