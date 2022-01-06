import { useState, useEffect } from "react";
import { isDesktop } from "react-device-detect";
import { SwipeableDrawer } from "@mui/material";
import "./SidePanel.scss";

const SidePanel = (props) => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    useEffect(() => {
        // Hacky way to open/close the bottom (mobile) drawer when on desktop
        // TODO: Maybe remove Material UI here and do a custom component
        window.addEventListener("click", (event) => {
            const drawerArea = [
                "PrivateSwipeArea-root",
                "drawer-preview",
                "drawer-preview__content",
                "drawer-content",
            ];
            if (
                drawerArea.some((str) => event.target.className.includes(str)) &
                isDesktop
            ) {
                setOpen(true);
            } else {
                setOpen(false);
            }
        });
    }, []);

    return (
        <>
            <div className="desktop-drawer">
                <div className="drawer-inner">{props.renderedFeatures}</div>
            </div>
            <SwipeableDrawer
                className="mobile-drawer"
                anchor="bottom"
                open={open}
                onClick={toggleDrawer(true)}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={56}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <div className="drawer-preview">
                    <div className="handle"></div>
                    <div className="drawer-preview__content">Preview</div>
                </div>
                <div className="drawer-content">
                    Drawer content with insighful insights.
                </div>
            </SwipeableDrawer>
        </>
    );
};

export default SidePanel;
