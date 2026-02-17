import { useState, useRef } from 'react';
import { MealCatalog } from './components/MealCatalog';
import { WeekView } from './components/WeekView';
import { DayView } from './components/DayView';
import { ShoppingListView } from './components/ShoppingListView';
import styles from './App.module.css';

type View = 'catalog' | 'week' | 'day' | 'shopping';

function App() {
  const [currentView, setCurrentView] = useState<View>('week');
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  
  const tabs: View[] = ['week', 'day', 'shopping', 'catalog'];
  
  const navigateToTab = (direction: 'next' | 'prev') => {
    const currentIndex = tabs.indexOf(currentView);
    let newIndex: number;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % tabs.length;
      setSlideDirection('left');
    } else {
      newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      setSlideDirection('right');
    }
    
    setCurrentView(tabs[newIndex]);
    
    // Reset animation after transition
    setTimeout(() => setSlideDirection(null), 300);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    
    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        // Swipe left - next tab
        navigateToTab('next');
      } else {
        // Swipe right - previous tab
        navigateToTab('prev');
      }
    }
  };


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
      <main 
        className={`${styles.main} ${slideDirection ? styles[`slide-${slideDirection}`] : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {currentView === 'catalog' && <MealCatalog />}
        {currentView === 'week' && <WeekView />}
        {currentView === 'day' && <DayView />}
        {currentView === 'shopping' && <ShoppingListView />}
      </main>
    </div>
  );
}

export default App;
