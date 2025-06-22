import "./Logo.css";
import LogoIde from "../../assets/logo-ide.png";

export default function Logo() {
    return (
        <div className="logo">
            <div className="icon">
                <img src={LogoIde} />
            </div>
            <div className="text">
                <span className="title">Introduction to Game Development: Snake</span>
                <span className="subtitle">Web IDE for Royal Institution Interactive Workshop</span>
            </div>
        </div>
    );
}
