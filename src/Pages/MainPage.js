import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import {Routes, Route} from "react-router";
import PortfolioPage from "./PortfolioPage";
import TransactionsPage from "./TransactionsPage";
import BuyPage from "./BuyPage";
import SellPage from "./SellPage";
import ResponsiveAppBar from "../components/ResponsiveAppBar/ResponsiveAppBar";
import HomePage from "./HomePage";
import NewsPage from "./NewsPage";
import ChatPage from "./ChatPage";

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
        <Routes>
        <Route path = "/Home" element = {<HomePage/>} />
        <Route path = "/Portfolio" element = {<PortfolioPage/>} />
        <Route path = "/Transactions" element = {<TransactionsPage/>} />
        <Route path = "/Buy" element = {<BuyPage/>} />
        <Route path = "/Sell" element = {<SellPage/>} />
        <Route path = "/News" element = {<NewsPage/>} />
        <Route path = "/Chat" element = {<ChatPage/>} />
        </Routes>
    </>
    )
}

export default MainPage;