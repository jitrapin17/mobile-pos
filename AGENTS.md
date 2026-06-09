## Imported Claude Cowork project instructions

## Figma-to-React Native implementation rules

- Before implementing or changing any screen from Figma, pull Figma context for the exact target node/frame first.
- Use Figma as the source of truth for variables, color styles, text styles, components, and SVG icons. Do not invent or substitute these values unless the Figma data is missing or technically unsupported, and document the fallback.
- Map Figma variables/styles into project theme files before using them in screens/components.
- Use Figma text styles exactly: font family, weight, size, line height, and letter spacing. If a font family is referenced by Figma, bundle/load that font in React Native before rendering the screen.
- Use Figma component structure to decide reusable React Native components. Do not map anonymous `Frame ...` layers directly into components unless they represent a real repeated UI pattern.
- Icons must be SVG vectors extracted from Figma first. In React Native, render them with `react-native-svg` using Figma-exported paths/gradients or a project-approved SVG transformer. Do not use PNG/JPG icon exports or vector icon libraries unless the Figma source is missing or technically unsupported, and mark that fallback.
