import { InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isRequired?: boolean;
  handleOnChange: (value: string) => void;
}

const Input = ({ label, isRequired, handleOnChange, ...props }: IProps) => {
  return (
    <div className='space-y-2'>
      {label && (
        <label className='ml-2 font-semibold'>
          {label}
          <span className='text-sm font-medium'> ({isRequired ? 'required' : 'optional'})</span>
        </label>
      )}
      <input
        {...props}
        onChange={(event) => handleOnChange(event.target.value)}
        className='w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-text focus:border-accent-text disabled:bg-primary-background'
      />
    </div>
  );
};

export default Input;
