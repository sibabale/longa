import { Pressable, View } from "react-native";
import styled from "styled-components/native";

export const LocationSearchContainer = styled(View)`
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

export const SearchInputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  height: 48px;
  border-radius: 100px;
  background-color: ${(props) => props.theme.colors.surface};
  padding-horizontal: 16px;
  gap: 12px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${(props) => props.theme.colors.title};
  padding-vertical: 0;
`;

export const ContentArea = styled.View`
  flex: 1;
  padding-horizontal: 24px;
`;

export const PrimaryActionContainer = styled.View`
  padding-horizontal: 24px;
  padding-bottom: 24px;
`;

export const PrimaryActionButton = styled(Pressable)<{ disabled?: boolean }>`
  width: 100%;
  background-color: ${(props) =>
    props.disabled ? props.theme.colors.tagline : "#000000"};
  border-radius: 100px;
  padding-vertical: 16px;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const PrimaryActionLabel = styled.Text`
  font-size: 17px;
  font-family: ${(props) => props.theme.fonts.semiBold};
  color: #ffffff;
`;
