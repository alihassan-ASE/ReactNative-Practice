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
import React from 'react';
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
    if (cartData.length > 0) {
      Alert.alert('Order Success', 'Your order place successfully', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Home'),
              dispatch(clearCart())
          },
        }
      ]);
    }
    else {
      Alert.alert('Order Fail', 'Your order not placed. First Add Item in Cart', [
        { text: 'OK', onPress: () => navigation.navigate('HomeScreen') },
      ]);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView />
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
                    <Text style={styles.btn}>-</Text>
                  </Pressable>
                  <Pressable>
                    <Text style={styles.amount}>{item.quantity}</Text>
                  </Pressable>
                  <Pressable
                    style={styles.btnBox}
                    onPress={() => dispatch(addToCart(item))}>
                    <Text style={styles.btn}>+</Text>
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
        <MyButton onPress={handleCheckout} title="Proceed to checkout" />
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
    paddingHorizontal: '5%',
    marginTop: 20
  },
  img: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 18,
    marginTop: 10,
  },
  cardBox: {
    marginBottom: 30,
    paddingBottom: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  flatlistStyle: {
    flex: 1,
  },
  twoBtn: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
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
  btn: {
    fontSize: 25,
    marginTop: -3,
  },
  amount: {
    fontSize: 16,
  },
  bottom: {
    flex: 0.2,
    gap: 10,
    paddingHorizontal: '5%',
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmountPrice: {
    fontSize: 22,
  },
});
