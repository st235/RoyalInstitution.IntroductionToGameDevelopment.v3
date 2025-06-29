import "./Overlay.css";
import Logo from "../../assets/logo.png";

function Overlay() {
    return (
        <div className="overlay-message">
            <img className="" src={Logo} />
            <p>Sorry, you need device with a bigger display to use Snake IDE.</p>
        </div>
    );
}

export default Overlay;
