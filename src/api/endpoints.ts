export const API_ENDPOINTS = {
  CATEGORIES: {
    GET_ALL: '/categories',
    GET_ONE: (id: string) => `/categories/${id}`,
    CREATE: `/categories`,
    UPDATE: (id: string) => `/categories/${id}`,
    DELETE: (id: string) => `/categories/${id}`,
  },
  WALLETS: {
    GET_ALL: '/wallets',
    GET_ONE: (id: string) => `/wallets/${id}`,
    CREATE: `/wallets`,
    UPDATE: (id: string) => `/wallets/${id}`,
    DELETE: (id: string) => `/wallets/${id}`,
  },
  EXPENSE_ITEMS: {
    GET_ALL: '/expense-items',
    GET_ONE: (id: string) => `/expense-items/${id}`,
    CREATE: `/expense-items`,
    UPDATE: (id: string) => `/expense-items/${id}`,
    DELETE: (id: string) => `/expense-items/${id}`,
  },
};
