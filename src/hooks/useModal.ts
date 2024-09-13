import { useState, useCallback } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tempType, setTempType] = useState<'Add' | 'Edit' | undefined>(undefined);
  const [tempId, setTempId] = useState<string>('');

  const resetTemp = () => {
    setTempType(undefined);
    setTempId('');
  };

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    resetTemp();
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    tempType,
    setTempType,
    tempId,
    setTempId,
  };
};
