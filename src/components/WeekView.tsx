import { useEffect, useState } from 'react';
import { format, addWeeks, subWeeks } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useWeekPlanStore } from '../store/weekPlanStore';
import { db } from '../db';
import type { Meal } from '../types';
import { MealSelectorModal } from './MealSelectorModal';
import { RecipeModal } from './RecipeModal';
import styles from './WeekView.module.css';

export function WeekView() {
  const { t } = useTranslation();
  const { currentWeek, weeklyPlan, loading, setCurrentWeek, loadWeekPlan, removeMealFromDay, addMealToDay } = useWeekPlanStore();
  
  // Helper to get translated day names
  const getDayName = (index: number) => {
    const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    return t(`days.${dayKeys[index]}`);
  };

  const [mealsCache, setMealsCache] = useState<Map<number, Meal>>(new Map());
  const [modalState, setModalState] = useState<{ isOpen: boolean; dayIndex: number | null; dayName: string }>({
    isOpen: false,
    dayIndex: null,
    dayName: '',
  });
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

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
    if (confirm(t('common.delete') + '?')) {
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
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.weekView}>
      {/* Header with week navigation */}
      <div className={styles.header}>
        <div className={styles.weekInfo}>
          <h1 className={styles.title}>{t('weekView.title')}</h1>
          <p className={styles.dateRange}>
            {format(currentWeek, 'MMM d')} - {format(addWeeks(currentWeek, 1), 'MMM d, yyyy')}
          </p>
        </div>

        <div className={styles.headerControls}>
          <div className={styles.navigation}>
            <button onClick={goToPreviousWeek} className={styles.navButton} title={t('weekView.previous')} aria-label={t('weekView.previous')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button onClick={goToCurrentWeek} className={styles.navButton} title={t('weekView.current')} aria-label={t('weekView.current')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </button>
            <button onClick={goToNextWeek} className={styles.navButton} title={t('weekView.next')} aria-label={t('weekView.next')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Week Grid */}
      <div className={`${styles.weekGrid}`}>
        {Array.from({ length: 7 }).map((_, dayIndex) => {
          const dayName = getDayName(dayIndex);
          const dayPlan = weeklyPlan?.days[dayIndex];
          const dayDate = weeklyPlan ? format(dayPlan!.date, 'MMM d') : '';

          return (
            <div key={dayIndex} className={styles.dayColumn}>
              <div className={styles.dayHeader}>
                <h3 className={styles.dayName}>{dayName}</h3>
                <span className={styles.dayDate}>{dayDate}</span>
              </div>

              <div className={styles.mealsContainer}>
                {dayPlan?.meals.length === 0 ? (
                  <div className={styles.emptyDay}>
                    {t('weekView.noMealsPlanned')}
                  </div>
                ) : (
                  dayPlan?.meals.map((scheduledMeal, mealIndex) => {
                    const meal = mealsCache.get(scheduledMeal.mealId);
                    if (!meal) return null;

                    return (
                      <div key={mealIndex} className={styles.mealCard} onClick={() => setSelectedMeal(meal)}>
                        <img 
                          src={meal.image.content} 
                          alt={meal.name}
                          className={styles.mealImage}
                        />
                        <div className={styles.mealInfo}>
                          <h4 className={styles.mealName}>{meal.name}</h4>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveMeal(dayIndex, mealIndex);
                          }}
                          className={styles.removeButton}
                          title={t('common.delete')}
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
                + {t('common.add')}
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

      {/* Recipe View Modal */}
      <RecipeModal
        meal={selectedMeal}
        isOpen={selectedMeal !== null}
        onClose={() => setSelectedMeal(null)}
      />
    </div>
  );
}
