import { ReactComponent as Logo } from "../../../logo.svg";
import { MdInfo } from "react-icons/md";
// import { Fab } from "@mui/material";
import "./Attribution.scss";

const Attribution = () => {
    return (
        <div className="attribution">
            <div className="attribution-inner">
                <div
                    className="attribution-control"
                    size="small"
                    color="primary"
                >
                    {/* <Logo className="logo" /> */}
                    <MdInfo />
                </div>
                <div className="attribution-content">
                    <div className="attribution-content-inner">
                        <div>
                            Developed by{" "}
                            <a
                                href="https://twitter.com/hrs_andrabi"
                                target="_blank"
                                rel="noreferrer"
                            >
                                @hrs_andrabi
                            </a>
                        </div>
                        <div>
                            <a
                                href="https://www.openstreetmap.org/copyright"
                                target="_blank"
                                rel="noreferrer"
                            >
                                © OpenStreetMap
                            </a>{" "}
                            <a
                                href="https://www.mapbox.com/about/maps/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                © Mapbox
                            </a>
                        </div>
                        {/* <div>Improve this map</div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Attribution;
