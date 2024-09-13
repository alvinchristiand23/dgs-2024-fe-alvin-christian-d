import { SelectHTMLAttributes } from 'react';
import { IOption } from '../../types/optionTypes';

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  isRequired?: boolean;
  placeholder: string;
  handleOnChange: (value: string) => void;
  options: IOption[];
}

const InputSelect = ({
  label,
  isRequired,
  placeholder,
  options,
  handleOnChange,
  ...props
}: IProps) => {
  return (
    <div className='space-y-2'>
      {label && (
        <label className='ml-2 font-semibold'>
          {label}
          <span className='text-sm font-medium'> ({isRequired ? 'required' : 'optional'})</span>
        </label>
      )}
      <select
        {...props}
        className='w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-text focus:border-accent-text disabled:bg-primary-background'
        onChange={(e) => handleOnChange(e.target.value)}
      >
        <option value=''>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;
