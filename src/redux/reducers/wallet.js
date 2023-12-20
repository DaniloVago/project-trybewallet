import { CURRENCIES_INFO, EXPENSES_INFO, DELETE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES_INFO:
    return {
      ...state,
      currencies: action.payload,
    };
  case EXPENSES_INFO:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.payload,
      ],
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: action.payload,
    };

  default: return state;
  }
};

export default wallet;
