/* eslint import/no-webpack-loader-syntax: off */
import React, { useRef, useEffect, useState } from "react";
import "./Map.scss";
import mapboxgl from "!mapbox-gl";
import { fetchVicData } from "../../api/VicAPI";
import HaAccountBox from "./Symbols/HaAccountBox.png";
import HaGarage from "./Symbols/HaGarage.png";
import {
    moveStartHandler,
    moveEndHandler,
    filterKeyUp,
    initialRender,
    clickHandler,
} from "./Interactivity/Interactivity";
import { click } from "@testing-library/user-event/dist/click";

const { REACT_APP_MAPBOX_API_TOKEN } = process.env;
mapboxgl.accessToken = REACT_APP_MAPBOX_API_TOKEN;

function Map(props) {
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
        map.current.addControl(
            new mapboxgl.AttributionControl({
                customAttribution: "Map design by me",
                compact: true,
            })
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
                            ["==", ["get", "SERVICE_FORMAT"], "walk-in"],
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
                            ["==", ["get", "SERVICE_FORMAT"], "walk-in"],
                            "#2d70ec",
                            "#00bfa5",
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
                const filterEl = document.getElementById("search__input");
                // let visibleTestingSites = [];
                let featureObj = initialRender(map, data);
                let visibleTestingSites = featureObj.uniqueFeatures;
                props.renderedFeaturesChangeHandler(
                    featureObj.renderedFeatures
                );
                map.current.on("movestart", (event) => {
                    moveStartHandler(event, map, filterEl);
                });
                map.current.on("moveend", (event) => {
                    if (filterEl.value.length === 0) {
                        const featureObj = moveEndHandler(map);
                        visibleTestingSites = featureObj.uniqueFeatures;
                        props.renderedFeaturesChangeHandler(
                            featureObj.renderedFeatures
                        );
                    }
                });
                filterEl.addEventListener("input", (event) => {
                    const featureObj = filterKeyUp(event, map, filterEl, data);
                    visibleTestingSites = featureObj.uniqueFeatures;
                    props.renderedFeaturesChangeHandler(
                        featureObj.renderedFeatures
                    );
                });
                map.current.on("click", (event) => {
                    clickHandler(event, map);
                });
            });

        // Clean up on unmount
        return () => map.remove();
    }, []);

    return <div ref={mapContainer} className="map-container" />;
}

export default Map;
