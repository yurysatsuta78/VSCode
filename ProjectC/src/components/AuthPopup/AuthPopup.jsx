import { useState, useEffect } from 'react';
import './AuthPopup.css';
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import CustomTextField from '../CustomTextField/CustomTextField';

function AuthPopup({ handleClosePopup, openPopup }) {
const[isVisible, setIsVisible] = useState(false);
const[selectedButton, setSelectedButton] = useState(0);

useEffect(() => {
    if (openPopup) {
      setIsVisible(true);
      document.body.classList.add('no-scroll');
    } else {
      setIsVisible(false);
      document.body.classList.remove('no-scroll');
    }
  }, [openPopup]);

const handleClose = () => {
    setIsVisible(false);
    setSelectedButton(0);
    setTimeout(handleClosePopup, 230);
};

    return (
        <div className={`modal ${isVisible ? 'show' : 'hide'}`} onClick={handleClose}>
            <div className="modal-container">
                <div className="auth-modal-content" onClick={e => e.stopPropagation()}>
                    <div className="auth-nav">
                        <motion.button 
                        onClick={() => setSelectedButton(0)} 
                        className={`auth-nav-btn ${selectedButton === 0 ? 'active' : ''}`}
                        whileTap={{ scale: 0.95 }}
                        whileFocus={() => setSelectedButton(0)}
                        >
                            Авторизация
                        </motion.button>
                        <motion.button 
                        onClick={() => setSelectedButton(1)} 
                        className={`auth-nav-btn ${selectedButton === 1 ? 'active' : ''}`}
                        whileTap={{ scale: 0.95 }}
                        whileFocus={() => setSelectedButton(1)}
                        >
                            Регистрация
                        </motion.button>
                        <motion.div
                            className="underline"
                            style={{
                                left: selectedButton === 0 ? '0' : '50%',
                            }}
                        />
                        <div style={{ position: 'absolute', bottom: 0, height: 3, backgroundColor: '#ffffff80', width: '100%', zIndex: 1001 }}></div>
                    </div>
                    <div className="auth-form">
                        <CustomTextField label={"Имя"} autoComplete={"off"} allowedLength={20} maxWidth={1} width={'100%'} />
                        <CustomTextField label={"Фамилия"} autoComplete={"off"} allowedLength={20} maxWidth={1} width={'100%'} />
                        <CustomTextField label={"Почта"} autoComplete={"off"} allowedLength={40} maxWidth={1} width={'100%'} />
                        <CustomTextField label={"Номер телефона(без +)"} autoComplete={"off"} allowedLength={12} maxWidth={1} width={'100%'} />
                        <CustomTextField label={"Пароль"} autoComplete={"off"} allowedLength={20} maxWidth={1} width={'100%'} password={true} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPopup;

AuthPopup.propTypes = {
    handleClosePopup: PropTypes.func.isRequired,
    openPopup: PropTypes.bool.isRequired,
};