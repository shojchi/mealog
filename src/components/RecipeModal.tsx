import type { Meal } from '../types';
import styles from './RecipeModal.module.css';

interface RecipeModalProps {
  meal: Meal | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RecipeModal({ meal, isOpen, onClose }: RecipeModalProps) {
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
            <h3>📝 Instructions</h3>
            {meal.recipe.type === 'url' ? (
              <div className={styles.recipeUrl}>
                <p>View full recipe at:</p>
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
            <h3>🥗 Ingredients</h3>
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
            <h3>📊 Nutrition Facts</h3>
            <div className={styles.nutritionGrid}>
              <div className={styles.nutritionItem}>
                <span className={styles.nutritionLabel}>Calories</span>
                <span className={styles.nutritionValue}>{meal.nutrition.calories}</span>
              </div>
              <div className={styles.nutritionItem}>
                <span className={styles.nutritionLabel}>Protein</span>
                <span className={styles.nutritionValue}>{meal.nutrition.protein}g</span>
              </div>
              <div className={styles.nutritionItem}>
                <span className={styles.nutritionLabel}>Carbs</span>
                <span className={styles.nutritionValue}>{meal.nutrition.carbs}g</span>
              </div>
              <div className={styles.nutritionItem}>
                <span className={styles.nutritionLabel}>Fat</span>
                <span className={styles.nutritionValue}>{meal.nutrition.fat}g</span>
              </div>
            </div>
          </section>

          {/* Meal Info */}
          <section className={styles.section}>
            <h3>ℹ️ Details</h3>
            <div className={styles.details}>
              <div className={styles.detailItem}>
                <strong>Type:</strong> {meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1)}
              </div>
              <div className={styles.detailItem}>
                <strong>Servings:</strong> {meal.servings}
              </div>
              {meal.totalPrice && (
                <div className={styles.detailItem}>
                  <strong>Cost:</strong> ${meal.totalPrice.toFixed(2)}
                </div>
              )}
              {meal.labels.length > 0 && (
                <div className={styles.detailItem}>
                  <strong>Labels:</strong>
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
