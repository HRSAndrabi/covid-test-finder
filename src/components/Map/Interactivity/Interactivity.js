/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from "!mapbox-gl";

const marker = new mapboxgl.Marker({
    color: "#ef5350",
    draggable: false,
});

export function clickHandler(event, map) {
    const clickedFeature = map.current.queryRenderedFeatures(event.point, {
        layers: ["all-vic-testing-sites"],
    });
    if (clickedFeature.length === 1) {
        const feature = clickedFeature[0];
        featureClickHandler(feature, map);
        return { drawerOpen: true };
    } else return { drawerOpen: false };
}

function flyToFeature(feature, map) {
    const coordinates = feature.geometry.coordinates;
    map.current.flyTo({
        center: [coordinates[0], coordinates[1] - 0.005],
        zoom: 14,
        maDuration: 200,
    });
}

function newMarkerAtFeature(feature, map) {
    marker.remove();
    const coordinates = feature.geometry.coordinates;
    marker.setLngLat(coordinates).addTo(map.current);
}

export function refreshSelectedListing() {
    marker.remove();
    const prevSelectedListing = document.getElementsByClassName("expanded");
    if (prevSelectedListing[0]) {
        prevSelectedListing[0].classList.remove("expanded");
    }
}

export function featureClickHandler(feature, map) {
    flyToFeature(feature, map);
    refreshSelectedListing();
    newMarkerAtFeature(feature, map);
    const selectedListing = document.getElementById(
        `site-${feature.properties["ID"]}`
    );
    selectedListing.classList.add("expanded");
}
