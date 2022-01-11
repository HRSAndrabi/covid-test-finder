import moment from "moment";

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
    if (typeof value === "string") {
        cleanedValue = cleanedValue.trim().replace("~", "");
    }
    if (key === "SITE_NAME") {
        cleanedValue = cleanedValue
            .replace("- Drive Through", "")
            .replace("- Walk Through", "")
            .replace("- Appointment only", "")
            .replace("(Asymptomatic only)", "")
            // .replace(/ *\([^)]*\) */g, "")
            .replace(/-.*$/, "")
            .replace("(Star Health", "(Star Health)")
            .replace("( Cohealth", "(Cohealth)")
            .replace("ACL", "Australian Clinical Labs (ACL)");
    } else if (key === "PHONE") {
        cleanedValue = cleanedValue.replace(/[^0-9 ]/g, "");
    } else if (key === "REQUIREMENTS") {
        cleanedValue = cleanedValue
            .replace(
                "GP referral or travel referral required. Appointment required.",
                "GP or travel referral required"
            )
            .replace(
                "GP referral or travel referral required",
                "GP or travel referral required"
            )
            .replace("GP referral required for asymptomatic testing", "")
            .replace(".", "")
            .toLowerCase();
    } else if (["SERVICE_FORMAT", "AGE_LIMIT"].includes(key)) {
        cleanedValue = cleanedValue.toLowerCase();
    }
    return cleanedValue;
}

function checkOpen(feature) {
    if (
        !feature.properties["MO_START"] &&
        !feature.properties["TU_START"] &&
        !feature.properties["WE_START"] &&
        !feature.properties["TH_START"] &&
        !feature.properties["FR_START"] &&
        !feature.properties["SA_START"] &&
        !feature.properties["SU_START"]
    ) {
        return "unknown";
    }
    const currentTime = moment();
    const dayPrefix = currentTime.format("dd").toUpperCase();
    const siteOpenTime = moment(
        currentTime.format("MMMM D YYYY, ") +
            feature.properties[`${dayPrefix}_START`],
        "MMMM D YYYY, h:mm A"
    );
    const siteEndTime = moment(
        currentTime.format("MMMM D YYYY, ") +
            feature.properties[`${dayPrefix}_END`],
        "MMMM D YYYY, h:mm A"
    );
    if (currentTime.isBetween(siteOpenTime, siteEndTime)) {
        return "open";
    } else {
        return "closed";
    }
}

function checkWheelchair(feature) {
    if (
        feature.properties["SITE_FACILITIES"] &&
        feature.properties["SITE_FACILITIES"]
            .toLowerCase()
            .includes("wheelchair")
    ) {
        return true;
    } else {
        return false;
    }
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
            const uidList = [];
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
                feature.properties["OPEN_STATUS"] = checkOpen(feature);
                feature.properties["WHEELCHAIR"] = checkWheelchair(feature);
                if (
                    !uidList.includes(feature.properties["ID"]) &&
                    feature.properties["ADDRESS"] &&
                    feature.geometry.coordinates[0] &&
                    feature.geometry.coordinates[1]
                ) {
                    output.features.push(feature);
                    uidList.push(feature.properties["ID"]);
                }
            });
        });
    return output;
}
