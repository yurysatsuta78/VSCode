import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext/DataProvider";
import { FilterContext } from "../../contexts/FilterContext/FilterProvider";

const PinnableButton = ({ showCarsContainerRef, showCarsBtnRef }) => {
const { fetchCars } = useContext(DataContext); 
const { filtersRef, setFilters, getValue } = useContext(FilterContext);

const loadCars = async () => {
    const currentSkip = getValue('skip');

    if(currentSkip !== 0){
        setFilters('skip', 0);
    }
    await fetchCars(filtersRef.current);

    const take = getValue('take');
    setFilters('skip', take);
};

const scrollToSection = () => {
    const section = document.getElementById('carsFilterPart');
    section.scrollIntoView({ behavior: 'smooth' });
    loadCars();
};

    return (
        <div style={{ width: '100%', height: '80px', position: 'relative' }} >
            <div ref={showCarsContainerRef} className='showCarsContainer'>
                <motion.button ref={showCarsBtnRef} className='showCarsBtn'
                    initial={{ color: '#ffffff', borderColor: '#ffffff80' }}
                    whileHover={{ color: "#acb262", borderColor: '#ffffff', backgroundColor: '#4d544540' }}
                    transition={{ duration: 0.2, ease: 'easeIn' }}
                    onClick={scrollToSection}
                >
                    Показать объявления
                </motion.button>
            </div>
        </div>
    );
};

export default PinnableButton;

PinnableButton.propTypes = {
    showCarsContainerRef: PropTypes.oneOfType([
        PropTypes.func, // Для рефов, созданных с помощью функции
        PropTypes.shape({
            current: PropTypes.instanceOf(Element), // Указываем, что current должен быть элементом
        }),
    ]),
    showCarsBtnRef: PropTypes.oneOfType([
        PropTypes.func, // Для рефов, созданных с помощью функции
        PropTypes.shape({
            current: PropTypes.instanceOf(Element), // Указываем, что current должен быть элементом
        }),
    ]),
  };