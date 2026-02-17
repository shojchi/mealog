import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../db';
import type { Meal } from '../types';
import { MealCard } from './MealCard';
import { MealFormModal } from './MealFormModal';
import { RecipeModal } from './RecipeModal';
import styles from './MealCatalog.module.css';

export function MealCatalog() {
  const { t } = useTranslation();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  useEffect(() => {
    loadMeals();
  }, [filter]);

  async function loadMeals() {
    setLoading(true);
    try {
      let results: Meal[];
      
      if (filter === 'all') {
        results = await db.meals.toArray();
      } else {
        results = await db.meals
          .where('mealType')
          .equals(filter)
          .toArray();
      }
      
      setMeals(results);
    } catch (error) {
      console.error('Failed to load meals:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (meal: Meal) => {
    setEditingMeal(meal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMeal(null);
  };

  const handleViewRecipe = (meal: Meal) => {
    setSelectedMeal(meal);
  };

  const filterOptions = [
    { value: 'all', label: t('catalog.filters.all', 'All Meals') },
    { value: 'breakfast', label: t('catalog.filters.breakfast', 'Breakfast') },
    { value: 'lunch', label: t('catalog.filters.lunch', 'Lunch') },
    { value: 'dinner', label: t('catalog.filters.dinner', 'Dinner') },
    { value: 'snack', label: t('catalog.filters.snack', 'Snacks') },
  ];

  return (
    <div className={styles.catalog}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{t('catalog.title')}</h1>
          <p className={styles.subtitle}>
            {meals.length} {meals.length === 1 ? t('catalog.mealsAvailable') : t('catalog.mealsAvailable')}
          </p>
        </div>
        <button 
          className={styles.createButton}
          onClick={() => setIsModalOpen(true)}
        >
          ➕ {t('catalog.createNew')}
        </button>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        {filterOptions.map(option => (
          <button
            key={option.value}
            className={`${styles.filterButton} ${filter === option.value ? styles.active : ''}`}
            onClick={() => setFilter(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Meal Grid */}
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : meals.length === 0 ? (
        <div className={styles.emptyState}>
          <p>{t('catalog.noMealsFound')}</p>
        </div>
      ) : (
        <div className={styles.mealsGrid}>
          {meals.map(meal => (
            <MealCard 
              key={meal.id} 
              meal={meal}
              onClick={() => handleViewRecipe(meal)}
              onEdit={() => handleEdit(meal)}
            />
          ))}
        </div>
      )}

      {/* Create/Edit Meal Modal */}
      <MealFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={() => loadMeals()}
        editMeal={editingMeal}
      />

      {/* Recipe View Modal */}
      <RecipeModal
        meal={selectedMeal}
        isOpen={selectedMeal !== null}
        onClose={() => setSelectedMeal(null)}
      />
    </div>
  );
}
