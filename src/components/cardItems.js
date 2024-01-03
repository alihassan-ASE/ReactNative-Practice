import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storeCartData } from '../services/storage';
import Swiper from 'react-native-swiper';

const CardItem = (props) => {
  const { title, images } = props;
  const navigation = useNavigation();

  const handleAddToCart = () => {
    storeCartData(props);
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CardDetail', {
        title,
        images,
      })}
    >
      <View style={styles.cardContainer}>
        <Swiper style={styles.swiperContainer} showsButtons={true} loop={true}>
          {images.map((image, index) => (
            <Image key={index} source={image} style={styles.cardImage} />
          ))}
        </Swiper>
        <Text style={styles.cardTitle}>{title}</Text>
        <Button
          title="Add Item"
          onPress={handleAddToCart}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 250,
    height: 300,
    margin: 10,
    shadowColor: 'black',
  },
  swiperContainer: {
    height: 200,
  },
  cardImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 12,
    color: '#333333',
  },
});

export default CardItem;
