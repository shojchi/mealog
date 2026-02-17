import { useTranslation } from 'react-i18next';
import type { Meal } from '../types';
import styles from './RecipeModal.module.css';

interface RecipeModalProps {
  meal: Meal | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RecipeModal({ meal, isOpen, onClose }: RecipeModalProps) {
  const { t } = useTranslation();

  if (!isOpen || !meal) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <h2>{meal.name}</h2>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Meal Image */}
          <div className={styles.imageContainer}>
            <img src={meal.image.content} alt={meal.name} className={styles.image} />
          </div>

          {/* Recipe Instructions */}
          <section className={styles.section}>
            <h3>📝 {t('recipe.instructions')}</h3>
            {meal.recipe.type === 'url' ? (
              <div className={styles.recipeUrl}>
                <p>{t('recipe.viewFull')}:</p>
                <a 
                  href={meal.recipe.content} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {meal.recipe.content}
                </a>
              </div>
            ) : (
              <div className={styles.recipeText}>
                {meal.recipe.content.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            )}
          </section>

          {/* Ingredients */}
          <section className={styles.section}>
            <h3>🥗 {t('mealForm.ingredients')}</h3>
            <ul className={styles.ingredientsList}>
              {meal.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <span className={styles.ingredientName}>{ingredient.name}</span>
                  <span className={styles.ingredientAmount}>
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Nutrition Facts */}
          <section className={styles.section}>
            <h3>📊 {t('mealForm.nutritionFacts')}</h3>
            <div className={styles.nutritionGrid}>
              <div className={styles.nutritionItem}>
                <span className={styles.nutritionLabel}>{t('common.calories')}</span>
                <span className={styles.nutritionValue}>{meal.nutrition.calories}</span>
              </div>
              <div className={styles.nutritionItem}>
                <span className={styles.nutritionLabel}>{t('common.protein')}</span>
                <span className={styles.nutritionValue}>{meal.nutrition.protein}g</span>
              </div>
              <div className={styles.nutritionItem}>
                <span className={styles.nutritionLabel}>{t('common.carbs')}</span>
                <span className={styles.nutritionValue}>{meal.nutrition.carbs}g</span>
              </div>
              <div className={styles.nutritionItem}>
                <span className={styles.nutritionLabel}>{t('common.fat')}</span>
                <span className={styles.nutritionValue}>{meal.nutrition.fat}g</span>
              </div>
            </div>
          </section>

          {/* Meal Info */}
          <section className={styles.section}>
            <h3>ℹ️ {t('recipe.details')}</h3>
            <div className={styles.details}>
              <div className={styles.detailItem}>
                <strong>{t('recipe.type')}:</strong> {t(`catalog.filters.${meal.mealType}`, meal.mealType)}
              </div>
              <div className={styles.detailItem}>
                <strong>{t('mealForm.servings')}:</strong> {meal.servings}
              </div>
              {meal.totalPrice && (
                <div className={styles.detailItem}>
                  <strong>{t('recipe.cost')}:</strong> ${meal.totalPrice.toFixed(2)}
                </div>
              )}
              {meal.labels.length > 0 && (
                <div className={styles.detailItem}>
                  <strong>{t('mealForm.labels.title')}:</strong>
                  <div className={styles.labels}>
                    {meal.labels.map((label) => (
                      <span key={label} className={styles.label}>
                        {label.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
