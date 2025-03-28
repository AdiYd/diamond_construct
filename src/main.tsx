import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Theme, ThemePanel } from '@radix-ui/themes';
import { themeConfig } from './styles/theme.config';
import '@radix-ui/themes/styles.css';
import './styles/styles.css'; // Import Tailwind CSS

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme {...themeConfig}>
      <App />
      {/* <ThemePanel /> */}
    </Theme>
  </React.StrictMode>
);
