import ExpenseItemCard from '../components/ExpenseItemCard';
import { useExpenseItems } from '../hooks/useExpenseItems';

const Finance = () => {
  const { expenseItems } = useExpenseItems();

  return (
    <div className='flex flex-col overflow-y-auto gap-y-6 h-[50rem]'>
      {expenseItems?.map((item) => (
        <ExpenseItemCard
          title={item.title}
          amount={item.amount}
          flowType={item.flowType}
          date={item.createdAt}
        />
      ))}
    </div>
  );
};

export default Finance;
