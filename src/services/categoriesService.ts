import apiClient from '../api/apiClient';
import { API_ENDPOINTS } from '../api/endpoints';
import { ICategoryCreate, ICategoryUpdate } from '../types/categoryTypes';
import { errorHandle } from '../utility/errorHandle';

export const getAllCategories = async () => {
  try {
    const res = await apiClient.get(API_ENDPOINTS.CATEGORIES.GET_ALL);
    return res.data;
  } catch (error) {
    errorHandle(error);
  }
};

export const getOneCategories = async (id: string) => {
  try {
    const res = await apiClient.get(API_ENDPOINTS.CATEGORIES.GET_ONE(id));
    return res.data;
  } catch (error) {
    errorHandle(error);
  }
};

export const createCategories = async ({ wallet, name }: ICategoryCreate) => {
  try {
    const res = await apiClient.post(API_ENDPOINTS.CATEGORIES.CREATE, { wallet, name });
    return res.data;
  } catch (error) {
    errorHandle(error);
  }
};

export const updateCategories = async ({ id, name }: ICategoryUpdate) => {
  try {
    const res = await apiClient.put(API_ENDPOINTS.CATEGORIES.UPDATE(id), {
      name,
    });
    return res.data;
  } catch (error) {
    errorHandle(error);
  }
};

export const deleteCategories = async (id: string) => {
  try {
    const res = await apiClient.delete(API_ENDPOINTS.CATEGORIES.DELETE(id));
    return res.data;
  } catch (error) {
    errorHandle(error);
  }
};
