// Accessibility utility functions for DOM manipulation

interface FontSizeConfig {
  current: number;
  min: number;
  max: number;
  step: number;
}

// Default font size configuration
const fontSizeConfig: FontSizeConfig = {
  current: 100, // Current font size percentage
  min: 80, // Minimum font size percentage
  max: 200, // Maximum font size percentage
  step: 10, // Step size for font size changes
};

// Default settings
const defaultSettings = {
  highContrast: false,
  invertColors: false,
  emphasizeLinks: false,
  largeCursor: false,
  textSpacing: false,
  reduceMotion: false,
};

// Initialize settings from localStorage if available
const initializeSettings = (): Record<string, boolean> => {
  try {
    const savedSettings = localStorage.getItem('accessibility-settings');
    return savedSettings ? JSON.parse(savedSettings) : { ...defaultSettings };
  } catch (error) {
    console.error('Error loading accessibility settings:', error);
    return { ...defaultSettings };
  }
};

// Save settings to localStorage
const saveSettings = (settings: Record<string, boolean>): void => {
  try {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving accessibility settings:', error);
  }
};

// Apply settings from saved state
const applySettings = (settings: Record<string, boolean>): void => {
  // Apply each setting
  for (const [key, enabled] of Object.entries(settings)) {
    switch (key) {
      case 'highContrast':
        toggleClassBasedSetting('high-contrast', enabled);
        break;
      case 'invertColors':
        console.log('invertColors', enabled);
        toggleClassBasedSetting('high-contrast-invert', enabled);
        break;
      case 'emphasizeLinks':
        toggleClassBasedSetting('emphasize-links', enabled);
        break;
      case 'largeCursor':
        toggleClassBasedSetting('large-cursor', enabled);
        break;
      case 'textSpacing':
        toggleClassBasedSetting('increased-spacing', enabled);
        break;
      case 'reduceMotion':
        toggleClassBasedSetting('reduce-motion', enabled);
        break;
    }
  }
};

// Reset all settings to default
const resetAllSettings = (): Record<string, boolean> => {
  // Remove all accessibility classes
  document.body.classList.remove(
    'high-contrast',
    'high-contrast-invert',
    'emphasize-links',
    'large-cursor',
    'increased-spacing',
    'reduce-motion'
  );

  // Reset font size
  resetFontSize();

  // Save default settings to localStorage
  saveSettings({ ...defaultSettings });

  return { ...defaultSettings };
};

// Toggle class-based setting
const toggleClassBasedSetting = (className: string, enabled: boolean): void => {
  if (enabled) {
    document.body.classList.add(className);
  } else {
    document.body.classList.remove(className);
  }
};

// Font size controls
const increaseFontSize = (): void => {
  const html = document.documentElement;
  if (fontSizeConfig.current < fontSizeConfig.max) {
    fontSizeConfig.current += fontSizeConfig.step;
    html.style.setProperty('font-size', `${fontSizeConfig.current}%`, 'important');
    localStorage.setItem('accessibility-font-size', String(fontSizeConfig.current));
  }
};

const decreaseFontSize = (): void => {
  const html = document.documentElement;
  if (fontSizeConfig.current > fontSizeConfig.min) {
    fontSizeConfig.current -= fontSizeConfig.step;
    html.style.setProperty('font-size', `${fontSizeConfig.current}%`, 'important');
    localStorage.setItem('accessibility-font-size', String(fontSizeConfig.current));
  }
};

const resetFontSize = (): void => {
  const html = document.documentElement;
  fontSizeConfig.current = 100;
  html.style.removeProperty('font-size');
  localStorage.setItem('accessibility-font-size', '100');
};

// Initialize font size from localStorage
const initializeFontSize = (): void => {
  try {
    const savedFontSize = localStorage.getItem('accessibility-font-size');
    if (savedFontSize) {
      fontSizeConfig.current = parseInt(savedFontSize, 10);
      document.documentElement.style.setProperty(
        'font-size',
        `${fontSizeConfig.current}%`,
        'important'
      );
    }
  } catch (error) {
    console.error('Error initializing font size:', error);
  }
};

export const accessibilityUtils = {
  // Settings management
  initializeSettings,
  saveSettings,
  applySettings,
  resetAllSettings,
  defaultSettings,

  // Font size controls
  increaseFontSize,
  decreaseFontSize,
  resetFontSize,
  initializeFontSize,

  // Get current font size percentage
  getCurrentFontSize: () => fontSizeConfig.current,
};
