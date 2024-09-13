import { useCallback, useEffect, useState } from 'react';
import {
  createCategories,
  deleteCategories,
  getAllCategories,
  getOneCategories,
  updateCategories,
} from '../services/categoriesService';
import { ICategoryCreate, ICategoryUpdate } from '../types/categoryTypes';
import { toast } from 'react-toastify';
import { useGlobalState } from './useGlobalState';

export const useCategories = (isPreventEffect?: boolean) => {
  const { setCategories } = useGlobalState();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetCategories = useCallback(async () => {
    setIsLoading(true);
    setCategories([]);
    try {
      const res = await getAllCategories();
      setCategories(res.data);
    } catch (error) {
      setIsError(!!error);
    } finally {
      setIsLoading(false);
    }
  }, [setCategories]);

  const handleGetOneCategories = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const res = await getOneCategories(id);
      return res.data;
    } catch (error) {
      setIsError(!!error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreateCategories = useCallback(
    async ({ wallet, name }: ICategoryCreate) => {
      setIsLoading(true);
      try {
        await createCategories({ wallet, name });
        await handleGetCategories();
      } catch (error) {
        setIsError(!!error);
      } finally {
        toast.success('Successfully create categories.');
        setIsLoading(false);
      }
    },
    [handleGetCategories],
  );

  const handleUpdateCategories = useCallback(
    async ({ id, name }: ICategoryUpdate) => {
      setIsLoading(true);
      try {
        await updateCategories({ id, name });
        setCategories((prev) => prev.map((item) => (item._id === id ? { ...item, name } : item)));
      } catch (error) {
        setIsError(!!error);
      } finally {
        toast.success('Successfully update categories.');
        setIsLoading(false);
      }
    },
    [setCategories],
  );

  const handleDeleteCategories = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        await deleteCategories(id);
        setCategories((prev) => prev.filter((item) => item._id !== id));
      } catch (error) {
        setIsError(!!error);
      } finally {
        toast.success('Successfully delete categories.');
        setIsLoading(false);
      }
    },
    [setCategories],
  );

  useEffect(() => {
    if (!isPreventEffect) {
      handleGetCategories();
    }
  }, [handleGetCategories, isPreventEffect]);

  return {
    isError,
    isLoading,
    handleGetOneCategories,
    handleCreateCategories,
    handleUpdateCategories,
    handleDeleteCategories,
  };
};
