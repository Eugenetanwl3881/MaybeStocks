import { useState, useEffect } from "react";
import { useAuth, db } from "../hooks/useAuth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import TransactionTable from "../components/TransactionTable/TransactionTable";

function PortfolioPage() {

    const [transactions, setTransactionsState] = useState([]);

    const { user } = useAuth();

    function setTransactions(newTransactions) {
        setTransactionsState(newTransactions);
        setDoc(doc(db, "Transactions", user?.uid), { transactions: newTransactions });
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
  
  return (
    <div>
      <TransactionTable transactions={transactions} setTransactions={setTransactions} />   
    </div>
  )
}

export default PortfolioPage