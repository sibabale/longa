import { Pressable } from "react-native";
import styled from "styled-components/native";

export const Button = styled(Pressable)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  border-radius: 100px;
  gap: 8px;
  background-color: ${(props) => props.theme.colors.surface};
`;

export const Label = styled.Text`
  font-size: 18px;
  font-weight: 600;
  font-family: ${(props) => props.theme.fonts.semiBold};
  color: ${(props) => props.theme.colors.title};
`;
