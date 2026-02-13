import type { ReactNode } from 'react';

import { IllustrationPlaceholder } from '@/components/molecules';

import {
  Screen,
  IllustrationSection,
  ContentSection,
  ActionsSection,
} from './flow-screen-template.styles';

export type FlowScreenTemplateProps = {
  illustrationVariant?: 'welcome' | 'driver-rider';
  illustrationHeight?: string;
  paddingHorizontal?: number;
  children: ReactNode;
  actions?: ReactNode;
  testID?: string;
};

export function FlowScreenTemplate({
  illustrationVariant = 'welcome',
  illustrationHeight,
  paddingHorizontal,
  children,
  actions,
  testID = 'flow-screen-template',
}: FlowScreenTemplateProps) {
  return (
    <Screen $paddingHorizontal={paddingHorizontal} testID={testID}>
      <IllustrationSection $height={illustrationHeight} testID={`${testID}-illustration`}>
        <IllustrationPlaceholder variant={illustrationVariant} />
      </IllustrationSection>
      <ContentSection testID={`${testID}-content`}>{children}</ContentSection>
      {actions && (
        <ActionsSection testID={`${testID}-actions`}>{actions}</ActionsSection>
      )}
    </Screen>
  );
}
