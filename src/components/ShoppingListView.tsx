import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useShoppingListStore } from '../store/shoppingListStore';
import type { IngredientCategory, ShoppingListItem } from '../types';
import styles from './ShoppingListView.module.css';

const CATEGORY_ORDER: IngredientCategory[] = [
  'meat',
  'produce',
  'dairy',
  'grains',
  'spices',
  'other',
];

export function ShoppingListView() {
  const { t } = useTranslation();
  const { shoppingList, loading, generateFromWeekPlan, toggleItemChecked, clearCompleted, loadShoppingList } = useShoppingListStore();

  const CATEGORY_LABELS: Record<IngredientCategory, string> = {
    meat: t('shoppingList.categories.meat', 'Proteins'),
    produce: t('shoppingList.categories.produce', 'Vegetables & Fruits'),
    dairy: t('shoppingList.categories.dairy', 'Dairy'),
    grains: t('shoppingList.categories.grains', 'Grains & Carbs'),
    spices: t('shoppingList.categories.spices', 'Spices & Seasonings'),
    other: t('shoppingList.categories.other', 'Other'),
  };

  useEffect(() => {
    loadShoppingList();
  }, [loadShoppingList]);

  const handleGenerate = async () => {
    await generateFromWeekPlan();
  };

  const handleToggle = async (itemId: string) => {
    await toggleItemChecked(itemId);
  };

  const handleClearCompleted = async () => {
    await clearCompleted();
  };

  // Group items by category
  const itemsByCategory = CATEGORY_ORDER.reduce((acc, category) => {
    const items = shoppingList?.items.filter(item => item.category === category) || [];
    if (items.length > 0) {
      acc[category] = items;
    }
    return acc;
  }, {} as Record<IngredientCategory, ShoppingListItem[]>);

  const totalItems = shoppingList?.items.length || 0;
  const completedItems = shoppingList?.items.filter(item => item.purchased).length || 0;

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.shoppingListView}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{t('shoppingList.title')}</h1>
          {shoppingList && (
            <p className={styles.stats}>
              {completedItems} of {totalItems} items checked
            </p>
          )}
        </div>

        <div className={styles.actions}>
          <button 
            onClick={handleGenerate} 
            className={styles.generateButton}
            disabled={loading}
          >
            {shoppingList ? '↻ ' + t('shoppingList.regenerate', 'Regenerate') : '+ ' + t('shoppingList.generateFromWeekPlan')}
          </button>
          
          {shoppingList && completedItems > 0 && (
            <button 
              onClick={handleClearCompleted}
              className={styles.clearButton}
            >
              {t('shoppingList.clearCompleted', 'Clear Completed')}
            </button>
          )}
        </div>
      </div>

      {/* Shopping List Content */}
      {!shoppingList ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🛒</div>
          <h2>{t('shoppingList.noListYet')}</h2>
          <p>{t('shoppingList.emptyDescription')}</p>
          <button onClick={handleGenerate} className={styles.emptyButton}>
            {t('shoppingList.generateFromWeekPlan')}
          </button>
        </div>
      ) : (
        <div className={styles.listContainer}>
          {Object.entries(itemsByCategory).map(([category, items]) => (
            <div key={category} className={styles.categorySection}>
              <h3 className={styles.categoryTitle}>
                {CATEGORY_LABELS[category as IngredientCategory]}
              </h3>
              
              <div className={styles.itemsList}>
                {items.map(item => (
                  <label key={item.id} className={styles.itemRow}>
                    <input
                      type="checkbox"
                      checked={item.purchased}
                      onChange={() => handleToggle(item.id)}
                      className={styles.checkbox}
                    />
                    <span className={`${styles.itemName} ${item.purchased ? styles.checked : ''}`}>
                      {item.ingredientName}
                    </span>
                    <span className={`${styles.itemQuantity} ${item.purchased ? styles.checked : ''}`}>
                      {item.totalQuantity === Math.floor(item.totalQuantity) 
                        ? item.totalQuantity 
                        : item.totalQuantity.toFixed(1)
                      }{' '}
                      {item.unit}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {totalItems > 0 && totalItems === completedItems && (
            <div className={styles.allComplete}>
              <div className={styles.completeIcon}>✓</div>
              <p>{t('shoppingList.allChecked', "All items checked! You're ready to shop.")}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
