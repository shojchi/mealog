import { useEffect, useState } from 'react';
import { addDays, subDays, startOfWeek } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useWeekPlanStore } from '../store/weekPlanStore';
import { useNutritionStore } from '../store/nutritionStore';
import { db } from '../db';
import type { Meal, DayPlan, Nutrition } from '../types';
import { MealSelectorModal } from './MealSelectorModal';
import { RecipeModal } from './RecipeModal';
import { NutritionGoalsModal } from './NutritionGoalsModal';
import styles from './DayView.module.css';
import { ImageWithFallback } from './ImageWithFallback';

export function DayView() {
  const { t } = useTranslation();
  const { weeklyPlan, loadWeekPlan, removeMealFromDay, addMealToDay } = useWeekPlanStore();
  const { goals } = useNutritionStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Helper to get translated day names
  const getDayName = (date: Date) => {
    const dayIndex = date.getDay(); // 0 = Sunday, 1 = Monday
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return t(`days.${days[dayIndex]}`);
  };

  // Helper to get translated month names
  const getFormattedDate = (date: Date) => {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const month = t(`months.short.${months[monthIndex]}`);
    return `${month} ${day}, ${date.getFullYear()}`;
  };

  const [dayPlan, setDayPlan] = useState<DayPlan | null>(null);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [dailyNutrition, setDailyNutrition] = useState<Nutrition>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [modalState, setModalState] = useState({ isOpen: false, dayName: '' });
  const [isNutritionModalOpen, setIsNutritionModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  // Load week plan on mount
  useEffect(() => {
    loadWeekPlan();
  }, [loadWeekPlan]);

  // Find current day's plan from weekly plan
  useEffect(() => {
    if (!weeklyPlan) return;

    const monday = startOfWeek(currentDate, { weekStartsOn: 1 });
    const dayIndex = Math.floor((currentDate.getTime() - monday.getTime()) / (1000 * 60 * 60 * 24));
    
    if (dayIndex >= 0 && dayIndex < 7) {
      setDayPlan(weeklyPlan.days[dayIndex]);
    } else {
      setDayPlan(null);
    }
  }, [weeklyPlan, currentDate]);

  // Load meal details and calculate nutrition
  useEffect(() => {
    // If no day plan, clear meals and nutrition
    if (!dayPlan) {
      setMeals([]);
      setDailyNutrition({ calories: 0, protein: 0, carbs: 0, fat: 0 });
      return;
    }

    const loadMeals = async () => {
      const mealIds = dayPlan.meals.map(m => m.mealId);
      const loadedMeals = await db.meals.bulkGet(mealIds);
      const validMeals = loadedMeals.filter((m): m is Meal => m !== undefined);
      
      setMeals(validMeals);

      // Calculate daily nutrition totals
      const totals = validMeals.reduce(
        (acc, meal) => ({
          calories: acc.calories + meal.nutrition.calories,
          protein: acc.protein + meal.nutrition.protein,
          carbs: acc.carbs + meal.nutrition.carbs,
          fat: acc.fat + meal.nutrition.fat,
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
      );
      
      setDailyNutrition(totals);
    };

    loadMeals();
  }, [dayPlan]);

  const goToPreviousDay = () => {
    setCurrentDate(subDays(currentDate, 1));
  };

  const goToNextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleRemoveMeal = (mealIndex: number) => {
    if (!dayPlan || !weeklyPlan) return;
    
    const monday = startOfWeek(currentDate, { weekStartsOn: 1 });
    const dayIndex = Math.floor((currentDate.getTime() - monday.getTime()) / (1000 * 60 * 60 * 24));
    
    if (confirm(t('common.delete') + '?')) {
      removeMealFromDay(dayIndex, mealIndex);
    }
  };

  const handleOpenModal = () => {
    setModalState({ isOpen: true, dayName: getDayName(currentDate) });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, dayName: '' });
  };

  const handleSelectMeal = async (mealId: number) => {
    if (!weeklyPlan) return;
    
    const monday = startOfWeek(currentDate, { weekStartsOn: 1 });
    const dayIndex = Math.floor((currentDate.getTime() - monday.getTime()) / (1000 * 60 * 60 * 24));
    
    // Check if within current week
    if (dayIndex >= 0 && dayIndex < 7) {
      await addMealToDay(dayIndex, mealId);
    } else {
      alert("Please navigate to the current week to add meals.");
    }
  };

  const getPercentage = (value: number, goal: number) => {
    if (goal === 0) return 0;
    return Math.min((value / goal) * 100, 100);
  };

  return (
    <div className={styles.dayView}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.dateInfo}>
          <h1 className={styles.dayName}>{getDayName(currentDate)}</h1>
          <p className={styles.date}>{getFormattedDate(currentDate)}</p>
        </div>

        <div className={styles.navigation}>
          <button onClick={goToPreviousDay} className={styles.navButton} title={t('weekView.previous')} aria-label={t('weekView.previous')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button onClick={goToToday} className={styles.navButton} title={t('dayView.today')} aria-label={t('dayView.today')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </button>
          <button onClick={goToNextDay} className={styles.navButton} title={t('weekView.next')} aria-label={t('weekView.next')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {/* Meals List */}
        <div className={styles.mealsSection}>
          <h2 className={styles.sectionTitle}>{t('nav.meals')}</h2>
          
          {meals.length === 0 ? (
            <div className={styles.emptyState}>
              <p>{t('weekView.noMealsPlanned')}</p>
              <button onClick={handleOpenModal} className={styles.addButton}>
                + {t('dayView.addFirstMeal')}
              </button>
            </div>
          ) : (
            <div className={styles.mealsList}>
              {meals.map((meal, index) => (
                <div key={index} className={styles.mealCard} onClick={() => setSelectedMeal(meal)}>
                  <ImageWithFallback 
                    src={meal.image.content} 
                    alt={meal.name}
                    className={styles.mealImage}
                  />
                  
                  <div className={styles.mealDetails}>
                    <div className={styles.mealHeader}>
                      <h3 className={styles.mealName}>{meal.name}</h3>
                      <span className={styles.mealType}>{t(`catalog.filters.${meal.mealType}`, meal.mealType)}</span>
                    </div>
                    
                    <p className={styles.mealDescription}>{meal.description}</p>
                    
                    <div className={styles.mealNutrition}>
                      <div className={styles.nutrientBadge}>
                        <strong>{meal.nutrition.calories}</strong> {t('common.calories')}
                      </div>
                      <div className={styles.nutrientBadge}>
                        <strong>{meal.nutrition.protein}{t('units.g', 'g')}</strong> {t('common.protein')}
                      </div>
                      <div className={styles.nutrientBadge}>
                        <strong>{meal.nutrition.carbs}{t('units.g', 'g')}</strong> {t('common.carbs')}
                      </div>
                      <div className={styles.nutrientBadge}>
                        <strong>{meal.nutrition.fat}{t('units.g', 'g')}</strong> {t('common.fat')}
                      </div>
                    </div>


                    <div className={styles.labels}>
                      {meal.labels.slice(0, 4).map(label => (
                        <span key={label} className={styles.label}>{label.replace('-', ' ')}</span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveMeal(index);
                    }}
                    className={styles.removeButton}
                    title={t('common.remove')}
                  >
                    ×
                  </button>
                </div>
              ))}

              <button onClick={handleOpenModal} className={styles.addAnotherButton}>
                + {t('dayView.addAnotherMeal', 'Add Another Meal')}
              </button>
            </div>
          )}
        </div>

        {/* Nutrition Sidebar */}
        <div className={styles.nutritionSidebar}>
          <div className={styles.sidebarHeader}>
            <h2 className={styles.sidebarTitle}>{t('dayView.dailyNutrition', 'Daily Nutrition')}</h2>
            <button
              className={styles.editButton}
              onClick={() => setIsNutritionModalOpen(true)}
              title={t('dayView.editGoals', 'Edit Goals')}
              aria-label={t('dayView.editGoals', 'Edit Goals')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
          </div>
          
          <div className={styles.nutritionStats}>
            {/* Calories */}
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>{t('common.calories')}</span>
                <span className={styles.statValue}>
                  {dailyNutrition.calories} / {goals.calories}
                </span>
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ width: `${getPercentage(dailyNutrition.calories, goals.calories)}%` }}
                />
              </div>
            </div>

            {/* Protein */}
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>{t('common.protein')}</span>
                <span className={styles.statValue}>
                  {dailyNutrition.protein}{t('units.g', 'g')} / {goals.protein}{t('units.g', 'g')}
                </span>
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={`${styles.progressFill} ${styles.protein}`}
                  style={{ width: `${getPercentage(dailyNutrition.protein, goals.protein)}%` }}
                />
              </div>
            </div>

            {/* Carbs */}
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>{t('common.carbs')}</span>
                <span className={styles.statValue}>
                  {dailyNutrition.carbs}{t('units.g', 'g')} / {goals.carbs}{t('units.g', 'g')}
                </span>
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={`${styles.progressFill} ${styles.carbs}`}
                  style={{ width: `${getPercentage(dailyNutrition.carbs, goals.carbs)}%` }}
                />
              </div>
            </div>

            {/* Fat */}
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>{t('common.fat')}</span>
                <span className={styles.statValue}>
                  {dailyNutrition.fat}{t('units.g', 'g')} / {goals.fat}{t('units.g', 'g')}
                </span>
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={`${styles.progressFill} ${styles.fat}`}
                  style={{ width: `${getPercentage(dailyNutrition.fat, goals.fat)}%` }}
                />
              </div>
            </div>
          </div>

        <div className={styles.summary}>
            <h3 className={styles.summaryTitle}>{t('dayView.summary', 'Summary')}</h3>
            <p className={styles.summaryText}>
              {meals.length} {meals.length === 1 ? t('dayView.mealPlanned', 'meal planned') : t('dayView.mealsPlanned', 'meals planned')}
            </p>
            <p className={styles.summaryText}>
              {Math.round(getPercentage(dailyNutrition.calories, goals.calories))}% {t('dayView.dailyCalories', 'of daily calories')}
            </p>
          </div>
        </div>
      </div>

      <NutritionGoalsModal
        isOpen={isNutritionModalOpen}
        onClose={() => setIsNutritionModalOpen(false)}
      />

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
