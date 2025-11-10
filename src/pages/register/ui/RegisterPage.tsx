import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import { useAppDispatch, useAppSelector } from "@/app/providers/StoreProvider/store";
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import styles from './RegisterPage.module.css';
import { registerUser } from "@/features/auth/api/authThunks";
import { clearError } from "@/features/auth/model/authSlice";

import pictureOne from '@/shared/assets/images/frame_1 1.png';
import pictureTwo from '@/shared/assets/images/frame_2 1.png';
import pictureThree from '@/shared/assets/images/frame_3 1.png';
import pictureFour from '@/shared/assets/images/frame_4 1.png';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUsername] = useState('');
  
  const [validStates, setValidStates] = useState({ email: false, password: false, userName: false });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);
  
  const isFormValid = Object.values(validStates).every(v => v);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleValidationChange = useCallback((field: keyof typeof validStates) => (isValid: boolean) => {
    setValidStates(prev => ({ ...prev, [field]: isValid }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid && !isLoading) { 
      dispatch(registerUser({ 
        login: email, 
        password: password, 
        username: userName 
      }));
    }
  };
  
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.backGround}>
        <div className={styles.ellipseBackground1}></div>
        <div className={styles.ellipseBackground2}></div>
      </div>

      <div className={styles.formWrapper}>
        <h1>Добро пожаловать в Frames!</h1>
        <p className={styles.text}>Создание нового аккаунта</p>
        <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
          <Input 
            type="email"
            value={email}
            onChange={setEmail}
            onValidationChange={handleValidationChange('email')}
            required
            placeholder="Введите почту"
          />
          <Input 
            type="password"
            value={password}
            onChange={setPassword}
            onValidationChange={handleValidationChange('password')}
            required
            minLength={8}
            placeholder="Введите пароль"
          />
          <Input 
            type="text"
            value={userName}
            onChange={setUsername}
            onValidationChange={handleValidationChange('userName')}
            required
            minLength={5}
            maxLength={30}
            placeholder="Введите имя"
          />
          
          {error && <p className={styles.errorText}>{error}</p>}

          <Button type="submit" isValid={isFormValid}>
            {isLoading ? 'Создание...' : 'Продолжить'}
          </Button>
        </form>
      </div>

      <img src={pictureOne} className={clsx(styles.decorImage, styles.pic1)} alt="Картина 1" />
      <img src={pictureTwo} className={clsx(styles.decorImage, styles.pic2)} alt="Картина 2" />
      <img src={pictureThree} className={clsx(styles.decorImage, styles.pic3)} alt="Картина 3" />
      <img src={pictureFour} className={clsx(styles.decorImage, styles.pic4)} alt="Картина 4" />
    </div>
  ); 
};