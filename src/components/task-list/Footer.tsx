import "./Footer.css";
import LogoRoyalInstitution from "../../assets/logo-royal-institution.svg";

export default function Footer() {
    return (
        <>
            <a href="https://www.rigb.org">
                <img className="logo-ri" src={LogoRoyalInstitution} />
            </a>
        </>
    );
}
