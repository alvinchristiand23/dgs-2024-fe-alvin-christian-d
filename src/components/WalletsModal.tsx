import { useCallback, useEffect, useState } from 'react';
import { useWallets } from '../hooks/useWallets';
import { IWalletCreate, IWalletUpdate } from '../types/walletTypes';
import Input from './Input';
import ButtonAction from './ButtonAction';
import { ClipLoader } from 'react-spinners';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'Add' | 'Edit' | '';
  id?: string;
  isLoading: boolean;
  onCreate: ({ name }: IWalletCreate) => void;
  onUpdate: ({ id, name }: IWalletUpdate) => void;
}

const WalletsModal = ({ isOpen, onClose, type, id, isLoading, onCreate, onUpdate }: IProps) => {
  const { handleGetOneWallets } = useWallets();

  const [name, setName] = useState<string>('');

  const resetForm = () => {
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
    if (id) {
      const res = await handleGetOneWallets(id);
      if (res) {
        setName(res.name);
      }
    }
  }, [id, handleGetOneWallets]);

  useEffect(() => {
    getDetailCategories();
  }, [getDetailCategories]);

  const handleCloseModal = () => {
    onClose();
    resetForm();
  };

  const handleButtonAction = async () => {
    if (type === 'Add') {
      await onCreate({ name });
    } else if (type === 'Edit' && id) {
      await onUpdate({ id, name });
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
        <h2 className='mb-6 text-xl font-bold'>{type} Wallets</h2>
        <div className='flex flex-col gap-y-6'>
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
            disabled={!name || isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default WalletsModal;
