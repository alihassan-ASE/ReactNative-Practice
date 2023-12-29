import React from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabs from './navigations/bottomTabNavigator';
import { useSelector } from 'react-redux';
import LoginScreen from './screens/auth/loginScreen';

const Drawer = createDrawerNavigator();

const DrawerScreens = ({ navigation }) => {

  return (
    <Drawer.Navigator initialRouteName='Feed' screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="Feed"
        component={MainTabs}
        options={({ route }) => ({
          headerTitle: getFocusedRouteNameFromRoute(route) || 'Home',
        })}
      />
      <Drawer.Screen
        name="All Categories"
        component={MainTabs}
        options={({ route }) => ({
          headerTitle: getFocusedRouteNameFromRoute(route) || 'Categories',
        })}
      />
    </Drawer.Navigator>
  )

}

const App = () => {
  const userData = useSelector((state) => state.userData);
  const isUserLoggedIn = userData.credentials?.email;
  return (
    <NavigationContainer>
      {isUserLoggedIn ?
        <DrawerScreens />
        :
        <LoginScreen />
      }
    </NavigationContainer>
  );
};

export default App;