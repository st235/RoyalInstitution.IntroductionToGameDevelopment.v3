import "./MinScreenSizeOverlay.css";
import Logo from "../../assets/logo.png";

function MinScreenSizeOverlay() {
    return (
        <div className="min-screen-size-overlay-banner">
            <div className="window">
                <div className="fake-controls">
                    <span className="control red" />
                    <span className="control orange" />
                    <span className="control green" />
                </div>
                <img src={Logo} />
                <p>Sorry, the window size is too small to display the full Snake IDE. Please try resizing the window, increasing your screen resolution, or using a device with a larger display.</p>
            </div>
        </div>
    );
}

export default MinScreenSizeOverlay;
