import { useTranslation } from 'react-i18next';
import type { Meal } from '../types';
import styles from './MealCard.module.css';
import { ImageWithFallback } from './ImageWithFallback';

interface MealCardProps {
  meal: Meal;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function MealCard({ meal, onClick, onEdit, onDelete }: MealCardProps) {
  const { t } = useTranslation();

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onEdit?.();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onDelete?.();
  };

  return (
    <div className={styles.card} onClick={onClick}>
      {/* Meal Image */}
      <div className={styles.imageContainer}>
        <ImageWithFallback 
          src={meal.image.content} 
          alt={meal.name}
          className={styles.image}
        />
        {onEdit && (
          <button 
            className={styles.editButton}
            onClick={handleEditClick}
            aria-label={t('common.edit')}
          >
            ✏️ {t('common.edit')}
          </button>
        )}
        {onDelete && (
          <button 
            className={styles.deleteButton}
            onClick={handleDeleteClick}
            aria-label={t('common.delete')}
          >
            🗑️ {t('common.delete')}
          </button>
        )}
      </div>
      
      {/* Meal Info */}
      <div className={styles.content}>
        <h3 className={styles.title}>{meal.name}</h3>
        <p className={styles.description}>{meal.description}</p>
        
        {/* Labels */}
        <div className={styles.labels}>
          {meal.labels.slice(0, 3).map((label) => (
            <span key={label} className={styles.label}>
              {label}
            </span>
          ))}
        </div>
        
        {/* Nutrition Summary */}
        <div className={styles.nutrition}>
          <span className={styles.nutritionItem}>
            <strong>{meal.nutrition.calories}</strong> {t('common.calories')}
          </span>
          <span className={styles.nutritionItem}>
            <strong>{meal.nutrition.protein}{t('units.g', 'g')}</strong> {t('common.protein')}
          </span>
          <span className={styles.nutritionItem}>
            <strong>{meal.nutrition.carbs}{t('units.g', 'g')}</strong> {t('common.carbs', 'Carbs')}
          </span>
        </div>
        
      </div>
    </div>
  );
}
