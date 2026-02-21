import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNutritionStore } from '../store/nutritionStore';
import styles from './NutritionGoalsModal.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function NutritionGoalsModal({ isOpen, onClose }: Props) {
  const { t } = useTranslation();
  const { goals, setGoals } = useNutritionStore();
  
  // Local state for the form inputs
  const [formData, setFormData] = useState(goals);

  // Sync form data with store whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(goals);
    }
  }, [isOpen, goals]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGoals(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Allow empty string to easily delete numbers (fallback to 0 later if needed)
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? '' : Number(value)
    }));
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{t('dayView.nutritionGoals', "Nutrition Goals")}</h2>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="calories">{t('common.calories', "Calories")}</label>
            <input
              type="number"
              id="calories"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              min="0"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="protein">{t('common.protein', "Protein")} ({t('units.g', 'g')})</label>
            <input
              type="number"
              id="protein"
              name="protein"
              value={formData.protein}
              onChange={handleChange}
              min="0"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="carbs">{t('common.carbs', "Carbs")} ({t('units.g', 'g')})</label>
            <input
              type="number"
              id="carbs"
              name="carbs"
              value={formData.carbs}
              onChange={handleChange}
              min="0"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="fat">{t('common.fat', "Fat")} ({t('units.g', 'g')})</label>
            <input
              type="number"
              id="fat"
              name="fat"
              value={formData.fat}
              onChange={handleChange}
              min="0"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              {t('common.cancel')}
            </button>
            <button type="submit" className={styles.saveButton}>
              {t('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
