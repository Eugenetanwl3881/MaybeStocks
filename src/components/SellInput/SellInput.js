import * as React from "react";
import { useState } from "react";

function SellInput(props) {
  
  const { transactions, setTransactions, data } = props;

  const [newSellTransactionText, setNewSellTransactionText] = useState("");

  function handleAddSellTransaction(event) {
    // React honours default browser behavior and the
    // default behaviour for a form submission is to
    // submit AND refresh the page. So we override the
    // default behaviour here as we don't want to refresh
    event.preventDefault();
    addSellTransaction(newSellTransactionText);
  }

  function addSellTransaction(quantity) {
    const newSellTransactions = [
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
        buysell: "Sell",
        date: data?.latestTime, 
      },
    ];
    setTransactions(newSellTransactions);
    console.log(newSellTransactions);
  }

  return (
    <>
      <div>
        <h2>Quantity</h2>
        <form onSubmit={handleAddSellTransaction}>
          <input
            label="Quantity"
            value={newSellTransactionText}
            onChange={(event) => setNewSellTransactionText(event.target.value)}
          />
          <button type="submit" variant="contained" color="primary">
            Sell
          </button>
        </form>
      </div>
    </>
  );
}

export default SellInput;