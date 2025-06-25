import "./Logo.css";
import LogoIde from "../../assets/logo-ide.png";

import Popup from "../popup/Popup";

function SnakeLogoImage() {
    return (<div className="snake-logo-image"><img src={LogoIde} /></div>);
}

export default function Logo() {
    return (
        <Popup
            className="logo-root"
            content={<SnakeLogoImage />}
            popupContent={
            <div className="logo-popup">
                <span className="title">Web IDE: <span className="snake">Snake</span></span>
                <span className="subtitle">Royal Institution Workshop:<br/>Introduction to Game Development</span>
                <div className="popup-tags">
                    <span className="tag">typescript</span>
                    <span className="tag">phaser</span>
                    <span className="tag">snake</span>
                    <span className="tag">game</span>
                    <span className="tag highlight">v{import.meta.env.VITE_APP_VERSION}</span>
                </div>
                <span className="footer">Made with ❤️ by <a href="https://github.com/st235">st235</a></span>
            </div>
            } />
    );
}
