import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getCartData } from "../services/storage";

export default Cart = () => {
  let [cartItems, setCartItems] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const cartData = await getCartData('cart');
      setCartItems(cartData);
    }

    fetchData();
  }, [cartItems]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('CartItems')}
      >
        <View style={styles.background}>
          <Text
            style={styles.font}
          >
            {cartItems?.length}
          </Text>
        </View>
        <Icon
          name="cart"
          size={30}
          color="#000"
          style={{ marginRight: 5, }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginRight: 5
  },
  background: {
    backgroundColor: 'red',
    position: 'absolute',
    paddingHorizontal: 3,
    paddingVertical: 2,
    top: -3,
    right: 3,
    zIndex: 3,
    borderRadius: 50,
  },
  font: {
    color: 'white',
    fontSize: 12,
  }
});
