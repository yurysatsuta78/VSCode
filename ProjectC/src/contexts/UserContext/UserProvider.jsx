import { createContext, useCallback, useReducer } from "react";
import PropTypes from "prop-types";

const GET_USER_INFO = 'GET_USER_INFO';
const REMOVE_USER_INFO = 'REMOVE_USER_INFO';

const initialState = {
    name: "",
    surname: "",
    phoneNumber: "",
    isAuthenticated: false
};

const UserReducer = (state, action) => {
    switch (action.type) {
      case GET_USER_INFO:
        return {
          ...state,
          name: action.payload.userInfo.name,
          surname: action.payload.userInfo.surname,
          phoneNumber: action.payload.userInfo.phoneNumber,
          isAuthenticated: action.payload.isAuthenticated
        };
      case REMOVE_USER_INFO:
        return {
            ...state,
            name: action.payload.name,
            surname: action.payload.surname,
            phoneNumber: action.payload.phoneNumber,
            isAuthenticated: action.payload.isAuthenticated
        };
      default:
        return state;
    }
  };

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [state, dispatch] = useReducer(UserReducer, initialState);

    const getUserInfo = useCallback(async (userInfo) => {
        if(userInfo){
            dispatch({ type: GET_USER_INFO, payload: {
                userInfo,
                isAuthenticated: true
            } });
        } else{
            console.log("User info is empty");
        }
      }, [dispatch]);

      const removeUserInfo = async () => {
        dispatch({ type: REMOVE_USER_INFO, payload: {
            name: "",
            surname: "",
            phoneNumber: "",
            isAuthenticated: false
        } });
      };

  return (
    <UserContext.Provider value={{ getUserInfo, removeUserInfo, isUserAuthenticated: state.isAuthenticated }}>
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
}