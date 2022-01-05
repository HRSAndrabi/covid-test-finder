import "./App.scss";
import { useState, useEffect } from "react";
import { fetchVicData } from "./api/VicAPI";

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchVicData().then((data) => {
            setData(data);
        });
    }, []);

    console.log(data);

    return <div className="App"></div>;
}

export default App;
