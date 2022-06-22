import { useAuth, db } from "../hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function HomePage() {
  
  const { user } = useAuth();

  const [wallet, setWalletState] = useState(0);

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

  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
  }
  
  return (
    <>
      <h1>HomePage</h1>
      <h1>You currently have</h1>
      <h1>${round(wallet)}</h1>
      <h2>WatchList</h2>
    </>
  );
}

export default HomePage;
