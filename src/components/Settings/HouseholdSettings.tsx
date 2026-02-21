import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { db } from '../../services/db';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import styles from './HouseholdSettings.module.css';

export function HouseholdSettings() {
  const { user, setUser } = useAuthStore();
  const [joinCode, setJoinCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!user) return null;

  const currentHouseholdId = user.currentHouseholdId;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentHouseholdId);
    setSuccess('Invite code copied to clipboard!');
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleJoinHousehold = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!joinCode.trim()) throw new Error('Please enter a valid code');
      if (joinCode === currentHouseholdId) throw new Error('You are already in this household');

      // Check if household exists
      const householdRef = doc(db, 'households', joinCode);
      const householdSnap = await getDoc(householdRef);

      if (!householdSnap.exists()) {
        throw new Error('Household not found. Please check the code.');
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
      
      setSuccess('Successfully joined household!');
      setJoinCode('');
      
      // Note: A real app might want to trigger a full re-sync here
      // reload page is a quick way to re-trigger the down-sync listener on mount
      setTimeout(() => window.location.reload(), 1500);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>🏠 Household Sync</h3>
      <p className={styles.description}>
        Share your catalog and week plans with others by joining the same household.
      </p>

      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <div className={styles.card}>
        <h4>Your Invite Code</h4>
        <p className={styles.subtext}>Share this code with someone to let them join your household.</p>
        <div className={styles.codeRow}>
          <code className={styles.code}>{currentHouseholdId}</code>
          <button onClick={handleCopyCode} className={styles.copyButton}>Copy</button>
        </div>
      </div>

      <div className={styles.card}>
        <h4>Join a Household</h4>
        <p className={styles.subtext}>Enter someone else's invite code to join their household. (Note: You will switch to their catalog)</p>
        <form onSubmit={handleJoinHousehold} className={styles.joinForm}>
          <input 
            type="text" 
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            placeholder="Paste invite code..."
            className={styles.input}
            disabled={isLoading}
          />
          <button type="submit" className={styles.joinButton} disabled={isLoading || !joinCode}>
            {isLoading ? '...' : 'Join'}
          </button>
        </form>
      </div>
    </div>
  );
}
