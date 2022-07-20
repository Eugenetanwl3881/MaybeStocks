import * as React from "react";
import { useState, useRef } from "react";
import Popup from "../Popup/Popup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function BuyInput(props) {
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
  const [emptySymbolPopup, setEmptySymbolPopup] = useState(false);
  const [failureText, setFailureText] = useState("");

  function handleAddBuyTransaction(event) {
    // React honours default browser behavior and the
    // default behaviour for a form submission is to
    // submit AND refresh the page. So we override the
    // default behaviour here as we don't want to refresh
    event.preventDefault();
    console.log(Number(inputRef.current.value));
    if (Number(inputRef.current.value) === 0) {
      setFailureText("Please key in a valid value");
      setFailurePopup(true);
    }
    addBuyTransaction(inputRef.current.value);
  }

  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
  }

  function addBuyTransaction(strquantity) {
    const quantity = Number(strquantity);
    if (data.companyName === "Enter Symbol Below") {
      setEmptySymbolPopup(true);
    } else {
      const sum = data?.latestPrice * quantity;
      if (sum <= wallet) {
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
        addBuyPortfoliosMap(quantity);
        const amount = wallet - sum;
        setWallet(amount);
        setSuccessPopup(true);
      } else {
        setFailureText("Not enough money.");
        setFailurePopup(true);
      }
    }
  }

  function addBuyPortfoliosMap(strquantity) {
    const quantity = Number(strquantity);
    if (data?.symbol in portfoliosMap) {
      const symbol = data?.symbol;
      const previousValue = portfoliosMap[symbol];
      const pap = previousValue.avgprice; // previousAvgPrice
      const pq = previousValue.quantity; // previousQuantity
      const cap = (data?.latestPrice * quantity + pap * pq) / (pq + quantity); // currentAvgPrice
      const newSymbol = {
        avgprice: cap,
        gainloss: ((data?.latestPrice - cap) * 100) / data?.latestPrice,
        quantity: quantity + pq,
        symbol: previousValue.symbol,
      };
      portfoliosMap[symbol] = newSymbol;
    } else {
      const symbol = data?.symbol;
      const newSymbol = {
        avgprice: data?.latestPrice,
        gainloss: 0,
        quantity: quantity,
        symbol: data?.symbol,
      };
      portfoliosMap[symbol] = newSymbol;
    }
    setPortfoliosMap(portfoliosMap);
  }

  // console.log(typeof(portfoliosMap));

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
          onClick={handleAddBuyTransaction}
          type="submit"
          padding="20px"
          sx={{ m: 1 }}
          data-testid="buyButton"
        >
          Buy
        </Button>
      </div>

      <Popup trigger={successPopup} setTrigger={setSuccessPopup}>
        <h2>Success</h2>
        <div>Buy Transaction Succesful</div>
      </Popup>

      <Popup trigger={failurePopup} setTrigger={setFailurePopup}>
        <h2>Failure</h2>
        <div>{failureText}</div>
      </Popup>

      <Popup trigger={emptySymbolPopup} setTrigger={setEmptySymbolPopup}>
        <h2>Error</h2>
        <div>Please key in the symbol of your desired stock</div>
      </Popup>
    </>
  );
}

export default BuyInput;
