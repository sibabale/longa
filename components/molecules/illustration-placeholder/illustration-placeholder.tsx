import { Placeholder } from './illustration-placeholder.styles';

export type IllustrationPlaceholderProps = {
  variant?: 'welcome' | 'driver-rider';
  testID?: string;
};

export function IllustrationPlaceholder({
  variant = 'welcome',
  testID = 'illustration-placeholder',
}: IllustrationPlaceholderProps) {
  return <Placeholder $variant={variant} testID={testID} />;
}
