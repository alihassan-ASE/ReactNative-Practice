import {
  Alert,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MyButton from '../components/MyButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  clearCart,
  removeFromCart,
} from '../redux/features/CartSlice';

const CartScreen = () => {
  // hooks
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { cartData, totalAmount } = useSelector(state => state.cartItems);

  // functions
  const handleCheckout = () => {
    Alert.alert(
      'Order Success',
      'Your order has been placed successfully',
      [
        {
          text: 'OK',
          onPress: () => {
            dispatch(clearCart());
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          },
        },
        {
          text: 'Cancel',
          onPress: () => {
          },
        },
      ]
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <FlatList
          data={cartData}
          style={styles.flatlistStyle}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.cardBox} key={item.id}>
                <Image source={{ uri: item.thumbnail }} style={styles.img} />
                <View style={styles.footer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.price}>${item.price}</Text>
                </View>
                <View style={styles.twoBtn}>
                  <Pressable
                    style={styles.btnBox}
                    onPress={() => dispatch(removeFromCart(item.id))}>
                    <Text style={styles.btnSize}>-</Text>
                  </Pressable>
                  <Pressable>
                    <Text style={styles.amount}>{item.quantity}</Text>
                  </Pressable>
                  <Pressable
                    style={styles.btnBox}
                    onPress={() => dispatch(addToCart(item))}>
                    <Text style={styles.btnSize}>+</Text>
                  </Pressable>
                </View>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.totalAmount}>
          Total Amount:{'  '}
          <Text style={styles.totalAmountPrice}>{totalAmount}$</Text>
        </Text>
        {
          cartData.length > 0 ? (
            <MyButton onPress={handleCheckout} title="Proceed to checkout" disabled={true} />
          ) : (
            <MyButton title="Proceed to checkout" disabled={false} />
          )
        }
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  price: {
    fontSize: 18,
    color: 'black',
  },
  cardBox: {
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 20,
    backgroundColor: 'white',
    width: '95%',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 6,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  flatlistStyle: {
    flex: 1,
    width: '95%',
  },
  twoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  btnBox: {
    width: 25,
    height: 25,
    marginHorizontal: 20,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  btnSize: {
    fontSize: 20,
    marginTop: -2,
  },
  btn: {
    fontSize: 16,
  },
  amount: {
    fontSize: 18,
    color: 'black',
    fontWeight: '700'
  },
  bottom: {
    flex: 0.2,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 6,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 0,
    padding: 0,
    color: 'black',

  },
  totalAmountPrice: {
    fontSize: 22,
    color: 'black',

  },
});
