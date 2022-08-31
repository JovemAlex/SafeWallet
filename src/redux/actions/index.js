// Coloque aqui suas actions
import fetchAPI from '../services/index';

const USER_EMAIL = 'USER_EMAIL';
const emailValue = (payload) => ({
  type: USER_EMAIL,
  payloaduser: payload,
});

const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
const fetchCurrencies = () => ({
  type: FETCH_CURRENCIES,
});

const FETCH_CURRENCIES_TRUE = 'FETCH_CURRENCIES_TRUE';
const fetchCurrenciesTrue = (data) => ({
  type: FETCH_CURRENCIES_TRUE,
  payload: data,
});

const FETCH_CURRENCIES_FALSE = 'FETCH_CURRENCIES_FALSE';
const fetchCurrenciesFalse = (error) => ({
  type: FETCH_CURRENCIES_FALSE,
  error,
});

const ADD_EXPENSES = 'ADD_EXPENSES';
const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
const removeExpense = (expenses) => ({
  type: REMOVE_EXPENSE,
  expenses,
});

const getCurrenciesData = () => async (dispatch) => {
  dispatch(fetchCurrencies);
  try {
    const response = await fetchAPI();
    const data = Object.keys(response).map((e) => e)
      .filter((e) => e !== 'USDT');
    dispatch(fetchCurrenciesTrue(data));
  } catch (error) {
    dispatch(fetchCurrenciesFalse(error.message));
  }
};

export {
  emailValue,
  getCurrenciesData,
  addExpenses,
  removeExpense,
  USER_EMAIL,
  FETCH_CURRENCIES,
  FETCH_CURRENCIES_TRUE,
  FETCH_CURRENCIES_FALSE,
  ADD_EXPENSES,
  REMOVE_EXPENSE,
};
