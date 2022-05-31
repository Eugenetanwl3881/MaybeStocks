import { useState, useEffect, useRef } from "react";
import { useAuth, db } from "../hooks/useAuth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import BuyInput from "../components/BuyInput/BuyInput";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

function BuyPage() {
  const [transactions, setTransactionsState] = useState([]);

  const { user } = useAuth();

  function setBuyTransactions(newBuyTransactions) {
    setTransactionsState(newBuyTransactions);
    setDoc(doc(db, "Transactions", user?.uid), {
      transactions: newBuyTransactions,
    });
  }

  useEffect(() => {
    async function fetchData() {
      const docSnapshot = await getDoc(doc(db, "Transactions", user?.uid));
      if (docSnapshot.exists()) {
        setTransactionsState(docSnapshot.data().transactions);
      } else {
        setTransactionsState([]);
      }
    }
    fetchData();
  }, [user.uid]);

  //const [symbol, setSymbol] = useState("AAPL");
  const inputRef = useRef(null);
  const [data, setData] = useState({
    companyName: "Enter Symbol Below",
    latestPrice: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // function handleChange(event) {
  //   setSymbol(event.target.value);
  // }

  function handleClick(event) {
    //To prevent the re rendering of entire page
    event.preventDefault();
    setLoading(true);
    console.log("clicked")
    console.log(inputRef.current.value)
    axios
      .get(
        `https://sandbox.iexapis.com/stable/stock/${inputRef.current.value}/quote?token=Tpk_a1ecdafbdf2442f8a8fed66b8eedda5a`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  //if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <h1>Buy Page</h1>
      <h1>
        {data?.companyName} : {data?.latestPrice}
      </h1>

      <form>
        <div>Enter Stock Symbol</div>
        <TextField
         label="Symbol"
          id="standard-size-normal"
          variant="standard"
          type="text"
          placeholder="e.g AAPL"
          inputRef={inputRef}
          sx={{ m: 1 }}
        ></TextField>
        <Button
          variant="contained"
          onClick={handleClick}
          type="submit"
          padding="20px"
          sx={{ m: 1 }}
        >
          Search
        </Button>
      </form>

      <div>
        <BuyInput
          transactions={transactions}
          setTransactions={setBuyTransactions}
          data={data}
        />
      </div>
    </>
  );
}

export default BuyPage;
