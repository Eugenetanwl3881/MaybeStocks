import { useState, useEffect } from "react";
import { useAuth, db } from "../hooks/useAuth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import BuyInput from "../components/BuyInput/BuyInput";
import useFetch from "../hooks/useFetch";

function BuyPage() {

    const [transactions, setTransactionsState] = useState([]);

    const { user } = useAuth();

    function setBuyTransactions(newBuyTransactions) {
        setTransactionsState(newBuyTransactions);
        setDoc(doc(db, "Transactions", user?.uid), { transactions: newBuyTransactions });
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
    // console.log(data);
    console.log(transactions);


    if (loading) return <h1>Loading...</h1>
    
    return (
    <>
    <h1>
      {data?.companyName} : {data?.latestPrice}
    </h1>

    <div>
      <BuyInput transactions={transactions} setTransactions={setBuyTransactions} data={data} />   
    </div>
    </>
  )
}

export default BuyPage