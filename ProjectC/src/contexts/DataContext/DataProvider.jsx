import { createContext, useCallback, useReducer } from "react";
import PropTypes from "prop-types";
import { getBrands } from "../../services/brands";
import { getModels } from "../../services/models";
import { getGenerations } from "../../services/generations";
import { getFiltredCars } from "../../services/cars";

const GET_CARS = 'GET_CARS';
const GET_MORE_CARS = 'GET_MORE_CARS';
const CLEAR_CARS = 'CLEAR_CARS';
const GET_BRANDS = 'GET_BRANDS';
const GET_MODELS = 'GET_MODELS';
const GET_GENERATIONS = 'GET_GENERATIONS';

const initialState = {
    cars: [],
    brands: [],
    models: [],
    generations: [],
}

const DataReducer = (state, action) => {
  switch (action.type) {
    case GET_CARS:
    //   console.log("GET_CARS_HANDLED");
      return {
        ...state,
        cars: action.payload,
      };
    case GET_MORE_CARS:
    //   console.log("GET_CARS_HANDLED");
      return {
        ...state,
        cars: [...state.cars, ...action.payload],
      }
    case CLEAR_CARS:
      console.log('CLEAR_CARS_HANDLED');
      return {
        ...state,
        cars: action.payload,
      };
    case GET_BRANDS:
    //   console.log("GET_BRANDS_HANDLED");
      return {
        ...state,
        brands: action.payload,
      };
    case GET_MODELS:
    //   console.log("GET_MODELS_HANDLED");
      return {
        ...state,
        models: action.payload,
      };
    case GET_GENERATIONS:
    //   console.log("GET_GENERATIONS_HANDLED");
      return{
        ...state,
        generations: action.payload,
      };
    default:
      return state;
  }
};

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(DataReducer, initialState);

  const fetchBrands = useCallback(async () => {
    const brands = await getBrands();
    dispatch({ type: GET_BRANDS, payload: brands });
  }, [dispatch]);

  const fetchModels = useCallback(async () => {
    const models = await getModels();
    dispatch({ type: GET_MODELS, payload: models });
  }, [dispatch]);

  const fetchGenerations = useCallback(async () => {
    const generations = await getGenerations();
    dispatch({ type: GET_GENERATIONS, payload: generations });
  }, [dispatch]);

  const fetchCars = async (filters) => {
    const cars = await getFiltredCars(filters);
    dispatch({ type: GET_CARS, payload: cars });
  };

  const fetchMoreCars = async (filters) => {
    const cars = await getFiltredCars(filters);
    dispatch({ type: GET_MORE_CARS, payload: cars });
  };

  const cleanCars = () => {
    dispatch({ type: CLEAR_CARS, payload: [] });
  };

  // const value = useMemo(() => ({ filters: state, setFilters }), [state]);

  return (
    <DataContext.Provider 
    value={{ 
        fetchBrands, 
        fetchModels, 
        fetchGenerations, 
        fetchCars,
        fetchMoreCars,
        cleanCars,
        brands: state.brands,
        models: state.models,
        generations: state.generations,
        cars: state.cars,
        state
        }}>
      {children}
    </DataContext.Provider>
  )
}

DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
}