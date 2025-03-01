import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styles from './input-outline.module.css';

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: boolean;
}

export function InputOutline({ error, ...props }: Props) {
  return (
    <input
      {...props}
      className={`${styles['input-outline']} ${error && styles.error} ${props.className}`}
      autoComplete="off"
    />
  );
}
