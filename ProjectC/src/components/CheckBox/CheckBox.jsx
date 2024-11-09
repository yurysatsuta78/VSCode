import { styled } from '@mui/material/styles';
import { FormControlLabel, Checkbox } from '@mui/material';
import './CheckBox.css';
import PropTypes from "prop-types";

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
    '& .MuiTypography-root': { color: '#fff', fontFamily: 'Oswald, sans-serif', fontSize: 13 },
    '& .MuiCheckbox-root.Mui-checked': { color: '#acb262' },
    '& .MuiCheckbox-root:hover': { backgroundColor: '#4d544539', color: '#acb262' },
    '& .MuiCheckbox-root:focus': { backgroundColor: '#4d544539', color: '#acb262' },
    '& .MuiCheckbox-root': { color: '#ffffff80' },
}));

function CheckBox({ label, id, checked, onChange, width }) {

    return (
        <StyledFormControlLabel 
        style={{ width: `${width}` }}
        label={label} 
        control={
            <Checkbox 
            id={id} 
            checked={checked} 
            onChange={onChange} 
            />
        }
        />
    );
}

export default CheckBox;

CheckBox.propTypes = {
    label: PropTypes.string, 
    id: PropTypes.string, 
    checked: PropTypes.bool, 
    onChange: PropTypes.func,
    width: PropTypes.string,
}