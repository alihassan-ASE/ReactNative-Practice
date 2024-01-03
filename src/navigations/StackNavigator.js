import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import Notifications from '../screens/notification/Notification';
// import CartItemsScreen from '../screens/cart/cartItemsScreen';
import CardDetailScreen from '../screens/cardDetails/CardDetailScreen';
import { useNavigation } from '@react-navigation/native';
import Cart from '../components/cart';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const HomeStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: route.name !== 'CardDetail' && route.name !== 'Notification',
      })}
    >
      <Stack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerLeft: () => (
            <Icon
              name="menu"
              size={30}
              color="#000"
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <Cart />
          )
        }}
      />
      <Stack.Screen
        name="CardDetail"
        component={CardDetailScreen}
        options={({ route, navigation }) => ({
          title: (route.params)?.title || 'Card Detail',
          headerShown: navigation.canGoBack() ? true : false,
          headerRight: () => (
            <Cart />
          )
        })}
      />
      <Stack.Screen
        name="Notification"
        component={Notifications}
        options={({ route, navigation }) => ({
          title: 'Notification',
          headerShown: navigation.canGoBack() ? true : false,
          headerRight: () => (
            <Cart />
          )
        })}
      />
      {/* <Stack.Screen
        name="CartItems"
        component={CartItemsScreen}
        options={({ route, navigation }) => ({
          title: 'Cart',
          headerShown: navigation.canGoBack() ? true : false,
          headerRight: () => (
            <Cart />
          )
        })}
      /> */}
    </Stack.Navigator>
  );
};

export default HomeStack;
