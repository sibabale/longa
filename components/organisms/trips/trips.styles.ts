import { View } from "react-native";
import styled from "styled-components/native";

export const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const TitleSection = styled.View`
  padding-horizontal: 24px;
  padding-top: 24px;
  margin-bottom: 24px;
`;

export const ContentArea = styled.View`
  flex: 1;
  padding-horizontal: 24px;
`;

export const EmptyStateWrapper = styled.View`
  flex: 1;
  padding-horizontal: 24px;
`;
