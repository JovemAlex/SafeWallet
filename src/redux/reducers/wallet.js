import {
  FETCH_CURRENCIES,
  FETCH_CURRENCIES_FALSE,
  FETCH_CURRENCIES_TRUE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  error: null,
};

const wallet = (state = INITIAL_STATE, { type, payload, error }) => {
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
  default:
    return state;
  }
};

export default wallet;
