import { styled } from '@mui/material/styles';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import './CustomTextField.css';
import PropTypes from "prop-types";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from "react";

function CustomTextField({ label, align, autoComplete, onlyNumbers, allowedLength, onChange, maxWidth, width, password }) {
const[showPassword, setShowPassword] = useState(true);

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

const handleKeyDown = (allowedLength) => (e) => {
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

const handleClickShowPassword = () => setShowPassword((show) => !show);

const handleMouseDownPassword = (event) => {
    event.preventDefault();
};

const handleMouseUpPassword = (event) => {
    event.preventDefault();
};

    return (
        <FilterTextField 
        type={showPassword ? 'text' : 'password'}
        autoComplete={autoComplete}
        onKeyDown={handleKeyDown(allowedLength)} 
        onChange={onChange} 
        sx={{ maxWidth, width }} 
        label={label} 
        variant="standard" 
        InputProps={{  inputProps: { style: { textAlign: align } }, endAdornment: password && (
            <InputAdornment position='end'>
                <IconButton
                    aria-label={showPassword ? 'hide the password' : 'show the password'}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}>
                    {showPassword ? <VisibilityOff sx={{ fill: 'white' }} /> : <Visibility sx={{ fill: 'white' }} />}
                </IconButton>
            </InputAdornment>
        ) }}
        />
    );
}

export default React.memo(CustomTextField);

CustomTextField.propTypes = {
    label: PropTypes.string, 
    align: PropTypes.string,
    autoComplete: PropTypes.string,
    onlyNumbers: PropTypes.bool,
    allowedLength: PropTypes.number,
    onChange: PropTypes.func, 
    maxWidth: PropTypes.string,
    width: PropTypes.string,
    password: PropTypes.bool,
}