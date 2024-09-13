import { PiBellRinging } from 'react-icons/pi';
import AlvinPhoto from '../../assets/images/Alvin.webp';

const SidebarHeader = () => {
  return (
    <div className='flex items-center justify-end h-full px-12 gap-x-6'>
      <PiBellRinging className='size-6' />
      <img src={AlvinPhoto} alt='Alvin' loading='lazy' className='size-12 rounded-xl' />
    </div>
  );
};

export default SidebarHeader;
