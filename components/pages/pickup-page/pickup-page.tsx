import { LocationSearch } from '@/components/organisms';
import { usePageTracking } from '@/hooks/use-page-tracking';

export function PickupPage() {
  usePageTracking('Pickup');

  return (
    <LocationSearch
      testID="pickup-page"
      title="Where would you like to be picked up?"
      placeholder="Pickup location"
      screenName="pickup"
      primaryAction={{
        label: 'Continue',
        href: '/(flow)/destination',
        getParams: ({ searchText }): Record<string, string> =>
          searchText ? { pickupLocation: searchText } : {},
      }}
    />
  );
}
