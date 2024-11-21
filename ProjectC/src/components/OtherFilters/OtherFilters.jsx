import PropTypes from "prop-types";
import './OtherFilters.css'
import SelectTextField from "../SelectTextField/SelectTextField";
import CheckBox from "../CheckBox/CheckBox";
import CustomTextField from "../CustomTextField/CustomTextField";
import { useContext } from "react";
import { FilterContext } from "../../contexts/FilterContext/FilterProvider";


const allowedTransmissionTypes = [
    'Автомат',
    'Механика'
];

const allowedEngineVolumes = [];
for (let i = 1; i <= 150; i++) {
    allowedEngineVolumes.push((i / 10).toFixed(1));
}

const allowedBodyTypes = [
    'Внедорожник 3 дв.',
    'Внедорожник 5 дв.',
    'Кабриолет',
    'Купе',
    'Легковой фургон',
    'Лимузин',
    'Лифтбек',
    'Микроавтобус грузопассажирский',
    'Микроавтобус пассажирский',
    'Минивэн',
    'Пикап',
    'Родстер',
    'Седан',
    'Универсал',
    'Хэтчбек 3 дв.',
    'Хэтчбек 5 дв.',
    'Другой'
];

const allowedEngineTypes = [
    'Бензин',
    'Бензин(пропан-бутан)',
    'Бензин(метан)',
    'Бензин(гибрид)',
    'Дизель',
    'Дизель(гибрид)',
    'Электро'
];

const allowedDriveTrains = [
    'Передний привод',
    'Задний привод',
    'Подключаемый полный привод',
    'Постоянный полный привод'
];

const allowedColors = [
    'Белый',
    'Бордовый',
    'Жёлтый',
    'Зелёный',
    'Коричневый',
    'Красный',
    'Оранжевый',
    'Серебристый',
    'Серый',
    'Синий',
    'Фиолетовый',
    'Чёрный',
    'Другой'
];

const allowedInteriorColors = [
    'Светлый',
    'Комби',
    'Тёмный'
];

const allowedInteriorMaterials = [
    'Натуральная кожа',
    'Искусственная кожа',
    'Ткань',
    'Велюр',
    'Алькантара',
    'Комбинированные материалы'
];

const allowedCarStates = [
    'С пробегом',
    'Аварийный',
    'На запчасти'
];

const allowedRegistrationCountries = [
    'Беларусь',
    'Россия',
    'Другая страна'
];

function OtherFilters () {
const { setFilters } = useContext(FilterContext);

const OTHER_FILTER_PART_WIDTH = '23%';
const WIDE_OTHER_FILTER_PART_WIDTH = '48%';

const handleFilterChange = (field) => (e) => {
    setFilters(field, e.target.value);
};

const handleCheckBoxFilterChange = (field) => (e) => {
    setFilters(field, e.target.checked);
}

    return (
        <div className="filterPartDiv">
            <span className="rightTitle">Другие фильтры</span>
            <div className="filterPart">
                <div style={{ width: WIDE_OTHER_FILTER_PART_WIDTH }} className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Характеристика</span>
                    </div>
                    <SelectTextField label={"Коробка передач"} id={"transmission-type-input"} htmlFor={"transmission-type-input"} list={allowedTransmissionTypes} onChange={handleFilterChange('transmissionType')} />
                    <SelectTextField label={"Кузов"} id={"body-type-input"} htmlFor={"body-type-input"} list={allowedBodyTypes} onChange={handleFilterChange('bodyType')} />
                    <SelectTextField label={"Тип двигателя"} id={"engine-type-input"} htmlFor={"engine-type-input"} list={allowedEngineTypes} onChange={handleFilterChange('engineType')} />
                    <SelectTextField label={"Привод"} id={"drive-train-input"} htmlFor={"drive-train-input"} list={allowedDriveTrains} onChange={handleFilterChange('driveTrain')} />
                </div>
                <div style={{ width: WIDE_OTHER_FILTER_PART_WIDTH }} className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Внешний вид</span>
                    </div>
                    <SelectTextField label={"Цвет кузова"} id={"color-input"} htmlFor={"color-input"} list={allowedColors} onChange={handleFilterChange('color')} />
                    <SelectTextField label={"Цвет салона"} id={"interior-color-input"} htmlFor={"interior-color-input"} list={allowedInteriorColors} onChange={handleFilterChange('interiorColor')} />
                    <SelectTextField label={"Материал салона"} id={"interior-material-input"} htmlFor={"interior-material-input"} list={allowedInteriorMaterials} onChange={handleFilterChange('interiorMaterial')} />
                </div>
                <div className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Регистрация</span>
                    </div>
                    <CheckBox label={"Снят с учёта"} id={"is-registred-check"} onChange={handleCheckBoxFilterChange('isRegistred')} />
                    <SelectTextField label={"Страна регистрации"} id={"registration-country-input"} htmlFor={"registration-country-input"} list={allowedRegistrationCountries} onChange={handleFilterChange('registrationCountry')} />
                </div>
                <div className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Состояние</span>
                    </div>
                    <div className="filterRow">
                        <span>Пробег</span>
                        <div>
                            <CustomTextField label={"От"} autoComplete={"off"} onlyNumbers={true} allowedLength={10} onChange={handleFilterChange('minMileage')} maxWidth={'40%'} /> 
                            <CustomTextField label={"До"} autoComplete={"off"} onlyNumbers={true} allowedLength={10} onChange={handleFilterChange('maxMileage')} maxWidth={'40%'} /> 
                        </div>
                    </div>
                    <SelectTextField label={"Состояние"} id={"car-state-input"} htmlFor={"car-state-input"} list={allowedCarStates} onChange={handleFilterChange('carState')} />
                </div>
                <div style={{ width: OTHER_FILTER_PART_WIDTH }} className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Экстерьер</span>
                    </div>
                    <CheckBox label={"Рейлинги на крыше"} id={"roof-rails-check"} onChange={handleCheckBoxFilterChange('roofRails')} />
                    <CheckBox label={"Фаркоп"} id={"tow-bar-check"} onChange={handleCheckBoxFilterChange('towBar')} />
                </div>
                <div style={{ width: OTHER_FILTER_PART_WIDTH }} className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Интерьер</span>
                    </div>
                    <CheckBox label={"Люк"} id={"sun-roof-check"} onChange={handleCheckBoxFilterChange('sunRoof')} />
                    <CheckBox label={"Панорамная крыша"} id={"panoramic-roof-check"} onChange={handleCheckBoxFilterChange('panoramicRoof')} />
                </div>
                <div style={{ width: OTHER_FILTER_PART_WIDTH }} className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Системы помощи</span>
                    </div>
                    <CheckBox label={"Датчик дождя"} id={"rain-sensor-check"} onChange={handleCheckBoxFilterChange('rainSensor')} />
                    <CheckBox label={"Камера заднего вида"} id={"rear-view-camera-check"} onChange={handleCheckBoxFilterChange('rearViewCamera')} />
                    <CheckBox label={"Парктроники"} id={"parking-sensors-check"} onChange={handleCheckBoxFilterChange('parkingSensors')} />
                    <CheckBox label={"Контроль мёртвых зон"} id={"blind-spot-sensor-check"} onChange={handleCheckBoxFilterChange('blindSpotSensor')} />
                </div>
                <div style={{ width: OTHER_FILTER_PART_WIDTH }} className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Обогрев</span>
                    </div>
                    <CheckBox label={"Сидений"} id={"heated-seats-check"} onChange={handleCheckBoxFilterChange('heatedSeats')} />
                    <CheckBox label={"Лобового стекла"} id={"heated-windshield-check"} onChange={handleCheckBoxFilterChange('heatedWindshield')} />
                    <CheckBox label={"Зеркал"} id={"heated-mirrors-check"} onChange={handleCheckBoxFilterChange('heatedMirrors')} />
                    <CheckBox label={"Руля"} id={"heated-steering-wheel-check"} onChange={handleCheckBoxFilterChange('heatedSteeringWheel')} />
                    <CheckBox label={"Автономный отопитель"} id={"autonomous-heater-check"} onChange={handleCheckBoxFilterChange('autonomousHeater')} />
                </div>
                <div style={{ width: OTHER_FILTER_PART_WIDTH }} className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Климат</span>
                    </div>
                    <CheckBox label={"Климат-контроль"} id={"climate-control-check"} onChange={handleCheckBoxFilterChange('climateControl')} />
                    <CheckBox label={"Кондиционер"} id={"air-conditioner-check"} onChange={handleCheckBoxFilterChange('airConditioner')} />
                </div>
                <div style={{ width: OTHER_FILTER_PART_WIDTH }} className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Комфорт</span>
                    </div>
                    <CheckBox label={"Круиз-контроль"} id={"cruise-control-check"} onChange={handleCheckBoxFilterChange('cruiseControl')} />
                    <CheckBox label={"Управление мультимедиа с руля"} id={"steering-wheel-multimedia-check"} onChange={handleCheckBoxFilterChange('steeringWheelMultimedia')} />
                    <CheckBox label={"Электрорегулировка сидений"} id={"electric-seats-check"} onChange={handleCheckBoxFilterChange('electricSeats')} />
                    <CheckBox label={"Передние электро-стеклоподъёмники"} id={"front-electro-windows-check"} onChange={handleCheckBoxFilterChange('frontElectroWindows')} />
                    <CheckBox label={"Задние электро-стеклоподъёмники"} id={"rear-electro-windows-check"} onChange={handleCheckBoxFilterChange('rearElectroWindows')} />
                </div>
                <div style={{ width: WIDE_OTHER_FILTER_PART_WIDTH, flexDirection: 'row', justifyContent: 'space-between' }} className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Характеристика</span>
                    </div>
                    <div style={{ width: '45%' }} className="filterRow">
                        <span>Год</span>
                        <div>
                            <CustomTextField label={"От"} autoComplete={"off"} onlyNumbers={true} allowedLength={4} onChange={handleFilterChange('minYear')} maxWidth={'40%'} /> 
                            <CustomTextField label={"До"} autoComplete={"off"} onlyNumbers={true} allowedLength={4} onChange={handleFilterChange('maxYear')} maxWidth={'40%'} /> 
                        </div>
                    </div>
                    <div style={{ width: '45%' }} className="filterRow">
                        <span>Цена</span>
                        <div>
                            <CustomTextField label={"От"} autoComplete={"off"} onlyNumbers={true} allowedLength={10} onChange={handleFilterChange('minPrice')} maxWidth={'40%'} /> 
                            <CustomTextField label={"До"} autoComplete={"off"} onlyNumbers={true} allowedLength={10} onChange={handleFilterChange('maxPrice')} maxWidth={'40%'} /> 
                        </div>
                    </div>
                    <div style={{ width: '45%' }} className="filterRow">
                        <span>Объем</span>
                        <div>
                            <SelectTextField label={"От"} id={"min-ev-input"} htmlFor={"min-ev-input"} list={allowedEngineVolumes} onChange={handleFilterChange('minEngineVolume')} maxWidth={'40%'} />
                            <SelectTextField label={"До"} id={"max-ev-input"} htmlFor={"max-ev-input"} list={allowedEngineVolumes} onChange={handleFilterChange('maxEngineVolume')} maxWidth={'40%'} />
                        </div>
                    </div>
                    <div style={{ width: '45%' }} className="filterRow">
                        <span>Мощность</span>
                        <div>
                            <CustomTextField label={"От"} autoComplete={"off"} onlyNumbers={true} allowedLength={10} onChange={handleFilterChange('minEnginePower')} maxWidth={'40%'} /> 
                            <CustomTextField label={"До"} autoComplete={"off"} onlyNumbers={true} allowedLength={10} onChange={handleFilterChange('maxEnginePower')} maxWidth={'40%'} /> 
                        </div>
                    </div>
                </div>
                <div style={{ width: WIDE_OTHER_FILTER_PART_WIDTH, flexDirection: 'row', justifyContent: 'space-between' }} className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Системы безопасности</span>
                    </div>
                    <CheckBox label={"ABS"} id={"abs-check"} onChange={handleCheckBoxFilterChange('abs')} width={"45%"} />
                    <CheckBox label={"ESP"} id={"esp-check"} onChange={handleCheckBoxFilterChange('esp')} width={"45%"} />
                    <CheckBox label={"ASR"} id={"asr-check"} onChange={handleCheckBoxFilterChange('asr')} width={"45%"} />
                    <CheckBox label={"Иммобилайзер"} id={"immobilizer-check"} onChange={handleCheckBoxFilterChange('immobilizer')} width={"45%"} />
                    <CheckBox label={"Сигнализация"} id={"signaling-check"} onChange={handleCheckBoxFilterChange('signaling')} width={"45%"} />
                    <CheckBox label={"Подушки безопасности"} id={"airbags-check"} onChange={handleCheckBoxFilterChange('airBags')} width={"45%"} />
                </div>
            </div>
        </div>
    );
}

export default OtherFilters;

OtherFilters.propTypes = {
    filtersRef: PropTypes.shape({
        maxPrice: PropTypes.string,
        maxEngineVolume: PropTypes.string,
        transmissionType: PropTypes.string,
        bodyType: PropTypes.string,
        engineType: PropTypes.string,
        driveTrain: PropTypes.string,
        maxEnginePower: PropTypes.string,
        maxMileage: PropTypes.string,
        color: PropTypes.string,
        interiorColor: PropTypes.string,
        interiorMaterial: PropTypes.string,
        description: PropTypes.string,
        carState: PropTypes.string,
        registrationCountry: PropTypes.string,
        minYear: PropTypes.string,
        maxYear: PropTypes.string,
        generationId: PropTypes.string,
        modelId: PropTypes.string,
        brandId: PropTypes.string,
        cityId: PropTypes.string,
        minPrice: PropTypes.string,
        minEngineVolume: PropTypes.string,
        minEnginePower: PropTypes.string,
        minMileage: PropTypes.string,
        towBar: PropTypes.bool,
        roofRails: PropTypes.bool,
        sunRoof: PropTypes.bool,
        panoramicRoof: PropTypes.bool,
        rainSensor: PropTypes.bool,
        rearViewCamera: PropTypes.bool,
        parkingSensors: PropTypes.bool,
        blindSpotSensor: PropTypes.bool,
        heatedSeats: PropTypes.bool,
        heatedWindshield: PropTypes.bool,
        heatedMirrors: PropTypes.bool,
        heatedSteeringWheel: PropTypes.bool,
        autonomousHeater: PropTypes.bool,
        climateControl: PropTypes.bool,
        airConditioner: PropTypes.bool,
        cruiseControl: PropTypes.bool,
        steeringWheelMultimedia: PropTypes.bool,
        electricSeats: PropTypes.bool,
        frontElectroWindows: PropTypes.bool,
        rearElectroWindows: PropTypes.bool,
        airBags: PropTypes.bool,
        isTradable: PropTypes.bool,
        isRegistred: PropTypes.bool,
        abs: PropTypes.bool,
        esp: PropTypes.bool,
        asr: PropTypes.bool,
        immobilizer: PropTypes.bool,
        signaling: PropTypes.bool
    }),
};