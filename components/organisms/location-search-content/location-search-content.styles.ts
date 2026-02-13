import { View } from "react-native";
import styled from "styled-components/native";

export const ResultItem = styled.View<{ $selected?: boolean; $selectable?: boolean }>`
  padding-vertical: 16px;
  padding-horizontal: ${(props) => (props.$selectable ? 12 : 0)}px;
  margin-horizontal: ${(props) => (props.$selectable ? -12 : 0)}px;
  border-radius: ${(props) => (props.$selectable ? 12 : 0)}px;
  background-color: ${(props) =>
    props.$selected ? props.theme.colors.surface : "transparent"};
  border-width: ${(props) => (props.$selectable ? 2 : 0)}px;
  border-color: ${(props) =>
    props.$selected ? props.theme.colors.title : "transparent"};
`;

export const ResultRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const ResultDetails = styled.View`
  flex: 1;
`;

export const ResultDivider = styled.View`
  height: 1px;
  background-color: ${(props) => props.theme.colors.surface};
`;
