import { Pressable, View } from "react-native";
import styled from "styled-components/native";

export const ResultItemTouchable = styled(Pressable)<{ $active?: boolean }>`
  padding: 16px;
  border-radius: 8px;
  border-width: 2px;
  border-color: ${(props) => (props.$active ? "#000000" : "transparent")};
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

export const IconContainer = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: #9e9e9e;
  align-items: center;
  justify-content: center;
`;
