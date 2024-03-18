import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator,CardStyleInterpolators} from '@react-navigation/native-stack';
import Splash from '../Components/Splash';
import Introduction1 from '../Components/Introduction1';
import Introductoin2 from '../Components/Introductoin2';
import Login from '../Authentication/Login';
import Signup from '../Authentication/Signup';
import Home from '../InnerSreens/Home';
import History from '../InnerSreens/History';
import Days from '../InnerSreens/Days';
import VideoPlayer from '../InnerSreens/VideoPlayer';
import DrawerNavigation from './DrawerNavigation';
import {AuthProvider} from '../Components/AuthContex';
const MainRouter = () => {
  
  const Stack = createNativeStackNavigator();
  const screenOptions = {
    headerShown: false,
    gestureDirection: 'horizontal',
    gesturesEnabled: true,
    // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  
  };
  return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Introduction1" component={Introduction1} />
        <Stack.Screen name="Introduction2" component={Introductoin2} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
        <Stack.Screen name="Days" component={Days} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
        {/* 
 
      <Stack.Screen name="Signup" component={Signup} />
   
      <Stack.Screen name="History" component={History} />
   
     */}
      </Stack.Navigator>
  );
};

export default MainRouter;
