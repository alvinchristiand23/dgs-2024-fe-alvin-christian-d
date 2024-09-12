import { ReactNode } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

interface IProps {
  children: ReactNode;
}

const MainLayout = ({ children }: IProps) => {
  return (
    <div className='grid grid-cols-4'>
      <div className='col-span-3'>
        <Header />
        {children}
      </div>
      <div className='col-span-1'>
        <Sidebar />
      </div>
    </div>
  );
};

export default MainLayout;
