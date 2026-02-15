import { useState } from 'react';
import { MealCatalog } from './components/MealCatalog';
import { WeekView } from './components/WeekView';
import { DayView } from './components/DayView';
import { ShoppingListView } from './components/ShoppingListView';
import styles from './App.module.css';

type View = 'catalog' | 'week' | 'day' | 'shopping';

function App() {
  const [currentView, setCurrentView] = useState<View>('week');

  return (
    <div className={styles.app}>
      {/* Top Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <h1 className={styles.logo}>🍽️ Mealog</h1>
          
          <div className={styles.navButtons}>
            <button
              className={`${styles.navButton} ${currentView === 'week' ? styles.active : ''}`}
              onClick={() => setCurrentView('week')}
            >
              Week Plan
            </button>
            <button
              className={`${styles.navButton} ${currentView === 'day' ? styles.active : ''}`}
              onClick={() => setCurrentView('day')}
            >
              Day View
            </button>
            <button
              className={`${styles.navButton} ${currentView === 'shopping' ? styles.active : ''}`}
              onClick={() => setCurrentView('shopping')}
            >
              Shopping List
            </button>
            <button
              className={`${styles.navButton} ${currentView === 'catalog' ? styles.active : ''}`}
              onClick={() => setCurrentView('catalog')}
            >
              Meal Catalog
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className={styles.main}>
        {currentView === 'catalog' && <MealCatalog />}
        {currentView === 'week' && <WeekView />}
        {currentView === 'day' && <DayView />}
        {currentView === 'shopping' && <ShoppingListView />}
      </main>
    </div>
  );
}

export default App;
