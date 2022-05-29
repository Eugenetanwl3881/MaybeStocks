import { useState, useEffect } from "react";
import { useAuth, db } from "../hooks/useAuth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import BuyInput from "../components/BuyInput/BuyInput";
import axios from "axios";

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

  const [symbol, setSymbol] = useState("AAPL");
  const [data, setData] = useState({companyName:'Enter Symbol Below', latestPrice: 0});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(event) {
    setSymbol(event.target.value);
  }

  function handleClick(event) {
    //To prevent the clearing of the input fields at each click
    event.preventDefault();
    setLoading(true);

    axios
      .get(`https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=Tpk_a1ecdafbdf2442f8a8fed66b8eedda5a`)
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

  //const {data, loading, refetch} = useFetch(`https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=Tpk_a1ecdafbdf2442f8a8fed66b8eedda5a`);

  //console.log(transactions);

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <h1>Buy Page</h1>
      <h1>
        {data?.companyName} : {data?.latestPrice}
      </h1>

      <form>
        <div>Enter Stock Symbol</div>
        <input type="text" onChange={handleChange} placeholder="e.g AAPL"></input>
        <button onClick={handleClick} type="submit" variant="contained">
          Search
        </button>
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
