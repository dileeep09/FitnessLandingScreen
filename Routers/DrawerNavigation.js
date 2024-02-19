import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../InnerSreens/Home';
import SideBarComponent from '../Components/SideBarComponent';
import Login from '../Authentication/Login';
const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();
  return (
      <Drawer.Navigator screenOptions={{headerShown:false}}
        drawerContent={props => <SideBarComponent {...props}/>}
        >
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
  );
};

export default DrawerNavigation;
