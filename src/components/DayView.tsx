import { useEffect, useState } from 'react';
import { format, addDays, subDays, startOfWeek } from 'date-fns';
import { useWeekPlanStore } from '../store/weekPlanStore';
import { db } from '../db';
import type { Meal, DayPlan, Nutrition } from '../types';
import { MealSelectorModal } from './MealSelectorModal';
import styles from './DayView.module.css';

export function DayView() {
  const { weeklyPlan, loadWeekPlan, removeMealFromDay, addMealToDay } = useWeekPlanStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dayPlan, setDayPlan] = useState<DayPlan | null>(null);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [dailyNutrition, setDailyNutrition] = useState<Nutrition>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [modalState, setModalState] = useState({ isOpen: false, dayName: '' });

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
    }
  }, [weeklyPlan, currentDate]);

  // Load meal details and calculate nutrition
  useEffect(() => {
    if (!dayPlan) return;

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
    
    if (confirm('Remove this meal from your plan?')) {
      removeMealFromDay(dayIndex, mealIndex);
    }
  };

  const handleOpenModal = () => {
    setModalState({ isOpen: true, dayName: format(currentDate, 'EEEE') });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, dayName: '' });
  };

  const handleSelectMeal = async (mealId: number) => {
    if (!weeklyPlan) return;
    
    const monday = startOfWeek(currentDate, { weekStartsOn: 1 });
    const dayIndex = Math.floor((currentDate.getTime() - monday.getTime()) / (1000 * 60 * 60 * 24));
    
    await addMealToDay(dayIndex, mealId);
  };

  // Nutrition goals (example values)
  const goals = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
  };

  const getPercentage = (value: number, goal: number) => Math.min((value / goal) * 100, 100);

  return (
    <div className={styles.dayView}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.dateInfo}>
          <h1 className={styles.dayName}>{format(currentDate, 'EEEE')}</h1>
          <p className={styles.date}>{format(currentDate, 'MMMM d, yyyy')}</p>
        </div>

        <div className={styles.navigation}>
          <button onClick={goToPreviousDay} className={styles.navButton}>
            ← Previous
          </button>
          <button onClick={goToToday} className={styles.navButton}>
            Today
          </button>
          <button onClick={goToNextDay} className={styles.navButton}>
            Next →
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {/* Meals List */}
        <div className={styles.mealsSection}>
          <h2 className={styles.sectionTitle}>Meals</h2>
          
          {meals.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No meals planned for this day</p>
              <button onClick={handleOpenModal} className={styles.addButton}>
                + Add First Meal
              </button>
            </div>
          ) : (
            <div className={styles.mealsList}>
              {meals.map((meal, index) => (
                <div key={index} className={styles.mealCard}>
                  <img 
                    src={meal.image.content} 
                    alt={meal.name}
                    className={styles.mealImage}
                  />
                  
                  <div className={styles.mealDetails}>
                    <div className={styles.mealHeader}>
                      <h3 className={styles.mealName}>{meal.name}</h3>
                      <span className={styles.mealType}>{meal.mealType}</span>
                    </div>
                    
                    <p className={styles.mealDescription}>{meal.description}</p>
                    
                    <div className={styles.mealNutrition}>
                      <div className={styles.nutrientBadge}>
                        <strong>{meal.nutrition.calories}</strong> cal
                      </div>
                      <div className={styles.nutrientBadge}>
                        <strong>{meal.nutrition.protein}g</strong> protein
                      </div>
                      <div className={styles.nutrientBadge}>
                        <strong>{meal.nutrition.carbs}g</strong> carbs
                      </div>
                      <div className={styles.nutrientBadge}>
                        <strong>{meal.nutrition.fat}g</strong> fat
                      </div>
                    </div>

                    <div className={styles.labels}>
                      {meal.labels.slice(0, 4).map(label => (
                        <span key={label} className={styles.label}>{label}</span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveMeal(index)}
                    className={styles.removeButton}
                    title="Remove meal"
                  >
                    ×
                  </button>
                </div>
              ))}

              <button onClick={handleOpenModal} className={styles.addAnotherButton}>
                + Add Another Meal
              </button>
            </div>
          )}
        </div>

        {/* Nutrition Sidebar */}
        <div className={styles.nutritionSidebar}>
          <h2 className={styles.sectionTitle}>Daily Nutrition</h2>
          
          <div className={styles.nutritionStats}>
            {/* Calories */}
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>Calories</span>
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
                <span className={styles.statLabel}>Protein</span>
                <span className={styles.statValue}>
                  {dailyNutrition.protein}g / {goals.protein}g
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
                <span className={styles.statLabel}>Carbs</span>
                <span className={styles.statValue}>
                  {dailyNutrition.carbs}g / {goals.carbs}g
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
                <span className={styles.statLabel}>Fat</span>
                <span className={styles.statValue}>
                  {dailyNutrition.fat}g / {goals.fat}g
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

          {/* Summary */}
          <div className={styles.summary}>
            <h3 className={styles.summaryTitle}>Summary</h3>
            <p className={styles.summaryText}>
              {meals.length} {meals.length === 1 ? 'meal' : 'meals'} planned
            </p>
            <p className={styles.summaryText}>
              {Math.round(getPercentage(dailyNutrition.calories, goals.calories))}% of daily calories
            </p>
          </div>
        </div>
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
