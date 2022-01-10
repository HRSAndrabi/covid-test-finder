import { useState, useEffect } from "react";
import moment from "moment";
import { MdRefresh } from "react-icons/md";
import "./StatusBar.scss";

const StatusBar = (props) => {
    const [timeSinceUpdate, setTimeSinceUpdate] = useState(
        moment.duration(moment().diff(props.lastUpdated)).seconds()
    );

    useEffect(() => {
        // Every minute update the time since last update, and refresh
        // the map if it's been more than 120 minutes since then.
        const updateTimeStamp = setInterval(() => {
            const newTimeSinceUpdate = moment.duration(
                props.lastUpdated.diff(moment())
            );
            if (moment.duration(newTimeSinceUpdate).asMinutes() < -120) {
                console.log("Updating data ...");
                props.onRefresh();
            }
            setTimeSinceUpdate(newTimeSinceUpdate);
        }, 60 * 1000);
        return () => {
            clearInterval(updateTimeStamp);
        };
    }, [props]);

    return (
        <div className="status-bar">
            <div className="status-bar__item">
                Found {props.data.features.length} testing sites
            </div>
            <div className="status-bar__item">
                <MdRefresh /> Last updated:{" "}
                {moment.duration(timeSinceUpdate).asSeconds() > -60
                    ? "a few seconds ago"
                    : moment.duration(timeSinceUpdate).asMinutes() > -60
                    ? moment.duration(timeSinceUpdate, "minutes").humanize(true)
                    : moment.duration(timeSinceUpdate, "hours").humanize(true)}
            </div>
        </div>
    );
};

export default StatusBar;
