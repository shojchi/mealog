import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n/config';
import { MealCatalog } from './components/MealCatalog';
import { WeekView } from './components/WeekView';
import { DayView } from './components/DayView';
import { ShoppingListView } from './components/ShoppingListView';
import { SettingsModal } from './components/SettingsModal';
import { LoginScreen } from './components/LoginScreen';
import { useThemeStore } from './store/themeStore';
import { useAuthStore } from './store/authStore';
import { subscribeToAuth, logOut } from './services/auth';
import { initializeUserRecord } from './services/db';
import { startDownSync, stopDownSync, pushUpSync } from './services/sync';
import styles from './App.module.css';

type View = 'catalog' | 'week' | 'day' | 'shopping';

function App() {
  const { t } = useTranslation();
  const [currentView, setCurrentView] = useState<View>('week');
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const { theme } = useThemeStore();
  const { user, loading: authLoading, setUser, setLoading } = useAuthStore();
  
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  
  const tabs: View[] = ['week', 'day', 'shopping', 'catalog'];

  // Firebase Auth Subscription
  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch or initialize user profile in Firestore
          const userProfile = await initializeUserRecord(
            firebaseUser.uid,
            firebaseUser.email,
            firebaseUser.displayName
          );
          setUser(userProfile);
          
          // Start syncing for their active household
          startDownSync(userProfile.currentHouseholdId);
          pushUpSync(); // Try pushing any local data right away

        } catch (error) {
          console.error("Failed to initialize user record:", error);
          setUser(null);
          stopDownSync();
        }
      } else {
        setUser(null);
        stopDownSync();
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
      stopDownSync();
    };
  }, [setUser, setLoading]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        if (useThemeStore.getState().theme === 'system') {
          root.classList.remove('light', 'dark');
          root.classList.add(e.matches ? 'dark' : 'light');
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);
  
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
    // Check if the touch started on a modal or inside a modal
    const target = e.target as HTMLElement;
    const isModal = target.closest('[class*="overlay"]') || target.closest('[role="dialog"]');
    
    // Don't track swipes if touch starts on a modal
    if (isModal) {
      touchStartX.current = 0;
      touchStartY.current = 0;
      return;
    }
    
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    // Only track movement if we have a valid touch start
    if (touchStartX.current === 0 && touchStartY.current === 0) {
      return;
    }
    
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };
  
  const handleTouchEnd = () => {
    // Don't process swipe if touch started on a modal
    if (touchStartX.current === 0 && touchStartY.current === 0) {
      return;
    }
    
    const horizontalDiff = touchStartX.current - touchEndX.current;
    const verticalDiff = touchStartY.current - touchEndY.current;
    
    const minSwipeDistance = 75; // Increased for more intentional swipes
    const horizontalMovement = Math.abs(horizontalDiff);
    const verticalMovement = Math.abs(verticalDiff);
    
    // Only trigger swipe if:
    // 1. Horizontal movement is significant (>75px)
    // 2. Horizontal movement is at least 2x greater than vertical (more horizontal than vertical)
    const isHorizontalSwipe = 
      horizontalMovement > minSwipeDistance && 
      horizontalMovement > verticalMovement * 2;
    
    if (isHorizontalSwipe) {
      if (horizontalDiff > 0) {
        // Swipe left - next tab
        navigateToTab('next');
      } else {
        // Swipe right - previous tab
        navigateToTab('prev');
      }
    }
    
    // Reset touch coordinates
    touchStartX.current = 0;
    touchStartY.current = 0;
    touchEndX.current = 0;
    touchEndY.current = 0;
    // If not a horizontal swipe, do nothing (allow vertical scroll)
  };


  // Wait for Firebase to check session
  if (authLoading) {
    return (
      <div className={styles.app} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  // Not logged in -> Show Login Screen
  if (!user) {
    return <LoginScreen />;
  }

  return (
    <div className={styles.app}>
      {/* Top Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <h1 className={styles.logo}>{t('app.name')}</h1>
          
          <div className={styles.navButtons}>
            <button
              className={`${styles.navButton} ${currentView === 'week' ? styles.active : ''}`}
              onClick={() => setCurrentView('week')}
            >
              {t('nav.weekPlan')}
            </button>
            <button
              className={`${styles.navButton} ${currentView === 'day' ? styles.active : ''}`}
              onClick={() => setCurrentView('day')}
            >
              {t('nav.dayView')}
            </button>
            <button
              className={`${styles.navButton} ${currentView === 'shopping' ? styles.active : ''}`}
              onClick={() => setCurrentView('shopping')}
            >
              {t('nav.shoppingList')}
            </button>
            <button
              className={`${styles.navButton} ${currentView === 'catalog' ? styles.active : ''}`}
              onClick={() => setCurrentView('catalog')}
            >
              {t('nav.mealCatalog')}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className={styles.navButton}
              onClick={logOut}
              aria-label="Log out"
            >
              Sign Out
            </button>
            <button 
              className={styles.settingsButton}
              onClick={() => setShowSettings(true)}
              aria-label="Open settings"
            >
              ⚙️
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

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </div>
  );
}

export default App;
