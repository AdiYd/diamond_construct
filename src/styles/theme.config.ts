import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

export const themeConfig = {
  accentColor: '#101437',
  grayColor: 'mauve',
  panelBackground: 'solid',
  scaling: '100%',
  radius: 'medium',

  textColor: '#ffffff',
} as const;

export { Theme };
