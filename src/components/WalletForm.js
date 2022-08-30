import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import store from '../redux/store';
import { getCurrenciesData } from '../redux/actions';

function WalletForm() {
  const dispatch = useDispatch();
  const [currencies, setCurrencies] = useState([]);

  store.subscribe(() => {
    const state = store.getState();
    const { wallet: { currencies: curr } } = state;
    setCurrencies(curr);
  });

  useEffect(() => {
    dispatch(getCurrenciesData());
    const state = store.getState();
    const { wallet: { currencies: curr } } = state;
    setCurrencies(curr);
  }, [dispatch]);

  return (
    <form>

      {/* valor da despesa */}
      <label htmlFor="despesa">
        Valor:
        <input
          type="number"
          name="despesa"
          id="despesa"
          data-testid="value-input"
        />
      </label>

      {/* descrição da despesa */}
      <label htmlFor="describe">
        Descrição:
        <input
          type="text"
          name="describe"
          id="describe"
          data-testid="description-input"
        />
      </label>

      {/* moeda */}
      <label htmlFor="currency">
        Moeda:
        <select
          name="currency"
          id="currency"
          data-testid="currency-input"
        >
          {currencies?.map((currencie, i) => (
            <option key={ i } value={ currencie }>{currencie}</option>
          ))}
        </select>
      </label>

      {/* método de pagamento */}
      <label htmlFor="methods">
        Método:
        <select name="methods" id="methods" data-testid="method-input">
          <option value="cash">Dinheiro</option>
          <option value="credit">Cartão de crédito</option>
          <option value="debit">Cartão de débito</option>
        </select>
      </label>

      {/* categoria */}
      <label htmlFor="category">
        <select name="categories" id="category" data-testid="tag-input">
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
      <button type="submit">Adicionar despesa</button>
    </form>
  );
}

export default WalletForm;
