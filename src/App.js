import "./App.scss";
import { useState, useEffect } from "react";
import { fetchVicData } from "./api/VicAPI";
import SidePanel from "./components/SidePanel/SidePanel";
import Map from "./components/Map/Map";

function App() {
    const [data, setData] = useState({
        type: "FeatureCollection",
        features: [],
    });

    useEffect(() => {
        fetchVicData().then((data) => {
            setData(data);
        });
    }, []);

    return (
        <div className="App">
            <SidePanel />
            <Map />
        </div>
    );
}

export default App;
