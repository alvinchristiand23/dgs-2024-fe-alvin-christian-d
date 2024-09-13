import React from 'react';
import { PiPencilSimpleBold, PiTrashSimpleBold } from 'react-icons/pi';
import Swal from 'sweetalert2';
import ButtonAction from '../Button/ButtonAction';

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
        <div className={`p-2 text-white rounded-xl bg-blue-400`}>{icon}</div>
        <div className='flex flex-col items-start leading-normal'>
          <h3 className='font-semibold'>{title}</h3>
          {subTitle && <h3 className='font-medium text-secondary-text'>{subTitle}</h3>}
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
