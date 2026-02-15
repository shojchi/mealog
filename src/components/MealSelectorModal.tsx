import { useEffect, useState } from 'react';
import { db } from '../db';
import type { Meal, MealType } from '../types';
import styles from './MealSelectorModal.module.css';

interface MealSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMeal: (mealId: number) => void;
  dayName: string;
}

export function MealSelectorModal({ isOpen, onClose, onSelectMeal, dayName }: MealSelectorModalProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [filter, setFilter] = useState<MealType | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadMeals();
    }
  }, [isOpen, filter]);

  async function loadMeals() {
    setLoading(true);
    try {
      let results: Meal[];
      
      if (filter === 'all') {
        results = await db.meals.toArray();
      } else {
        results = await db.meals.where('mealType').equals(filter).toArray();
      }
      
      setMeals(results);
    } catch (error) {
      console.error('Failed to load meals:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSelectMeal = (mealId: number) => {
    onSelectMeal(mealId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add Meal to {dayName}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          {[
            { value: 'all', label: 'All' },
            { value: 'breakfast', label: 'Breakfast' },
            { value: 'lunch', label: 'Lunch' },
            { value: 'dinner', label: 'Dinner' },
            { value: 'snack', label: 'Snacks' },
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
            <div className={styles.empty}>No meals found</div>
          ) : (
            meals.map(meal => (
              <div
                key={meal.id}
                className={styles.mealCard}
                onClick={() => handleSelectMeal(meal.id!)}
              >
                <img 
                  src={meal.image.content} 
                  alt={meal.name}
                  className={styles.mealImage}
                />
                <div className={styles.mealInfo}>
                  <h3 className={styles.mealName}>{meal.name}</h3>
                  <p className={styles.mealType}>{meal.mealType}</p>
                  <div className={styles.mealNutrition}>
                    {meal.nutrition.calories} cal • {meal.nutrition.protein}g protein
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
