import PropTypes from "prop-types";
import Brands from '../Brands/Brands';
import Models from '../Models/Models';
import Generations from '../Generations/Generations';
import { useState } from "react";
import { DataProvider } from "../../contexts/DataContext/DataProvider";

const BMGFilters = ({ enableAnimations }) => {
const[bmgFilter, setBmgFilter] = useState({
    brandId: '',
    modelId: '',
    generationId: ''
});

    return (
        <div style={{ width: '100%' }}>
            <DataProvider>
                <Brands bmgFilter={bmgFilter} setBmgFilter={setBmgFilter} enableAnimations={enableAnimations} />
                <Models bmgFilter={bmgFilter} setBmgFilter={setBmgFilter} enableAnimations={enableAnimations} />
                <Generations bmgFilter={bmgFilter} setBmgFilter={setBmgFilter} enableAnimations={enableAnimations} />
            </DataProvider>
        </div>
    );
};

export default BMGFilters;

BMGFilters.propTypes = {
    enableAnimations: PropTypes.bool.isRequired,
};