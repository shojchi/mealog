import { useState, useEffect } from 'react';
import styles from './SettingsModal.module.css';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Language = 'en' | 'ua' | 'pl';

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'en';
  });

  useEffect(() => {
    if (isOpen) {
      // Load language from localStorage when modal opens
      const stored = localStorage.getItem('language') as Language;
      if (stored) {
        setLanguage(stored);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
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
          <h2>⚙️ Settings</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Language Section */}
          <section className={styles.section}>
            <h3>🌐 Language</h3>
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

          {/* Placeholder: Appearance */}
          <section className={`${styles.section} ${styles.disabled}`}>
            <h3>🎨 Appearance</h3>
            <p className={styles.comingSoon}>Coming soon...</p>
          </section>

          {/* Placeholder: User Profile */}
          <section className={`${styles.section} ${styles.disabled}`}>
            <h3>👤 User Profile</h3>
            <p className={styles.comingSoon}>Coming soon...</p>
          </section>

          {/* Placeholder: Notifications */}
          <section className={`${styles.section} ${styles.disabled}`}>
            <h3>🔔 Notifications</h3>
            <p className={styles.comingSoon}>Coming soon...</p>
          </section>

          {/* Placeholder: Data Management */}
          <section className={`${styles.section} ${styles.disabled}`}>
            <h3>💾 Data Management</h3>
            <p className={styles.comingSoon}>Coming soon...</p>
          </section>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.closeFooterButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
