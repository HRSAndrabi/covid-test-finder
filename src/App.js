import "./App.scss";
import { useState, useEffect } from "react";
import DesktopSidePanel from "./components/DesktopSidePanel/DesktopSidePanel";
import MobileDrawer from "./components/MobileDrawer/MobileDrawer";
import Map from "./components/Map/Map";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import moment from "moment";

function App() {
    const [data, setData] = useState({
        type: "FeatureCollection",
        features: [],
    });
    const [map, setMap] = useState();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState();
    const [lastUpdated, setLastUpdated] = useState(moment());
    const [refresh, setRefresh] = useState(false);

    const drawerOpenHandler = (drawerOpen) => {
        setDrawerOpen(drawerOpen);
    };

    const initialiseMap = (map) => {
        setMap(map);
    };

    const initialiseData = (data) => {
        setRefresh(false);
        const sortedFeatures = data.features.sort((featureA, featureB) => {
            if (
                featureA.properties["OPEN_STATUS"] ===
                featureB.properties["OPEN_STATUS"]
            ) {
                return featureA.properties["SITE_NAME"] <
                    featureB.properties["SITE_NAME"]
                    ? -1
                    : featureA.properties["SITE_NAME"] >
                      featureB.properties["SITE_NAME"]
                    ? 1
                    : 0;
            }
            const featureAOpen = featureA.properties["OPEN_STATUS"];
            const featureBOpen = featureB.properties["OPEN_STATUS"];
            return featureAOpen === "open"
                ? -1
                : featureBOpen === "unknown" && featureAOpen === "closed"
                ? -1
                : 1;
        });
        const sortedData = { ...data, features: sortedFeatures };
        setData(sortedData);
    };

    const refreshData = () => {
        setRefresh(true);
        setLastUpdated(moment());
    };

    useEffect(() => {
        setIsDesktop(window.innerWidth > 850);
        window.addEventListener("resize", () => {
            setIsDesktop(window.innerWidth > 850);
        });
        setLastUpdated(moment());
    }, []);

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                {isDesktop && (
                    <DesktopSidePanel
                        map={map}
                        data={data}
                        lastUpdated={lastUpdated}
                        refreshData={refreshData}
                    />
                )}
                {!isDesktop && (
                    <MobileDrawer
                        drawerOpen={drawerOpen}
                        drawerOpenHandler={drawerOpenHandler}
                        map={map}
                        data={data}
                        lastUpdated={lastUpdated}
                        refreshData={refreshData}
                    />
                )}
                <Map
                    initialiseMap={initialiseMap}
                    initialiseData={initialiseData}
                    drawerOpenHandler={drawerOpenHandler}
                    refresh={refresh}
                />
            </ThemeProvider>
        </div>
    );
}

export default App;
