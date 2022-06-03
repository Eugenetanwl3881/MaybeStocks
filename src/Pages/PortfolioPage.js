import React from "react";
import { useState, useEffect } from "react";
import { useAuth, db } from "../hooks/useAuth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import PortfolioTable from "../components/PortfolioTable/PortfolioTable"

function PortfolioPage() {
  const [name, setName] = useState("Loading name...");

  const [portfolio, setPortfolioState] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    if (user?.displayName) {
      setName(user.displayName);
    }
  }, [user]);

  function setPortfolio(newPortfolios) {
    setPortfolioState(newPortfolios);
    setDoc(doc(db, "Portfolios", user?.uid), { portfolio: newPortfolios });
  }

  useEffect(() => {
    async function fetchData() {
      const docSnapshot = await getDoc(doc(db, "Portfolios", user?.uid));
      if (docSnapshot.exists()) {
        setPortfolioState(docSnapshot.data().portfolios);
      } else {
        setPortfolioState([]);
      }
    }
    fetchData();
  }, [user.uid]);

  return (
    <>
      <h1>Portfolio Page</h1>
      <h1>Portfolio of {name}.</h1>

      <div>
        <PortfolioTable
          portfolio={portfolio}
          setPortfolio={setPortfolio}
        />
      </div>
    </>
  );
}

export default PortfolioPage;
