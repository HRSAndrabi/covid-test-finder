function renderListings(features, map) {
    if (features.length) {
        const testingSiteList = features.map((feature) => {
            return (
                <li key={feature.properties["Site_Name"]}>
                    {feature.properties["Site_Name"]}
                </li>
            );
        });
        return <ul>{testingSiteList}</ul>;
    } else if (features.length === 0) {
        return <p>No results found</p>;
    } else {
        // remove features filter
        map.current.setFilter("all-vic-testing-sites", ["has", "Active"]);
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
    map.current.setFilter("all-vic-testing-sites", ["has", "Active"]);
}

export function moveEndHandler(event, map) {
    const features = map.current.queryRenderedFeatures({
        layers: ["all-vic-testing-sites"],
    });

    if (features) {
        const uniqueFeatures = getUniqueFeatures(features, "Site_Name");
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
