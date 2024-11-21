import { createContext, useRef } from "react";
import PropTypes from "prop-types";

const initialState = {
    maxPrice: '',
    maxEngineVolume: '',
    transmissionType: '',
    bodyType: '',
    engineType: '',
    driveTrain: '',
    maxEnginePower: '',
    maxMileage: '',
    color: '',
    interiorColor: '',
    interiorMaterial: '',
    description: '',
    carState: '',
    registrationCountry: '',
    minYear: '',
    maxYear: '',
    generationId: '',
    modelId: '',
    brandId: '',
    cityId: '',
    minPrice: '',
    minEngineVolume: '',
    minEnginePower: '',
    minMileage: '',
    skip: 0,
    take: 2,
    towBar: false,
    roofRails: false,
    sunRoof: false,
    panoramicRoof: false,
    rainSensor: false,
    rearViewCamera: false,
    parkingSensors: false,
    blindSpotSensor: false,
    heatedSeats: false,
    heatedWindshield: false,
    heatedMirrors: false,
    heatedSteeringWheel: false,
    autonomousHeater: false,
    climateControl: false,
    airConditioner: false,
    cruiseControl: false,
    steeringWheelMultimedia: false,
    electricSeats: false,
    frontElectroWindows: false,
    rearElectroWindows: false,
    airBags: false,
    isTradable: false,
    isRegistred: false,
    abs: false,
    esp: false,
    asr: false,
    immobilizer: false,
    signaling: false
}

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const filtersRef = useRef(initialState);
  const SERVER_URL = import.meta.env.VITE_BACKEND_URL;

  const setFilters = (field, value) => {
    filtersRef.current[field] = value;
  };

  const getValue = (field) => {
    return filtersRef.current[field];
  }

  const increaseSkip = () => {
    filtersRef.current.skip += filtersRef.current.take;
  }

  return (
    <FilterContext.Provider value={{ setFilters, getValue, SERVER_URL, filtersRef, increaseSkip }}>
      {children}
    </FilterContext.Provider>
  )
}

FilterProvider.propTypes = {
    children: PropTypes.node.isRequired,
}