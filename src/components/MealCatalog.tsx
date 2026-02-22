import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../db';
import type { Meal } from '../types';
import { MealCard } from './MealCard';
import { MealFormModal } from './MealFormModal';
import { RecipeModal } from './RecipeModal';
import { useAuthStore } from '../store/authStore';
import styles from './MealCatalog.module.css';

export function MealCatalog() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const loadMeals = useCallback(async () => {
    if (!user) {
      setMeals([]); // Clear meals if no user
      setLoading(false);
      return;
    }
    setLoading(true);

    try {
      const activeHouseholdId = user.currentHouseholdId;
      let results: Meal[];
      
      if (filter === 'all') {
        const allMeals = await db.meals.toArray();
        results = allMeals.filter(m => m.householdId === activeHouseholdId || m.householdId === 'local');
      } else {
        const filteredMeals = await db.meals
          .where('mealType')
          .equals(filter)
          .toArray();
        results = filteredMeals.filter(m => m.householdId === activeHouseholdId || m.householdId === 'local');
      }
      
      setMeals(results);
    } catch (error) {
      console.error('Failed to load meals:', error);
    } finally {
      setLoading(false);
    }
  }, [filter, user]);

  useEffect(() => {
    loadMeals();
  }, [filter, user, loadMeals]);

  const handleEdit = (meal: Meal) => {
    setEditingMeal(meal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMeal(null);
  };

  const handleDelete = async (meal: Meal) => {
    if (window.confirm(t('common.delete') + '?')) {
      try {
        if (meal.id) {
          // Delete locally
          await db.meals.delete(meal.id);
          
          // Delete from Firestore in background if possible
          try {
            const { doc, deleteDoc } = await import('firebase/firestore');
            const { db: firestoreDb } = await import('../services/db');
            await deleteDoc(doc(firestoreDb, 'meals', meal.id.toString()));
          } catch (e) {
            console.error('Firestore delete failed (offline or uninitialized):', e);
          }
          
          await loadMeals();
        }
      } catch (error) {
        console.error('Failed to delete meal:', error);
      }
    }
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
              onDelete={() => handleDelete(meal)}
            />
          ))}
        </div>
      )}

      {/* Create/Edit Meal Modal */}
      {isModalOpen && (
        <MealFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={() => loadMeals()}
          editMeal={editingMeal}
        />
      )}

      {/* Recipe View Modal */}
      {selectedMeal !== null && (
        <RecipeModal
          meal={selectedMeal}
          isOpen={selectedMeal !== null}
          onClose={() => setSelectedMeal(null)}
        />
      )}
    </div>
  );
}
