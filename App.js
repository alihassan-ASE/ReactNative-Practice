import React from 'react';
import { View, Text, Platform } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import TabNavigation from './src/routes/TabNavigation';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import MyButton from './src/components/MyButton';
import { logout } from './src/redux/features/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import Login from './src/screens/Login';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch()
  const { userData, isLoading } = useSelector(state => state.auth);

  const navigation = useNavigation();

  const handleHomePress = () => {
    navigation.navigate('HomeScreen');
  };
  const handlingLogout = () => {
    dispatch(logout())
  }

  return (
    <DrawerContentScrollView {...props}>
      <View style={{borderBottomWidth: 1, borderBottomColor: 'lightgrey', width: '100%'}}>
        <Text style={{fontSize: 30, color: 'black', alignSelf: 'center', fontWeight: 'bold', fontFamily: Platform.OS === 'ios' ? 'Helvetica-Bold' : 'sans-serif-bold', marginVertical: 50}}>
          Welcome
        </Text>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', width: '100%' }}>
        <DrawerItem
          label="Home"
          onPress={handleHomePress}
          labelStyle={{ fontSize: 18, color: 'black', padding: 0, marginVertical: -5 }}
        />
      </View>

      <View style={{ alignItems: 'center', marginTop: 20 }} >
        <MyButton isLoading={isLoading} title="Logout" onPress={handlingLogout} disabled={true} />
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerScreens = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  const { userData } = useSelector(state => state.auth);
  return (
    userData ? (
      <NavigationContainer>
        <DrawerScreens />
      </NavigationContainer >
    ) :
      (
        <Login />
      )
  );
};

export default App;
