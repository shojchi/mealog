import type { Meal } from '../types';
import styles from './MealCard.module.css';

interface MealCardProps {
  meal: Meal;
  onClick?: () => void;
  onEdit?: () => void;
}

export function MealCard({ meal, onClick, onEdit }: MealCardProps) {
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onEdit?.();
  };

  return (
    <div className={styles.card} onClick={onClick}>
      {/* Meal Image */}
      <div className={styles.imageContainer}>
        <img 
          src={meal.image.content} 
          alt={meal.name}
          className={styles.image}
        />
        {onEdit && (
          <button 
            className={styles.editButton}
            onClick={handleEditClick}
            aria-label="Edit meal"
          >
            ✏️ Edit
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
            <strong>{meal.nutrition.calories}</strong> cal
          </span>
          <span className={styles.nutritionItem}>
            <strong>{meal.nutrition.protein}g</strong> protein
          </span>
          <span className={styles.nutritionItem}>
            <strong>{meal.nutrition.carbs}g</strong> carbs
          </span>
        </div>
        
        {/* Price */}
        {meal.totalPrice && (
          <div className={styles.price}>
            ${meal.totalPrice.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
}
