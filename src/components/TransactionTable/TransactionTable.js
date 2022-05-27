import * as React from "react";
import { useState } from "react";
import DataFetch from "../DataFetch";

function TransactionTable(props) {
  
  const { transactions, setTransactions, data} = props;

  const [newTransactionText, setNewTransactionText] = useState("");

  function handleAddTransaction(event) {
    // React honours default browser behavior and the
    // default behaviour for a form submission is to
    // submit AND refresh the page. So we override the
    // default behaviour here as we don't want to refresh
    event.preventDefault();
    addTransaction(newTransactionText);
  }

  function addTransaction(quantity) {
    const newTransactions = [
      // the ... operator is called the spread operator
      // what we are doing is creating a brand new array of
      // tasks, that is different from the previous array
      // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
      ...transactions,
      {
        symbol: data?.symbol,
        quantity: quantity,
        price: data?.latestPrice,
        total: quantity * data?.latestPrice,
        buysell: "Buy",
        date: data?.latestTime,
      },
    ];
    setTransactions(newTransactions);
    console.log(newTransactions);
  }

  return (
    <>
      <div>
        <h2>Quantity</h2>
        <form onSubmit={handleAddTransaction}>
          <input
            label="Quantity"
            value={newTransactionText}
            onChange={(event) => setNewTransactionText(event.target.value)}
          />
          <button type="submit" variant="contained" color="primary">
            Buy
          </button>
        </form>
      </div>

      <div>
        <h2>Stocks</h2>
        {transactions.length > 0 ? (
          <TransactionList
            transactions={transactions}
            setTransactions={setTransactions}
          />
        ) : (
          <p>No transactions yet! Add one above!</p>
        )}
      </div>
    </>
  );
}

function TransactionList(props) {
  const { transactions, setTransactions } = props;

  return (
    <table style={{ margin: "0 auto", width: "100%" }}>
      <thead>
        <tr>
          <th>No.</th>
          <th>Symbol</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
          <th>Buy/Sell</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          // We should specify key here to help react identify
          // what has updated
          // https://reactjs.org/docs/lists-and-keys.html#keys
          <tr key={transaction.symbol}>
            <td>{index + 1}</td>
            <td>{transaction.symbol}</td>
            <td>{transaction.quantity}</td>
            <td>{transaction.price}</td>
            <td>{transaction.total}</td>
            <td>{transaction.buysell}</td>
            <td>{transaction.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;
