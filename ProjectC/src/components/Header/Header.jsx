import { useContext, useState } from 'react';
import './Header.css';
import AuthPopup from '../AuthPopup/AuthPopup';
import { motion } from "framer-motion";
import { UserContext } from '../../contexts/UserContext/UserProvider';
import { logout } from '../../services/auth';

function Header() {
const[openPopup, setOpenPopup] = useState(false);
const { isUserAuthenticated, removeUserInfo } = useContext(UserContext);

const handlePopup = () => {
    setOpenPopup(true);
}

const handleClosePopup = () => {
    setOpenPopup(false);
}

const handleLogout = async () => {
    await logout();
    removeUserInfo();
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
                    {
                        isUserAuthenticated === false ? (
                            <button onClick={handlePopup} className="auth-btn">Войти</button>
                        ) : (
                            <button onClick={handleLogout} className="logout-btn">Выйти</button>
                        )
                    }
                    <AuthPopup openPopup={openPopup} handleClosePopup={handleClosePopup}  />
                </div>
            </div>
        </div>
    );
}

export default Header;