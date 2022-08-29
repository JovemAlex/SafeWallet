// Coloque aqui suas actions
import fetchAPI from '../services';

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
  USER_EMAIL,
  FETCH_CURRENCIES,
  FETCH_CURRENCIES_TRUE,
  FETCH_CURRENCIES_FALSE,
};
