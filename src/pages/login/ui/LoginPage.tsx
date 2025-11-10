//LoginPage.tsx
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import { useAppDispatch, useAppSelector } from "@/app/providers/StoreProvider/store";
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import styles from './LoginPage.module.css';
import { loginUser } from "@/features/auth/api/authThunks";
import { clearError } from "@/features/auth/model/authSlice";

import pictureOne from '@/shared/assets/images/frame_1 1.png';
import pictureTwo from '@/shared/assets/images/frame_2 1.png';
import pictureThree from '@/shared/assets/images/frame_3 1.png';
import pictureFour from '@/shared/assets/images/frame_4 1.png';
import pictureFive from '@/shared/assets/images/frames_5 1 (1).png';
import pictureSix from '@/shared/assets/images/frames_6 1 (1).png';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validStates, setValidStates] = useState({ email: false, password: false });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const isFormValid = Object.values(validStates).every(v => v);

  useEffect(() => {
    // Этот хук перенаправит пользователя, если он уже аутентифицирован.
    // Если происходит цикл, значит, другая часть приложения отправляет его обратно сюда.
    if (isAuthenticated) {
      navigate('/', { replace: true }); // Используем replace для лучшей истории навигации
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Очищаем ошибку при уходе со страницы
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleValidationChange = useCallback((field: keyof typeof validStates) => (isValid: boolean) => {
    setValidStates(prev => ({ ...prev, [field]: isValid }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid && !isLoading) { // Добавлена проверка на isLoading
      dispatch(loginUser({ login: email, password }));
    }
  };

  const handleRegisterNavigate = () => {
    navigate('/register');
  };

  const handleEmailChange = (value: string) => {
    if (error) {
      dispatch(clearError());
    }
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    if (error) {
      dispatch(clearError());
    }
    setPassword(value);
  };
  
  // Если пользователь уже аутентифицирован, не рендерим форму, чтобы избежать моргания
  if (isAuthenticated) {
    return null; 
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.backGround}>
        <div className={styles.ellipseBackground1}></div>
        <div className={styles.ellipseBackground2}></div>
        <div className={styles.ellipseBackground3}></div>
        <div className={styles.ellipseBackground4}></div>
        <img src={pictureOne} className={clsx(styles.decorImage, styles.pic1)} alt="Картина 1" />
        <img src={pictureTwo} className={clsx(styles.decorImage, styles.pic2)} alt="Картина 2" />
        <img src={pictureThree} className={clsx(styles.decorImage, styles.pic3)} alt="Картина 3" />
        <img src={pictureFour} className={clsx(styles.decorImage, styles.pic4)} alt="Картина 4" />
        <img src={pictureFive} className={clsx(styles.decorImage, styles.pic5)} alt="Картина 5" />
        <img src={pictureSix} className={clsx(styles.decorImage, styles.pic6)} alt="Картина 6" />
      </div>
      
      <h1>Добро пожаловать в Frames!</h1>
      <p className={styles.text}>Вход в аккаунт</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input 
        type="email"
        value={email}
        onChange={handleEmailChange}
        onValidationChange={handleValidationChange('email')}
        required
        autoCompleteType="on"
        />
        <Input 
          type="password"
          value={password}
          onChange={handlePasswordChange}
          onValidationChange={handleValidationChange('password')}
          required
          minLength={8}
          autoCompleteType="current-password"
        />
        {error && <p className={styles.errorText}>{error}</p>}
        
        <Button type="submit" isValid={isFormValid} disabled={isLoading}>
          {isLoading ? 'Вход...' : 'Продолжить'}
        </Button>
        <Button type="button" no_bg={true} onClick={handleRegisterNavigate}>
          Еще нет аккаунта?
        </Button>
      </form>
    </div>
  ); 
};