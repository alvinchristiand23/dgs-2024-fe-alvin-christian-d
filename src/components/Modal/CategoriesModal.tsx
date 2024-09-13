import { useCallback, useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useGlobalState } from '../../hooks/useGlobalState';
import { useCategories } from '../../hooks/useCategories';
import { ICategoryCreate, ICategoryUpdate } from '../../types/categoryTypes';
import InputSelect from '../Input/InputSelect';
import Input from '../Input/Input';
import ButtonAction from '../Button/ButtonAction';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'Add' | 'Edit' | '';
  id?: string;
  isLoading: boolean;
  onCreate: ({ wallet, name }: ICategoryCreate) => void;
  onUpdate: ({ id, name }: ICategoryUpdate) => void;
}

const CategoriesModal = ({ isOpen, onClose, type, id, isLoading, onCreate, onUpdate }: IProps) => {
  const { wallets } = useGlobalState();
  const { isLoading: isLoadingGetOne, handleGetOneCategories } = useCategories(true);

  const [wallet, setWallet] = useState<string>('');
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
    if (id) {
      const res = await handleGetOneCategories(id);
      if (res) {
        setWallet(res.wallet);
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

  const handleButtonAction = () => {
    if (type === 'Add') {
      onCreate({ wallet, name });
    } else if (type === 'Edit' && id) {
      onUpdate({ id, name });
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
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <button
          className='absolute top-6 right-8 text-secondary-text hover:text-accent-text'
          onClick={handleCloseModal}
          aria-label='Close modal'
        >
          ✖
        </button>
        <h2 className='mb-6 text-xl font-bold'>{type} Categories</h2>
        {isLoadingGetOne ? (
          <div className='text-center'>
            <ClipLoader size={50} />
          </div>
        ) : (
          <div className='flex flex-col gap-y-6'>
            <InputSelect
              label='Wallet'
              isRequired
              placeholder='Wallet'
              value={wallet}
              handleOnChange={setWallet}
              options={wallets?.map((item) => ({
                label: item.name,
                value: item._id,
              }))}
              disabled={type === 'Edit'}
            />
            <Input label='Name' isRequired value={name} handleOnChange={setName} />
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
        )}
      </div>
    </div>
  );
};

export default CategoriesModal;
