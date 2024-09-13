import { PiGridFour } from 'react-icons/pi';
import { ClipLoader } from 'react-spinners';
import { useGlobalState } from '../../hooks/useGlobalState';
import { useCategories } from '../../hooks/useCategories';
import { useModal } from '../../hooks/useModal';
import SidebarSectionHeader from './SidebarSectionHeader';
import SidebarSectionItem from './SidebarSectionItem';
import CategoriesModal from '../Modal/CategoriesModal';

const SidebarCategoriesSection = () => {
  const { isOpen, tempType, setTempType, tempId, setTempId, openModal, closeModal } = useModal();
  const { categories } = useGlobalState();
  const { isLoading, handleCreateCategories, handleUpdateCategories, handleDeleteCategories } =
    useCategories();

  return (
    <div className='h-full py-10'>
      <SidebarSectionHeader
        title='Categories'
        isLoading={isLoading}
        onClick={() => {
          setTempType('Add');
          openModal();
        }}
      />
      <div className='space-y-6 overflow-y-auto text-center h-96'>
        {isLoading ? (
          <ClipLoader size={50} />
        ) : (
          categories?.map((item) => (
            <SidebarSectionItem
              key={item._id}
              icon={<PiGridFour className='size-8' />}
              title={item.name}
              onEdit={() => {
                setTempType('Edit');
                setTempId(item._id);
                openModal();
              }}
              onDelete={() => handleDeleteCategories(item._id)}
            />
          ))
        )}
      </div>
      <CategoriesModal
        isOpen={isOpen}
        onClose={closeModal}
        type={tempType}
        id={tempId}
        isLoading={isLoading}
        onCreate={handleCreateCategories}
        onUpdate={handleUpdateCategories}
      />
    </div>
  );
};

export default SidebarCategoriesSection;
