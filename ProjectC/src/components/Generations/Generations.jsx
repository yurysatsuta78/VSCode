import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import './Generations.css'

function Generations({ generations, filters, setFilters, enableAnimations, serverUrl }) {
const[showGenerations, setShowGenerations] = useState(false);

const timeOutRef = useRef(null);

useEffect(() => {
    if(filters.modelId === ''){
        if(enableAnimations){
            timeOutRef.current = setTimeout(() => {
                setShowGenerations(false);
            }, 400)
        } else{
            setShowGenerations(false);
        }
    } else {
        clearTimeout(timeOutRef.current);
        setShowGenerations(true);
    }
}, [filters.modelId])

const handleGenerationClick = (generation) => {
    setFilters(prevFilters => {
        if(generation.generationId === prevFilters?.generationId){
            return { ...prevFilters, generationId: '' }
        } else{
            return { ...prevFilters, generationId: generation.generationId }
        }
    })
  }

    return (
        <motion.div 
            initial={{ opacity: 0, x: -500 }} 
            animate={filters.modelId !== '' ? { opacity: 1, x: 0 } : { opacity: 0, x: -500 }} 
            style={{ display: showGenerations ? 'flex' : 'none' }} 
            transition={ enableAnimations ? { duration: 0.5, type: "spring" } : { duration: 0 }} 
            className="filterPartDiv"
            >
                <span className="leftTitle">Поколения</span>
                <motion.div 
                key={filters.modelId !== '' ? filters.modelId : 'no-model'} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={ enableAnimations ? { duration: 0.5 } : { duration: 0 }} 
                className="filterPart"
                >
                {
                    generations.map((generation, index) => (
                        <motion.button
                        whileHover={ enableAnimations ? { scale: 1.02 } : { scale: 1 }} 
                        whileTap={ enableAnimations ? { scale: 0.97 } : { scale: 1 }} 
                        transition={ enableAnimations ? { type: 'spring', duration: 0.07 } : { duration: 0 }} 
                        className={`generationBtn ${generation.generationId === filters?.generationId ? 'active' : ''}`}
                        key={index}
                        onClick={() => handleGenerationClick(generation)}
                        >
                            <motion.div initial={{ opacity: 1 }} whileHover={{ opacity: 0 }} transition={ enableAnimations ? { duration: 0.2 } : { duration: 0 }} className={`generationBtnBG ${generation.generationId === filters?.generationId ? 'active' : ''}`} >
                                <span style={{ color: '#acb262' }} className="generationText">{generation.generationName}{generation.restyling ? ', Рестайлинг' : ''}</span>
                                <span className="generationText">{generation.startYear}-{generation.endYear}</span>
                            </motion.div>
                            <img src={`${serverUrl}${generation.image.imageUrl}`} alt={generation.generationName} />
                        </motion.button>
                    ))
                }
                </motion.div>
            </motion.div>
    );
}

export default Generations;

Generations.propTypes = {
    generations: PropTypes.arrayOf(
        PropTypes.shape({
            generationId: PropTypes.string.isRequired,
            generationName: PropTypes.string.isRequired,
            restyling: PropTypes.bool.isRequired,
            startYear: PropTypes.number.isRequired,
            endYear: PropTypes.number.isRequired,
            image: PropTypes.shape({
                imageUrl: PropTypes.string.isRequired
            }).isRequired,
        }).isRequired,
    ).isRequired,
    filters: PropTypes.shape({
        brandId: PropTypes.string,
        modelId: PropTypes.string,
        generationId: PropTypes.string,
    }),
    setFilters: PropTypes.func.isRequired,
    enableAnimations: PropTypes.bool.isRequired,
    serverUrl: PropTypes.string.isRequired,
};