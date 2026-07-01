// Shared bottom-margin handling for content blocks.
// "default" keeps the block's built-in Tailwind spacing; any other preset
// (or a custom value) overrides it with an explicit pixel value.
export const DEFAULT_BOTTOM_MARGIN_CLASS = 'mb-4 md:mb-24';

const PRESET_PIXELS = {
  none: 0,
  small: 12,
  medium: 24,
  large: 48,
};

export function getBottomMarginProps({ bottomMargin, customBottomMargin }) {
  if (!bottomMargin || bottomMargin === 'default') {
    return { className: DEFAULT_BOTTOM_MARGIN_CLASS, style: undefined };
  }

  const px = bottomMargin === 'custom' ? customBottomMargin : PRESET_PIXELS[bottomMargin];

  return { className: '', style: { marginBottom: `${px ?? 0}px` } };
}
