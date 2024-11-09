import PropTypes from "prop-types";
import { getFiltredCars } from "../../services/cars";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import './Cars.css'
import CarPopup from "../CarPopup/CarPopup";

function Cars({ carsAmount, filters, serverUrl, enableAnimations }) {
const [cars, setCars] = useState([]);
const [selectedCar, setSelectedCar] = useState(null);
const skipRef = useRef(0);

const TAKE = 1;

const getDeclension = (carsAmount) => {
    if (carsAmount === 1) {
        return 'объявление';
    } else if (carsAmount >= 2 && carsAmount <= 4) {
        return 'объявления';
    } else {
        return 'объявлений';
    }
}

const handlePopup = (car) => {
    setSelectedCar(car);
}

const handleClosePopup = () => {
    setSelectedCar(null);
}

useEffect(() => {
    skipRef.current = 0;
    setCars([]);
},[filters]);

const getCars = async () => {
    const CARS_FROM_BACKEND = await getFiltredCars(filters, skipRef.current, TAKE);
    setCars(prevCars => [...prevCars, ...CARS_FROM_BACKEND]);
    if(cars.count !== 0){
        skipRef.current = skipRef.current + TAKE;
    }
}

    return(
        <div className="filterPartDiv" style={{ marginTop: 40 }}>
            <span style={{ borderWidth: 0, textAlign: 'center', fontSize: 27 }} className="rightTitle">{`Найдено ${carsAmount} ${getDeclension(carsAmount)}`}</span>
            {
                cars.map((car, index) => (
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
                            <img src={`${serverUrl}${car.images[0].imageUrl}`} alt={car.carId} ></img>
                        </div>
                    </motion.button>
                ))
            }
            <div className="loadCarsDiv">
                <button onClick={() => getCars()} className="loadCarsBtn">{`${cars.length !== 0 ? `Показать еще` : `Показать`}`}</button>
            </div>
            <CarPopup selectedCar={selectedCar} serverUrl={serverUrl} handleClosePopup={handleClosePopup} />
        </div>
    );
}

export default Cars;

Cars.propTypes = {
    filters: PropTypes.object.isRequired,
    carsAmount: PropTypes.number,
    serverUrl: PropTypes.string.isRequired,
    enableAnimations: PropTypes.bool.isRequired,
};