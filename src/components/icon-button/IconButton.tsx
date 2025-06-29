import "./IconButton.css";

type IconButtonProps = {
    variant: "primary" | "secondary" | "accent";
    textSymbol?: string;
    iconSymbol?: string;
    iconOverlay?: string;
    isSelected?: boolean;
    onClick?: () => void;
};

function IconButton(props: IconButtonProps) {
    return (
        <div
            className={`icon-button ${props.variant} ${props.isSelected ? "selected" : ""}`}
            onClick={props.onClick}>
            {props.textSymbol && <span className="text-icon">{props.textSymbol}</span>}
            {props.iconSymbol && <img className="image-icon" src={props.iconSymbol} />}
            <div className="background" style={{backgroundImage: `url(\"${props.iconOverlay}\")`,}} />
        </div>
    );
}

export default IconButton;
