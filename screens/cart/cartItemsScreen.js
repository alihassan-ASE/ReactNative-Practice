import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addToCart, removeFromCart } from '../../redux/action';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartItemsScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };


  async function getCartData() {
    const data = await AsyncStorage.getItem('cart');
    return JSON.parse(data || '[]');
  }

  useEffect(() => {
    const fetchData = async () => {
      const cartData = await getCartData();
      setCartItems(getUniqueItems(cartData));
    }
    fetchData();
  }, [cartItems]);

  const renderCartItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Swiper style={styles.swiperContainer} showsButtons={true} loop={true}>
          {item.images.map((image, index) => (
            <Image key={index} source={image} style={styles.cardImage} />
          ))}
        </Swiper>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => handleRemoveFromCart(item)}>
            <Icon name="minus-square" size={20} />
          </TouchableOpacity>
          <Text style={styles.count}>{String(item.count)}</Text>
          <TouchableOpacity onPress={() => handleAddToCart(item)}>
            <Icon name="plus-square" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (cartItems.length > 0) {
    return (
      <View style={styles.container}>
        <FlatList data={cartItems} renderItem={renderCartItem} keyExtractor={(item) => item.title} />
      </View>
    );
  } else {
    return <Text style={styles.container}>Item Not Selected</Text>;
  }
};

const getUniqueItems = (cartItems) => {
  const uniqueItemsMap = new Map();
  cartItems.forEach((item) => {
    const count = uniqueItemsMap.get(item.title) ? uniqueItemsMap.get(item.title).count : 0;
    uniqueItemsMap.set(item.title, { ...item, count: count + 1 });
  });
  return Array.from(uniqueItemsMap.values(), (item) => ({
    ...item,
    count: typeof item.count === 'number' ? item.count : 1,
  }));
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 12,
    color: '#333333',
  },
  swiperContainer: {
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  count: {
    fontSize: 16,
  },
  card: {
    width: 250,
    borderWidth: 1,
    marginTop: 20,
    shadowColor: 'black',
    padding: 10,
  },
});

export default CartItemsScreen;
