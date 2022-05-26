// import { useState, useEffect } from "react";
// import { useAuth, db } from "../hooks/useAuth";
// import { doc, setDoc, getDoc } from "firebase/firestore"; 
import React from 'react'


function PortfolioPage() {

    // const [transactions, setTransactions] = useState([]);

    // const { user } = useAuth();

    // function addTransactions(newTransactions) {
    //     setTransactions(newTransactions);
    //     setDoc(doc(db, "Transactions", user?.uid), { transactions: newTransactions});
    // }

    // useEffect(() => {
    //     async function fetchData() {
    //         const docSnapshot = await getDoc(doc(db, "transactions", user?.uid));
    //         if (docSnapshot.exists()) {
    //             setTransactions(docSnapshot.data().transactions);
    //         } else {
    //             setTransactions([]);
    //         }
    //     }
    // }, [user.uid]);

    // return (
    //     <>
    //         <h1>Transactions</h1>

    //     </>
    // )
  
  return (
    <div>PortfolioPage</div>
  )
}

export default PortfolioPage