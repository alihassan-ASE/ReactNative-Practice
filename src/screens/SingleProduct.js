import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MyButton from '../components/MyButton';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/features/CartSlice';

const SingleProduct = () => {
  // states
  const [currentItem, setCurrentItem] = useState({});
  // hooks
  const {
    params: { Product },
  } = useRoute();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { cartData, totalAmount } = useSelector(state => state.cartItems);

  // life cycle
  useEffect(() => {
    const itemChecking = () => {
      const itemAvailable = cartData?.find(value => value.id === Product.id);
      if (itemAvailable) {
        setCurrentItem(itemAvailable);
      } else {
        setCurrentItem({});
      }
    };
    itemChecking();
  }, [cartData]);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Card */}
      <View style={styles.cardBox}>
        <Image source={{ uri: Product.thumbnail }} style={styles.img} />
        <View style={styles.textBox}>
          <Text style={styles.title}>{Product.title}</Text>
          <Text style={styles.price}>${Product.price}</Text>
        </View>
        {/* body */}
        <View style={styles.body}>
          <Text style={styles.label}>
            Category: <Text style={styles.value}>{Product.category}</Text>
          </Text>
          <Text style={styles.label}>
            Brand: <Text style={styles.value}>{Product.brand}</Text>
          </Text>
          <Text style={styles.label}>
            Description: <Text style={styles.value}>{Product.description}</Text>
          </Text>
          <Text style={styles.label}>
            Rating: <Text style={styles.value}>{Product.rating}⭐️</Text>
          </Text>
          <Text style={styles.label}>
            Stock: <Text style={styles.value}>{Product.stock}</Text>
          </Text>
        </View>
        <View style={styles.footer}>
          {currentItem.quantity > 0 ? (
            <View style={styles.twoBtn}>
              <Pressable
                style={styles.btnBox}
                onPress={() => dispatch(removeFromCart(Product.id))}>
                <Text style={styles.btnSize}>-</Text>
              </Pressable>
              <Pressable>
                <Text style={styles.btn}>{currentItem.quantity}</Text>
              </Pressable>
              <Pressable
                style={styles.btnBox}
                onPress={() => dispatch(addToCart(Product))}>
                <Text style={styles.btnSize}>+</Text>
              </Pressable>
            </View>
          ) : (
            <MyButton
              onPress={() => dispatch(addToCart(Product))}
              title="Add to Cart"
              disabled={true}
            />
          )}
          <MyButton onPress={() => navigate('Cart')} title="View Cart" disabled={true} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SingleProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 'auto',
    paddingTop: 15,
  },
  img: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  price: {
    fontSize: 18,
  },
  cardBox: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '90%'
  },
  textBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  body: {
    marginTop: 30,
    gap: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginVertical: 5,
    color: 'black',
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    color: 'grey',
  },
  footer: {
    flex: 1,
    marginTop: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 30,
  },
  twoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
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
});
