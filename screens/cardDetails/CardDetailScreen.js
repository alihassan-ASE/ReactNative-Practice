import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { addToCart } from '../../redux/action';
import { useDispatch } from "react-redux";
import Swiper from 'react-native-swiper';

const CardDetailScreen = ({ route }) => {
  // const [exist, setExist] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();


  // async function getCartData() {
  //   const data = await AsyncStorage.getItem('cart');
  //   return JSON.parse(data || '[]');
  // }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const cartData = await getCartData();
  //     setCartItems(cartData);
  //     const result = cartItems?.filter((element) => {
  //       return element.title === title
  //     })
  //     if (result && result.length > 0) {
  //       setExist(true);
  //     }
  //     else {
  //       setExist(false);
  //     }
  //   }
  //   fetchData();
  // }, [cartItems]);


  if (route.params) {
    const { title, images } = route.params;
    const handleAddToCart = () => {
      dispatch(addToCart({ title, images }))
    }


    return (
      <View style={styles.container}>
        <Swiper style={styles.swiperContainer} showsButtons={true} loop={true}>
          {images.map((image, index) => (
            <Image key={index} source={image} style={styles.cardImage} />
          ))}
        </Swiper>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.buttons}>
          <Button
            title="Add Item"
            onPress={handleAddToCart}
          />
        </View>
      </View >
    );
  }
  else {
    return (
      <Text>No Params</Text>
    )
  }

};


const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 300
  },
  cardImage: {
    width: "90%",
    height: 200,
    resizeMode: "cover",
    alignSelf: 'center',
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 12,
    color: "#333333",
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  swiperContainer: {
    height: 200,
  },
});

export default CardDetailScreen;
