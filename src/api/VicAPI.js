// import moment from "moment";

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
                    if (key.label !== "Latitude" && key.label !== "Longitude") {
                        feature.properties[key.label] = row.c[idx]
                            ? row.c[idx].v
                            : null;
                    } else {
                        feature.geometry.coordinates.unshift(
                            row.c[idx] ? row.c[idx].v : null
                        );
                    }
                });
                output.features.push(feature);
            });
        });
    return output;
}
