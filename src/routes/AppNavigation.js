import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import CounterScreen from '../screens/CounterScreen';
import CartScreen from '../screens/CartScreen';
import SingleProduct from '../screens/SingleProduct';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const { cartData, totalAmount } = useSelector(state => state.cartItems);
  const totalQuantity = cartData.reduce((acc, item) => acc + item.quantity, 0);
  const { userData } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const { navigate } = useNavigation();


  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: route.name !== 'Cart' && route.name !== 'SingleProduct',
      })}
    >
      {userData ? (
        <Stack.Group
          screenOptions={({ route }) => ({
            headerShown: route.name !== 'CardDetail' && route.name !== 'Notification',
          })}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Home',
              headerLeft: () => (
                <Icon name="menu" size={30} onPress={() => navigation.openDrawer()} />
              ),
              headerRight: () => (
                <Pressable style={{ position: 'relative' }} onPress={() => navigation.navigate('Cart')} >
                  <Icon name="cart" size={30} style={{ marginLeft: 15 }} />
                  {
                    totalQuantity > 0 ?
                      (
                        <View style={styles.quantity}>
                          <Text style={styles.text}>{totalQuantity}</Text>
                          </View>
                      ) : ''
                  }
                </Pressable>
              )
            }}
          />
          <Stack.Screen
            name="SingleProduct"
            component={SingleProduct}
            options={{
              headerRight: () => (
                <Pressable style={{ position: 'relative' }} onPress={() => navigation.navigate('Cart')} >
                  <Icon name="cart" size={30} style={{ marginLeft: 15 }} />
                  {
                    totalQuantity > 0 &&
                      (
                        <View style={styles.quantity}>
                          <Text style={styles.text}>{totalQuantity}</Text>
                          </View>
                      )
                  }
                </Pressable>
              )
            }}
          />
          <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CounterScreen" component={CounterScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
export default AppNavigation;

const styles = StyleSheet.create({
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
  }
});
