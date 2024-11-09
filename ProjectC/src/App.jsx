import { useEffect, useState } from 'react';
import './App.css'
import Brands from './components/Brands/Brands';
import { getBrands } from './services/brands';
import { getModels } from './services/models';
import { getGenerations } from './services/generations';
import Models from './components/Models/Models';
import Generations from './components/Generations/Generations';
import OtherFilters from './components/OtherFilters/OtherFilters';
import Counter from './components/Counter/Counter';
import Cars from './components/Cars/Cars';
import { getCarsAmount } from './services/cars';

function App() {
const [carsAmount, setCarsAmount] = useState(0);
const [enableAnimations] = useState(true);
const [brands, setBrands] = useState([]);
const [models, setModels] = useState([]);
const [generations, setGenerations] = useState([]);
const [filtredModels, setFiltredModels] = useState([]);
const [filtredGenerations, setFiltredGenerations] = useState([]);
const [filters, setFilters] = useState({
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
});

const SERVER_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      setBrands(await getBrands());
      setModels(await getModels());
      setGenerations(await getGenerations());
    }
    fetchData();
  }, [])

  useEffect(() => {
    const fetchCarsAmount = async () => {
      setCarsAmount(await getCarsAmount());
    }
    fetchCarsAmount();
  }, [])

  useEffect(() => {
    if(filters.brandId !== ''){
      setFiltredModels(models.filter(model => model.brandId === filters.brandId));
    }
  }, [filters.brandId, models])

  useEffect(() => {
    if(filters.modelId !== ''){
      setFiltredGenerations(generations.filter(generation => generation.modelId === filters.modelId));
    }
  }, [filters.modelId, generations])

  return <div className='filterDiv'>
    <Counter carsAmount={carsAmount} />
    <Brands brands={brands} filters={filters} setFilters={setFilters} enableAnimations={enableAnimations} serverUrl={SERVER_URL} />
    <Models models={filtredModels} filters={filters} setFilters={setFilters} enableAnimations={enableAnimations} />
    <Generations generations={filtredGenerations} filters={filters} setFilters={setFilters} enableAnimations={enableAnimations} serverUrl={SERVER_URL} />
    <OtherFilters filters={filters} setFilters={setFilters} />
    <Cars carsAmount={carsAmount} filters={filters} serverUrl={SERVER_URL} enableAnimations={enableAnimations} />
  </div>;
}

export default App
