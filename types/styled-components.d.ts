import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    fonts: {
      family: string;
      regular: string;
      semiBold: string;
      bold: string;
    };
    colors: {
      text: string;
      background: string;
      tint: string;
      icon: string;
      tabIconDefault: string;
      tabIconSelected: string;
      title: string;
      tagline: string;
      arrow: string;
      surface: string;
      skeletonBg: string;
      skeletonFg: string;
    };
  }
}
