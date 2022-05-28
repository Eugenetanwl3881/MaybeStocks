import { useState, useEffect } from "react";
import { useAuth, db } from "../hooks/useAuth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import SellInput from "../components/SellInput/SellInput";
import useFetch from "../hooks/useFetch";

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

    const {data, loading} = useFetch("https://sandbox.iexapis.com/stable/stock/BA/quote?token=Tpk_a1ecdafbdf2442f8a8fed66b8eedda5a");

    if (loading) return <h1>Loading...</h1>
    
    return (
    <>
    <h1>
      {data?.companyName} : {data?.latestPrice}
    </h1>

    <div>
      <SellInput transactions={transactions} setTransactions={setSellTransactions} data={data} />   
    </div>
    </>
  )
}

export default SellPage