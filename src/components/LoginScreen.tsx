import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '../services/auth';
import styles from './LoginScreen.module.css'; // You'll create this CSS module next

export function LoginScreen() {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error: authError } = isLogin 
      ? await signInWithEmail(email, password)
      : await signUpWithEmail(email, password);

    if (authError) setError(authError);
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    const { error: authError } = await signInWithGoogle();
    if (authError) setError(authError);
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{t('app.name')}</h1>
        <p className={styles.subtitle}>
          {isLogin ? t('auth.welcomeBack') : t('auth.createAccount')}
        </p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleEmailSubmit} className={styles.form}>
          <label className={styles.label}>
            {t('auth.email')}:
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              className={styles.input}
              disabled={isLoading}
            />
          </label>
          <label className={styles.label}>
            {t('auth.password')}:
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              minLength={6}
              className={styles.input}
              disabled={isLoading}
            />
          </label>

          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? '...' : (isLogin ? t('auth.signIn') : t('auth.signUp'))}
          </button>
        </form>

        <div className={styles.divider}>
          <span>{t('auth.or')}</span>
        </div>

        <button 
          onClick={handleGoogleSignIn} 
          className={styles.googleButton}
          disabled={isLoading}
        >
          <svg viewBox="0 0 24 24" className={styles.googleIcon}>
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {t('auth.signInWithGoogle')}
        </button>

        <p className={styles.toggleText}>
          {isLogin ? t('auth.dontHaveAccount') : t('auth.alreadyHaveAccount')}
          <button 
            type="button" 
            className={styles.toggleButton} 
            onClick={() => setIsLogin(!isLogin)}
            disabled={isLoading}
          >
            {isLogin ? t('auth.signUp') : t('auth.signIn')}
          </button>
        </p>
      </div>
    </div>
  );
}
