// import moment from "moment";

function cleanKey(key) {
    let cleanedKey = key[0].toLowerCase() + key.slice(1, key.length);
    cleanedKey = cleanedKey.replace("-", "_").replace(",", "").replace(" ", "");
    cleanedKey = cleanedKey.replace(/(_.)/g, (str) => str.toUpperCase()[1]);
    cleanedKey = cleanedKey.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`
    );
    cleanedKey = cleanedKey.toUpperCase().replace(" _", "_").replace(" ", "_");

    return cleanedKey;
}

function cleanValue(value, key) {
    let cleanedValue = value;
    if (key === "SITE_NAME") {
        cleanedValue = value
            .replace("- Drive Through", "")
            .replace("- Walk Through", "")
            .replace("- Appointment only", "")
            .replace("(Asymptomatic only)", "");
    }
    return cleanedValue;
}

export async function fetchVicData() {
    const output = {
        type: "FeatureCollection",
        features: [],
    };
    // Useful video: https://www.youtube.com/watch?v=aP2cM7EuLeo
    // Useful example: https://github.com/lsvekis/JavaScript-Code/blob/main/Sheet%20Data%20as%20JSON
    const base =
        "https://docs.google.com/spreadsheets/d/1_tKN6yIxOUjqOOermICjxwhRExlhH3UTx8jsBWjxiy4/gviz/tq?";
    const query =
        "tqx=out:json&sheet=data&tq=" +
        encodeURIComponent("where(A is not null)");
    const url = base + query;
    await fetch(url)
        .then((res) => res.text())
        .then((res) => {
            const data = JSON.parse(res.substring(47).slice(0, -2));
            data.table.rows.forEach((row) => {
                const feature = {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "Point",
                        coordinates: [],
                    },
                };
                data.table.cols.forEach((key, idx) => {
                    if (key.label === "Latitude" || key.label === "Longitude") {
                        feature.geometry.coordinates.unshift(
                            row.c[idx] ? row.c[idx].v : null
                        );
                    } else if (key.label) {
                        const cleanedKey = cleanKey(key.label);
                        feature.properties[cleanedKey] = row.c[idx]
                            ? cleanValue(row.c[idx].v, cleanedKey)
                            : null;
                    }
                });
                output.features.push(feature);
            });
        });
    return output;
}
