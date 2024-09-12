import { useCallback, useEffect, useState } from 'react';
import {
  createExpenseItems,
  deleteExpenseItems,
  getAllExpenseItems,
  getOneExpenseItems,
  updateExpenseItems,
} from '../services/expenseItemsService';
import { IExpenseItem, IExpenseItemCreate, IExpenseItemUpdate } from '../types/expenseItemsTypes';

export const useExpenseItems = () => {
  const [expenseItems, setExpenseItems] = useState<IExpenseItem[] | []>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetExpenseItems = useCallback(async () => {
    setIsLoading(true);
    setExpenseItems([]);
    try {
      const res = await getAllExpenseItems();
      setExpenseItems(res.data);
    } catch (error) {
      setIsError(error ? true : false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGetOneExpenseItems = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const res = await getOneExpenseItems(id);
      return res.data;
    } catch (error) {
      setIsError(error ? true : false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreateExpenseItems = useCallback(
    async ({ title, amount, wallet, category, flowType }: IExpenseItemCreate) => {
      setIsLoading(true);
      try {
        await createExpenseItems({ title, amount, wallet, category, flowType });
        await handleGetExpenseItems();
      } catch (error) {
        setIsError(error ? true : false);
      } finally {
        setIsLoading(false);
      }
    },
    [handleGetExpenseItems],
  );

  const handleUpdateExpenseItems = useCallback(async ({ id, amount }: IExpenseItemUpdate) => {
    setIsLoading(true);
    try {
      await updateExpenseItems({ id, amount });
      setExpenseItems((prev) => prev.map((item) => (item._id === id ? { ...item, name } : item)));
    } catch (error) {
      setIsError(error ? true : false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteExpenseItems = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      await deleteExpenseItems(id);
      setExpenseItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      setIsError(error ? true : false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetExpenseItems();
  }, [handleGetExpenseItems]);

  return {
    expenseItems,
    isError,
    isLoading,
    handleGetOneExpenseItems,
    handleCreateExpenseItems,
    handleUpdateExpenseItems,
    handleDeleteExpenseItems,
  };
};
