import apiClient from '../api/apiClient';
import { API_ENDPOINTS } from '../api/endpoints';
import { IWalletCreate, IWalletUpdate } from '../types/walletTypes';
import { errorHandle } from '../utility/errorHandle';

export const getAllWallets = async () => {
  try {
    const res = await apiClient.get(API_ENDPOINTS.WALLETS.GET_ALL);
    return res.data;
  } catch (error) {
    errorHandle(error);
  }
};

export const getOneWallets = async (id: string) => {
  try {
    const res = await apiClient.get(API_ENDPOINTS.WALLETS.GET_ONE(id));
    return res.data;
  } catch (error) {
    errorHandle(error);
  }
};

export const createWallets = async ({ name }: IWalletCreate) => {
  try {
    const res = await apiClient.post(API_ENDPOINTS.WALLETS.CREATE, { name });
    return res.data;
  } catch (error) {
    errorHandle(error);
  }
};

export const updateWallets = async ({ id, name }: IWalletUpdate) => {
  try {
    const res = await apiClient.put(API_ENDPOINTS.WALLETS.UPDATE(id), { name });
    return res.data;
  } catch (error) {
    errorHandle(error);
  }
};

export const deleteWallets = async (id: string) => {
  try {
    const res = await apiClient.delete(API_ENDPOINTS.WALLETS.DELETE(id));
    return res.data;
  } catch (error) {
    errorHandle(error);
  }
};
