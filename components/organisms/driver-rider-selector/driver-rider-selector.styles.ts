import { View } from "react-native";
import styled from "styled-components/native";

export const ImageSection = styled.View`
  width: 100%;
  height: 400px;
  overflow: hidden;
`;

export const ContentSection = styled.View`
  flex: 1;
  padding-horizontal: 32px;
`;

export const QuestionBlock = styled.View`
  align-items: center;
  margin-bottom: 24px;
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  gap: 16px;
`;

export const DriverRiderContainer = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;
