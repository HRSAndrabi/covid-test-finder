/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from "!mapbox-gl";
import { Chip } from "@mui/material";
import {
    MdDirectionsWalk,
    MdDirectionsCar,
    MdAccessible,
    MdNearMe,
    MdCallEnd,
    MdLink,
} from "react-icons/md";

const marker = new mapboxgl.Marker({
    color: "#ef5350",
    draggable: false,
});

function renderListings(features, map, filterEl) {
    const onFeatureClick = (event) => {
        const coordinates = JSON.parse(
            "[" + event.currentTarget.dataset.coordinates + "]"
        );
        marker.remove();
        marker.setLngLat(coordinates).addTo(map.current);
        map.current.flyTo({
            center: [coordinates[0], coordinates[1] - 0.005],
            zoom: 14,
            maDuration: 200,
        });
    };

    if (features.length) {
        const testingSiteList = features.map((feature) => {
            return (
                <li
                    className="list-item"
                    key={feature.properties["ID"]}
                    data-coordinates={feature.geometry.coordinates}
                    onClick={onFeatureClick}
                >
                    <div className="list-item__header">
                        <div className="site-name">
                            {feature.properties["SITE_NAME"]}
                        </div>
                        <div className="site-address">
                            Address:{" "}
                            {`${feature.properties["ADDRESS"]}, ${feature.properties["SUBURB"]}, ${feature.properties["POSTCODE"]}`}
                        </div>
                        <div className="site-properties">
                            <Chip
                                label={
                                    feature.properties["IS_OPEN"] === "unknown"
                                        ? "Hours unavailable"
                                        : feature.properties["IS_OPEN"]
                                }
                                color={
                                    feature.properties["IS_OPEN"] === "open"
                                        ? "success"
                                        : feature.properties["IS_OPEN"] ===
                                          "unknown"
                                        ? "warning"
                                        : "error"
                                }
                                size="small"
                            />
                            {!!feature.properties["SERVICE_FORMAT"] && (
                                <Chip
                                    label={feature.properties["SERVICE_FORMAT"]}
                                    color="default"
                                    size="small"
                                />
                            )}
                            {!!feature.properties["REQUIREMENTS"] && (
                                <Chip
                                    label={feature.properties["REQUIREMENTS"]}
                                    color="default"
                                    size="small"
                                />
                            )}
                            {!!feature.properties["AGE_LIMIT"] && (
                                <Chip
                                    label={feature.properties["AGE_LIMIT"]}
                                    color="default"
                                    size="small"
                                />
                            )}
                        </div>
                    </div>
                    <div className="list-item__body">
                        {feature.properties["IS_OPEN"] !== "unknown" ? (
                            <table className="site-hours">
                                <tbody>
                                    <tr>
                                        <td className="left">Monday</td>
                                        <td className="right">
                                            {feature.properties["MO_START"] &&
                                            feature.properties["MO_END"]
                                                ? `${feature.properties["MO_START"]} to ${feature.properties["MO_END"]}`.toLowerCase()
                                                : "closed"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="left">Tuesday</td>
                                        <td className="right">
                                            {feature.properties["TU_START"] &&
                                            feature.properties["TU_END"]
                                                ? `${feature.properties["TU_START"]} to ${feature.properties["TU_END"]}`.toLowerCase()
                                                : "closed"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="left">Wednesday</td>
                                        <td className="right">
                                            {feature.properties["WE_START"] &&
                                            feature.properties["WE_END"]
                                                ? `${feature.properties["WE_START"]} to ${feature.properties["WE_END"]}`.toLowerCase()
                                                : "closed"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="left">Thursday</td>
                                        <td className="right">
                                            {feature.properties["TH_START"] &&
                                            feature.properties["TH_END"]
                                                ? `${feature.properties["TH_START"]} to ${feature.properties["TH_END"]}`.toLowerCase()
                                                : "closed"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="left">Friday</td>
                                        <td className="right">
                                            {feature.properties["FR_START"] &&
                                            feature.properties["FR_END"]
                                                ? `${feature.properties["FR_START"]} to ${feature.properties["FR_END"]}`.toLowerCase()
                                                : "closed"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="left">Saturday</td>
                                        <td className="right">
                                            {feature.properties["SA_START"] &&
                                            feature.properties["SA_END"]
                                                ? `${feature.properties["SA_START"]} to ${feature.properties["SA_END"]}`.toLowerCase()
                                                : "closed"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="left">Sunday</td>
                                        <td className="right">
                                            {feature.properties["SU_START"] &&
                                            feature.properties["SU_END"]
                                                ? `${feature.properties["SU_START"]} to ${feature.properties["SU_END"]}`.toLowerCase()
                                                : "closed"}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <div className="site-hours--unavailable">
                                Call to confirm opening hours.
                            </div>
                        )}
                    </div>
                    <div className="list-item__footer">
                        {feature.properties["PHONE"] && (
                            <a
                                href={`tel:${feature.properties["PHONE"]}`}
                                target="_blank"
                                className="site-actions"
                            >
                                <MdCallEnd /> phone
                            </a>
                        )}
                        {feature.properties["WEBSITE"] && (
                            <a
                                href={feature.properties["WEBSITE"]}
                                target="_blank"
                                className="site-actions"
                            >
                                <MdLink /> website
                            </a>
                        )}
                        {feature.properties["ADDRESS_SUBURB_POSTCODE"] && (
                            <a
                                href={`http://maps.google.com/?q=${feature.properties["ADDRESS_SUBURB_POSTCODE"]}`}
                                target="_blank"
                                className="site-actions"
                            >
                                <MdNearMe /> directions
                            </a>
                        )}
                    </div>
                </li>
            );
        });
        return <ul className="visible-sites-list">{testingSiteList}</ul>;
    } else if (filterEl && filterEl.value.length < 3) {
        return (
            <ul className="visible-sites-list">
                <li className="noresults">
                    <div className="noresults__heading">
                        Enter at least three characters to search 🔎
                    </div>
                </li>
            </ul>
        );
    } else if (features.length === 0 && filterEl && filterEl.value !== "") {
        return (
            <ul className="visible-sites-list">
                <li className="noresults">
                    <div className="noresults__heading">
                        No matching results 😞
                    </div>
                    <div className="noresults__body">
                        We couldn't find a testing site matching your search.
                        Drag the map or try a new search to populate results.
                    </div>
                </li>
            </ul>
        );
    } else {
        // remove features filter
        map.current.setFilter("all-vic-testing-sites", ["has", "ACTIVE"]);
        return (
            <ul className="visible-sites-list">
                <li className="noresults">
                    <div className="noresults__heading">
                        No results in area 🌎
                    </div>
                    <div className="noresults__body">
                        We couldn't find a testing site in the shown area. Drag
                        the map or search to populate results.
                    </div>
                </li>
            </ul>
        );
    }
}

function normalize(value) {
    if (typeof value === "string") {
        return value.trim().toLowerCase();
    } else {
        return value;
    }
}

function getUniqueFeatures(features, comparatorProperty) {
    const uniqueIds = new Set();
    const uniqueFeatures = [];
    for (const feature of features) {
        const id = feature.properties[comparatorProperty];
        if (!uniqueIds.has(id)) {
            uniqueIds.add(id);
            uniqueFeatures.push(feature);
        }
    }
    return uniqueFeatures;
}

export function moveStartHandler(event, map) {
    map.current.setFilter("all-vic-testing-sites", ["has", "ACTIVE"]);
}

export function moveEndHandler(map) {
    const features = map.current.queryRenderedFeatures({
        layers: ["all-vic-testing-sites"],
    });

    if (features) {
        const uniqueFeatures = getUniqueFeatures(features, "ID");
        const renderedFeatures = renderListings(uniqueFeatures, map);

        // later use for filtering on `keyup`.
        return {
            renderedFeatures: renderedFeatures,
            uniqueFeatures: uniqueFeatures,
        };
    }
}

export function filterKeyUp(event, map, filterEl, data) {
    const value = normalize(event.target.value);

    // Filter visible features that match the input value.
    const filtered = [];
    const allFeatures = data.features;
    const visibleFeatures =
        map.current.querySourceFeatures("vic-testing-sites");
    for (const feature of allFeatures) {
        const name = normalize(feature.properties["SITE_NAME"]);
        const address = normalize(feature.properties["ADDRESS"]);
        const suburb = normalize(feature.properties["SUBURB"]);
        const postcode = normalize(feature.properties["POSTCODE"]);
        if ([name, address, suburb, postcode].join(" ").includes(value)) {
            filtered.push(feature);
        }
    }

    if (visibleFeatures.length === 0 && filterEl && filterEl.value === "") {
        // If search bar is empty and no features are visible
        const renderedFeatures = renderListings(visibleFeatures, map, filterEl);
        return {
            renderedFeatures: renderedFeatures,
            uniqueFeatures: [],
        };
    } else if (filterEl && filterEl.value.length > 2) {
        const uniqueFeatures = getUniqueFeatures(filtered, "ID");
        const renderedFeatures = renderListings(uniqueFeatures, map, filterEl);
        return {
            renderedFeatures: renderedFeatures,
            uniqueFeatures: uniqueFeatures,
        };
    } else {
        const renderedFeatures = renderListings([], map, filterEl);
        return {
            renderedFeatures: renderedFeatures,
            uniqueFeatures: [],
        };
    }
}

export function clickHandler(event, map) {
    const selectedPoint = map.current.queryRenderedFeatures(event.point, {
        layers: ["all-vic-testing-sites"],
    });
    const coordinates = selectedPoint[0].geometry.coordinates;

    if (selectedPoint.length > 0) {
        marker.remove();
        marker.setLngLat(coordinates).addTo(map.current);
        map.current.flyTo({
            center: [coordinates[0], coordinates[1] - 0.005],
            zoom: 14,
            maDuration: 200,
        });
    }
}

export function initialRender(map, data) {
    const features = data.features;

    if (features) {
        const uniqueFeatures = getUniqueFeatures(features, "ID");
        const renderedFeatures = renderListings(uniqueFeatures, map);

        return {
            renderedFeatures: renderedFeatures,
            uniqueFeatures: uniqueFeatures,
        };
    }
}
