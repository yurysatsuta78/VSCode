import PropTypes from "prop-types";
import { useState } from "react";
import { motion } from "framer-motion"
import MoreButton from "../MoreButton/MoreButton";
import './Brands.css'

function Brands({ brands, filters, setFilters, enableAnimations, serverUrl }) {
const[showMore, setShowMore] = useState(false);

const BRAND_BUTTON_HEIGHT = 65;
const BRAND_BUTTON_MARGIN_BOTTOM = 13;
const ROW_HEIGHT = BRAND_BUTTON_HEIGHT + BRAND_BUTTON_MARGIN_BOTTOM;
const ROW_AMOUNT = 3;

const toggleShowMore = () => {
    setShowMore(!showMore);
}

const handleBrandClick = (brand) => {
    setFilters(prevFilters => {
        if(brand.brandId === prevFilters?.brandId){
            return { ...prevFilters, brandId: '', modelId: '', generationId: '' };
        } else{
            return { ...prevFilters, brandId: brand.brandId, modelId: '', generationId: '' };
        }
    });
}

const containerVariants = {
    initial: {height: ROW_HEIGHT * ROW_AMOUNT},
    animate: {height: "auto"},
};

    return (
        <motion.div id="brandFilterPart" className="filterPartDiv">
            <span className="leftTitle">Марки</span>
            <motion.div className="filterPart"
            variants={containerVariants}
            initial="initial"
            animate={showMore ? "animate" : "initial"}
            transition={ enableAnimations ? { duration: 0.2, ease: "easeIn" } : { duration: 0 }}
            >
            {
                brands.map((brand, index) => (
                    <motion.button 
                    style={{ height: BRAND_BUTTON_HEIGHT, marginBottom: BRAND_BUTTON_MARGIN_BOTTOM }}
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.93 }} 
                    transition={{ duration: 0.007 }} 
                    className={`brandBtn ${brand.brandId === filters?.brandId ? 'active' : ''}`} 
                    key={index} 
                    onClick={() => handleBrandClick(brand)}
                    >
                        <span>{brand.brandName}</span>
                        <img src={`${serverUrl}${brand.image.imageUrl}`} alt={brand.brandName} />
                    </motion.button>
                ))
            }
            </motion.div>
            <MoreButton toggleShowMore={toggleShowMore} enableAnimations={enableAnimations} />
        </motion.div>
    );
}

export default Brands;

Brands.propTypes = {
    brands: PropTypes.arrayOf(
        PropTypes.shape({
            brandId: PropTypes.string.isRequired,
            brandName: PropTypes.string.isRequired,
            image: PropTypes.shape({
                imageUrl: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    ).isRequired,
    selectedBrand: PropTypes.shape({
        brandName: PropTypes.string,
    }),
    setFilters: PropTypes.func.isRequired,
    filters: PropTypes.shape({
        generationId: PropTypes.string,
        modelId: PropTypes.string,
        brandId: PropTypes.string,
    }),
    enableAnimations: PropTypes.bool.isRequired,
    serverUrl: PropTypes.string.isRequired,
};