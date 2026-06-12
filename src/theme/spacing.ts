// ============================================================
// Spacing tokens — extracted from Figma screen designs
// ============================================================

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 6,
  md: 8,
  md2: 10,
  lg: 12,
  lg2: 14,
  xl: 16,
  xl2: 18,
  xxl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 40,
  '6xl': 48,
} as const;

// Border radius tokens
export const radius = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 18,
  pill: 30,
  card: 32,
  full: 999,
} as const;

// Fixed component size tokens
export const sizes = {
  iconButton: 36,    // back button, receipt button, call button
  actionButton: 40,  // filter chips, tab buttons, card action buttons
  button: 48,        // primary/secondary CTA buttons
  progressStep: 34,  // order progress step circle
  badge: 30,         // status badge height
} as const;

// Screen layout tokens
export const layout = {
  screenPaddingH: 16,   // horizontal padding used across all screens
  cardPadding: 16,      // card internal padding
  maxWidth: 393,        // max screen width (iPhone 16)
  statusBarHeight: 59,  // status bar + safe area height
} as const;
