import { ButtonHTMLAttributes, ReactNode } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | ReactNode;
  disabled?: boolean;
}

const ButtonAction = ({ label, disabled = false, ...props }: IProps) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`p-2 font-semibold rounded-xl text-secondary-text bg-primary-background ${
        disabled ? '' : 'hover:text-accent-text hover:bg-accent-background'
      }`}
    >
      {label}
    </button>
  );
};

export default ButtonAction;
