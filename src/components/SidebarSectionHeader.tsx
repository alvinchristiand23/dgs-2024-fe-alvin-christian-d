import ButtonAdd from './ButtonAdd';

interface IProps {
  title: string;
  isLoading: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SidebarSectionHeader = ({ title, isLoading, onClick }: IProps) => {
  return (
    <div className='flex items-center justify-between px-12 mb-8'>
      <h3 className='text-xl font-semibold'>{title}</h3>
      <ButtonAdd onClick={onClick} disabled={isLoading} />
    </div>
  );
};

export default SidebarSectionHeader;
