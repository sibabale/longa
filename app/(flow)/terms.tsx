import { TermsPage } from "@/components/pages";
import { useLocalSearchParams } from "expo-router";

export default function TermsScreen() {
  const {
    pickupLocation,
    destinationName,
    selectedDateTime,
    selectedIndex,
  } = useLocalSearchParams<{
    pickupLocation?: string;
    destinationName?: string;
    selectedDateTime?: string;
    selectedIndex?: string;
  }>();

  return (
    <TermsPage
      pickupLocation={pickupLocation as string | undefined}
      destinationName={destinationName as string | undefined}
      selectedDateTime={selectedDateTime as string | undefined}
      selectedIndex={selectedIndex as string | undefined}
    />
  );
}
