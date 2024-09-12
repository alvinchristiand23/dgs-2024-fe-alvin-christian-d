import { useState } from 'react';
import { PiWallet, PiGridFour } from 'react-icons/pi';
import { useCategories } from '../hooks/useCategories';
import { useWallets } from '../hooks/useWallets';
import SidebarSectionHeader from './SidebarSectionHeader';
import SidebarSectionItem from './SidebarSectionItem';
import SidebarHeader from './SidebarHeader';
import CategoriesModal from './CategoriesModal';
import { ClipLoader } from 'react-spinners';
import WalletsModal from './WalletsModal';

const Sidebar = () => {
  const [isOpenModalCategories, setIsOpenModalCategories] = useState<boolean>(false);
  const [isOpenModalWallets, setIsOpenModalWallets] = useState<boolean>(false);
  const [tempType, setTempType] = useState<'Add' | 'Edit' | ''>('');
  const [tempId, setTempId] = useState<string>('');

  const {
    wallets,
    isLoading: isLoadingWallets,
    handleCreateWallets,
    handleUpdateWallets,
    handleDeleteWallets,
  } = useWallets();
  const {
    categories,
    isLoading: isLoadingCategories,
    handleCreateCategories,
    handleUpdateCategories,
    handleDeleteCategories,
  } = useCategories();

  return (
    <div className='grid min-h-screen overflow-hidden grid-rows-7 rounded-r-2xl bg-secondary-background'>
      <div className='row-span-1'>
        <SidebarHeader />
      </div>
      <div className='row-span-2'>
        <div className='h-full py-10 border-b-2'>
          <SidebarSectionHeader
            title='Wallets'
            isLoading={isLoadingWallets}
            onClick={() => {
              setTempType('Add');
              setIsOpenModalWallets(true);
            }}
          />
          <div className='h-32 space-y-6 overflow-y-auto text-center'>
            {isLoadingWallets ? (
              <ClipLoader loading={true} size={50} />
            ) : (
              wallets?.map((item) => (
                <SidebarSectionItem
                  key={item._id}
                  icon={<PiWallet className='size-8' />}
                  title={item.name}
                  onEdit={() => {
                    setTempId(item._id);
                    setTempType('Edit');
                    setIsOpenModalWallets(true);
                  }}
                  onDelete={() => handleDeleteWallets(item._id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className='row-span-4'>
        <div className='h-full py-10'>
          <SidebarSectionHeader
            title='Categories'
            isLoading={isLoadingCategories}
            onClick={() => {
              setTempType('Add');
              setIsOpenModalCategories(true);
            }}
          />
          <div className='space-y-6 overflow-y-auto text-center h-96'>
            {isLoadingCategories ? (
              <ClipLoader loading={true} size={50} />
            ) : (
              categories?.map((item) => (
                <SidebarSectionItem
                  key={item._id}
                  icon={<PiGridFour className='size-8' />}
                  title={item.name}
                  onEdit={() => {
                    setTempId(item._id);
                    setTempType('Edit');
                    setIsOpenModalCategories(true);
                  }}
                  onDelete={() => handleDeleteCategories(item._id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <CategoriesModal
        isOpen={isOpenModalCategories}
        onClose={() => {
          setIsOpenModalCategories(false);
          setTempId('');
          setTempType('');
        }}
        type={tempType}
        id={tempId}
        isLoading={isLoadingCategories}
        onCreate={handleCreateCategories}
        onUpdate={handleUpdateCategories}
      />
      <WalletsModal
        isOpen={isOpenModalWallets}
        onClose={() => {
          setIsOpenModalWallets(false);
          setTempId('');
          setTempType('');
        }}
        type={tempType}
        id={tempId}
        isLoading={isLoadingWallets}
        onCreate={handleCreateWallets}
        onUpdate={handleUpdateWallets}
      />
    </div>
  );
};

export default Sidebar;
