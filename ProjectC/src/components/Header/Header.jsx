import { useState } from 'react';
import './Header.css';
import AuthPopup from '../AuthPopup/AuthPopup';

function Header() {
const[openPopup, setOpenPopup] = useState(false);

const handlePopup = () => {
    setOpenPopup(true);
}

const handleClosePopup = () => {
    setOpenPopup(false);
}

    return (
        <div className="headerDiv">
            <div className="logo-div"></div>
            <div className="nav-div">
                <div className="nav-bar"></div>
                <div className="auth-btn-div">
                    <button onClick={handlePopup} className="auth-btn">Войти</button>
                    <AuthPopup openPopup={openPopup} handleClosePopup={handleClosePopup}  />
                </div>
            </div>
        </div>
    );
}

export default Header;