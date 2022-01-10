import { Chip } from "@mui/material";
import { MdNearMe, MdCall, MdLink } from "react-icons/md";
import { featureClickHandler } from "../Map/Interactivity/Interactivity";

const SiteListItem = (props) => {
    const clickHandler = () => {
        featureClickHandler(props.feature, props.map);
    };

    return (
        <li
            id={`site-${props.feature.properties["ID"]}`}
            className={`list-item`}
            onClick={clickHandler}
        >
            <div className="list-item-inner">
                <div className="list-item__header">
                    <div className="site-name">
                        {props.feature.properties["SITE_NAME"]}
                    </div>
                    <div className="site-address">
                        Address:{" "}
                        {`${props.feature.properties["ADDRESS"]}, ${props.feature.properties["SUBURB"]}, ${props.feature.properties["POSTCODE"]}`}
                    </div>
                    <div className="site-properties">
                        <Chip
                            label={
                                props.feature.properties["OPEN_STATUS"] ===
                                "unknown"
                                    ? "Hours unavailable"
                                    : props.feature.properties["OPEN_STATUS"]
                            }
                            color={
                                props.feature.properties["OPEN_STATUS"] ===
                                "open"
                                    ? "success"
                                    : props.feature.properties[
                                          "OPEN_STATUS"
                                      ] === "unknown"
                                    ? "warning"
                                    : "error"
                            }
                            size="small"
                        />
                        {!!props.feature.properties["SERVICE_FORMAT"] && (
                            <Chip
                                label={
                                    props.feature.properties["SERVICE_FORMAT"]
                                }
                                color="default"
                                size="small"
                            />
                        )}
                        {!!props.feature.properties["REQUIREMENTS"] && (
                            <Chip
                                label={props.feature.properties["REQUIREMENTS"]}
                                color="default"
                                size="small"
                            />
                        )}
                        {!!props.feature.properties["AGE_LIMIT"] && (
                            <Chip
                                label={props.feature.properties["AGE_LIMIT"]}
                                color="default"
                                size="small"
                            />
                        )}
                    </div>
                </div>
                <div className="list-item__body">
                    <div className="body-item--noflex">
                        <div className="body-item__heading">Opening hours:</div>
                        <div id="site-hours" className="body-item__content">
                            {props.feature.properties["OPEN_STATUS"] !==
                            "unknown" ? (
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="left">Monday</td>
                                            <td className="right">
                                                {props.feature.properties[
                                                    "MO_START"
                                                ] &&
                                                props.feature.properties[
                                                    "MO_END"
                                                ]
                                                    ? `${props.feature.properties["MO_START"]} to ${props.feature.properties["MO_END"]}`.toLowerCase()
                                                    : "closed"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="left">Tuesday</td>
                                            <td className="right">
                                                {props.feature.properties[
                                                    "TU_START"
                                                ] &&
                                                props.feature.properties[
                                                    "TU_END"
                                                ]
                                                    ? `${props.feature.properties["TU_START"]} to ${props.feature.properties["TU_END"]}`.toLowerCase()
                                                    : "closed"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="left">Wednesday</td>
                                            <td className="right">
                                                {props.feature.properties[
                                                    "WE_START"
                                                ] &&
                                                props.feature.properties[
                                                    "WE_END"
                                                ]
                                                    ? `${props.feature.properties["WE_START"]} to ${props.feature.properties["WE_END"]}`.toLowerCase()
                                                    : "closed"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="left">Thursday</td>
                                            <td className="right">
                                                {props.feature.properties[
                                                    "TH_START"
                                                ] &&
                                                props.feature.properties[
                                                    "TH_END"
                                                ]
                                                    ? `${props.feature.properties["TH_START"]} to ${props.feature.properties["TH_END"]}`.toLowerCase()
                                                    : "closed"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="left">Friday</td>
                                            <td className="right">
                                                {props.feature.properties[
                                                    "FR_START"
                                                ] &&
                                                props.feature.properties[
                                                    "FR_END"
                                                ]
                                                    ? `${props.feature.properties["FR_START"]} to ${props.feature.properties["FR_END"]}`.toLowerCase()
                                                    : "closed"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="left">Saturday</td>
                                            <td className="right">
                                                {props.feature.properties[
                                                    "SA_START"
                                                ] &&
                                                props.feature.properties[
                                                    "SA_END"
                                                ]
                                                    ? `${props.feature.properties["SA_START"]} to ${props.feature.properties["SA_END"]}`.toLowerCase()
                                                    : "closed"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="left">Sunday</td>
                                            <td className="right">
                                                {props.feature.properties[
                                                    "SU_START"
                                                ] &&
                                                props.feature.properties[
                                                    "SU_END"
                                                ]
                                                    ? `${props.feature.properties["SU_START"]} to ${props.feature.properties["SU_END"]}`.toLowerCase()
                                                    : "closed"}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            ) : (
                                <div className="site-hours--unavailable">
                                    Hours unavailable, call to confirm.
                                </div>
                            )}
                        </div>
                    </div>
                    <a
                        className="body-item"
                        href={`http://maps.google.com/?q=${props.feature.properties["ADDRESS_SUBURB_POSTCODE"]}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div className="body-item__icon">
                            <MdNearMe />
                        </div>
                        <div className="body-item__content">
                            {`${props.feature.properties["ADDRESS"]}, ${props.feature.properties["SUBURB"]}, ${props.feature.properties["POSTCODE"]}`}
                        </div>
                    </a>
                    {props.feature.properties["PHONE"] && (
                        <a
                            className="body-item"
                            href={`tel:${props.feature.properties["PHONE"]}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div className="body-item__icon">
                                <MdCall />
                            </div>
                            <div id="site-hours" className="body-item__content">
                                {props.feature.properties["PHONE"]}
                            </div>
                        </a>
                    )}
                    {props.feature.properties["WEBSITE"] && (
                        <a
                            className="body-item"
                            href={props.feature.properties["WEBSITE"]}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div className="body-item__icon">
                                <MdLink />
                            </div>
                            <div id="site-hours" className="body-item__content">
                                {props.feature.properties["WEBSITE"]}
                            </div>
                        </a>
                    )}
                </div>
                {/* <div className="list-item__footer">
                {props.feature.properties["ADDRESS_SUBURB_POSTCODE"] && (
                    <a
                        href={`http://props.maps.google.com/?q=${props.feature.properties["ADDRESS_SUBURB_POSTCODE"]}`}
                        target="_blank" rel="noreferrer"
                        className="site-actions"
                    >
                        <MdNearMe /> directions
                    </a>
                )}
                {props.feature.properties["PHONE"] && (
                    <a
                        href={`tel:${props.feature.properties["PHONE"]}`}
                        target="_blank" rel="noreferrer"
                        className="site-actions"
                    >
                        <MdCallEnd /> phone
                    </a>
                )}
                {props.feature.properties["WEBSITE"] && (
                    <a
                        href={props.feature.properties["WEBSITE"]}
                        target="_blank" rel="noreferrer"
                        className="site-actions"
                    >
                        <MdLink /> website
                    </a>
                )}
            </div> */}
            </div>
        </li>
    );
};

export default SiteListItem;
