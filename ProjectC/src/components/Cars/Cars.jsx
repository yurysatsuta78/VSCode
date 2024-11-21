import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import './Cars.css'
import CarPopup from "../CarPopup/CarPopup";
import { FilterContext } from "../../contexts/FilterContext/FilterProvider";
import { DataContext } from "../../contexts/DataContext/DataProvider";

function Cars({ enableAnimations }) {
const [selectedCar, setSelectedCar] = useState(null);
const { SERVER_URL, filtersRef, increaseSkip } = useContext(FilterContext);
const { fetchMoreCars, cars } = useContext(DataContext);

const handlePopup = (car) => {
    setSelectedCar(car);
}

const handleClosePopup = () => {
    setSelectedCar(null);
}

const getMore = async () => {
    await fetchMoreCars(filtersRef.current);
    increaseSkip();
}

    if(cars.length === 0) return(
        <div id="carsFilterPart" className="filterPartDiv" style={{ marginTop: 40 }}>
            <span style={{ textAlign: 'center', fontSize: 27, width: '100%', marginBottom: '50px' }} className="rightTitle">Объявления</span>
            <button className="emptyCarBtn">Пусто</button>
            <button className="emptyCarBtn">Пусто</button>
            <button className="emptyCarBtn">Пусто</button>
            <button className="emptyCarBtn">Пусто</button>
            <button className="emptyCarBtn">Пусто</button>
            <span style={{ width: '100%' }} className="rightTitle"></span>
        </div>
    )

    if(cars.length !== 0) return(
        <div id="carsFilterPart" className="filterPartDiv" style={{ marginTop: 40 }}>
            <span style={{ textAlign: 'center', fontSize: 27, width: '100%', marginBottom: '50px' }} className="rightTitle">Объявления</span>
            {cars.map((car, index) => (
                    <motion.button 
                    whileHover={ enableAnimations ? { scale: 1.02 } : { scale: 1 }} 
                    whileTap={ enableAnimations ? { scale: 0.97 } : { scale: 1 }} 
                    transition={ enableAnimations ? { type: 'spring', duration: 0.07 } : { duration: 0 }} 
                    key={index} 
                    onClick={() => handlePopup(car)}
                    className="carBtn"
                    >
                        <motion.div initial={{ opacity: 1 }} whileHover={{ opacity: 0 }} transition={ enableAnimations ? { duration: 0.2 } : { duration: 0 }} className="carBtnBG" >
                            <div className="carBtnInfo">
                                <div>
                                    <span style={{ color: '#acb262' }} className="carBtnSpan">{car.brandName} {car.modelName} {car.generationName} {car.prodYear} года выпуска</span>
                                    <span style={{ fontSize: 15 }} className="carBtnSpan">{car.transmissionType}, {car.engineVolume} л, {car.engineType}, {car.bodyType}</span>
                                </div>
                                <div style={{ justifyContent: "end" }}>
                                    <span style={{ fontSize: 15, left: 0, bottom: 0 }} className="carBtnSpan">{car.price}$</span>
                                    <span style={{ fontSize: 15, color: '#ffffff80' }} className="carBtnSpan">{car.regionName}, {car.cityName}</span>
                                </div>
                            </div>
                        </motion.div>
                        <div className="carBtnImgDiv">
                            <img src={`${SERVER_URL}${car.images[0].imageUrl}`} alt={car.carId} ></img>
                        </div>
                    </motion.button>
                ))
            }
            <div className="loadCarsDiv">
                <button onClick={() => getMore()} className="loadCarsBtn">Показать еще</button>
            </div>
            <span style={{ width: '100%' }} className="rightTitle"></span>
            <CarPopup selectedCar={selectedCar} handleClosePopup={handleClosePopup} />
        </div>
    );
}

export default Cars;

Cars.propTypes = {
    carsAmount: PropTypes.number,
    enableAnimations: PropTypes.bool.isRequired,
};