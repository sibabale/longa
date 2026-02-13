import { Text } from "react-native";
import styled from "styled-components/native";

type TextContainerProps = {
  $fontSize?: string;
  $fontWeight?: number;
  $textAlign?: "center" | "left" | "right";
  $fontFamily?: string;
  $color?: string;
};

export const TextContainer = styled(Text)<TextContainerProps>`
  color: ${(props) => props.$color || props.theme.colors.title};
  font-size: ${(props) => props.$fontSize || "40px"};
  text-align: ${(props) => props.$textAlign || "center"};
  font-weight: ${(props) => props.$fontWeight || 400};
  font-family: ${(props) => props.$fontFamily || props.theme.fonts.regular};
`;
