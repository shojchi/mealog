import { useEffect, useState } from 'react';
import { db } from '../db';
import type { Meal } from '../types';
import { MealCard } from './MealCard';
import { MealFormModal } from './MealFormModal';
import { RecipeModal } from './RecipeModal';
import styles from './MealCatalog.module.css';

export function MealCatalog() {
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
    { value: 'all', label: 'All Meals' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snacks' },
  ];

  return (
    <div className={styles.catalog}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Meal Catalog</h1>
          <p className={styles.subtitle}>
            {meals.length} meals available
          </p>
        </div>
        <button 
          className={styles.createButton}
          onClick={() => setIsModalOpen(true)}
        >
          ➕ Create New Meal
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
        <div className={styles.loading}>Loading meals...</div>
      ) : meals.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No meals found</p>
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
