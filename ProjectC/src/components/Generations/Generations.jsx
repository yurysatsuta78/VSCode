import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import './Generations.css'
import { FilterContext } from "../../contexts/FilterContext/FilterProvider";
import { DataContext } from "../../contexts/DataContext/DataProvider";

function Generations({ bmgFilter, setBmgFilter, enableAnimations }) {
const [filtredGenerations, setFiltredGenerations] = useState([]);
const { setFilters, SERVER_URL } = useContext(FilterContext);
const { fetchGenerations, generations } = useContext(DataContext);

useEffect(() => {
    const loadGenerations = async () => {
        await fetchGenerations();
      };
  
      loadGenerations();
}, [fetchGenerations]);

useEffect(() => {
    if(bmgFilter.modelId !== ''){
        setFiltredGenerations(generations.filter(generation => generation.modelId === bmgFilter.modelId));
    }
}, [generations, bmgFilter.modelId])

const handleGenerationClick = (generation) => {
    setBmgFilter(prevBmgFilter => {
        if(generation.generationId === prevBmgFilter?.generationId){
            setFilters('generationId', "");
            return { ...prevBmgFilter, generationId: '' };
        } else{
            setFilters('generationId', generation.generationId);
            return { ...prevBmgFilter, generationId: generation.generationId };
        }
    });
}

    return (
        <motion.div 
            initial={{ opacity: 0, x: -500, height: 10 }} 
            animate={bmgFilter.modelId !== '' ? { opacity: 1, x: 0, height: 'auto' } : { opacity: 0, x: -500, height: 10 }} 
            transition={ enableAnimations ? { duration: 0.5, type: "spring" } : { duration: 0 }} 
            className="filterPartDiv"
            >
                <span className="leftTitle">Поколения</span>
                <motion.div 
                key={bmgFilter.modelId !== '' ? bmgFilter.modelId : 'no-model'} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={ enableAnimations ? { duration: 0.5 } : { duration: 0 }} 
                className="filterPart"
                >
                {
                    filtredGenerations.map((generation, index) => (
                        <motion.button
                        whileHover={ enableAnimations ? { scale: 1.02 } : { scale: 1 }} 
                        whileTap={ enableAnimations ? { scale: 0.97 } : { scale: 1 }} 
                        transition={ enableAnimations ? { type: 'spring', duration: 0.07 } : { duration: 0 }} 
                        className={`generationBtn ${generation.generationId === bmgFilter?.generationId ? 'active' : ''}`}
                        key={index}
                        onClick={() => handleGenerationClick(generation)}
                        >
                            <motion.div initial={{ opacity: 1 }} whileHover={{ opacity: 0 }} transition={ enableAnimations ? { duration: 0.2 } : { duration: 0 }} className={`generationBtnBG ${generation.generationId === bmgFilter?.generationId ? 'active' : ''}`} >
                                <span style={{ color: '#acb262' }} className="generationText">{generation.generationName}{generation.restyling ? ', Рестайлинг' : ''}</span>
                                <span className="generationText">{generation.startYear}-{generation.endYear}</span>
                            </motion.div>
                            <img src={`${SERVER_URL}${generation.image.imageUrl}`} alt={generation.generationName} />
                        </motion.button>
                    ))
                }
                </motion.div>
            </motion.div>
    );
}

export default Generations;

Generations.propTypes = {
    bmgFilter: PropTypes.shape({
        brandId: PropTypes.string,
        modelId: PropTypes.string,
        generationId: PropTypes.string,
    }).isRequired,
    setBmgFilter: PropTypes.func.isRequired,
    enableAnimations: PropTypes.bool.isRequired,
};