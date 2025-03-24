import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

export const themeConfig = {
  accentColor: 'sky',
  grayColor: 'mauve',
  panelBackground: 'solid',
  scaling: '100%',
  radius: 'medium',
} as const;

export { Theme };
