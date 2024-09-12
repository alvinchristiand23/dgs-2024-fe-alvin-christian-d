import { ReactNode } from 'react';

interface IProps {
  disabled?: boolean;
  label: string | ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonAction = ({ disabled = false, label, onClick }: IProps) => {
  return (
    <button
      onClick={onClick}
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
