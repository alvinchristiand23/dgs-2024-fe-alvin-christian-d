import { PiWallet } from 'react-icons/pi';
import { ClipLoader } from 'react-spinners';
import { useGlobalState } from '../../hooks/useGlobalState';
import { useWallets } from '../../hooks/useWallets';
import { useModal } from '../../hooks/useModal';
import SidebarSectionItem from './SidebarSectionItem';
import SidebarSectionHeader from './SidebarSectionHeader';
import WalletsModal from '../Modal/WalletsModal';
import { idrFormat } from '../../utility/idrFormat';

const SidebarWalletsSection = () => {
  const { isOpen, openModal, closeModal, tempType, setTempType, tempId, setTempId } = useModal();
  const { wallets } = useGlobalState();
  const {
    isLoading: isLoadingWallets,
    handleCreateWallets,
    handleUpdateWallets,
    handleDeleteWallets,
  } = useWallets();

  return (
    <div className='h-full py-10 border-b-2'>
      <SidebarSectionHeader
        title='Wallets'
        isLoading={isLoadingWallets}
        onClick={() => {
          setTempType('Add');
          openModal();
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
              subTitle={idrFormat(item.totalAmount ?? 0)}
              onEdit={() => {
                setTempId(item._id);
                setTempType('Edit');
                openModal();
              }}
              onDelete={() => handleDeleteWallets(item._id)}
            />
          ))
        )}
      </div>
      <WalletsModal
        isOpen={isOpen}
        onClose={closeModal}
        type={tempType}
        id={tempId}
        isLoading={isLoadingWallets}
        onCreate={handleCreateWallets}
        onUpdate={handleUpdateWallets}
      />
    </div>
  );
};

export default SidebarWalletsSection;
