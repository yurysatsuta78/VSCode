import PropTypes from "prop-types";
import './OtherFilters.css'
import SelectTextField from "../SelectTextField/SelectTextField";
import CheckBox from "../CheckBox/CheckBox";
import CustomTextField from "../CustomTextField/CustomTextField";

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

function OtherFilters({ filters, setFilters }) {

const OTHER_FILTER_PART_WIDTH = '23%';
const WIDE_OTHER_FILTER_PART_WIDTH = '48%';

    return (
        <div className="filterPartDiv">
            <span className="rightTitle">Другие фильтры</span>
            <div className="filterPart">
                <div style={{ width: WIDE_OTHER_FILTER_PART_WIDTH }} className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Характеристика</span>
                    </div>
                    <SelectTextField label={"Коробка передач"} value={filters.transmissionType} id={"transmission-type-input"} htmlFor={"transmission-type-input"} list={allowedTransmissionTypes} onChange={(e) => setFilters({ ...filters, transmissionType: e.target.value })} />
                    <SelectTextField label={"Кузов"} value={filters.bodyType} id={"body-type-input"} htmlFor={"body-type-input"} list={allowedBodyTypes} onChange={(e) => setFilters({ ...filters, bodyType: e.target.value })} />
                    <SelectTextField label={"Тип двигателя"} value={filters.engineType} id={"engine-type-input"} htmlFor={"engine-type-input"} list={allowedEngineTypes} onChange={(e) => setFilters({ ...filters, engineType: e.target.value })} />
                    <SelectTextField label={"Привод"} value={filters.driveTrain} id={"drive-train-input"} htmlFor={"drive-train-input"} list={allowedDriveTrains} onChange={(e) => setFilters({ ...filters, driveTrain: e.target.value })} />
                </div>
                <div style={{ width: WIDE_OTHER_FILTER_PART_WIDTH }} className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Внешний вид</span>
                    </div>
                    <SelectTextField label={"Цвет кузова"} value={filters.color} id={"color-input"} htmlFor={"color-input"} list={allowedColors} onChange={(e) => setFilters({ ...filters, color: e.target.value })} />
                    <SelectTextField label={"Цвет салона"} value={filters.interiorColor} id={"interior-color-input"} htmlFor={"interior-color-input"} list={allowedInteriorColors} onChange={(e) => setFilters({ ...filters, interiorColor: e.target.value })} />
                    <SelectTextField label={"Материал салона"} value={filters.interiorMaterial} id={"interior-material-input"} htmlFor={"interior-material-input"} list={allowedInteriorMaterials} onChange={(e) => setFilters({ ...filters, interiorMaterial: e.target.value })} />
                </div>
                <div className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Регистрация</span>
                    </div>
                    <CheckBox label={"Снят с учёта"} id={"is-registred-check"} checked={filters.isRegistred} onChange={(e) => setFilters({ ...filters, isRegistred: e.target.checked })} />
                    <SelectTextField label={"Страна регистрации"} value={filters.registrationCountry} id={"registration-country-input"} htmlFor={"registration-country-input"} list={allowedRegistrationCountries} onChange={(e) => setFilters({ ...filters, registrationCountry: e.target.value })} />
                </div>
                <div className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Состояние</span>
                    </div>
                    <div className="filterRow">
                        <span>Пробег</span>
                        <div>
                            <CustomTextField label={"От"} align={"center"} autoComplete={"off"} onlyNumbers={true} field={filters.minMileage} allowedLength={10} onChange={(e) => setFilters({ ...filters, minMileage: e.target.value })} maxWidth={0.4} /> 
                            <CustomTextField label={"До"} align={"center"} autoComplete={"off"} onlyNumbers={true} field={filters.maxMileage} allowedLength={10} onChange={(e) => setFilters({ ...filters, maxMileage: e.target.value })} maxWidth={0.4} /> 
                        </div>
                    </div>
                    <SelectTextField label={"Состояние"} value={filters.carState} id={"car-state-input"} htmlFor={"car-state-input"} list={allowedCarStates} onChange={(e) => setFilters({ ...filters, carState: e.target.value })} />
                </div>
                <div style={{ width: OTHER_FILTER_PART_WIDTH }} className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Экстерьер</span>
                    </div>
                    <CheckBox label={"Рейлинги на крыше"} id={"roof-rails-check"} checked={filters.roofRails} onChange={(e) => setFilters({ ...filters, roofRails: e.target.checked })} />
                    <CheckBox label={"Фаркоп"} id={"tow-bar-check"} checked={filters.towBar} onChange={(e) => setFilters({ ...filters, towBar: e.target.checked })} />
                </div>
                <div style={{ width: OTHER_FILTER_PART_WIDTH }} className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Интерьер</span>
                    </div>
                    <CheckBox label={"Люк"} id={"sun-roof-check"} checked={filters.sunRoof} onChange={(e) => setFilters({ ...filters, sunRoof: e.target.checked })} />
                    <CheckBox label={"Панорамная крыша"} id={"panoramic-roof-check"} checked={filters.panoramicRoof} onChange={(e) => setFilters({ ...filters, panoramicRoof: e.target.checked })} />
                </div>
                <div style={{ width: OTHER_FILTER_PART_WIDTH }} className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Системы помощи</span>
                    </div>
                    <CheckBox label={"Датчик дождя"} id={"rain-sensor-check"} checked={filters.rainSensor} onChange={(e) => setFilters({ ...filters, rainSensor: e.target.checked })} />
                    <CheckBox label={"Камера заднего вида"} id={"rear-view-camera-check"} checked={filters.rearViewCamera} onChange={(e) => setFilters({ ...filters, rearViewCamera: e.target.checked })} />
                    <CheckBox label={"Парктроники"} id={"parking-sensors-check"} checked={filters.parkingSensors} onChange={(e) => setFilters({ ...filters, parkingSensors: e.target.checked })} />
                    <CheckBox label={"Контроль мёртвых зон"} id={"blind-spot-sensor-check"} checked={filters.blindSpotSensor} onChange={(e) => setFilters({ ...filters, blindSpotSensor: e.target.checked })} />
                </div>
                <div style={{ width: OTHER_FILTER_PART_WIDTH }} className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Обогрев</span>
                    </div>
                    <CheckBox label={"Сидений"} id={"heated-seats-check"} checked={filters.heatedSeats} onChange={(e) => setFilters({ ...filters, heatedSeats: e.target.checked })} />
                    <CheckBox label={"Лобового стекла"} id={"heated-windshield-check"} checked={filters.heatedWindshield} onChange={(e) => setFilters({ ...filters, heatedWindshield: e.target.checked })} />
                    <CheckBox label={"Зеркал"} id={"heated-mirrors-check"} checked={filters.heatedMirrors} onChange={(e) => setFilters({ ...filters, heatedMirrors: e.target.checked })} />
                    <CheckBox label={"Руля"} id={"heated-steering-wheel-check"} checked={filters.heatedSteeringWheel} onChange={(e) => setFilters({ ...filters, heatedSteeringWheel: e.target.checked })} />
                    <CheckBox label={"Автономный отопитель"} id={"autonomous-heater-check"} checked={filters.autonomousHeater} onChange={(e) => setFilters({ ...filters, autonomousHeater: e.target.checked })} />
                </div>
                <div style={{ width: OTHER_FILTER_PART_WIDTH }} className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Климат</span>
                    </div>
                    <CheckBox label={"Климат-контроль"} id={"climate-control-check"} checked={filters.climateControl} onChange={(e) => setFilters({ ...filters, climateControl: e.target.checked })} />
                    <CheckBox label={"Кондиционер"} id={"air-conditioner-check"} checked={filters.airConditioner} onChange={(e) => setFilters({ ...filters, airConditioner: e.target.checked })} />
                </div>
                <div style={{ width: OTHER_FILTER_PART_WIDTH }} className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Комфорт</span>
                    </div>
                    <CheckBox label={"Круиз-контроль"} id={"cruise-control-check"} checked={filters.cruiseControl} onChange={(e) => setFilters({ ...filters, cruiseControl: e.target.checked })} />
                    <CheckBox label={"Управление мультимедиа с руля"} id={"steering-wheel-multimedia-check"} checked={filters.steeringWheelMultimedia} onChange={(e) => setFilters({ ...filters, steeringWheelMultimedia: e.target.checked })} />
                    <CheckBox label={"Электрорегулировка сидений"} id={"electric-seats-check"} checked={filters.electricSeats} onChange={(e) => setFilters({ ...filters, electricSeats: e.target.checked })} />
                    <CheckBox label={"Передние электро-стеклоподъёмники"} id={"front-electro-windows-check"} checked={filters.frontElectroWindows} onChange={(e) => setFilters({ ...filters, frontElectroWindows: e.target.checked })} />
                    <CheckBox label={"Задние электро-стеклоподъёмники"} id={"rear-electro-windows-check"} checked={filters.rearElectroWindows} onChange={(e) => setFilters({ ...filters, rearElectroWindows: e.target.checked })} />
                </div>
                <div style={{ width: WIDE_OTHER_FILTER_PART_WIDTH, flexDirection: 'row', justifyContent: 'space-between' }} className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Характеристика</span>
                    </div>
                    <div style={{ width: '45%' }} className="filterRow">
                        <span>Год</span>
                        <div>
                            <CustomTextField label={"От"} align={"center"} autoComplete={"off"} onlyNumbers={true} field={filters.minYear} allowedLength={4} onChange={(e) => setFilters({ ...filters, minYear: e.target.value })} maxWidth={0.4} /> 
                            <CustomTextField label={"До"} align={"center"} autoComplete={"off"} onlyNumbers={true} field={filters.maxYear} allowedLength={4} onChange={(e) => setFilters({ ...filters, maxYear: e.target.value })} maxWidth={0.4} /> 
                        </div>
                    </div>
                    <div style={{ width: '45%' }} className="filterRow">
                        <span>Цена</span>
                        <div>
                            <CustomTextField label={"От"} align={"center"} autoComplete={"off"} onlyNumbers={true} field={filters.minPrice} allowedLength={10} onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} maxWidth={0.4} /> 
                            <CustomTextField label={"До"} align={"center"} autoComplete={"off"} onlyNumbers={true} field={filters.maxPrice} allowedLength={10} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} maxWidth={0.4} /> 
                        </div>
                    </div>
                    <div style={{ width: '45%' }} className="filterRow">
                        <span>Объем</span>
                        <div>
                            <SelectTextField label={"От"} align={"center"} value={filters.minEngineVolume} id={"min-ev-input"} htmlFor={"min-ev-input"} list={allowedEngineVolumes} onChange={(e) => setFilters({ ...filters, minEngineVolume: e.target.value })} maxWidth={0.4} />
                            <SelectTextField label={"До"} align={"center"} value={filters.maxEngineVolume} id={"max-ev-input"} htmlFor={"max-ev-input"} list={allowedEngineVolumes} onChange={(e) => setFilters({ ...filters, maxEngineVolume: e.target.value })} maxWidth={0.4} />
                        </div>
                    </div>
                    <div style={{ width: '45%' }} className="filterRow">
                        <span>Мощность</span>
                        <div>
                            <CustomTextField label={"От"} align={"center"} autoComplete={"off"} onlyNumbers={true} field={filters.minEnginePower} allowedLength={10} onChange={(e) => setFilters({ ...filters, minEnginePower: e.target.value })} maxWidth={0.4} /> 
                            <CustomTextField label={"До"} align={"center"} autoComplete={"off"} onlyNumbers={true} field={filters.maxEnginePower} allowedLength={10} onChange={(e) => setFilters({ ...filters, maxEnginePower: e.target.value })} maxWidth={0.4} /> 
                        </div>
                    </div>
                </div>
                <div style={{ width: WIDE_OTHER_FILTER_PART_WIDTH, flexDirection: 'row', justifyContent: 'space-between' }} className="otherFiltersPartDiv">
                    <div className="filterRow">
                        <span style={{ textAlign: "center", paddingLeft: 0 }} >Системы безопасности</span>
                    </div>
                    <CheckBox label={"ABS"} id={"abs-check"} checked={filters.abs} onChange={(e) => setFilters({ ...filters, abs: e.target.checked })} width={"45%"} />
                    <CheckBox label={"ESP"} id={"esp-check"} checked={filters.esp} onChange={(e) => setFilters({ ...filters, esp: e.target.checked })} width={"45%"} />
                    <CheckBox label={"ASR"} id={"asr-check"} checked={filters.asr} onChange={(e) => setFilters({ ...filters, asr: e.target.checked })} width={"45%"} />
                    <CheckBox label={"Иммобилайзер"} id={"immobilizer-check"} checked={filters.immobilizer} onChange={(e) => setFilters({ ...filters, immobilizer: e.target.checked })} width={"45%"} />
                    <CheckBox label={"Сигнализация"} id={"signaling-check"} checked={filters.signaling} onChange={(e) => setFilters({ ...filters, signaling: e.target.checked })} width={"45%"} />
                    <CheckBox label={"Подушки безопасности"} id={"airbags-check"} checked={filters.airBags} onChange={(e) => setFilters({ ...filters, airBags: e.target.checked })} width={"45%"} />
                </div>
            </div>
        </div>
    );
}

export default OtherFilters;

OtherFilters.propTypes = {
    filters: PropTypes.shape({
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
    setFilters: PropTypes.func.isRequired
}