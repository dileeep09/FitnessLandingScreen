import React, {createContext, useState, useEffect, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import { setIsLogin } from '../Redux/Actions';
import Toast from 'react-native-simple-toast';
// 1 minute in milliseconds
const TIMEOUT = 10 * 1000;
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const Dispatch = useDispatch();
  const navigation = useNavigation();
  const {getIntroVisible, getIsLogin} = useSelector(state => state);
  const [isLoggedIn, setIsLoggedIn] = useState(getIsLogin);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      setTimer(
        setTimeout(() => {
          setIsLoggedIn(false);
          Dispatch(setIsLogin(false));
          navigation.navigate('Login');
         Toast.show("You have been logged out!")
        }, TIMEOUT),
      );
    } else {
      if (timer) {
        clearTimeout(timer);
      }
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isLoggedIn]);
  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
  };
  const resetTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(() => {
        setIsLoggedIn(false);
      }, TIMEOUT),
    );
  };
  return (
    <AuthContext.Provider value={{isLoggedIn, login, logout, resetTimer}}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
