import { ICategory } from './categoryTypes';
import { IWallet } from './walletTypes';

export enum EFlowType {
  INCOME = 'income',
  OUTCOME = 'outcome',
}

export interface IExpenseItemCreate {
  title: string;
  amount: number;
  wallet: string;
  category: string;
  flowType: EFlowType;
}

export interface IExpenseItemUpdate {
  id: string;
  amount: number;
}

export interface IExpenseItem {
  _id: string;
  category?: ICategory | null;
  wallet?: IWallet | null;
  amount: number;
  title: string;
  flowType: EFlowType;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
