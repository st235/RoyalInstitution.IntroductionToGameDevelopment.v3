import "./Logo.css";
import LogoIde from "../../assets/logo-ide.png";

export default function Logo() {
    return (
        <div className="logo">
            <div className="icon">
                <img src={LogoIde} />
            </div>
            <div className="text">
                <span className="title">Web IDE: <span className="snake">Snake</span></span>
                <span className="subtitle">Introduction to Game Development Workshop</span>
            </div>
        </div>
    );
}
