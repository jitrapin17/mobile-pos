export const fontFamily = {
  regular: 'NotoSansThai_400Regular',
  medium: 'NotoSansThai_500Medium',
  semibold: 'NotoSansThai_600SemiBold',
  bold: 'NotoSansThai_700Bold',
};

export const typography = {
  // Headline 2 — Noto Sans Thai Bold 20/30
  h3: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '700' as const,
  },
  // Button 2 / label bold — Noto Sans Thai Bold 16/24 (used in components as bold label)
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700' as const,
  },
  // Body 2 — Noto Sans Thai Regular 14/18
  body: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400' as const,
  },
  // Label 2 — Noto Sans Thai Medium 14/18
  bodyMedium: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500' as const,
  },
  // SemiBold 14/18
  bodySemibold: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600' as const,
  },
  // Caption — Noto Sans Thai Regular 12/16
  small: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
  },
  tiny: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '400' as const,
  },
  // Headline 1 — Noto Sans Thai Bold 24/30
  h2: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700' as const,
  },
  // Headline 3 — Noto Sans Thai Medium 18/22
  h4: {
    fontFamily: fontFamily.medium,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '500' as const,
  },
  smallSemibold: {
    fontFamily: fontFamily.semibold,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600' as const,
  },
};
