import { styled } from '@mui/material/styles';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import './CustomTextField.css';
import PropTypes from "prop-types";
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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

function CustomTextField({ label, align, autoComplete, onlyNumbers, field, allowedLength, onChange, maxWidth, width, password }) {
const[showPassword, setShowPassword] = useState(true);

const handleKeyDown = (e, fieldName, allowedLength) => {
    const isNumberKey = /^[0-9]$/.test(e.key);
    const isSpecialKey = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key);

    if(!isNumberKey && !isSpecialKey && onlyNumbers){
        e.preventDefault();
    } else if(field.length >= [allowedLength] && isNumberKey){
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
        onKeyDown={ (e) => handleKeyDown(e, field, allowedLength) } 
        onChange={onChange} 
        sx={{ maxWidth, width }} 
        label={label} 
        variant="standard" 
        InputProps={{ inputProps: { style: { textAlign: align } }, endAdornment: password && (
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

export default CustomTextField;

CustomTextField.propTypes = {
    label: PropTypes.string, 
    align: PropTypes.string,
    autoComplete: PropTypes.string,
    onlyNumbers: PropTypes.bool,
    field: PropTypes.string,
    allowedLength: PropTypes.number,
    onChange: PropTypes.func, 
    maxWidth: PropTypes.number,
    width: PropTypes.string,
    password: PropTypes.bool,
}