import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import { db } from '../../services/db';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import styles from './HouseholdSettings.module.css';

export function HouseholdSettings() {
  const { t } = useTranslation();
  const { user, setUser } = useAuthStore();
  const [joinCode, setJoinCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{t('householdSettings.title')}</h3>
      <p className={styles.description}>
        {t('householdSettings.description')}
      </p>

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
          <button type="submit" className={styles.joinButton} disabled={isLoading || !joinCode}>
            {isLoading ? '...' : t('householdSettings.join.button')}
          </button>
        </form>
      </div>
    </div>
  );
}
