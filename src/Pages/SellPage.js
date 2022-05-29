import { useState, useEffect } from "react";
import { useAuth, db } from "../hooks/useAuth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import SellInput from "../components/SellInput/SellInput";
import useFetch from "../hooks/useFetch";
import axios from "axios";

function SellPage() {

    const [transactions, setTransactionsState] = useState([]);

    const { user } = useAuth();

    function setSellTransactions(newSellTransactions) {
        setTransactionsState(newSellTransactions);
        setDoc(doc(db, "Transactions", user?.uid), { transactions: newSellTransactions });
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

    //const {data, loading} = useFetch("https://sandbox.iexapis.com/stable/stock/BA/quote?token=Tpk_a1ecdafbdf2442f8a8fed66b8eedda5a");

    if (loading) return <h1>Loading...</h1>
    
    return (
    <>
    <h1>Sell Page</h1>
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
      <SellInput transactions={transactions} setTransactions={setSellTransactions} data={data} />   
    </div>
    </>
  )
}

export default SellPage