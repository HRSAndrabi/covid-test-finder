import "./App.scss";
import { useState, useEffect } from "react";
import { fetchVicData } from "./api/VicAPI";
import SidePanel from "./components/SidePanel/SidePanel";
import Map from "./components/Map/Map";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

function App() {
    const [data, setData] = useState({
        type: "FeatureCollection",
        features: [],
    });
    const [renderedFeatures, setRenderedFeatures] = useState();

    useEffect(() => {
        fetchVicData().then((data) => {
            setData(data);
        });
    }, []);

    const renderedFeaturesChangeHandler = (newRenderedFeatures) => {
        setRenderedFeatures(newRenderedFeatures);
    };

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <SidePanel renderedFeatures={renderedFeatures} />
                <Map
                    renderedFeaturesChangeHandler={
                        renderedFeaturesChangeHandler
                    }
                />
            </ThemeProvider>
        </div>
    );
}

export default App;
