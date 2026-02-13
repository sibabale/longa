# Atomic Design Structure

2 pages: **Welcome**, **DriverRider**. All components follow `component-name/component-name.tsx` + `index.ts`.

```
components/
├── atoms/
│   ├── text/
│   │   ├── text.tsx
│   │   └── index.ts
│   └── icon/
│       ├── icon.tsx
│       └── index.ts
├── molecules/
│   ├── illustration-placeholder/
│   │   ├── illustration-placeholder.tsx
│   │   └── index.ts
│   └── choice-button/
│       ├── choice-button.tsx
│       └── index.ts
├── organisms/
│   ├── welcome-hero/
│   │   ├── welcome-hero.tsx
│   │   └── index.ts
│   └── driver-rider-selector/
│       ├── driver-rider-selector.tsx
│       └── index.ts
├── templates/
│   └── flow-screen-template/
│       ├── flow-screen-template.tsx
│       └── index.ts
└── pages/
    ├── welcome-page/
    │   ├── welcome-page.tsx
    │   └── index.ts
    └── driver-rider-page/
        ├── driver-rider-page.tsx
        └── index.ts
```

## Usage

```tsx
import { WelcomePage } from '@/components/pages';
export default function WelcomeScreen() {
  return <WelcomePage />;
}
```

## Testing

Test atoms, molecules, organisms, and templates—not pages.

Each component has a `*.test.tsx` in its directory. Run tests with `npm test`.

Components expose `testID` for querying in tests. Use `getByTestId`, `getByText`, `getByRole` from `@testing-library/react-native`.
