import { LocationSearch } from '@/components/organisms';
import type { LocationSuggestionItem } from '@/components/organisms/location-suggestions-content';
import { usePageTracking } from '@/hooks/use-page-tracking';

import suggestionsData from '@/components/organisms/location-suggestions-content/data.json';

export type DestinationPageProps = {
  pickupLocation?: string;
};

export function DestinationPage({
  pickupLocation,
}: DestinationPageProps = {}) {
  usePageTracking('Destination');

  return (
    <LocationSearch
      testID="destination-page"
      title="Where would you like to go?"
      placeholder="Destination"
      screenName="destination"
      primaryAction={{
        label: 'Next',
        href: '/(flow)/datetime',
        getParams: ({ selected }): Record<string, string> => {
          if (!selected) return {};
          const params: Record<string, string> = {
            destinationName: selected.location,
          };
          if (pickupLocation) params.pickupLocation = pickupLocation;
          return params;
        },
      }}
      suggestionsData={suggestionsData as LocationSuggestionItem[]}
    />
  );
}
