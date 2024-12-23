import { useState, useEffect, useContext } from 'react';
import './App.css'
import Counter from './components/Counter/Counter';
import Cars from './components/Cars/Cars';
import { getCarsAmount } from './services/cars';
import Banner from './components/Banner/Banner';
import { FilterProvider } from './contexts/FilterContext/FilterProvider';
import Filters from './components/Filters/Filters';
import { DataProvider } from './contexts/DataContext/DataProvider';
import { UserContext } from './contexts/UserContext/UserProvider';
import { checkToken } from './services/auth';

function App() {
const [carsAmount, setCarsAmount] = useState(0);
const [enableAnimations] = useState(true);
const { getUserInfo } = useContext(UserContext);

useEffect(() => {
  const dataFromToken = async () => {
    const userInfo = await checkToken();
    getUserInfo(userInfo);
  }
  dataFromToken();
}, [getUserInfo]);

  useEffect(() => {
    const fetchCarsAmount = async () => {
      setCarsAmount(await getCarsAmount());
    }
    fetchCarsAmount();
  }, [])

  return <div className='body'>
      <Banner />
        <div className='filterDiv'>
            <Counter carsAmount={carsAmount} />
              <FilterProvider>
                <DataProvider>
                  <Filters enableAnimations={enableAnimations} />
                  <Cars carsAmount={carsAmount} enableAnimations={enableAnimations} />
                </DataProvider>
              </FilterProvider>
        </div>
  </div>
}

export default App
