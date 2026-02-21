import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../db';
import type { Meal, MealType } from '../types';
import { useAuthStore } from '../store/authStore';
import styles from './MealSelectorModal.module.css';
import { ImageWithFallback } from './ImageWithFallback';

interface MealSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMeal: (mealId: number) => void;
  dayName: string;
}

export function MealSelectorModal({ isOpen, onClose, onSelectMeal, dayName }: MealSelectorModalProps) {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [filter, setFilter] = useState<MealType | 'all'>('all');
  const [loading, setLoading] = useState(true);

  const loadMeals = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const activeHouseholdId = user.currentHouseholdId;
      let results: Meal[];
      
      if (filter === 'all') {
        const allMeals = await db.meals.toArray();
        results = allMeals.filter(m => m.householdId === activeHouseholdId || m.householdId === 'local');
      } else {
        const filteredMeals = await db.meals.where('mealType').equals(filter).toArray();
        results = filteredMeals.filter(m => m.householdId === activeHouseholdId || m.householdId === 'local');
      }
      
      setMeals(results);
    } catch (error) {
      console.error('Failed to load meals:', error);
    } finally {
      setLoading(false);
    }
  }, [user, filter]);

  useEffect(() => {
    if (isOpen) {
      loadMeals();
    }
  }, [isOpen, loadMeals]);

  const handleSelectMeal = (mealId: number) => {
    onSelectMeal(mealId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t('mealSelector.addMealTo')} {dayName}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          {[
            { value: 'all', label: t('catalog.filters.all', 'All') },
            { value: 'breakfast', label: t('catalog.filters.breakfast', 'Breakfast') },
            { value: 'lunch', label: t('catalog.filters.lunch', 'Lunch') },
            { value: 'dinner', label: t('catalog.filters.dinner', 'Dinner') },
            { value: 'snack', label: t('catalog.filters.snack', 'Snacks') },
          ].map(option => (
            <button
              key={option.value}
              className={`${styles.filterButton} ${filter === option.value ? styles.active : ''}`}
              onClick={() => setFilter(option.value as MealType | 'all')}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Meal Grid */}
        <div className={styles.mealGrid}>
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : meals.length === 0 ? (
            <div className={styles.empty}>{t('catalog.noMealsFound', 'No meals found')}</div>
          ) : (
            meals.map(meal => (
              <div
                key={meal.id}
                className={styles.mealCard}
                onClick={() => handleSelectMeal(meal.id!)}
              >
                <ImageWithFallback 
                  src={meal.image.content} 
                  alt={meal.name}
                  className={styles.mealImage}
                />
                <div className={styles.mealInfo}>
                  <h3 className={styles.mealName}>{meal.name}</h3>
                  <p className={styles.mealType}>{t(`catalog.filters.${meal.mealType}`, meal.mealType)}</p>
                  <div className={styles.mealNutrition}>
                    {meal.nutrition.calories} {t('common.caloriesAbbr', 'cal')} • {meal.nutrition.protein}{t('units.g', 'g')} {t('common.protein')}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
