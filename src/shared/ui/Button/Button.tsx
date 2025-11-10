// Button.tsx
import { ReactElement, ReactNode, memo } from 'react'
import styles from './Button.module.css'
import clsx from 'clsx';

interface ButtonProps {
  children: ReactNode;
  isValid?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  no_bg?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = memo((props: ButtonProps): ReactElement => {
  const isSubmitInvalid = props.type === 'submit' && !props.isValid;
  const isDisabled = isSubmitInvalid || props.disabled;

  return (
    <button 
      className={clsx(
        styles.button,
        {
          [styles.disabled]: isDisabled, 
          [styles.transparent]: props.no_bg
        }
      )}
      type={props.type}
      disabled={isDisabled} 
      onClick={props?.onClick}
    >
      {props.children}
    </button>
  ) 
})

export default Button