import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

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
    </>
    )
}

export default MainPage;