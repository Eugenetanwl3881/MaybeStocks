import React from "react";
import { useState, useEffect } from "react";
import { useAuth, db } from "../hooks/useAuth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import PortfolioTable from "../components/PortfolioTable/PortfolioTable";

function PortfolioPage() {
  const [name, setName] = useState("Loading name...");

  const [portfoliosMap, setPortfoliosMapState] = useState([]);
  const [wallet, setWalletState] = useState(0);

  const { user } = useAuth();

  useEffect(() => {
    if (user?.displayName) {
      setName(user.displayName);
    }
  }, [user]);

  function setPortfoliosMap(newPortfoliosMap) {
    setPortfoliosMapState(newPortfoliosMap);
    setDoc(doc(db, "PortfoliosMap", user?.uid), { newPortfoliosMap });
  }

  useEffect(() => {
    async function fetchData() {
      const docSnapshot = await getDoc(doc(db, "PortfoliosMap", user?.uid));
      if (docSnapshot.exists()) {
        setPortfoliosMapState(docSnapshot.data());
      } else {
        setPortfoliosMapState({});
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

  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
  }

  return (
    <>
      <h1>Portfolio of {name}.</h1>

      <div style={{ marginTop: "1%" }}>
        <PortfolioTable
          portfoliosMap={portfoliosMap}
          setPortfoliosMap={setPortfoliosMap}
        />
      </div>

      <h4 style={{ marginTop: "10%" }}>
        You have ${round(wallet)} available cash in your account
      </h4>
    </>
  );
}

export default PortfolioPage;
