import { IWallet } from './walletTypes';

export interface ICategoryCreate {
  wallet: string;
  name: string;
}

export interface ICategoryUpdate {
  id: string;
  name: string;
}

export interface ICategory {
  _id: string;
  name: string;
  wallet?: IWallet | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
