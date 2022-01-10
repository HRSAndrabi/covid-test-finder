/* eslint import/no-webpack-loader-syntax: off */
import React, { useRef, useState, useEffect } from "react";
import "./Map.scss";
import mapboxgl from "!mapbox-gl";
import { fetchVicData } from "../../api/VicAPI";
import HaAccountBox from "./Symbols/HaAccountBox.png";
import HaGarage from "./Symbols/HaGarage.png";
import { clickHandler } from "./Interactivity/Interactivity";
import { CircularProgress } from "@mui/material";

const { REACT_APP_MAPBOX_API_TOKEN } = process.env;
mapboxgl.accessToken = REACT_APP_MAPBOX_API_TOKEN;

function Map(props) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/hassdaddy3/cky26t112263i14p52m7gq2om",
            center: [144.961, -36.874],
            zoom: 6,
            maxBounds: [
                [145.5 - 7, -44], // Southwest coordinates
                [145.5 + 5.5, -30], // Northeast coordinates
            ],
            attributionControl: false,
        });
        map.current.addControl(
            new mapboxgl.AttributionControl({
                customAttribution: "Developed by @hrs_andrabi",
                compact: true,
            }),
            "top-right"
        );
        map.current.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
                showUserHeading: true,
            }),
            "top-left"
        );
        map.current.addControl(new mapboxgl.NavigationControl({}), "top-left");

        map.current.dragRotate.disable();
        map.current.touchZoomRotate.disableRotation();

        map.current.on("load", function () {
            map.current.resize();
        });

        fetchVicData()
            .then((data) => {
                props.initialiseData(data);
                map.current.addSource("regionBounds", {
                    type: "vector",
                    url: "mapbox://hassdaddy3.8h1ha029",
                });
                map.current.addSource("vic-testing-sites", {
                    type: "geojson",
                    data: data,
                });
                map.current.loadImage(HaAccountBox, (error, image) => {
                    if (error) throw error;
                    map.current.addImage("HaAccountBox", image, { sdf: true });
                });
                map.current.loadImage(HaGarage, (error, image) => {
                    if (error) throw error;
                    map.current.addImage("HaGarage", image, { sdf: true });
                });
                map.current.addLayer({
                    id: "all-vic-testing-sites",
                    type: "symbol",
                    source: "vic-testing-sites",
                    layout: {
                        "icon-image": [
                            "case",
                            ["==", ["get", "SERVICE_FORMAT"], "walk-in"],
                            "HaAccountBox",
                            "HaGarage",
                        ],
                        "icon-size": [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            8,
                            0.5,
                            15,
                            1.5,
                        ],
                        "icon-ignore-placement": false,
                        "icon-padding": 0,
                    },
                    paint: {
                        "icon-color": [
                            "case",
                            ["==", ["get", "SERVICE_FORMAT"], "walk-in"],
                            "#2d70ec",
                            "#2e2e2e",
                        ],
                        "icon-halo-width": 15,
                        "icon-opacity": 0.9,
                    },
                });
                return data;
            })
            .then((data) => {
                // ---------------------------------------------------------------
                // Interactivity -------------------------------------------------
                // ---------------------------------------------------------------
                map.current.on("click", (event) => {
                    const resultObj = clickHandler(event, map);
                    props.drawerOpenHandler(resultObj.drawerOpen);
                });
                props.initialiseMap(map);
                setIsLoading(false);
            });

        // Clean up on unmount
        return () => map.current.remove();
    }, [props.refresh]);

    return (
        <div ref={mapContainer} className="map-container">
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-overlay__content">
                        <CircularProgress />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Map;
