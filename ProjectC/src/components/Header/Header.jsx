import { useContext, useState } from 'react';
import './Header.css';
import AuthPopup from '../AuthPopup/AuthPopup';
import { motion } from "framer-motion";

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
                <div className="nav-bar">
                    <motion.button initial={{ color: '#ffffff', borderColor: '#ffffff80' }} whileHover={{ color: "#acb262", borderColor: '#ffffff' }} transition={{ duration: 0.2, ease: 'easeIn' }} className="nav-btn">Мои объявления</motion.button>
                    <motion.button initial={{ color: '#ffffff', borderColor: '#ffffff80' }} whileHover={{ color: "#acb262", borderColor: '#ffffff' }} transition={{ duration: 0.2, ease: 'easeIn' }} className="nav-btn">Избранное</motion.button>
                </div>
                <div className="auth-btn-div">
                    <button onClick={handlePopup} className="auth-btn">Войти</button>
                    <AuthPopup openPopup={openPopup} handleClosePopup={handleClosePopup}  />
                </div>
            </div>
        </div>
    );
}

export default Header;