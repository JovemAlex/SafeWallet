import {
  FETCH_CURRENCIES,
  FETCH_CURRENCIES_FALSE,
  FETCH_CURRENCIES_TRUE,
  ADD_EXPENSES,
  REMOVE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  error: null,
};

const wallet = (state = INITIAL_STATE, { type, payload, error, expenses }) => {
  switch (type) {
  case FETCH_CURRENCIES:
    return {
      ...state,
    };
  case FETCH_CURRENCIES_TRUE:
    return {
      ...state,
      currencies: payload,
    };
  case FETCH_CURRENCIES_FALSE:
    return {
      ...state,
      error,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, expenses],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: [...expenses],
    };
  default:
    return state;
  }
};

export default wallet;
