export const PERSONAL_INFO = 'PERSONAL_INFO';
export const CURRENCIES_INFO = 'CURRENCIES_INFO';
export const EXPENSES_INFO = 'EXPENSES_INFO';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';

export const personalInfo = (email) => ({
  type: PERSONAL_INFO,
  payload: email,
});

export const currenciesInfo = (currencies) => ({
  type: CURRENCIES_INFO,
  payload: currencies,
});

export const expensesInfo = (expenses) => ({
  type: EXPENSES_INFO,
  payload: expenses,
});

export const deleteExpenses = (id) => ({
  type: DELETE_EXPENSES,
  payload: id,
});
