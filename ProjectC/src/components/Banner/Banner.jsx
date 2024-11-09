import Header from "../Header/Header"
import './Banner.css'

function Banner() {
    return(
        <div className="bannerDiv">
            <Header />
            <div className="bannerTextDiv">
                <span className="bannerText"></span>
            </div>
        </div>
    );
}

export default Banner;