import { Link } from 'react-router-dom';
import AlvinPhoto from '../assets/images/Alvin.jpg';
import Input from './Input';
import { useState } from 'react';

const Header = () => {
  const [search, setSearch] = useState<string>('');

  return (
    <div className='flex items-center justify-between p-12 gap-x-12'>
      <img src={AlvinPhoto} className='size-12 rounded-xl' />
      <div className='w-96'>
        <Input value={search} onChange={(value) => setSearch(value)} placeholder='Search..' />
      </div>
      <div className='flex gap-x-12'>
        {['Overview', 'Finance', 'Calender', 'Events'].map((item) => (
          <Link className={`${item === 'Finance' ? 'font-bold' : ''}`} to={'/'}>
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
