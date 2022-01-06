function renderListings(features, map) {
    if (features.length) {
        const testingSiteList = features.map((feature) => {
            return (
                <li className="list-item" key={feature.properties["ID"]}>
                    <div className="list-item__header">
                        {feature.properties["SITE_NAME"]}
                    </div>
                    <div className="list-item__body"></div>
                    <div className="list-item__footer"></div>
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
        const uniqueFeatures = getUniqueFeatures(features, "SITE_NAME");
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
