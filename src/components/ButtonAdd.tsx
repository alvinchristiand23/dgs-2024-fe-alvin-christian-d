import { PiPlusBold } from 'react-icons/pi';

interface IProps {
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonAdd = ({ disabled, onClick }: IProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 border-2 border-dashed rounded-xl border-border text-secondary-text ${
        disabled
          ? ''
          : 'hover:bg-accent-background hover:text-accent-text hover:border-solid hover:border-accent-background'
      }`}
    >
      <PiPlusBold className='size-5' />
    </button>
  );
};

export default ButtonAdd;
