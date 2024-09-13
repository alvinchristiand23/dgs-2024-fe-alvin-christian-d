import { ReactNode } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar/Sidebar';

interface IProps {
  children: ReactNode;
}

const MainLayout = ({ children }: IProps) => {
  return (
    <div className='flex justify-between'>
      <div className='w-full'>
        <Header />
        {children}
      </div>
      <div className='w-[600px]'>
        <Sidebar />
      </div>
    </div>
  );
};

export default MainLayout;
