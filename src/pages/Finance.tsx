import { ClipLoader } from 'react-spinners';
import { useExpenseItems } from '../hooks/useExpenseItems';
import { useModal } from '../hooks/useModal';
import ButtonAdd from '../components/Button/ButtonAdd';
import ExpenseItemCard from '../components/ExpenseItemCard';
import ExpenseItemsModal from '../components/Modal/ExpenseItemsModal';

const Finance = () => {
  const { isOpen, openModal, closeModal, tempType, setTempType, tempId, setTempId } = useModal();

  const {
    expenseItems,
    isLoading,
    handleCreateExpenseItems,
    handleUpdateExpenseItems,
    handleDeleteExpenseItems,
  } = useExpenseItems();

  return (
    <div>
      <div className='flex items-center justify-between px-12 mb-6'>
        <label>
          Number of Transaction: <strong>{expenseItems.length}</strong>
        </label>
        <ButtonAdd
          onClick={() => {
            setTempType('Add');
            openModal();
          }}
          disabled={isLoading}
        />
      </div>
      <div className='flex flex-col overflow-y-auto gap-y-6 h-[48rem] px-12 items-center'>
        {isLoading ? (
          <ClipLoader size={50} />
        ) : (
          expenseItems?.map((item) => (
            <ExpenseItemCard
              key={item._id}
              title={item.title}
              amount={item.amount}
              flowType={item.flowType}
              date={item.createdAt}
              onEdit={() => {
                setTempType('Edit');
                setTempId(item._id);
                openModal();
              }}
              onDelete={() => handleDeleteExpenseItems(item._id)}
            />
          ))
        )}
      </div>
      <ExpenseItemsModal
        isOpen={isOpen}
        onClose={closeModal}
        type={tempType}
        id={tempId}
        isLoading={isLoading}
        onCreate={handleCreateExpenseItems}
        onUpdate={handleUpdateExpenseItems}
      />
    </div>
  );
};

export default Finance;
