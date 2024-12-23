import { useState, useEffect, useContext } from 'react';
import './AuthPopup.css';
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { login, register } from '../../services/auth';
import { IconButton, InputAdornment, styled, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { UserContext } from '../../contexts/UserContext/UserProvider';

const FilterTextField = styled(TextField)(() => ({
    '& .MuiInput-underline:before': {
        borderBottomColor: '#ffffff80',
    },
    '& .MuiInput-underline:hover:before': {
        borderBottomColor: '#ffffff !important',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#acb262',
    },
    '& .MuiInputLabel-root': {
        color: '#ffffff80',
        fontFamily: 'Oswald, sans-serif',
        fontSize: 13,
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#acb262',
    },
    '& .MuiInputBase-input': {
        height: 17,
        color: '#fff',
        fontFamily: 'Oswald, sans-serif',
    }
}));

const handleKeyDown = (allowedLength, onlyNumbers) => (e) => {
    const { value } = e.target;
    const isSpecialKey = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', '+'].includes(e.key);
    const isNumberKey = /^[0-9]$/.test(e.key);

    if(!isNumberKey && !isSpecialKey && onlyNumbers){
        e.preventDefault();
    }
    if(allowedLength && value.length >= allowedLength && !isSpecialKey){
        e.preventDefault();
    }
};

function AuthPopup({ handleClosePopup, openPopup }) {
const[isVisible, setIsVisible] = useState(false);
const[selectedButton, setSelectedButton] = useState(0);
const[showPassword, setShowPassword] = useState(true);
const[registerData, setRegisterData] = useState({
    name: "",
    surname: "",
    phoneNumber: "", 
    password: ""
});
const[loginData, setLoginData] = useState({
    phoneNumber: "",
    password: ""
});
const { getUserInfo, isUserAuthenticated } = useContext(UserContext);

const handleLoginDataChange = (field) => (e) => 
{
    setLoginData({...loginData, [field]: e.target.value});
}

const handleRegisterDataChange = (field) => (e) => 
{
    setRegisterData({...registerData, [field]: e.target.value});
}

const FORM_WIDTH = 390;
const FORM_MARGINS = 30;
const FORM_OFFSET = FORM_WIDTH + FORM_MARGINS;

useEffect(() => {
    if (openPopup) {
      setIsVisible(true);
      document.body.classList.add('no-scroll');
    } else {
      setIsVisible(false);
      document.body.classList.remove('no-scroll');
    }
}, [openPopup]);

useEffect(() => {
    if(isUserAuthenticated){
        setIsVisible(false);
        setTimeout(handleClosePopup, 230);
    }
}, [isUserAuthenticated, handleClosePopup])

const handleClose = () => {
    setIsVisible(false);
    setTimeout(handleClosePopup, 230);
};

const handleLogin = async () => 
{
    const userInfo = await login(loginData);

    const clearedLoginData = Object.keys(loginData).reduce((acc, key) => {
        acc[key] = ""; // Устанавливаем пустую строку для каждого ключа
        return acc;
    }, {});

    setLoginData(clearedLoginData);
    getUserInfo(userInfo);
}

const handleRegister = async () => 
{
    await register(registerData);
    const clearedRegisterData = Object.keys(registerData).reduce((acc, key) => {
        acc[key] = "";
        return acc;
    }, {});

    setRegisterData(clearedRegisterData);
}

const handleClickShowPassword = () => setShowPassword((show) => !show);

const handleMouseDownPassword = (event) => {
    event.preventDefault();
};

const handleMouseUpPassword = (event) => {
    event.preventDefault();
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
                                backgroundColor: "#acb262",
                            }}
                        />
                        <div style={{ position: 'absolute', bottom: 0, height: 3, backgroundColor: '#ffffff80', width: '100%', zIndex: 1001 }}></div>
                    </div>
                    <div className="auth-window">
                        <motion.div className="all-form-container" initial={{ translateX: 0 }} animate={{ translateX: selectedButton === 1 ? -FORM_OFFSET : 0 }} transition={{ duration: 0.3 }}>
                            <motion.div className="auth-form" initial={{ opacity: 1 }} animate={{ opacity: selectedButton === 0 ? 1 : 0 }} transition={{ duration: 0.2 }} style={{ minWidth: FORM_WIDTH, maxWidth: FORM_WIDTH, marginRight: FORM_MARGINS }}>
                                <FilterTextField label={"Номер телефона"} value={loginData.phoneNumber} onKeyDown={handleKeyDown(13, true)} autoComplete='off' onChange={handleLoginDataChange('phoneNumber')} sx={{ width: '100%' }} variant='standard' />
                                <FilterTextField 
                                type={showPassword ? 'text' : 'password'}
                                label={"Пароль"} 
                                value={loginData.password} 
                                onKeyDown={handleKeyDown(20, false)} 
                                autoComplete={"off"} 
                                onChange={handleLoginDataChange('password')} 
                                sx={{ width: '100%' }} 
                                variant='standard' 
                                InputProps={{ endAdornment: 
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label={showPassword ? 'hide the password' : 'show the password'}
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}>
                                        {showPassword ? <VisibilityOff sx={{ fill: 'white' }} /> : <Visibility sx={{ fill: 'white' }} />}
                                    </IconButton>
                                </InputAdornment>}} />
                                <motion.button initial={{ color: '#ffffff', borderColor: '#ffffff80' }} onClick={handleLogin} whileHover={{ color: "#acb262", borderColor: '#ffffff' }} transition={{ duration: 0.2, ease: 'easeIn' }} className="auth-form-btn">Войти</motion.button>
                            </motion.div>
                            <motion.div className="auth-form" initial={{ opacity: 1 }} animate={{ opacity: selectedButton === 1 ? 1 : 0 }} transition={{ duration: 0.2 }} style={{ minWidth: FORM_WIDTH, maxWidth: FORM_WIDTH }}>
                                <FilterTextField label={"Имя"} value={registerData.name} onKeyDown={handleKeyDown(50, false)} autoComplete='off' onChange={handleRegisterDataChange('name')} sx={{ width: '100%' }} variant='standard' />
                                <FilterTextField label={"Фамилия"} value={registerData.surname} onKeyDown={handleKeyDown(50, false)} autoComplete='off' onChange={handleRegisterDataChange('surname')} sx={{ width: '100%' }} variant='standard' />
                                <FilterTextField label={"Номер телефона"} value={registerData.phoneNumber} onKeyDown={handleKeyDown(13, true)} autoComplete='off' onChange={handleRegisterDataChange('phoneNumber')} sx={{ width: '100%' }} variant='standard' />
                                <FilterTextField 
                                type={showPassword ? 'text' : 'password'}
                                label={"Пароль"} 
                                value={registerData.password} 
                                onKeyDown={handleKeyDown(20, false)} 
                                autoComplete={"off"} 
                                onChange={handleRegisterDataChange('password')} 
                                sx={{ width: '100%' }} 
                                variant='standard' 
                                InputProps={{ endAdornment: 
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label={showPassword ? 'hide the password' : 'show the password'}
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}>
                                        {showPassword ? <VisibilityOff sx={{ fill: 'white' }} /> : <Visibility sx={{ fill: 'white' }} />}
                                    </IconButton>
                                </InputAdornment>}} />
                                <motion.button initial={{ color: '#ffffff', borderColor: '#ffffff80' }} onClick={handleRegister} whileHover={{ color: "#acb262", borderColor: '#ffffff' }} transition={{ duration: 0.2, ease: 'easeIn' }} className="auth-form-btn">Зарегистрироваться</motion.button>
                            </motion.div>
                        </motion.div>
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