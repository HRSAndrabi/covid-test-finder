import "./App.scss";
import { useState, useEffect } from "react";
import { fetchVicData } from "./api/VicAPI";
import SidePanel from "./components/SidePanel/SidePanel";

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchVicData().then((data) => {
            setData(data);
        });
    }, []);

    console.log(data);

    return (
        <div className="App">
            <SidePanel></SidePanel>
        </div>
    );
}

export default App;
