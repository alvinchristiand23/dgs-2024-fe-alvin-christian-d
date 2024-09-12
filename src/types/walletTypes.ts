import { IExpenseItem } from './expenseItemsTypes';

export interface IWalletCreate {
  name: string;
}

export interface IWalletUpdate {
  id: string;
  name: string;
}

export interface IWallet {
  _id: string;
  name: string;
  expenseItems?: IExpenseItem[] | [];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
