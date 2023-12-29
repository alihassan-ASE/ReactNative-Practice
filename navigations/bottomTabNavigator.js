import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Categories from '../screens/categories/Categories';
import WishList from '../screens/wishlist/WishlistScreen';
import HomeStack from './StackNavigator';
import CartItemsScreen from '../screens/cart/cartItemsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Cart from '../components/cart';

const Tab = createBottomTabNavigator();

const MainTabs = (route) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (route.route.name === 'CartScreen') {
      navigation.navigate('CartItems');
    } else if (route.route.name === 'Feed') {
      navigation.navigate('Feed');
    } else if (route.route.name === 'WishlistScreen') {
      navigation.navigate('Wishlist');
    } else if (route.route.name === 'All Categories') {
      navigation.navigate('Categories');
    }
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Categories') {
            iconName = 'list';
          } else if (route.name === 'Wishlist') {
            iconName = 'heart';
          } else if (route.name === 'CartItems') {
            iconName = 'cart';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        headerRight: () => <Cart/>
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}

        options={{
          title: 'Categories',
          tabBarLabel: 'Categories',
          headerShown: true, headerLeft: () => (
            <Icon
              name="menu"
              size={30}
              color="#000"
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()}
            />

          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishList}
        options={{
          title: 'Wishlist',
          tabBarLabel: 'Wishlist',
          headerShown: true,
          headerLeft: () => (
            <Icon
              name="menu"
              size={30}
              color="#000"
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CartItems"
        component={CartItemsScreen}
        options={{
          title: 'Cart',
          tabBarLabel: 'Cart',
          headerShown: true,
          headerLeft: () => (
            <Icon
              name="menu"
              size={30}
              color="#000"
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
