import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion"
import MoreButton from "../MoreButton/MoreButton";
import './Brands.css'
import { FilterContext } from "../../contexts/FilterContext/FilterProvider";
import { DataContext } from "../../contexts/DataContext/DataProvider";

function Brands({ bmgFilter, setBmgFilter, enableAnimations }) {
const [loading, setLoading] = useState(false);
// const [showMore, setShowMore] = useState(false);
const showMore = useRef(false);
const filterPartRef = useRef(null);
const { setFilters, SERVER_URL } = useContext(FilterContext);
const { fetchBrands, brands } = useContext(DataContext);
const controls = useAnimation();

const BRAND_BUTTON_HEIGHT = 65;
const BRAND_BUTTON_MARGIN_BOTTOM = 13;
const ROW_HEIGHT = BRAND_BUTTON_HEIGHT + BRAND_BUTTON_MARGIN_BOTTOM;
const ROW_AMOUNT = 3;
const BRANDS_BEFORE_SHOWMORE = ROW_AMOUNT * 5;

useEffect(() => {
    const loadBrands = async () => {
        setLoading(true);
        await fetchBrands();
        setLoading(false);
      };
  
      loadBrands();
}, [fetchBrands]);

const toggleShowMore = () => {
    showMore.current = !showMore.current;
    const newHeight = showMore.current ? 'auto' : ROW_HEIGHT * ROW_AMOUNT;

    controls.start({
        height: newHeight,
    })
}

const handleBrandClick = (brand) => {
        setBmgFilter(prevBmgFilter => {
        if(brand.brandId === prevBmgFilter?.brandId){
            setFilters('brandId', "");
            setFilters('modelId', "");
            setFilters('generationId', "");
            return { ...prevBmgFilter, brandId: '', modelId: '', generationId: '' };
        } else{
            setFilters('brandId', brand.brandId);
            setFilters('modelId', "");
            setFilters('generationId', "");
            return { ...prevBmgFilter, brandId: brand.brandId, modelId: '', generationId: '' };
        }
    });
}

    if(loading) 
        return (
            <div id="brandFilterPart" className="filterPartDiv">
            <span className="leftTitle">Марки</span>
            <div className="filterPart">
                <span style={{ color: 'white', width: '100%', textAlign: 'center' }}>Загрузка</span>
            </div>
        </div>
    )
    if(!loading)
    return (
        <motion.div id="brandFilterPart" className="filterPartDiv">
            <span className="leftTitle">Марки</span>
            <motion.div className="filterPart"
            ref={filterPartRef}
            initial={{ height: ROW_HEIGHT * ROW_AMOUNT }}
            animate={controls}
            transition={ enableAnimations ? { duration: 0.2, ease: "easeIn" } : { duration: 0 }}
            >
            {
                brands.map((brand, index) => (
                    <motion.button 
                    style={{ height: BRAND_BUTTON_HEIGHT, marginBottom: BRAND_BUTTON_MARGIN_BOTTOM }}
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.93 }} 
                    transition={{ duration: 0.007 }} 
                    className={`brandBtn ${brand.brandId === bmgFilter.brandId ? 'active' : ''}`} 
                    key={index} 
                    onClick={() => handleBrandClick(brand)}
                    >
                        <span>{brand.brandName}</span>
                        <img src={`${SERVER_URL}${brand.image.imageUrl}`} alt={brand.brandName} />
                    </motion.button>
                ))
            }
            </motion.div>
            {
                brands.length >= BRANDS_BEFORE_SHOWMORE && (
                    <MoreButton toggleShowMore={toggleShowMore} enableAnimations={enableAnimations} />
                )
            }
        </motion.div>
    );
}

export default Brands;

Brands.propTypes = {
    bmgFilter: PropTypes.shape({
        brandId: PropTypes.string,
        modelId: PropTypes.string,
        generationId: PropTypes.string,
    }).isRequired,
    setBmgFilter: PropTypes.func.isRequired,
    enableAnimations: PropTypes.bool.isRequired,
};