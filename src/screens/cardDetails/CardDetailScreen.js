import React from 'react'
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { storeCartData } from '../../services/storage';
import { useDispatch } from "react-redux";
import Swiper from 'react-native-swiper';

const CardDetailScreen = ({ route }) => {

  const dispatch = useDispatch();

  if (route.params) {
    const { title, images } = route.params;
    const handleAddToCart = () => {
      storeCartData({ title, images })
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
