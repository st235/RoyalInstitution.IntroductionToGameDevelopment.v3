import "./Footer.css";
import LogoRoyalInstitution from "../../assets/logo-royal-institution.svg";
import LogoGoogleSlides from "../../assets/logo-google-slides.svg";

export default function Footer() {
    return (
        <div className="footer">
            <a className="link slides" target="_blank" href="https://docs.google.com/presentation/d/1Mjba1zi_cBy_Yj6Ie7shPmTOuNbAomML247daykqZMo/edit?usp=sharing">
                <img className="logo-slides" src={LogoGoogleSlides} />
                <span className="slides-text">Consult with the workshop<br/>slides for more tips & trics</span>
            </a>
            <a className="link ri" target="_blank" href="https://www.rigb.org">
                <span className="in-collaboration">In collaboration with:</span>
                <img className="logo-ri" src={LogoRoyalInstitution} />
            </a>
        </div>
    );
}
