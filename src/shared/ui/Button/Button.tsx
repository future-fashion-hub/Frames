import { ReactElement, ReactNode, memo } from 'react'
import styles from './Button.module.css'
import clsx from 'clsx';

interface ButtonProps {
  children: ReactNode;
  isValid?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  no_bg?: boolean;
  onClick?: () => void;
}

const Button = memo((props: ButtonProps): ReactElement => {
  const isDisabled = props.type === 'submit' && !props.isValid;

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