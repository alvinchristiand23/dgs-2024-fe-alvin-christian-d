import React from 'react';
import ButtonAction from './ButtonAction';
import { PiPencilSimpleBold, PiTrashSimpleBold } from 'react-icons/pi';
import Swal from 'sweetalert2';

interface IProps {
  icon: React.ReactNode;
  title: string;
  subTitle?: string;
  onEdit: () => void;
  onDelete: () => void;
}

const SidebarSectionItem = ({ icon, title, subTitle, onEdit, onDelete }: IProps) => {
  return (
    <div className='flex items-center justify-between px-12'>
      <div className='flex items-center gap-x-4'>
        <div className={`p-2 text-white rounded-xl bg-red-500`}>{icon}</div>
        <div className='leading-tight'>
          <h3 className='font-semibold'>{title}</h3>
          {subTitle ? <h4 className='font-medium text-secondary-text'>{subTitle}</h4> : null}
        </div>
      </div>
      <div className='space-x-3'>
        <ButtonAction label={<PiPencilSimpleBold className='size-5' />} onClick={onEdit} />
        <ButtonAction
          label={<PiTrashSimpleBold className='size-5' />}
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
  );
};

export default SidebarSectionItem;
