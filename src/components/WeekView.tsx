import { useEffect, useState } from 'react';
import { format, addWeeks, subWeeks } from 'date-fns';
import { useWeekPlanStore } from '../store/weekPlanStore';
import { db } from '../db';
import type { Meal } from '../types';
import { MealSelectorModal } from './MealSelectorModal';
import styles from './WeekView.module.css';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function WeekView() {
  const { currentWeek, weeklyPlan, loading, setCurrentWeek, loadWeekPlan, removeMealFromDay, addMealToDay } = useWeekPlanStore();
  const [mealsCache, setMealsCache] = useState<Map<number, Meal>>(new Map());
  const [modalState, setModalState] = useState<{ isOpen: boolean; dayIndex: number | null; dayName: string }>({
    isOpen: false,
    dayIndex: null,
    dayName: '',
  });

  useEffect(() => {
    loadWeekPlan();
  }, [loadWeekPlan]);

  // Load meal details for display
  useEffect(() => {
    if (!weeklyPlan) return;

    const loadMealDetails = async () => {
      const mealIds = weeklyPlan.days
        .flatMap(day => day.meals.map(m => m.mealId))
        .filter(id => !mealsCache.has(id));

      if (mealIds.length === 0) return;

      const meals = await db.meals.bulkGet(mealIds);
      const newCache = new Map(mealsCache);
      
      meals.forEach(meal => {
        if (meal) newCache.set(meal.id!, meal);
      });
      
      setMealsCache(newCache);
    };

    loadMealDetails();
  }, [weeklyPlan, mealsCache]);

  const goToPreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const goToNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const goToCurrentWeek = () => {
    setCurrentWeek(new Date());
  };

  const handleRemoveMeal = (dayIndex: number, mealIndex: number) => {
    if (confirm('Remove this meal from your plan?')) {
      removeMealFromDay(dayIndex, mealIndex);
    }
  };

  const handleOpenModal = (dayIndex: number, dayName: string) => {
    setModalState({ isOpen: true, dayIndex, dayName });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, dayIndex: null, dayName: '' });
  };

  const handleSelectMeal = async (mealId: number) => {
    if (modalState.dayIndex !== null) {
      await addMealToDay(modalState.dayIndex, mealId);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading week plan...</div>;
  }

  return (
    <div className={styles.weekView}>
      {/* Header with week navigation */}
      <div className={styles.header}>
        <div className={styles.weekInfo}>
          <h1 className={styles.title}>Week Plan</h1>
          <p className={styles.dateRange}>
            {format(currentWeek, 'MMM d')} - {format(addWeeks(currentWeek, 1), 'MMM d, yyyy')}
          </p>
        </div>

        <div className={styles.headerControls}>
          <div className={styles.navigation}>
            <button onClick={goToPreviousWeek} className={styles.navButton}>
              ← Previous
            </button>
            <button onClick={goToCurrentWeek} className={styles.navButton}>
              Current
            </button>
            <button onClick={goToNextWeek} className={styles.navButton}>
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Week Grid */}
      <div className={`${styles.weekGrid}`}>
        {DAYS.map((dayName, dayIndex) => {
          const dayPlan = weeklyPlan?.days[dayIndex];
          const dayDate = weeklyPlan ? format(dayPlan!.date, 'MMM d') : '';

          return (
            <div key={dayName} className={styles.dayColumn}>
              <div className={styles.dayHeader}>
                <h3 className={styles.dayName}>{dayName}</h3>
                <span className={styles.dayDate}>{dayDate}</span>
              </div>

              <div className={styles.mealsContainer}>
                {dayPlan?.meals.length === 0 ? (
                  <div className={styles.emptyDay}>
                    No meals planned
                  </div>
                ) : (
                  dayPlan?.meals.map((scheduledMeal, mealIndex) => {
                    const meal = mealsCache.get(scheduledMeal.mealId);
                    if (!meal) return null;

                    return (
                      <div key={mealIndex} className={styles.mealCard}>
                        <img 
                          src={meal.image.content} 
                          alt={meal.name}
                          className={styles.mealImage}
                        />
                        <div className={styles.mealInfo}>
                          <h4 className={styles.mealName}>{meal.name}</h4>
                        </div>
                        <button
                          onClick={() => handleRemoveMeal(dayIndex, mealIndex)}
                          className={styles.removeButton}
                          title="Remove meal"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Add meal button */}
              <button 
                className={styles.addMealButton}
                onClick={() => handleOpenModal(dayIndex, dayName)}
              >
                + Add Meal
              </button>
            </div>
          );
        })}
      </div>

      {/* Meal Selector Modal */}
      <MealSelectorModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        onSelectMeal={handleSelectMeal}
        dayName={modalState.dayName}
      />
    </div>
  );
}
