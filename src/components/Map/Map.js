/* eslint import/no-webpack-loader-syntax: off */
import React, { useRef, useEffect, useState } from "react";
import "./Map.scss";
import mapboxgl from "!mapbox-gl";
import { fetchVicData } from "../../api/VicAPI";
import { MdDirectionsCarFilled } from "react-icons/md";
import HaAccountBox from "./Symbols/HaAccountBox.png";
import HaGarage from "./Symbols/HaGarage.png";
import { FiAlertCircle } from "react-icons/fi";

const { REACT_APP_MAPBOX_API_TOKEN } = process.env;
mapboxgl.accessToken = REACT_APP_MAPBOX_API_TOKEN;

function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/hassdaddy3/cky26t112263i14p52m7gq2om",
            center: [133.354, -28.141],
            zoom: 4.2,
            maxBounds: [
                [145.5 - 7, -40], // Southwest coordinates
                [145.5 + 5.5, -33], // Northeast coordinates
            ],
            attributionControl: false,
        });

        map.current.dragRotate.disable();
        map.current.touchZoomRotate.disableRotation();

        map.current.on("load", function () {
            map.current.resize();
        });

        fetchVicData().then((data) => {
            console.log(data);
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
                        ["==", ["get", "ServiceFormat"], "Walk-in"],
                        "HaAccountBox",
                        "HaGarage",
                    ],
                    "icon-size": 0.7,
                    "icon-ignore-placement": false,
                    "icon-padding": 0,
                },
                paint: {
                    "icon-color": [
                        "case",
                        ["==", ["get", "ServiceFormat"], "Walk-in"],
                        "#2d70ec",
                        "#00bfa5",
                    ],
                    "icon-halo-width": 15,
                    "icon-opacity": 0.9,
                },
            });
        });

        // Clean up on unmount
        return () => map.remove();
    }, []);

    return <div ref={mapContainer} className="map-container" />;
}

export default Map;
