import ContentLoader, { Rect } from "react-content-loader/native";
import { useWindowDimensions } from "react-native";
import { useTheme } from "styled-components/native";

const CONTENT_PADDING = 48;

type LocationSearchLoadingProps = {
  testID?: string;
};

export function LocationSearchLoading({
  testID = "location-search-loading",
}: LocationSearchLoadingProps) {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const contentWidth = width - CONTENT_PADDING;
  const backgroundColor = theme.colors.skeletonBg;
  const foregroundColor = theme.colors.skeletonFg;

  return (
    <ContentLoader
      testID={testID}
      speed={1}
      width={contentWidth}
      height={280}
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
    >
      <Rect x="0" y="0" rx="4" ry="4" width="120" height="14" />
      <Rect x="0" y="32" rx="8" ry="8" width={contentWidth} height="80" />
      <Rect x="0" y="128" rx="4" ry="4" width="100" height="14" />
      <Rect x="0" y="160" rx="8" ry="8" width={contentWidth} height="80" />
    </ContentLoader>
  );
}
