interface IProps {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Input = ({ value, onChange, placeholder }: IProps) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className='w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-text focus:border-accent-text'
    />
  );
};

export default Input;
