import type { ComponentProps } from "react";

import { TextContainer } from "./text.styles";

export type TextProps = {
  testID?: string;
  fontSize?: string;
  fontWeight?: number;
  textAlign?: "center" | "left" | "right";
  fontFamily?: string;
  color?: string;
  children: React.ReactNode;
  style?: ComponentProps<typeof TextContainer>["style"];
};

export function Text({
  style,
  testID = "text",
  children,
  fontSize,
  fontWeight,
  textAlign,
  fontFamily,
  color,
  ...props
}: TextProps) {
  return (
    <TextContainer
      testID={testID}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $textAlign={textAlign}
      $fontFamily={fontFamily}
      $color={color}
      style={style}
      {...props}
    >
      {children}
    </TextContainer>
  );
}
