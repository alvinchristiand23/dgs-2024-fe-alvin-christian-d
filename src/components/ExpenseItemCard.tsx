import Swal from 'sweetalert2';
import { PiMoneyWavy, PiPencilSimpleBold, PiXBold } from 'react-icons/pi';
import ButtonAction from './Button/ButtonAction';
import { EFlowType } from '../types/expenseItemsTypes';
import { idrFormat } from '../utility/idrFormat';
import { dateFormat } from '../utility/dateFormat';

interface IProps {
  title: string;
  date: string;
  amount: number;
  flowType: EFlowType;
  onEdit: () => void;
  onDelete: () => void;
}

const ExpenseItemCard = ({ title, date, amount, flowType, onEdit, onDelete }: IProps) => {
  return (
    <div className='flex items-center justify-between w-full p-8 bg-white rounded-xl'>
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
          <ButtonAction label={<PiPencilSimpleBold />} onClick={onEdit} />
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
