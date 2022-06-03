import * as React from "react";
import { useState } from "react";

function BuyInput(props) {
  
  const { transactions, setTransactions, portfolios, setPortfolios, data } = props;

  const [newBuyTransactionText, setNewBuyTransactionText] = useState("");

  function handleAddBuyTransaction(event) {
    // React honours default browser behavior and the
    // default behaviour for a form submission is to
    // submit AND refresh the page. So we override the
    // default behaviour here as we don't want to refresh
    event.preventDefault();
    addBuyTransaction(newBuyTransactionText);
    addBuyPortfolios(newBuyTransactionText);
  }

  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
  }

  function addBuyTransaction(quantity) {
    const newBuyTransactions = [
      // the ... operator is called the spread operator
      // what we are doing is creating a brand new array of
      // tasks, that is different from the previous array
      // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
      ...transactions,
      {
        symbol: data?.symbol,
        quantity: quantity,
        price: data?.latestPrice,
        total: round(quantity * data?.latestPrice),
        buysell: "Buy",
        date: data?.latestTime, 
      },
    ];
    setTransactions(newBuyTransactions);
    console.log(newBuyTransactions);
  }

  function addBuyPortfolios(quantity) {
    const newBuyPortfolios = [
      // the ... operator is called the spread operator
      // what we are doing is creating a brand new array of
      // tasks, that is different from the previous array
      // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
      ...portfolios,
      {
        symbol: data?.symbol,
        quantity: quantity,
        avgprice: data?.latestPrice,
        gainloss:0
      },
    ];
    setPortfolios(newBuyPortfolios);
    console.log(newBuyPortfolios);
  }

  return (
    <>
      <div>
        <h2>Quantity</h2>
        <form onSubmit={handleAddBuyTransaction}>
          <input
            label="Quantity"
            type = "number"
            value={newBuyTransactionText}
            onChange={(event) => setNewBuyTransactionText(event.target.value)}
          />
          <button type="submit" variant="contained" color="primary">
            Buy
          </button>
        </form>
      </div>
    </>
  );
}

export default BuyInput;