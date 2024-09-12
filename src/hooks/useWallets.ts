import { useCallback, useEffect, useState } from 'react';
import {
  createWallets,
  deleteWallets,
  getAllWallets,
  getOneWallets,
  updateWallets,
} from '../services/walletsService';
import { IWallet, IWalletUpdate } from '../types/walletTypes';

export const useWallets = () => {
  const [wallets, setWallets] = useState<IWallet[] | []>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetWallets = useCallback(async () => {
    setIsLoading(true);
    setWallets([]);
    try {
      const res = await getAllWallets();
      setWallets(res.data);
    } catch (error) {
      setIsError(error ? true : false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGetOneWallets = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const res = await getOneWallets(id);
      return res.data;
    } catch (error) {
      setIsError(error ? true : false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreateWallets = useCallback(
    async ({ name }: IWallet) => {
      setIsLoading(true);
      try {
        await createWallets({ name });
        await handleGetWallets();
      } catch (error) {
        setIsError(error ? true : false);
      } finally {
        setIsLoading(false);
      }
    },
    [handleGetWallets],
  );

  const handleUpdateWallets = useCallback(async ({ id, name }: IWalletUpdate) => {
    setIsLoading(true);
    try {
      await updateWallets({ id, name });
      setWallets((prev) => prev.map((item) => (item._id === id ? { ...item, name } : item)));
    } catch (error) {
      setIsError(error ? true : false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteWallets = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      await deleteWallets(id);
      setWallets((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      setIsError(error ? true : false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetWallets();
  }, [handleGetWallets]);

  return {
    wallets,
    isError,
    isLoading,
    handleGetOneWallets,
    handleCreateWallets,
    handleUpdateWallets,
    handleDeleteWallets,
  };
};
