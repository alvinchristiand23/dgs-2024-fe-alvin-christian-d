import { useCallback, useEffect, useState } from 'react';
import { useWallets } from '../hooks/useWallets';
import { IWallet } from '../types/walletTypes';
import InputSelect from './InputSelect';
import Input from './Input';
import ButtonAction from './ButtonAction';
import { useCategories } from '../hooks/useCategories';
import { ClipLoader } from 'react-spinners';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'Add' | 'Edit' | '';
  id?: string;
}

const CategoriesModal = ({ isOpen, onClose, type, id }: IProps) => {
  const { wallets } = useWallets();

  const { isLoading, handleGetOneCategories, handleCreateCategories, handleUpdateCategories } =
    useCategories();

  const [wallet, setWallet] = useState<string>(id ? id : '');
  const [name, setName] = useState<string>('');

  const resetForm = () => {
    setWallet('');
    setName('');
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const getDetailCategories = useCallback(async () => {
    console.log(id);
    if (id) {
      const res = await handleGetOneCategories(id);
      if (res) {
        setName(res.name);
      }
    }
  }, [id, handleGetOneCategories]);

  useEffect(() => {
    getDetailCategories();
  }, [getDetailCategories]);

  const handleCloseModal = () => {
    onClose();
    resetForm();
  };

  const handleButtonAction = async () => {
    if (type === 'Add') {
      await handleCreateCategories({ wallet, name });
    } else if (type === 'Edit' && id) {
      await handleUpdateCategories({ id, name });
    }
    handleCloseModal();
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50'
      onClick={handleCloseModal}
    >
      <div
        className='relative w-full max-w-lg p-12 bg-white rounded-xl'
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        tabIndex={-1} // Ensure the modal itself is focusable
      >
        <button
          className='absolute top-6 right-6 text-secondary-text hover:text-accent-text'
          onClick={handleCloseModal}
          aria-label='Close modal'
        >
          ✖
        </button>
        <h2 className='mb-6 text-xl font-bold'>{type} Categories</h2>
        <div className='flex flex-col gap-y-6'>
          {type === 'Add' ? (
            <InputSelect
              placeholder='Wallet'
              value={wallet}
              onChange={(value) => setWallet(value)}
              options={wallets?.map((item: IWallet) => ({
                label: item.name,
                value: item._id,
              }))}
            />
          ) : null}
          <Input value={name} onChange={(value) => setName(value)} placeholder='Name' />
          <ButtonAction
            label={
              isLoading ? (
                <ClipLoader loading={true} size={10} />
              ) : type === 'Add' ? (
                'Create'
              ) : (
                'Save'
              )
            }
            onClick={handleButtonAction}
            disabled={type === 'Add' ? !name || !wallet || isLoading : !name || isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoriesModal;
