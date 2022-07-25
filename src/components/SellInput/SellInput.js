import * as React from "react";
import { useState, useRef } from "react";
import Popup from "../Popup/Popup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function SellInput(props) {
  const {
    transactions,
    setTransactions,
    portfoliosMap,
    setPortfoliosMap,
    wallet,
    setWallet,
    data,
  } = props;

  const inputRef = useRef();
  const [successPopup, setSuccessPopup] = useState(false);
  const [failurePopup, setFailurePopup] = useState(false);
  const [failurePopupText, setFailurePopupText] = useState("");
  const [emptySymbolPopup, setEmptySymbolPopup] = useState(false);

  function handleAddSellTransaction(event) {
    // React honours default browser behavior and the
    // default behaviour for a form submission is to
    // submit AND refresh the page. So we override the
    // default behaviour here as we don't want to refresh
    event.preventDefault();
    if (Number(inputRef.current.value) === 0) {
      setFailurePopupText("Please key in a valid value");
      setFailurePopup(true);
    }
    addSellPortfoliosMap(inputRef.current.value);
  }

  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
  }

  function addSellTransaction(strquantity) {
    const quantity = Number(strquantity);
    const sum = data?.latestPrice * quantity;
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
        total: round(quantity * data?.latestPrice),
        buysell: "Sell",
        date: data?.latestTime,
      },
    ];
    setTransactions(newSellTransactions);
    const amount = wallet + sum;
    setWallet(amount);
  }

  async function addSellPortfoliosMap(strquantity) {
    const quantity = Number(strquantity);
    if (data.companyName === "Enter Symbol Below") {
      setEmptySymbolPopup(true);
    } else {
      const symbol = data?.symbol;
      if (data?.symbol in portfoliosMap) {
        const previousValue = portfoliosMap[symbol];
        const pq = previousValue.quantity; // previousQuantity
        if (pq - quantity > 0) {
          const pap = previousValue.avgprice; // previousAvgPrice
          const newSymbol = {
            avgprice: pap,
            gainloss: ((data?.latestPrice - pap) * 100) / data?.latestPrice,
            quantity: pq - quantity,
            symbol: previousValue.symbol,
            latestPrice: data?.latestPrice,
          };
          portfoliosMap[symbol] = newSymbol;
          addSellTransaction(strquantity);
          setSuccessPopup(true);
        } else if (pq === quantity) {
          delete portfoliosMap[symbol];
          addSellTransaction(strquantity);
          setSuccessPopup(true);
        } else {
          setFailurePopupText("Not enough stocks to sell");
          setFailurePopup(true);
        }
      } else {
        setFailurePopupText("You do not own any of this stock currently");
        setFailurePopup(true);
      }
      setPortfoliosMap(portfoliosMap);
    }
  }

  return (
    <>
      <div>
        <h2>Quantity</h2>
        <TextField
          label="Quantity"
          id="standard-size-normal"
          variant="standard"
          type="number"
          placeholder="e.g 10"
          inputRef={inputRef}
          sx={{ m: 1 }}
        ></TextField>
        <Button
          variant="contained"
          onClick={handleAddSellTransaction}
          type="submit"
          padding="20px"
          sx={{ m: 1 }}
        >
          Sell
        </Button>
      </div>

      <Popup trigger={successPopup} setTrigger={setSuccessPopup}>
        <h2>Success</h2>
        <div>Sell Transaction Succesful</div>
      </Popup>

      <Popup trigger={failurePopup} setTrigger={setFailurePopup}>
        <h2>Failure</h2>
        <div>{failurePopupText}</div>
      </Popup>

      <Popup trigger={emptySymbolPopup} setTrigger={setEmptySymbolPopup}>
        <h2>Error</h2>
        <div>Please key in the symbol of your desired stock</div>
      </Popup>
    </>
  );
}

export default SellInput;
