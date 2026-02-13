import { LocationSearch } from '@/components/organisms';
import type { LocationSuggestionItem } from '@/components/organisms/location-suggestions-content';
import { usePageTracking } from '@/hooks/use-page-tracking';

import suggestionsData from '@/components/organisms/location-suggestions-content/data.json';

export function DestinationPage() {
  usePageTracking('Destination');

  return (
    <LocationSearch
      testID="destination-page"
      title="Where would you like to go?"
      placeholder="Destination"
      screenName="destination"
      primaryAction={{ label: 'Next', href: '/(flow)' }}
      suggestionsData={suggestionsData as LocationSuggestionItem[]}
    />
  );
}
