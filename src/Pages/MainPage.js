import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import DataFetch from "../components/DataFetch";
import {Routes, Route} from "react-router";
import PortfolioPage from "./PortfolioPage";
import BuyPage from "./BuyPage";
import SellPage from "./SellPage";
import ResponsiveAppBar from "../components/ResponsiveAppBar/ResponsiveAppBar";

function MainPage() {

    const { user } = useAuth();

    const [name, setName] = useState("Loading name...");

    useEffect(() => {
        if (user?.displayName) {
            setName(user.displayName);
        }
    }, [user]);

    return(
    <>
        <ResponsiveAppBar />
        <h1>Welcome back, {name}!</h1>
        <h1>Main</h1>
        <Routes>
        <Route path = "/Portfolio" element = {<PortfolioPage/>} />
        <Route path = "/Buy" element = {<BuyPage/>} />
        <Route path = "/Sell" element = {<SellPage/>} />
        </Routes>
        <DataFetch/>
    </>
    )
}

export default MainPage;