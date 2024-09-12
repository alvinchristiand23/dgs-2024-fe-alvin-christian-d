import { EFlowType } from '../types/expenseItemsTypes';
import { PiAcorn, PiXBold } from 'react-icons/pi';
import { idrFormat } from '../utility/idrFormat';
import ButtonAction from './ButtonAction';
import { dateFormat } from '../utility/dateFormat';

interface IProps {
  title: string;
  date: string;
  amount: number;
  flowType: EFlowType;
}

const ExpenseItemCard = ({ title, date, amount, flowType }: IProps) => {
  return (
    <div className='flex items-center justify-between p-8 mx-12 bg-white rounded-xl'>
      <div className='flex gap-x-4'>
        <PiAcorn className='size-12' />
        <div className='flex flex-col'>
          <h3 className='text-lg font-bold'>{title}</h3>
          <h4>{dateFormat(date)}</h4>
        </div>
      </div>
      <div className='flex items-center gap-x-6'>
        <h3 className='font-bold'>{`${flowType === EFlowType.INCOME ? '' : '-'} ${idrFormat(
          amount,
        )}`}</h3>
        <ButtonAction label={<PiXBold />} onClick={() => {}} />
      </div>
    </div>
  );
};

export default ExpenseItemCard;
