import { DriverRiderSelector } from '@/components/organisms';
import { usePageTracking } from '@/hooks/use-page-tracking';

export function DriverRiderPage() {
  usePageTracking('Driver or Rider');

  return <DriverRiderSelector />;
}
