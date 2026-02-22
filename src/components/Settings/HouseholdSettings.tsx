import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import { db } from '../../services/db';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import styles from './HouseholdSettings.module.css';

export function HouseholdSettings() {
  const { t } = useTranslation();
  const { user, setUser } = useAuthStore();
  const [joinCode, setJoinCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!user) return null;

  const currentHouseholdId = user.currentHouseholdId;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentHouseholdId);
    setSuccess(t('householdSettings.yourCode.success'));
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleJoinHousehold = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!joinCode.trim()) throw new Error(t('householdSettings.join.errors.invalid'));
      if (joinCode === currentHouseholdId) throw new Error(t('householdSettings.join.errors.alreadyIn'));

      // Check if household exists
      const householdRef = doc(db, 'households', joinCode);
      const householdSnap = await getDoc(householdRef);

      if (!householdSnap.exists()) {
        throw new Error(t('householdSettings.join.errors.notFound'));
      }

      // Add user to new household
      await updateDoc(householdRef, {
        members: arrayUnion(user.uid)
      });

      // Update user's current household
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        currentHouseholdId: joinCode
      });

      // Update local state
      setUser({ ...user, currentHouseholdId: joinCode });
      
      setSuccess(t('householdSettings.join.success'));
      setJoinCode('');
      
      // Note: A real app might want to trigger a full re-sync here
      // reload page is a quick way to re-trigger the down-sync listener on mount
      setTimeout(() => window.location.reload(), 1500);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t('householdSettings.join.errors.unexpected'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeaveHousehold = async () => {
    if (!window.confirm(t('householdSettings.leave.confirm', 'Are you sure you want to leave this household? You will return to your personal workspace.'))) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Remove user from the current household's members array
      const oldHouseholdRef = doc(db, 'households', currentHouseholdId);
      await updateDoc(oldHouseholdRef, {
        members: arrayRemove(user.uid)
      });

      // Update user's active household back to their own UID
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        currentHouseholdId: user.uid
      });

      // Update local state and trigger sync refresh
      setUser({ ...user, currentHouseholdId: user.uid });
      setSuccess(t('householdSettings.leave.success', 'Successfully left the household!'));
      
      // Note: A real app might want to trigger a full re-sync here
      // reload page is a quick way to re-trigger the down-sync listener on mount
      setTimeout(() => window.location.reload(), 1500);
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t('householdSettings.leave.error', 'An error occurred while leaving.'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{t('householdSettings.title')}</h3>
      <p className={styles.description}>
        {t('householdSettings.description')}
      </p>

      {!isOnline && (
        <div className={styles.offlineWarning}>
          ⚠️ {t('householdSettings.offlineWarning', "You're offline. Some functions are limited.")}
        </div>
      )}

      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <div className={styles.card}>
        <h4>{t('householdSettings.yourCode.title')}</h4>
        <p className={styles.subtext}>{t('householdSettings.yourCode.subtitle')}</p>
        <div className={styles.codeRow}>
          <code className={styles.code}>{currentHouseholdId}</code>
          <button onClick={handleCopyCode} className={styles.copyButton}>
            {t('householdSettings.yourCode.copy')}
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <h4>{t('householdSettings.join.title')}</h4>
        <p className={styles.subtext}>{t('householdSettings.join.subtitle')}</p>
        <form onSubmit={handleJoinHousehold} className={styles.joinForm}>
          <input 
            type="text" 
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            placeholder={t('householdSettings.join.placeholder')}
            className={styles.input}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className={styles.joinButton} 
            disabled={isLoading || !joinCode || !isOnline}
          >
            {isLoading ? '...' : t('householdSettings.join.button')}
          </button>
        </form>
      </div>

      {currentHouseholdId !== user.uid && (
        <div className={styles.card}>
          <h4>{t('householdSettings.leave.title', 'Leave Current Household')}</h4>
          <p className={styles.subtext}>{t('householdSettings.leave.description', 'Leaving will return you to your personal workspace.')}</p>
          <button 
            onClick={handleLeaveHousehold} 
            className={styles.leaveButton} 
            disabled={isLoading || !isOnline}
          >
            {isLoading ? '...' : t('householdSettings.leave.button', 'Leave Household')}
          </button>
        </div>
      )}

      {/* Support Section */}
      <div className={styles.card}>
        <h4>{t('householdSettings.support.title', 'Support & Help')}</h4>
        <p className={styles.subtext}>{t('householdSettings.support.description', 'Need help using MeaLog or have an idea?')}</p>
        
        <div className={styles.linkList}>
          <a 
            href="https://mealog.featurebase.app/en/help/articles/7391838" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.supportLink}
          >
            <span className={styles.linkIcon}>📱</span>
            <div className={styles.linkContent}>
              <span className={styles.linkTitle}>{t('householdSettings.support.pwaLink', 'How to install the App on mobile')}</span>
              <span className={styles.linkDescription}>{t('householdSettings.support.pwaDesc', 'Step-by-step installation guide for iOS and Android')}</span>
            </div>
          </a>
          
          <a 
            href="https://mealog.featurebase.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.supportLink}
          >
            <span className={styles.linkIcon}>💡</span>
            <div className={styles.linkContent}>
              <span className={styles.linkTitle}>{t('householdSettings.support.feedbackLink', 'Give Feedback or Request Features')}</span>
              <span className={styles.linkDescription}>{t('householdSettings.support.feedbackDesc', 'Help us improve by sharing your ideas')}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
