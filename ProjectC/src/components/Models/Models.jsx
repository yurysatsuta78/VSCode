import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useEffect, useState, useContext } from "react";
import './Models.css'
import { FilterContext } from "../../contexts/FilterContext/FilterProvider";
import { DataContext } from "../../contexts/DataContext/DataProvider";

function Models({ bmgFilter, setBmgFilter, enableAnimations }) {
const [filtredModels, setFiltredModels] = useState([]);
const { setFilters } = useContext(FilterContext);
const { fetchModels, models } = useContext(DataContext);

useEffect(() => {
    const loadModels = async () => {
        await fetchModels();
      };
  
      loadModels();
}, [fetchModels]);

useEffect(() => {
if(bmgFilter.brandId !== ''){
    setFiltredModels(models.filter(model => model.brandId === bmgFilter.brandId));
}
}, [models, bmgFilter.brandId])

const handleModelClick = (model) => {
    setBmgFilter(prevBmgFilter => {
        if(model.modelId === prevBmgFilter?.modelId){
            setFilters('modelId', "");
            setFilters('generationId', "");
            return { ...prevBmgFilter, modelId: '' };
        } else{
            setFilters('modelId', model.modelId);
            setFilters('generationId', "");
            return { ...prevBmgFilter, modelId: model.modelId, generationId: '' };
        }
    });
}

    return (
            <motion.div 
            initial={{ opacity: 0, x: -500, height: 10 }} 
            animate={bmgFilter.brandId !== '' ? { opacity: 1, x: 0, height: 'auto' } : { opacity: 0, x: -500, height: 10 }} 
            transition={ enableAnimations ? { duration: 0.5, type: "spring" } : { duration: 0 }} 
            className="filterPartDiv"
            >
                <span className="rightTitle">Модели</span>
                <motion.div 
                key={bmgFilter.brandId !== '' ? bmgFilter.brandId : 'no-brand'} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={ enableAnimations ? { duration: 0.5 } : { duration: 0 }} 
                className="filterPart"
                >
                {
                    filtredModels.map((model, index) => (
                        <motion.button 
                        whileHover={ enableAnimations ? { scale: 1.02 } : {scale: 1}} 
                        whileTap={ enableAnimations ? { scale: 0.93 } : { scale: 1 }} 
                        transition={ enableAnimations ? { duration: 0.007 } : { duration: 0 }} 
                        className={`modelBtn ${model.modelId === bmgFilter?.modelId ? 'active' : ''}`} 
                        onClick={() => handleModelClick(model)} 
                        key={index}
                        >
                            <span>{model.modelName}</span>
                        </motion.button>
                    ))
                }
                </motion.div>
            </motion.div>
    );
}

export default Models;

Models.propTypes = {
    bmgFilter: PropTypes.shape({
        brandId: PropTypes.string,
        modelId: PropTypes.string,
        generationId: PropTypes.string,
    }).isRequired,
    setBmgFilter: PropTypes.func.isRequired,
    enableAnimations: PropTypes.bool.isRequired,
};