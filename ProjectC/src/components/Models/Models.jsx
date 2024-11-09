import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import './Models.css'

function Models({ models, filters, setFilters, enableAnimations }) {
const[showModels, setShowModels] = useState(false);

const timeOutRef = useRef(null);

useEffect(() => {
    if(filters.brandId === ''){
        if(enableAnimations){
            timeOutRef.current = setTimeout(() => {
                setShowModels(false);
            }, 400)
        } else{
            setShowModels(false);
        }
    } else {
        clearTimeout(timeOutRef.current);
        setShowModels(true);
    }
}, [filters.brandId])

const handleModelClick = (model) => {
    setFilters(prevFilters => {
        if(model.modelId === prevFilters?.modelId){
            return { ...prevFilters, modelId: '' };
        } else{
            return { ...prevFilters, modelId: model.modelId, generationId: '' };
        }
    });
  }

    return (
            <motion.div 
            initial={{ opacity: 0, x: -500 }} 
            animate={filters.brandId !== '' ? { opacity: 1, x: 0 } : { opacity: 0, x: -500 }} 
            style={{ display: showModels ? 'flex' : 'none' }} 
            transition={ enableAnimations ? { duration: 0.5, type: "spring" } : { duration: 0 }} 
            className="filterPartDiv"
            >
                <span className="rightTitle">Модели</span>
                <motion.div 
                key={filters.brandId !== '' ? filters.brandId : 'no-brand'} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={ enableAnimations ? { duration: 0.5 } : { duration: 0 }} 
                className="filterPart"
                >
                {
                    models.map((model, index) => (
                        <motion.button 
                        whileHover={ enableAnimations ? { scale: 1.02 } : {scale: 1}} 
                        whileTap={ enableAnimations ? { scale: 0.93 } : { scale: 1 }} 
                        transition={ enableAnimations ? { duration: 0.007 } : { duration: 0 }} 
                        className={`modelBtn ${model.modelId === filters?.modelId ? 'active' : ''}`} 
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
    models: PropTypes.arrayOf(
        PropTypes.shape({
            modelId: PropTypes.string.isRequired,
            modelName: PropTypes.string.isRequired,
            brandId: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    filters: PropTypes.shape({
        brandId: PropTypes.string,
        modelId: PropTypes.string,
        generationId: PropTypes.string,
    }),
    setFilters: PropTypes.func.isRequired,
    enableAnimations: PropTypes.bool.isRequired,
};