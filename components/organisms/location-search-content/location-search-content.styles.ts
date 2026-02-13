import { View } from "react-native";
import styled from "styled-components/native";

export const ResultItem = styled.View`
  padding-vertical: 16px;
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
