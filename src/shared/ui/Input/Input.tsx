import React, { useState, useEffect, useMemo, memo, useCallback } from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

export type InputType = 'password' | 'email' | 'text';

export interface InputProps {
  type: InputType;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  labelPosition?: 'top' | 'left';
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  customValidator?: (value: string) => string | null;
  onValidationChange?: (isValid: boolean) => void;
  'data-testid'?: string;
}

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customValidator?: (value: string) => string | null;
}

const getPatternErrorMessage = (type: InputType): string => {
  switch (type) {
    case 'email':
      return "Введите корректный email адрес";
    case 'password':
      return "Пароль должен содержать минимум 1 заглавную букву, 1 строчную букву и 1 цифру";
    default:
      return "Неверный формат";
  }
};

const Input = memo((props: InputProps) => {
  const { 
    type, 
    value, 
    onChange, 
    label, 
    placeholder,
    labelPosition = 'top',
    onValidationChange
  } = props;
  
  const [internalValue, setInternalValue] = useState<string>(value);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const validationRules: ValidationRules = useMemo(() => {
    const baseRules: Record<InputType, ValidationRules> = {
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      password: {
        required: true,
        minLength: 6,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      },
      text: {
        required: false,
      }
    };
    
    return {
      required: props.required ?? baseRules[type].required,
      minLength: props.minLength ?? baseRules[type].minLength,
      maxLength: props.maxLength,
      pattern: props.pattern ? new RegExp(props.pattern) : baseRules[type].pattern,
      customValidator: props.customValidator,
    };
  }, [type, props.required, props.minLength, props.maxLength, props.pattern, props.customValidator]);

  const validateField = useCallback((valueToValidate: string): string | null => {
    const { required, minLength, maxLength, pattern, customValidator } = validationRules;

    if (required && !valueToValidate.trim()) {
      return "Это поле обязательно для заполнения";
    }
    if (!valueToValidate.trim() && !required) {
      return null;
    }
    if (minLength && valueToValidate.length < minLength) {
      return `Минимальная длина: ${minLength} символов`;
    }
    if (maxLength && valueToValidate.length > maxLength) {
      return `Максимальная длина: ${maxLength} символов`;
    }
    if (pattern && !pattern.test(valueToValidate)) {
      return getPatternErrorMessage(type);
    }
    if (customValidator) {
      const customError = customValidator(valueToValidate);
      if (customError) return customError;
    }

    return null;
  }, [validationRules, type]);

  useEffect(() => {
    if (value !== internalValue) {
      setInternalValue(value);
    }
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (internalValue !== value) {
        onChange(internalValue);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [internalValue, onChange, value]);

  useEffect(() => {
    if (isTouched) {
      const error = validateField(internalValue);
      setErrorMessage(error);
    }
  }, [internalValue, isTouched, validateField]);

  useEffect(() => {
    if (onValidationChange) {
      const isValid = errorMessage === null && (!validationRules.required || internalValue.length > 0);
      onValidationChange(isValid);
    }
  }, [errorMessage, internalValue, validationRules.required]); // Убрал onValidationChange из зависимостей

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
  };
  
  const handleBlur = (): void => {
    setIsTouched(true);
    const error = validateField(internalValue);
    setErrorMessage(error);
    if (internalValue !== value) {
      onChange(internalValue);
    }
  };
  
  const getDefaultPlaceholder = (): string => {
    if (placeholder) return placeholder;
    switch (type) {
      case 'email': return 'Введите адрес эл. почты';
      case 'password': return 'Введите пароль';
      default: return 'Введите текст';
    }
  };

  const hasError = isTouched && errorMessage !== null;

  return (
    <div className={clsx(
      styles.wrapper,
      { [styles['label-left']]: labelPosition === 'left' }
    )}>
      {label && (
        <label htmlFor={`input-${type}-${label}`}>
          {label}
          {validationRules.required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input 
          id={`input-${type}-${label}`}
          type={type} 
          className={clsx(styles.input, { [styles.error]: hasError })} 
          placeholder={getDefaultPlaceholder()}
          value={internalValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required={props.required}
          data-testid={props["data-testid"] || `input-${type}`}
          autoComplete={type === 'password' ? 'new-password' : 'off'}
        />
        {hasError && (
          <p className={styles.errorMessage} data-testid="error-message">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
});

Input.displayName = "Input";

export default Input;