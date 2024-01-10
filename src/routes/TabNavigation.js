import React, { useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import CartScreen from '../screens/CartScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import AppNavigation from './AppNavigation';
import { useSelector } from 'react-redux';



const Tab = createBottomTabNavigator();

const TabNavigation = ({ route, navigation }) => {
  const { cartData, totalAmount } = useSelector(state => state.cartItems);
  const totalQuantity = cartData.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (route.name === 'CartScreen') {
      navigation.navigate('Cart');
    } else if (route.name === 'Home') {
      navigation.navigate('Home');
    }
  }, [route, navigation]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'HomeScreen') {
            iconName = 'home';
          } else if (route.name === 'Cart') {
            iconName = 'cart';
          }

          return (
            <View style={styles.icon}>
              <Icon name={iconName} size={25} color={color} />
              {route.name === 'Cart' && totalQuantity > 0 && (
                <View style={styles.quantity}>
                  <Text style={styles.text}>{totalQuantity}</Text>
                </View>
              )}
            </View>
          );
        },
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarStyle: {
          height: Platform.OS ==='android'? 55: 75
        }
      })}

    >
      <Tab.Screen
        name='HomeScreen'
        component={AppNavigation}
        options={{ title: 'Home', headerShown: false }}
      />
      <Tab.Screen
        name='Cart'
        component={CartScreen}
        options={{
          title: 'Cart',
          headerLeft: () => (
            <Icon
              name="menu"
              size={30}
              style={{ marginLeft: 15, marginRight: 15, color: "black" }}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 14,
    paddingBottom: Platform.OS === 'android'? 5 : 0,
    marginBottom: Platform.OS === 'android'? 0 : -8
  },
  quantity: {
    position: 'absolute', 
    right: 0, 
    top: -2,
    backgroundColor: 'red', 
    paddingHorizontal: 4, 
    borderRadius: 25 
  },
  text: {
    color:'white',
    fontSize: 12,
  },
  icon: {
    position: 'relative',
    padding: 0,
    marginBottom: -5,  
  }
});
