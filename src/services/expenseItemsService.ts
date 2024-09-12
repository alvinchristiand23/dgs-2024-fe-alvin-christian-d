import apiClient from '../api/apiClient';
import { API_ENDPOINTS } from '../api/endpoints';
import { IExpenseItemCreate, IExpenseItemUpdate } from '../types/expenseItemsTypes';
import { errorHandle } from '../utility/errorHandle';

export const getAllExpenseItems = async () => {
  try {
    const res = await apiClient.get(API_ENDPOINTS.EXPENSE_ITEMS.GET_ALL);
    return res.data;
  } catch (error) {
    errorHandle(error);
  }
};

export const getOneExpenseItems = async (id: string) => {
  try {
    const res = await apiClient.get(API_ENDPOINTS.EXPENSE_ITEMS.GET_ONE(id));
    return res.data;
  } catch (error) {
    errorHandle(error);
  }
};

export const createExpenseItems = async ({
  title,
  amount,
  wallet,
  category,
  flowType,
}: IExpenseItemCreate) => {
  try {
    const res = await apiClient.post(API_ENDPOINTS.EXPENSE_ITEMS.CREATE, {
      title,
      amount,
      wallet,
      category,
      flowType,
    });
    return res.data;
  } catch (error) {
    errorHandle(error);
  }
};

export const updateExpenseItems = async ({ id, amount }: IExpenseItemUpdate) => {
  try {
    const res = await apiClient.put(API_ENDPOINTS.EXPENSE_ITEMS.UPDATE(id), { amount });
    return res.data;
  } catch (error) {
    errorHandle(error);
  }
};

export const deleteExpenseItems = async (id: string) => {
  try {
    const res = await apiClient.delete(API_ENDPOINTS.EXPENSE_ITEMS.DELETE(id));
    return res.data;
  } catch (error) {
    errorHandle(error);
  }
};
