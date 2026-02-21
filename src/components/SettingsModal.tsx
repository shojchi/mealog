import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../store/themeStore';
import type { Theme } from '../store/themeStore';
import { HouseholdSettings } from './Settings/HouseholdSettings';
import styles from './SettingsModal.module.css';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Language = 'en' | 'ua' | 'pl';

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<Language>(() => {
    return (i18n.language as Language) || (localStorage.getItem('language') as Language) || 'en';
  });
  const { theme, setTheme } = useThemeStore();

  if (!isOpen) return null;

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    i18n.changeLanguage(newLang);
  };

  const languageNames = {
    en: 'English',
    ua: 'Українська',
    pl: 'Polski',
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <h2>⚙️ {t('settings.title')}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Language Section */}
          <section className={styles.section}>
            <h3>🌐 {t('settings.language')}</h3>
            <select 
              value={language} 
              onChange={(e) => handleLanguageChange(e.target.value as Language)}
              className={styles.select}
            >
              {Object.entries(languageNames).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </section>

          {/* Appearance Section */}
          <section className={styles.section}>
            <h3>🎨 {t('settings.appearance')}</h3>
            <select 
              value={theme} 
              onChange={(e) => setTheme(e.target.value as Theme)}
              className={styles.select}
            >
              <option value="system">{t('settings.themeSystem', 'System Preference')}</option>
              <option value="light">{t('settings.themeLight', 'Light')}</option>
              <option value="dark">{t('settings.themeDark', 'Dark')}</option>
            </select>
          </section>

          {/* Household Sync Section */}
          <section className={styles.section}>
            <HouseholdSettings />
          </section>

          {/* Placeholder: Notifications */}
          <section className={`${styles.section} ${styles.disabled}`}>
            <h3>🔔 {t('settings.notifications')}</h3>
            <p className={styles.comingSoon}>{t('settings.comingSoon')}</p>
          </section>

          {/* Placeholder: Data Management */}
          <section className={`${styles.section} ${styles.disabled}`}>
            <h3>💾 {t('settings.dataManagement')}</h3>
            <p className={styles.comingSoon}>{t('settings.comingSoon')}</p>
          </section>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.closeFooterButton} onClick={onClose}>
            {t('settings.close')}
          </button>
        </div>
      </div>
    </div>
  );
}
