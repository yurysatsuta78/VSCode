import { useState, useEffect, useContext } from 'react';
import PropTypes from "prop-types";
import './CarPopup.css';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import { FilterContext } from '../../contexts/FilterContext/FilterProvider';

function CarPopup({ selectedCar, handleClosePopup }) {
const [isVisible, setIsVisible] = useState(false);
const { SERVER_URL } = useContext(FilterContext);

useEffect(() => {
    if (selectedCar) {
      setIsVisible(true);
      document.body.classList.add('no-scroll');
    } else {
      setIsVisible(false);
      document.body.classList.remove('no-scroll');
    }
  }, [selectedCar]);


const handleClose = () => {
    setIsVisible(false);
    setTimeout(handleClosePopup, 230);
};

console.log("CarPopup_rendered");

    if(!selectedCar) return null;

    return (
        <div className={`modal ${isVisible ? 'show' : 'hide'}`} onClick={handleClose}>
          <div className="modal-container">
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div style={{ width: '60%', height: '60%' }} className="modal-content-part">
                  <ImageCarousel serverUrl={SERVER_URL} images={selectedCar.images} />
                </div>
                <div style={{ width: '40%', height: '60%' }} className="modal-content-part">
                  <div className="carInfo">
                    <div>
                        <span style={{ color: '#acb262' }} className="carSpan">{selectedCar.brandName} {selectedCar.modelName} {selectedCar.generationName} {selectedCar.prodYear} года выпуска</span>
                        <span style={{ fontSize: 15 }} className="carSpan">{selectedCar.transmissionType}, {selectedCar.engineVolume} л, {selectedCar.engineType}, {selectedCar.mileage} км, {selectedCar.bodyType}, {selectedCar.driveTrain}, {selectedCar.color}, {selectedCar.isRegistred ? "Снят с учета" : null}</span>
                    </div>
                    <div>
                      <span style={{ wordBreak: 'break-all' }} className="carSpan equipments">{selectedCar.description}</span>
                    </div>
                    <div style={{ justifyContent: "end" }}>
                        <span style={{ fontSize: 15, left: 0, bottom: 0 }} className="carSpan">{selectedCar.price}$</span>
                        <span style={{ fontSize: 15, color: '#ffffff80' }} className="carSpan">{selectedCar.regionName}, {selectedCar.cityName}</span>
                    </div>
                  </div>
                </div>
                <div style={{ width: '50%', height: '40%', display: 'flex', flexDirection: 'column', paddingTop: 10, }} className="modal-content-part">
                  <div className="equipment">
                    <span className="equipment-span equipment-title">Экстерьер</span>
                    <div>
                      {selectedCar.roofRails ? <span className="equipment-span equipments equipments-margin">Рейлинги</span> : null} 
                      {selectedCar.towBar ? <span className="equipment-span equipments">Фаркоп</span> : null}
                    </div>
                  </div>
                  <div className="equipment">
                    <span className="equipment-span equipment-title">Интерьер</span>
                    <div>
                      {selectedCar.sunRoof ? <span className="equipment-span equipments equipments-margin">Люк</span> : null} 
                      {selectedCar.panoramicRoof ? <span className="equipment-span equipments">Панормамная крыша</span> : null}
                    </div>
                  </div>
                  <div className="equipment">
                    <span className="equipment-span equipment-title">Системы помощи</span>
                    <div>
                        {selectedCar.rainSensor ? <span className="equipment-span equipments equipments-margin">Датчик дождя</span> : null} 
                        {selectedCar.rearViewCamera ? <span className="equipment-span equipments equipments-margin">Камера заднего вида</span> : null} 
                        {selectedCar.parkingSensors ? <span className="equipment-span equipments equipments-margin">Парктроники</span> : null} 
                        {selectedCar.blindSpotSensor ? <span className="equipment-span equipments">Контроль слепых зон</span> : null}
                    </div>
                  </div>
                  <div className="equipment">
                    <span className="equipment-span equipment-title">Обогрев</span>
                    <div>
                        {selectedCar.heatedSeats ? <span className="equipment-span equipments equipments-margin">Сидений</span> : null} 
                        {selectedCar.heatedWindshield ? <span className="equipment-span equipments equipments-margin">Лобового стекла</span> : null} 
                        {selectedCar.heatedMirrors ? <span className="equipment-span equipments equipments-margin">Зеркал</span> : null} 
                        {selectedCar.heatedSteeringWheel ? <span className="equipment-span equipments equipments-margin">Руля</span> : null} 
                        {selectedCar.autonomousHeater ? <span className="equipment-span equipments">Автономный отопитель</span> : null}
                    </div>
                  </div>
                  <div className="equipment">
                    <span className="equipment-span equipment-title">Климат</span>
                    <div>
                      {selectedCar.climateControl ? <span className="equipment-span equipments equipments-margin">Климат-контроль</span> : null}
                      {selectedCar.airConditioner ? <span className="equipment-span equipments">Кондиционер</span> : null}
                    </div>
                  </div>
                </div>
                <div style={{ width: '50%', height: '40%', display: 'flex', flexDirection: 'column', paddingTop: 10 }}>
                <div className="equipment">
                    <span className="equipment-span equipment-title">Комфорт</span>
                    <div>
                        {selectedCar.cruiseControl ? <span className="equipment-span equipments equipments-margin">Круиз-контроль</span> : null} 
                        {selectedCar.steeringWheelMultimedia ? <span className="equipment-span equipments equipments-margin">Управление мультмедиа с руля</span> : null} 
                        {selectedCar.electricSeats ? <span className="equipment-span equipments equipments-margin">Электрорегулировка сидений</span> : null} 
                        {selectedCar.frontElectroWindows ? <span className="equipment-span equipments equipments-margin">Передние электро-стеклоподъёмники</span> : null} 
                        {selectedCar.rearElectroWindows ? <span className="equipment-span equipments">Задние электро-стеклоподъёмники</span> : null}
                    </div>
                  </div>
                  <div className="equipment">
                    <span className="equipment-span equipment-title">Системы безопасности</span>
                    <div>
                        {selectedCar.abs ? <span className="equipment-span equipments equipments-margin">ABS</span> : null} 
                        {selectedCar.esp ? <span className="equipment-span equipments equipments-margin">ESP</span> : null} 
                        {selectedCar.asr ? <span className="equipment-span equipments equipments-margin">ASR</span> : null} 
                        {selectedCar.immobilizer ? <span className="equipment-span equipments equipments-margin">Иммобилайзер</span> : null} 
                        {selectedCar.signaling ? <span className="equipment-span equipments equipments-margin">Сигнализация</span> : null}
                        {selectedCar.airBags ? <span className="equipment-span equipments">Подушки безопасности</span> : null}
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
    );
}

export default CarPopup;

CarPopup.propTypes = {
  selectedCar: PropTypes.shape({
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    engineVolume: PropTypes.number.isRequired,
    transmissionType: PropTypes.string.isRequired,
    bodyType: PropTypes.string.isRequired,
    engineType: PropTypes.string.isRequired,
    driveTrain: PropTypes.string.isRequired,
    enginePower: PropTypes.number.isRequired,
    mileage: PropTypes.number.isRequired,
    prodYear: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    interiorColor: PropTypes.string.isRequired,
    interiorMaterial: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    carState: PropTypes.string.isRequired,
    registrationCountry: PropTypes.string.isRequired,
    towBar: PropTypes.bool.isRequired,
    roofRails: PropTypes.bool.isRequired,
    sunRoof: PropTypes.bool.isRequired,
    panoramicRoof: PropTypes.bool.isRequired,
    rainSensor: PropTypes.bool.isRequired,
    rearViewCamera: PropTypes.bool.isRequired,
    parkingSensors: PropTypes.bool.isRequired,
    blindSpotSensor: PropTypes.bool.isRequired,
    heatedSeats: PropTypes.bool.isRequired,
    heatedWindshield: PropTypes.bool.isRequired,
    heatedMirrors: PropTypes.bool.isRequired,
    heatedSteeringWheel: PropTypes.bool.isRequired,
    autonomousHeater: PropTypes.bool.isRequired,
    climateControl: PropTypes.bool.isRequired,
    airConditioner: PropTypes.bool.isRequired,
    cruiseControl: PropTypes.bool.isRequired,
    steeringWheelMultimedia: PropTypes.bool.isRequired,
    electricSeats: PropTypes.bool.isRequired,
    frontElectroWindows: PropTypes.bool.isRequired,
    rearElectroWindows: PropTypes.bool.isRequired,
    airBags: PropTypes.bool.isRequired,
    isTradable: PropTypes.bool.isRequired,
    isRegistred: PropTypes.bool.isRequired,
    abs: PropTypes.bool.isRequired,
    esp: PropTypes.bool.isRequired,
    asr: PropTypes.bool.isRequired,
    immobilizer: PropTypes.bool.isRequired,
    signaling: PropTypes.bool.isRequired,
    generationName: PropTypes.string.isRequired,
    modelName: PropTypes.string.isRequired,
    brandName: PropTypes.string.isRequired,
    cityName: PropTypes.string.isRequired,
    regionName: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        imageUrl: PropTypes.string,
      })
    ).isRequired,
  }),
  handleClosePopup: PropTypes.func.isRequired,
  serverUrl: PropTypes.string.isRequired,
};