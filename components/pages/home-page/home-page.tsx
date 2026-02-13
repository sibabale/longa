import { Home } from "@/components/organisms";
import { usePageTracking } from "@/hooks/use-page-tracking";

export function HomePage() {
  usePageTracking("Home");

  return (
    <Home
      testID="home-page"
      screenName="home"
      title="Longa"
      searchPlaceholder="Where to?"
      pickupHref="/(flow)/pickup"
    />
  );
}
