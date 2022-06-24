import { useAuth, db } from "../hooks/useAuth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import WatchlistTable from "../components/WatchlistTable/WatchlistTable";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

function HomePage() {
  const { user } = useAuth();

  const [watchlist, setWatchlistState] = useState({});

  const [wallet, setWalletState] = useState(0);

  function setWatchlist(newWatchlist) {
    setWatchlistState(newWatchlist);
    setDoc(doc(db, "Watchlist", user?.uid), newWatchlist);
  }
  
  useEffect(() => {
    async function fetchData() {
      const docSnapshot = await getDoc(doc(db, "Watchlist", user?.uid));
      if (docSnapshot.exists()) {
        setWatchlistState(docSnapshot.data());
      } else {
        setWatchlistState({});
      }
    }
    fetchData();
  }, [user.uid]);

  useEffect(() => {
    async function fetchData() {
      const docSnapshot = await getDoc(doc(db, "Wallet", user?.uid));
      if (docSnapshot.exists()) {
        setWalletState(docSnapshot.data().amount);
      } else {
        setWalletState(100000);
      }
    }
    fetchData();
  }, [user?.uid, wallet]);

  const inputRef = useRef(null);
  const [data, setData] = useState({
    companyName: "Enter Symbol Below",
    latestPrice: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleSubmitClick(event) {
    //To prevent the re rendering of entire page
    event.preventDefault();
    setLoading(true);
    axios
      .get(
        `https://sandbox.iexapis.com/stable/stock/${inputRef.current.value}/quote?token=Tpk_a1ecdafbdf2442f8a8fed66b8eedda5a`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    if (!loading && error === null) {
      console.log("click");
      console.log(watchlist);
      addWatchlist(inputRef.current.value);
    }
  }

  function addWatchlist(symbol) {
    if (symbol in watchlist) {
      console.log("Symbol already in watchlist")
    } else {
      const newWatchlist = {
        symbol: symbol,
        latestPrice: data?.latestPrice,
        dailyPercentChange: data?.changePercent,
      }
      watchlist[symbol] = newWatchlist;
      setWatchlist(watchlist);
    }
  }

  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
  }

  return (
    <>
      <h1>HomePage</h1>
      <h1>You currently have</h1>
      <h1>${round(wallet)}</h1>
      <WatchlistTable watchlist={watchlist}/>

      <form>
        <div>Enter Stock Symbol</div>
        <TextField
          label="Symbol"
          id="outlined-basic"
          variant="outlined"
          type="text"
          placeholder="e.g AAPL"
          inputRef={inputRef}
          sx={{ m: 1 }}
        ></TextField>
        <Button
          variant="contained"
          onClick={handleSubmitClick}
          type="submit"
          padding="20px"
          sx={{ m: 1 }}
        >
          Add Stock
        </Button>
      </form>
    </>
  );
}

export default HomePage;
