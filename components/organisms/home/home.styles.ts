import { View } from "react-native";
import styled from "styled-components/native";

export const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 24px;
  padding-top: 8px;
`;

export const TitleSection = styled.View`
  padding-horizontal: 24px;
  padding-top: 16px;
  margin-bottom: 24px;
`;

export const SearchSection = styled.View`
  padding-horizontal: 24px;
  margin-bottom: 24px;
`;

export const SearchButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  height: 48px;
  border-radius: 100px;
  background-color: ${(props) => props.theme.colors.surface};
  padding-horizontal: 16px;
  gap: 12px;
`;

