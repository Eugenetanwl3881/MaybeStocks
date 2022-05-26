import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import DataFetch from "../components/DataFetch";
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
        <h1>Welcome back, {name}!</h1>
        <h1>Main</h1>
        <DataFetch/>
    </>
    )
}

export default MainPage;