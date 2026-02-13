import { Terms } from "@/components/organisms";
import { usePageTracking } from "@/hooks/use-page-tracking";
import { useRouter } from "expo-router";

export type TermsPageProps = {
  pickupLocation?: string;
  destinationName?: string;
  selectedDateTime?: string;
  selectedIndex?: string;
};

export function TermsPage({
  pickupLocation,
  destinationName,
  selectedDateTime,
  selectedIndex,
}: TermsPageProps = {}) {
  usePageTracking("Terms");
  const router = useRouter();

  const handleConfirm = () => {
    router.push({
      pathname: "/(flow)/ride-details",
      params: {
        ...(pickupLocation && { pickupLocation }),
        ...(destinationName && { destinationName }),
        ...(selectedDateTime && { selectedDateTime }),
        ...(selectedIndex !== undefined && { selectedIndex }),
      },
    } as Parameters<typeof router.push>[0]);
  };

  return (
    <Terms
      testID="terms-page"
      screenName="terms"
      title="Our terms"
      onConfirm={handleConfirm}
    />
  );
}
