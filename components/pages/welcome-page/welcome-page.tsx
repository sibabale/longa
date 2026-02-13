import { WelcomeHero } from '@/components/organisms';
import { usePageTracking } from '@/hooks/use-page-tracking';

export function WelcomePage() {
  usePageTracking('Welcome');

  return <WelcomeHero />;
}
