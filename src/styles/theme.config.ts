import { Theme, ThemeProps } from '@radix-ui/themes';
// import '@radix-ui/themes/styles.css';

export const themeConfig: ThemeProps = {
  accentColor: '#101437',
  // accentColor: 'brown',
  grayColor: 'mauve',
  scaling: '100%',
  radius: 'small',
} as const;

export { Theme };
