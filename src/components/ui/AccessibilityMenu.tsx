import React, { useEffect, useState, useRef } from 'react';
import { Text, Switch, Tooltip } from '@radix-ui/themes';
import {
  Accessibility,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  Link as LinkIcon,
  MousePointer2,
  AlignJustify,
  Activity,
  RefreshCw,
} from 'lucide-react';
import { accessibilityUtils } from '../../utils/accessibility';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatePresence, motion } from 'framer-motion';

interface AccessibilityMenuProps {
  position?: {
    bottom?: number | string;
    right?: number | string;
    top?: number | string;
    left?: number | string;
  };
}

export const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({
  position = { bottom: '2rem', right: '2rem' },
}) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<Record<string, boolean>>({
    highContrast: false,
    invertColors: false,
    emphasizeLinks: false,
    largeCursor: false,
    textSpacing: false,
    reduceMotion: false,
  });
  const [fontSizePercentage, setFontSizePercentage] = useState(100);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Load saved settings on mount
  useEffect(() => {
    const savedSettings = accessibilityUtils.initializeSettings();
    setSettings(savedSettings);
    accessibilityUtils.applySettings(savedSettings);
    accessibilityUtils.initializeFontSize();
    setFontSizePercentage(accessibilityUtils.getCurrentFontSize());
  }, []);

  // Handle outside clicks to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle Escape key to close menu
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  // Toggle a specific setting
  const toggleSetting = (key: string) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };

    setSettings(newSettings);
    accessibilityUtils.saveSettings(newSettings);

    // Apply the setting change to the DOM
    switch (key) {
      case 'highContrast':
        document.body.classList.toggle('high-contrast', newSettings[key]);
        break;
      case 'invertColors':
        document.body.classList.toggle('high-contrast-invert', newSettings[key]);
        break;
      case 'emphasizeLinks':
        document.body.classList.toggle('emphasize-links', newSettings[key]);
        break;
      case 'largeCursor':
        document.body.classList.toggle('large-cursor', newSettings[key]);
        break;
      case 'textSpacing':
        document.body.classList.toggle('increased-spacing', newSettings[key]);
        break;
      case 'reduceMotion':
        document.body.classList.toggle('reduce-motion', newSettings[key]);
        break;
    }
  };

  // Font size controls
  const increaseFontSize = () => {
    accessibilityUtils.increaseFontSize();
    setFontSizePercentage(accessibilityUtils.getCurrentFontSize());
  };

  const decreaseFontSize = () => {
    accessibilityUtils.decreaseFontSize();
    setFontSizePercentage(accessibilityUtils.getCurrentFontSize());
  };

  // Reset all accessibility settings
  const resetAllSettings = () => {
    const defaultSettings = accessibilityUtils.resetAllSettings();
    setSettings(defaultSettings);
    setFontSizePercentage(accessibilityUtils.getCurrentFontSize());
  };

  // Translations - these would come from your language context
  const translations = {
    accessibilityMenu: language === 'he' ? 'תפריט נגישות' : 'Accessibility Menu',
    fontSize: language === 'he' ? 'גודל טקסט' : 'Font Size',
    increase: language === 'he' ? 'הגדל' : 'Increase',
    decrease: language === 'he' ? 'הקטן' : 'Decrease',
    reset: language === 'he' ? 'איפוס' : 'Reset',
    resetAll: language === 'he' ? 'איפוס כל ההגדרות' : 'Reset All Settings',
    highContrast: language === 'he' ? 'ניגודיות גבוהה' : 'High Contrast',
    invertColors: language === 'he' ? 'הפוך צבעים' : 'Invert Colors',
    emphasizeLinks: language === 'he' ? 'הדגש קישורים' : 'Emphasize Links',
    largeCursor: language === 'he' ? 'סמן גדול' : 'Large Cursor',
    textSpacing: language === 'he' ? 'מרווח טקסט' : 'Text Spacing',
    reduceMotion: language === 'he' ? 'הפחת תנועה' : 'Reduce Motion',
    displayOptions: language === 'he' ? 'אפשרויות תצוגה' : 'Display Options',
    // Tooltips
    increaseFontSizeTooltip: language === 'he' ? 'הגדל את גודל הטקסט' : 'Increase font size',
    decreaseFontSizeTooltip: language === 'he' ? 'הקטן את גודל הטקסט' : 'Decrease font size',
    resetFontSizeTooltip:
      language === 'he' ? 'החזר את גודל הטקסט לברירת המחדל' : 'Reset font size to default',
    resetAllTooltip:
      language === 'he' ? 'איפוס כל הגדרות הנגישות' : 'Reset all accessibility settings',
    highContrastTooltip:
      language === 'he' ? 'הגדל את הניגודיות בין אלמנטים' : 'Enhance contrast between elements',
    invertColorsTooltip: language === 'he' ? 'הפוך את צבעי האתר' : 'Invert website colors',
    emphasizeLinksTooltip:
      language === 'he' ? 'הדגש קישורים וכפתורים' : 'Highlight links and buttons',
    largeCursorTooltip: language === 'he' ? 'הגדל את סמן העכבר' : 'Enlarge the mouse cursor',
    textSpacingTooltip:
      language === 'he'
        ? 'הגדל את הרווח בין מילים ושורות'
        : 'Increase spacing between words and lines',
    reduceMotionTooltip:
      language === 'he' ? 'הפחת אנימציות ותנועות' : 'Reduce animations and movements',
  };

  // Animation variants
  const menuVariants = {
    hidden: {
      x: 400,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    exit: {
      x: 400,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <>
      {/* Accessibility Menu Button */}
      <motion.button
        ref={buttonRef}
        className="accessibility-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={translations.accessibilityMenu}
        aria-expanded={isOpen}
        aria-controls="accessibility-menu"
        style={{
          ...position,
          color: 'var(--gray-2)',
          backgroundColor: 'var(--accent-10)',
          position: 'fixed', // Ensure it stays fixed regardless of other settings
          transition: 'background-color 0.4s ease',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Accessibility size={24} />
      </motion.button>

      {/* Accessibility Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="accessibility-menu"
            ref={menuRef}
            className="accessibility-menu"
            style={{
              bottom: `calc(${String(position.bottom)} + 60px)`,
              right: 0,
              position: 'fixed', // Ensure it stays fixed regardless of other settings
            }}
            role="accessibility-menu"
            aria-labelledby="accessibility-menu-heading"
            dir={language === 'he' ? 'rtl' : 'ltr'}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="accessibility-header">
              <h2 id="accessibility-menu-heading" className="accessibility-heading">
                <Accessibility size={20} />
                {translations.accessibilityMenu}
              </h2>
              <Tooltip content={translations.resetAllTooltip}>
                <button
                  onClick={resetAllSettings}
                  className="reset-all-button"
                  aria-label={translations.resetAll}
                >
                  <RefreshCw size={16} />
                </button>
              </Tooltip>
            </div>

            {/* Font Size Section */}
            <div className="accessibility-section">
              <h3 className="accessibility-heading">
                <Eye size={18} />
                {translations.fontSize}
              </h3>
              <div className="font-size-controls">
                <Tooltip content={translations.decreaseFontSizeTooltip}>
                  <button
                    className="font-size-button"
                    onClick={decreaseFontSize}
                    aria-label={translations.decrease}
                  >
                    <ZoomOut size={16} />
                  </button>
                </Tooltip>
                <div className="font-size-value">{fontSizePercentage}%</div>
                <Tooltip content={translations.increaseFontSizeTooltip}>
                  <button
                    className="font-size-button"
                    onClick={increaseFontSize}
                    aria-label={translations.increase}
                  >
                    <ZoomIn size={16} />
                  </button>
                </Tooltip>
                <Tooltip content={translations.resetFontSizeTooltip}>
                  <button
                    className="font-size-button"
                    onClick={() => {
                      accessibilityUtils.resetFontSize();
                      setFontSizePercentage(accessibilityUtils.getCurrentFontSize());
                    }}
                    aria-label={translations.reset}
                    style={{ marginLeft: 'auto' }}
                  >
                    <RotateCcw size={16} />
                  </button>
                </Tooltip>
              </div>
            </div>

            {/* Display Options Section */}
            <div className="accessibility-section">
              <h3 className="accessibility-heading">
                <Activity size={18} />
                {translations.displayOptions}
              </h3>

              {/* High Contrast */}
              <Tooltip content={translations.highContrastTooltip}>
                <div className="accessibility-option" onClick={() => toggleSetting('highContrast')}>
                  <div className="accessibility-option-info">
                    <Eye size={18} />
                    <Text size="2">{translations.highContrast}</Text>
                  </div>
                  <Switch checked={settings.highContrast} aria-label={translations.highContrast} />
                </div>
              </Tooltip>

              {/* Invert Colors */}
              <Tooltip content={translations.invertColorsTooltip}>
                <div className="accessibility-option" onClick={() => toggleSetting('invertColors')}>
                  <div className="accessibility-option-info">
                    <Eye size={18} />
                    <Text size="2">{translations.invertColors}</Text>
                  </div>
                  <Switch checked={settings.invertColors} aria-label={translations.invertColors} />
                </div>
              </Tooltip>

              {/* Emphasize Links */}
              <Tooltip content={translations.emphasizeLinksTooltip}>
                <div
                  className="accessibility-option"
                  onClick={() => toggleSetting('emphasizeLinks')}
                >
                  <div className="accessibility-option-info">
                    <LinkIcon size={18} />
                    <Text size="2">{translations.emphasizeLinks}</Text>
                  </div>
                  <Switch
                    checked={settings.emphasizeLinks}
                    aria-label={translations.emphasizeLinks}
                  />
                </div>
              </Tooltip>

              {/* Large Cursor */}
              <Tooltip content={translations.largeCursorTooltip}>
                <div className="accessibility-option" onClick={() => toggleSetting('largeCursor')}>
                  <div className="accessibility-option-info">
                    <MousePointer2 size={18} />
                    <Text size="2">{translations.largeCursor}</Text>
                  </div>
                  <Switch checked={settings.largeCursor} aria-label={translations.largeCursor} />
                </div>
              </Tooltip>

              {/* Text Spacing */}
              <Tooltip content={translations.textSpacingTooltip}>
                <div className="accessibility-option" onClick={() => toggleSetting('textSpacing')}>
                  <div className="accessibility-option-info">
                    <AlignJustify size={18} />
                    <Text size="2">{translations.textSpacing}</Text>
                  </div>
                  <Switch checked={settings.textSpacing} aria-label={translations.textSpacing} />
                </div>
              </Tooltip>

              {/* Reduce Motion */}
              <Tooltip content={translations.reduceMotionTooltip}>
                <div className="accessibility-option" onClick={() => toggleSetting('reduceMotion')}>
                  <div className="accessibility-option-info">
                    <Activity size={18} />
                    <Text size="2">{translations.reduceMotion}</Text>
                  </div>
                  <Switch checked={settings.reduceMotion} aria-label={translations.reduceMotion} />
                </div>
              </Tooltip>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
