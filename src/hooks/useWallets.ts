import { useCallback, useEffect, useState } from 'react';
import {
  createWallets,
  deleteWallets,
  getAllWallets,
  getOneWallets,
  updateWallets,
} from '../services/walletsService';
import { IWalletCreate, IWalletUpdate } from '../types/walletTypes';
import { toast } from 'react-toastify';
import { useGlobalState } from './useGlobalState';

export const useWallets = (isPreventEffect?: boolean) => {
  const { setWallets } = useGlobalState();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetWallets = useCallback(async () => {
    setIsLoading(true);
    setWallets([]);
    try {
      const res = await getAllWallets();
      setWallets(res.data);
    } catch (error) {
      setIsError(!!error);
    } finally {
      setIsLoading(false);
    }
  }, [setWallets]);

  const handleGetOneWallets = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const res = await getOneWallets(id);
      return res.data;
    } catch (error) {
      setIsError(!!error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreateWallets = useCallback(
    async ({ name }: IWalletCreate) => {
      setIsLoading(true);
      try {
        await createWallets({ name });
        await handleGetWallets();
      } catch (error) {
        setIsError(!!error);
      } finally {
        toast.success('Successfully create wallets.');
        setIsLoading(false);
      }
    },
    [handleGetWallets],
  );

  const handleUpdateWallets = useCallback(
    async ({ id, name }: IWalletUpdate) => {
      setIsLoading(true);
      try {
        await updateWallets({ id, name });
        setWallets((prev) => prev.map((item) => (item._id === id ? { ...item, name } : item)));
      } catch (error) {
        setIsError(!!error);
      } finally {
        toast.success('Successfully update wallets.');
        setIsLoading(false);
      }
    },
    [setWallets],
  );

  const handleDeleteWallets = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        await deleteWallets(id);
        setWallets((prev) => prev.filter((item) => item._id !== id));
      } catch (error) {
        setIsError(!!error);
      } finally {
        toast.success('Successfully delete wallets.');
        setIsLoading(false);
      }
    },
    [setWallets],
  );

  useEffect(() => {
    if (!isPreventEffect) {
      handleGetWallets();
    }
  }, [handleGetWallets, isPreventEffect]);

  return {
    isError,
    isLoading,
    handleGetOneWallets,
    handleCreateWallets,
    handleUpdateWallets,
    handleDeleteWallets,
  };
};
