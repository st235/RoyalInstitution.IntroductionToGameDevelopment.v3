import "./InfoFooter.css";
import IconGithub from "../../assets/ic-github.svg";
import IconInfoCircleFill from "../../assets/ic-info-circle-fill.svg";
import LogoGoogleSlides from "../../assets/logo-google-slides.svg";
import LogoRoyalInstitution from "../../assets/logo-royal-institution.svg";

import IconButton from "../icon-button/IconButton";
import Popup from "../popup/Popup";

function InfoIconButton() {
    return (
        <IconButton
            variant="primary"
            iconSymbol={IconInfoCircleFill} />
    );
}

function InfoFooter() {
    return (
        <Popup
            className="info-footer-root"
            anchor="bl"
            content={<InfoIconButton />}
            popupContent={
            <div className="info-footer-popup">
                <a className="link common-container" target="_blank" href="https://github.com/st235/RoyalInstitution.IntroductionToGameDevelopment.v3">
                    <img className="logo" src={IconGithub} />
                    <span className="text">Found an issue?<br/>Contribute to Github</span>
                </a>
                <a className="link common-container" target="_blank" href="https://docs.google.com/presentation/d/1Mjba1zi_cBy_Yj6Ie7shPmTOuNbAomML247daykqZMo/edit?usp=sharing">
                    <img className="logo" src={LogoGoogleSlides} />
                    <span className="text">Consult with the workshop<br/>slides for more tips & trics</span>
                </a>
                <a className="link ri" target="_blank" href="https://www.rigb.org">
                    <span className="in-collaboration">In collaboration with:</span>
                    <img className="logo-ri" src={LogoRoyalInstitution} />
                </a>
            </div>
            } />
    );
}


export default InfoFooter;
