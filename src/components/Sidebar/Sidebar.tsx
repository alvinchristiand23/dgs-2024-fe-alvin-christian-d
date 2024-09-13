import SidebarHeader from './SidebarHeader';
import SidebarCategoriesSection from './SidebarCategoriesSection';
import SidebarWalletsSection from './SidebarWalletsSection';

const Sidebar = () => {
  return (
    <div className='grid min-h-screen overflow-hidden grid-rows-7 rounded-r-2xl bg-secondary-background'>
      <div className='row-span-1'>
        <SidebarHeader />
      </div>
      <div className='row-span-2'>
        <SidebarWalletsSection />
      </div>
      <div className='row-span-4'>
        <SidebarCategoriesSection />
      </div>
    </div>
  );
};

export default Sidebar;
