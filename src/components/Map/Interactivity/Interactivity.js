import { Chip } from "@mui/material";
import {
    MdDirectionsWalk,
    MdDirectionsCar,
    MdAccessible,
    MdNearMe,
    MdCallEnd,
    MdLink,
} from "react-icons/md";

function renderListings(features, map) {
    if (features.length) {
        const testingSiteList = features.map((feature) => {
            return (
                <li className="list-item" key={feature.properties["ID"]}>
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
    } else if (features.length === 0) {
        return <p>No results found</p>;
    } else {
        // remove features filter
        map.current.setFilter("all-vic-testing-sites", ["has", "ACTIVE"]);
        return <p>Drag the map to populate results</p>;
    }
}

function normalize(string) {
    return string.trim().toLowerCase();
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

export function moveEndHandler(event, map) {
    const features = map.current.queryRenderedFeatures({
        layers: ["all-vic-testing-sites"],
    });

    if (features) {
        const uniqueFeatures = getUniqueFeatures(features, "ID");
        // Populate features for the listing overlay.
        const renderedFeatures = renderListings(uniqueFeatures, map);

        // Store the current features in sn `airports` variable to
        // later use for filtering on `keyup`.
        return {
            renderedFeatures: renderedFeatures,
            uniqueFeatures: uniqueFeatures,
        };
    }
}
