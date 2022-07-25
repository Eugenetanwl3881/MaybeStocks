import React from "react";
import { useState, useEffect } from "react";
import { useAuth, db } from "../hooks/useAuth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import PortfolioTable from "../components/PortfolioTable/PortfolioTable";
import axios from "axios";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";

function PortfolioPage() {
  const [name, setName] = useState("Loading name...");

  const [portfoliosMap, setPortfoliosMapState] = useState([]);
  const [wallet, setWalletState] = useState(0);
  const [refresh, setRefresh] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    if (user?.displayName) {
      setName(user.displayName);
    }
  }, [user]);

  useEffect(() => {
    function apiRequestDelay(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }

    for (let symbol in portfoliosMap) {
      console.log(symbol);
      axios
        .get(
          `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=Tpk_a1ecdafbdf2442f8a8fed66b8eedda5a`
        )
        .then((response) => {
          portfoliosMap[symbol].latestPrice = response.data.latestPrice;
          portfoliosMap[symbol].gainloss =
            ((response.data.latestPrice - portfoliosMap[symbol].avgprice) /
              portfoliosMap[symbol].avgprice) *
            100;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          console.log("done");
          // Prevents 429 error as API is called too quickly. Just a short delay before each call
          apiRequestDelay(500);
        });
    }
  }, [refresh]);

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

  async function handleRefresh(e) {
    e.preventDefault();
    setRefresh(!refresh);
  }

  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
  }

  // if (isLoading) {
  //   return <p> Loading </p>;
  // }

  return (
    <>
      <h1>Portfolio of {name}.</h1>
      <IconButton color="primary" onClick={handleRefresh} aria-label="refresh">
        <RefreshIcon />
      </IconButton>

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
