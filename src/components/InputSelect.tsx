interface IProps {
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
}

const InputSelect = ({ options, value, onChange, placeholder }: IProps) => {
  return (
    <select
      className='w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-text focus:border-accent-text'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {placeholder && <option value=''>{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default InputSelect;
