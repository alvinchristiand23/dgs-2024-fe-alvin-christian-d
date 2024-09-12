import { EFlowType } from '../types/expenseItemsTypes';
import { PiMoneyWavy, PiPencilSimpleBold, PiXBold } from 'react-icons/pi';
import { idrFormat } from '../utility/idrFormat';
import ButtonAction from './ButtonAction';
import { dateFormat } from '../utility/dateFormat';
import Swal from 'sweetalert2';

interface IProps {
  title: string;
  date: string;
  amount: number;
  flowType: EFlowType;
  onDelete: () => void;
}

const ExpenseItemCard = ({ title, date, amount, flowType, onDelete }: IProps) => {
  return (
    <div className='flex items-center justify-between p-8 mx-12 bg-white rounded-xl'>
      <div className='flex gap-x-4'>
        <PiMoneyWavy className='size-12' />
        <div className='flex flex-col'>
          <h3 className='text-lg font-bold'>{title}</h3>
          <h4>{dateFormat(date)}</h4>
        </div>
      </div>
      <div className='flex items-center gap-x-12'>
        <h3 className='font-bold'>{`${flowType === EFlowType.INCOME ? '' : '-'} ${idrFormat(
          amount,
        )}`}</h3>
        <div className='flex gap-x-4'>
          <ButtonAction label={<PiPencilSimpleBold />} onClick={() => {}} />
          <ButtonAction
            label={<PiXBold />}
            onClick={() => {
              Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#019EA9',
                confirmButtonText: 'Yes',
                reverseButtons: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  onDelete();
                }
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseItemCard;
