import { useCallback, useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useExpenseItems } from '../../hooks/useExpenseItems';
import { useWallets } from '../../hooks/useWallets';
import { useCategories } from '../../hooks/useCategories';
import { EFlowType, IExpenseItemCreate, IExpenseItemUpdate } from '../../types/expenseItemsTypes';
import ButtonAction from '../Button/ButtonAction';
import Input from '../Input/Input';
import InputSelect from '../Input/InputSelect';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'Add' | 'Edit' | '';
  id?: string;
  isLoading: boolean;
  onCreate: ({ title, amount, wallet, category, flowType }: IExpenseItemCreate) => void;
  onUpdate: ({ id, amount }: IExpenseItemUpdate) => void;
}

const ExpenseItemsModal = ({
  isOpen,
  onClose,
  type,
  id,
  isLoading,
  onCreate,
  onUpdate,
}: IProps) => {
  const { isLoading: isLoadingGetOne, handleGetOneExpenseItems } = useExpenseItems(true);
  const { wallets } = useWallets();
  const { categories } = useCategories();

  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<string>('0');
  const [wallet, setWallet] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [flowType, setFlowType] = useState<string | EFlowType>('');

  const resetForm = () => {
    setTitle('');
    setAmount('0');
    setWallet('');
    setCategory('');
    setFlowType(EFlowType.INCOME);
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

  const getDetailExpenseItems = useCallback(async () => {
    if (id) {
      const res = await handleGetOneExpenseItems(id);
      if (res) {
        setTitle(res.title);
        setAmount(res.amount);
        setWallet(res.wallet);
        setCategory(res.category);
        setFlowType(res.flowType);
      }
    }
  }, [handleGetOneExpenseItems, id]);

  useEffect(() => {
    getDetailExpenseItems();
  }, [getDetailExpenseItems]);

  const handleCloseModal = () => {
    onClose();
    resetForm();
  };

  const handleButtonAction = async () => {
    if (type === 'Add') {
      onCreate({ title, amount: Number(amount), wallet, category, flowType });
    } else if (type === 'Edit' && id) {
      onUpdate({ id, amount: Number(amount) });
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
        <h2 className='mb-6 text-xl font-bold'>{type} Expense Items</h2>
        {isLoadingGetOne ? (
          <div className='text-center'>
            <ClipLoader size={50} />
          </div>
        ) : (
          <div className='flex flex-col gap-y-6'>
            <Input
              label='Title'
              isRequired
              value={title}
              handleOnChange={setTitle}
              disabled={type === 'Edit'}
            />
            <Input
              type='number'
              label='Amount'
              isRequired
              value={Number(amount)}
              handleOnChange={setAmount}
            />
            <InputSelect
              label='Wallet'
              isRequired
              placeholder='Wallet'
              value={wallet}
              handleOnChange={setWallet}
              options={wallets?.map((item) => ({
                value: item._id,
                label: item.name,
              }))}
              disabled={type === 'Edit'}
            />
            <InputSelect
              label='Category'
              isRequired
              placeholder='Category'
              value={category}
              handleOnChange={setCategory}
              options={categories?.map((item) => ({
                value: item._id,
                label: item.name,
              }))}
              disabled={type === 'Edit'}
            />
            <InputSelect
              label='Flow Type'
              isRequired
              placeholder='Flow Type'
              value={flowType}
              handleOnChange={setFlowType}
              options={Object.keys(EFlowType)?.map((item) => ({
                value: item.toLowerCase(),
                label: item.charAt(0) + item.slice(1, item.length).toLowerCase(),
              }))}
              disabled={type === 'Edit'}
            />
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
              disabled={
                type === 'Add'
                  ? !title || !amount || !wallet || !category || !flowType || isLoading
                  : !amount || isLoading
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseItemsModal;
