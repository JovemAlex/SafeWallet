import React, { Component } from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

export default class Wallet extends Component {
  render() {
    return (
      <div
        className="
      bg-gradient-to-r
      from-cyan-500
      to-blue-500
      h-screen
      text-white
      flex
      flex-col
      items-center
      w-1200
      max-w-1200
      "
      >
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}
