import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Theme } from '@radix-ui/themes';
import { themeConfig } from './styles/theme.config';
import '@radix-ui/themes/styles.css';
import './styles/styles.css';

const rootElement = document.getElementById('root')!;

if (rootElement.hasChildNodes()) {
  // If the app is pre-rendered
  hydrateRoot(
    rootElement,
    <React.StrictMode>
      <Theme {...themeConfig}>
        <App />
      </Theme>
    </React.StrictMode>
  );
} else {
  // For development
  createRoot(rootElement).render(
    <React.StrictMode>
      <Theme {...themeConfig}>
        <App />
      </Theme>
    </React.StrictMode>
  );
}