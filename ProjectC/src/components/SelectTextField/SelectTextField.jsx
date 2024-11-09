import { styled } from '@mui/material/styles';
import { TextField, MenuItem } from '@mui/material';
import './SelectTextField.css';
import PropTypes from "prop-types";

const DarkMenuItem = styled(MenuItem)(() => ({
    backgroundColor: '#212122 !important',
    color: '#fff',
    fontFamily: 'Oswald, sans-serif',
    height: 40,
    fontSize: 13,
    '&:hover': { backgroundColor: '#4d54457a !important' },
    '&:focus': { backgroundColor: '#4d54457a !important' },
}));

const FilterSelectTextField = styled(TextField)(() => ({
    '& .MuiInput-underline:before': { borderBottomColor: '#ffffff80' },
    '& .MuiInput-underline:hover:before': { borderBottomColor: '#ffffff !important' },
    '& .MuiInput-underline:after': { borderBottomColor: '#acb262' },
    '& .MuiInputLabel-root': { color: '#ffffff80', fontFamily: 'Oswald, sans-serif', fontSize: 14 },
    '& .MuiInputLabel-root.Mui-focused': { color: '#acb262' },
    '& .MuiInputBase-input': { color: '#ffffff', fontFamily: 'Oswald, sans-serif' },
}));

function SelectTextField({ label, value, id, htmlFor, list, onChange, maxWidth }) {

    return (
        <FilterSelectTextField
        value={value}
        sx={{ maxWidth }}
        InputProps={{ id }}
        InputLabelProps={{ htmlFor }}
        SelectProps={{ MenuProps: { disableScrollLock: true } }}
        onChange={onChange}
        select
        label={label}
        variant="standard"
    >
        <DarkMenuItem value=''>Ничего</DarkMenuItem>
        {list.map((listItem) => (
            <DarkMenuItem key={listItem} value={listItem}>{listItem}</DarkMenuItem>
        ))}
        </FilterSelectTextField>
    );
}

export default SelectTextField;

SelectTextField.propTypes = {
    label: PropTypes.string, 
    value: PropTypes.string, 
    id: PropTypes.string, 
    htmlFor: PropTypes.string, 
    list: PropTypes.arrayOf(
        PropTypes.string,
    ), 
    onChange: PropTypes.func, 
    maxWidth: PropTypes.number,
}