import { createContext, ReactNode, useMemo, useState, Dispatch, SetStateAction } from 'react';
import { ICategory } from '../types/categoryTypes';
import { IWallet } from '../types/walletTypes';

interface GlobalStateContextType {
  categories: ICategory[];
  setCategories: Dispatch<SetStateAction<ICategory[]>>;
  wallets: IWallet[];
  setWallets: Dispatch<SetStateAction<IWallet[]>>;
}

export const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

interface GlobalState {
  categories: ICategory[];
  wallets: IWallet[];
}

// Initial state values
const initialState: GlobalState = {
  categories: [],
  wallets: [],
};

interface IProps {
  children: ReactNode;
}

export const GlobalStateProvider = ({ children }: IProps) => {
  const [categories, setCategories] = useState<ICategory[]>(initialState.categories);
  const [wallets, setWallets] = useState<IWallet[]>(initialState.wallets);

  const contextValue = useMemo(
    () => ({
      categories,
      setCategories,
      wallets,
      setWallets,
    }),
    [categories, wallets],
  );

  return <GlobalStateContext.Provider value={contextValue}>{children}</GlobalStateContext.Provider>;
};
