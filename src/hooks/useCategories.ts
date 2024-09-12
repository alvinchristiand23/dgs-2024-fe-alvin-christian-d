import { useCallback, useEffect, useState } from 'react';
import {
  createCategories,
  deleteCategories,
  getAllCategories,
  getOneCategories,
  updateCategories,
} from '../services/categoriesService';
import { ICategory, ICategoryCreate, ICategoryUpdate } from '../types/categoryTypes';

export const useCategories = () => {
  const [categories, setCategories] = useState<ICategory[] | []>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetCategories = useCallback(async () => {
    setIsLoading(true);
    setCategories([]);
    try {
      const res = await getAllCategories();
      setCategories(res.data);
    } catch (error) {
      setIsError(error ? true : false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGetOneCategories = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const res = await getOneCategories(id);
      return res.data;
    } catch (error) {
      setIsError(error ? true : false);
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
        setIsError(error ? true : false);
      } finally {
        setIsLoading(false);
      }
    },
    [handleGetCategories],
  );

  const handleUpdateCategories = useCallback(async ({ id, name }: ICategoryUpdate) => {
    setIsLoading(true);
    try {
      await updateCategories({ id, name });
      setCategories((prev) => prev.map((item) => (item._id === id ? { ...item, name } : item)));
    } catch (error) {
      setIsError(error ? true : false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteCategories = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      await deleteCategories(id);
      setCategories((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      setIsError(error ? true : false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetCategories();
  }, [handleGetCategories]);

  return {
    categories,
    isError,
    isLoading,
    handleGetOneCategories,
    handleCreateCategories,
    handleUpdateCategories,
    handleDeleteCategories,
  };
};
