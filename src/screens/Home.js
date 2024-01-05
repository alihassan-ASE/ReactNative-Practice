import { FlatList, Image, Pressable, StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView, Button, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, addProduct } from '../redux/features/ProductsSlice';
import Icon from 'react-native-vector-icons/Ionicons'
import MyButton from '../components/MyButton';
import ImagePicker from 'react-native-image-picker';

const Home = () => {
  // hooks
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { products, isSuccess } = useSelector(state => state.products);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productData, setProductData] = useState({
    brand: '',
    category: '',
    description: '',
    discountPercentage: 0,
    id: 0,
    images: [],
    price: 0,
    rating: 0,
    stock: 0,
    thumbnail: '',
    title: '',
  });

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const handleAddProduct = () => {
    dispatch(addProduct(productData));
  }
  const openModal = () => {
    setIsModalVisible(true);
  }
  const closeModal = () => {
    setIsModalVisible(false);
  }

  const handleImagePicker = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setProductData({ ...productData, thumbnail: response.uri });
      }
    });
  };
  
  

  return (
    <View style={styles.container}>

      <View>
        <MyButton onPress={openModal} title='Add New Product' disabled={true} />
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <ScrollView 
        showsVerticalScrollIndicator={false}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={closeModal}>
              <Icon name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add New Product</Text>

            <Text style={{ alignSelf: 'flex-start' }}>Title*</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={productData?.title}
              onChangeText={(text) => setProductData({ ...productData, title: text })}
            />

            <Text style={{ alignSelf: 'flex-start' }}>Category*</Text>
            <TextInput
              style={styles.input}
              placeholder="Category"
              value={productData?.category}
              onChangeText={(text) => setProductData({ ...productData, category: text })}
            />
        
            <Text style={{ alignSelf: 'flex-start' }}>Brand*</Text>
            <TextInput
              style={styles.input}
              placeholder="Brand"
              value={productData?.brand}
              onChangeText={(text) => setProductData({ ...productData, brand: text })}
            />

            <Text style={{ alignSelf: 'flex-start' }}>Desciprtion*</Text>
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={productData?.description}
              onChangeText={(text) => setProductData({ ...productData, description: text })}
            />

            <Text style={{ alignSelf: 'flex-start' }}>Discount Percentage*</Text>
            <TextInput
              style={styles.input}
              placeholder="Discount Percentage"
              value={productData?.discountPercentage}
              onChangeText={(text) => setProductData({ ...productData, discountPercentage: text })}
            />

            <Text style={{ alignSelf: 'flex-start' }}>Price*</Text>
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={productData?.price}
              onChangeText={(text) => setProductData({ ...productData, price: text })}
            />

            <Text style={{ alignSelf: 'flex-start' }}>Rating*</Text>
            <TextInput
              style={styles.input}
              placeholder="Rating"
              value={productData?.rating}
              onChangeText={(text) => setProductData({ ...productData, rating: text })}
            />

            <Text style={{ alignSelf: 'flex-start' }}>Stock*</Text>
            <TextInput
              style={styles.input}
              placeholder="Stock"
              value={productData?.stock}
              onChangeText={(text) => setProductData({ ...productData, stock: text })}
            />

            {/* <Text style={{ alignSelf: 'flex-start' }}>Thumbnail*</Text>
            <TextInput
              style={styles.input}
              placeholder="Thumbnail"
              value={productData?.thumbnail}
              onChangeText={(text) => setProductData({ ...productData, thumbnail: text })}
            /> */}
            <MyButton title={'Pick Image'} onPress={handleImagePicker} disabled={true} />
            {productData.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.imagePreview} />
            ))}
            <MyButton title="Add Product" onPress={handleAddProduct} disabled={true} />
          </View>
        </ScrollView>
      </Modal>


      <FlatList
        data={products?.products}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              onPress={() => navigation.navigate('SingleProduct', { Product: item })}
              style={styles.cardBox}
              key={item.id}>
              <Image source={{ uri: item.thumbnail }} style={styles.img} />
              <View style={styles.footer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
            </Pressable>
          );
        }}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  imagePreview: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
});
