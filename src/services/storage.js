import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeCartData = async (dataToSet) => {
  try {
    const existingData = await AsyncStorage.getItem('cart');
    const existingCart = JSON.parse(existingData) || [];
    const updatedCart = [...existingCart, dataToSet];
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    return updatedCart;
  } catch (error) {
    console.error('Error storing cart data:', error);
    throw error;
  }
}

export const removeCartData = async (dataToRemove) => {
  try {
    const existingData = await AsyncStorage.getItem('cart');
    const existingCart = JSON.parse(existingData) || [];

    const indexOfItemToRemove = existingCart.findIndex(item => item.title === dataToRemove);

    if (indexOfItemToRemove !== -1) {
      const updatedCart = [...existingCart.slice(0, indexOfItemToRemove), ...existingCart.slice(indexOfItemToRemove + 1)];

      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));

      return updatedCart;
    } else {
      return existingCart;
    }
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
}

export const getCartData = async (dataFor) => {
  let data;
  const keys = await AsyncStorage.getAllKeys();
  if(keys.includes(dataFor)){
    data = await AsyncStorage.getItem(dataFor);
  }
  else {
    data = await AsyncStorage.getItem(`persist:${dataFor}`);
  }
  const parsedData = await JSON.parse(data) || [];
  return parsedData;
}

// const remove = async () => {
//     await AsyncStorage.clear();
// }

// remove()