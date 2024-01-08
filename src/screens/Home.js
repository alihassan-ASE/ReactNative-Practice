import { FlatList, Image, Pressable, StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView, Button, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, addProduct } from '../redux/features/ProductsSlice';
import Icon from 'react-native-vector-icons/Ionicons'
import MyButton from '../components/MyButton';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Swiper from 'react-native-swiper';
import { Formik } from 'formik';


const Home = () => {
  // hooks
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { products, isSuccess } = useSelector(state => state.products);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productData, setProductData] = useState({ images: [] });

  const { userData } = useSelector(state => state.auth);
  const [hasEffectRun, setHasEffectRun] = useState(false);

  useEffect(() => {
    if (userData && hasEffectRun === false) {
      dispatch(getAllProducts());
      setHasEffectRun(true);
    }
  }, []);

  const addProductData = (values, response) => {
    setProductData({
      title: values.title,
      category: values.category,
      brand: values.brand,
      description: values.description,
      discountPercentage: values.discountPercentage,
      id: values.id,
      price: values.price,
      rating: values.rating,
      stock: values.stock,
      images: productData.images ? [...productData.images, response.assets[0].uri] : [response.assets[0].uri],
      thumbnail: response.assets[0].uri,
    });
  };

  const handleAddProduct = () => {
    dispatch(addProduct(productData));
    closeModal();
    setProductData({ images: [] });
  };
  const openModal = () => {
    setIsModalVisible(true);
  }
  const closeModal = () => {
    setIsModalVisible(false);
  }

  const handleImagePicker = (values) => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        addProductData(values, response)
      }
    });
  };

  const handleImageFromCamera = (values) => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        console.log(response);
        addProductData(values, response)
      }
    });
  }

  return (
    <View style={styles.container}>

      <View style={{}}>
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
          <Formik
            initialValues={{
              title: '',
              category: '',
              brand: '',
              description: '',
              discountPercentage: '',
              id: '',
              price: '',
              rating: '',
              stock: '',
              thumbnail: '',
              images: [],
            }}
            onSubmit={(values, { resetForm }) => {
              handleAddProduct();
              resetForm();
            }}
            validate={(values) => {
              const errors = {};
              if (!values.brand) {
                errors.brand = 'Brand is Required';
              }
              if (!values.category) {
                errors.category = 'Category is Required';
              }
              if (!values.description) {
                errors.description = 'Description is Required';
              }
              if (!values.discountPercentage) {
                errors.discountPercentage = 'Discounted Percentage is Required';
              }
              if (!values.price) {
                errors.price = 'Price is Required';
              }
              if (!values.rating) {
                errors.rating = 'Rating is Required';
              }
              if (!values.id) {
                errors.rating = 'Id is Required';
              }
              if (!values.stock) {
                errors.stock = 'Stock is Required';
              }
              if (!values.title) {
                errors.title = 'Title is Required';
              }
              if (productData.images.length === 0) {
                errors.images = 'Image is Required';
              }
              return errors;
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (

              <View style={styles.modalContainer}>
                <TouchableOpacity onPress={closeModal}>
                  <Icon name="close" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Add New Product</Text>

                <Text style={{ alignSelf: 'flex-start' }}>Id*</Text>
                <TextInput
                  style={styles.input}
                  onBlur={handleBlur('id')}
                  placeholderTextColor="grey"
                  placeholder="Id"
                  value={values.id}
                  autoCapitalize="none"
                  onChangeText={handleChange('id')}

                />
                <Text style={{ alignSelf: 'flex-start' }}>Title*</Text>
                <TextInput
                  style={styles.input}
                  onBlur={handleBlur('title')}
                  placeholderTextColor="grey"
                  placeholder="Title"
                  value={values.title}
                  autoCapitalize="none"
                  onChangeText={handleChange('title')}

                />
                {errors.title && <Text style={styles.error}>{errors.title}</Text>}
                <Text style={{ alignSelf: 'flex-start' }}>Category*</Text>
                <TextInput
                  style={styles.input}
                  onBlur={handleBlur('category')}
                  placeholderTextColor="grey"
                  placeholder="Category"
                  value={values.category}
                  autoCapitalize='none'
                  onChangeText={handleChange('category')}

                />
                {errors.category && <Text style={styles.error}>{errors.category}</Text>}

                <Text style={{ alignSelf: 'flex-start' }}>Brand*</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('brand')}
                  onBlur={handleBlur('brand')}
                  placeholderTextColor="grey"
                  placeholder="Brand"
                  value={values.brand}
                  autoCapitalize="none"

                />
                {errors.brand && <Text style={styles.error}>{errors.brand}</Text>}

                <Text style={{ alignSelf: 'flex-start' }}>Desciprtion*</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  placeholderTextColor="grey"
                  placeholder="Description"
                  value={values.description}
                  autoCapitalize="none"

                />
                {errors.description && <Text style={styles.error}>{errors.description}</Text>}

                <Text style={{ alignSelf: 'flex-start' }}>Discount Percentage*</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('discountPercentage')}
                  onBlur={handleBlur('discountPercentage')}
                  placeholder="Discount Percentage"
                  placeholderTextColor="grey"
                  value={values.discountPercentage}
                  autoCapitalize="none"

                />
                {errors.discountPercentage && <Text style={styles.error}>{errors.discountPercentage}</Text>}

                <Text style={{ alignSelf: 'flex-start' }}>Price*</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                  placeholderTextColor="grey"
                  placeholder="Price"
                  value={values.price}
                  autoCapitalize="none"

                />
                {errors.price && <Text style={styles.error}>{errors.price}</Text>}

                <Text style={{ alignSelf: 'flex-start' }}>Rating*</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('rating')}
                  onBlur={handleBlur('rating')}
                  placeholderTextColor="grey"
                  placeholder="Rating"
                  value={values.rating}
                  autoCapitalize="none"

                />
                {errors.rating && <Text style={styles.error}>{errors.rating}</Text>}

                <Text style={{ alignSelf: 'flex-start' }}>Stock*</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('stock')}
                  onBlur={handleBlur('stock')}
                  placeholderTextColor="grey"
                  placeholder="Stock"
                  value={values.stock}
                  autoCapitalize="none"

                />
                {errors.stock && <Text style={styles.error}>{errors.stock}</Text>}

                {productData.images?.length > 0 && (
                  <View>
                    <Text style={{ alignSelf: 'flex-start' }}>Thumbnail*</Text>

                    <View style={{ height: 200 }}>
                      <Image source={{ uri: productData.images[0] }} style={{ width: '100%', height: '100%' }} />
                    </View>

                    <Text style={{ alignSelf: 'flex-start' }}>Images</Text>
                    <Swiper style={{ height: 200 }} showsButtons={true} loop={false}>
                      {productData.images.map((item, index) => (
                        <View key={index}>
                          <Image source={{ uri: item }} style={{ width: '100%', height: '100%' }} />
                        </View>
                      ))}
                    </Swiper>

                  </View>
                )}
                <View style={{ alignItems: 'center' }}>
                  <MyButton title={'Pick Image'} onPress={() => handleImagePicker(values)} disabled={true} />
                  <MyButton title={'Take Image'} onPress={() => handleImageFromCamera(values)} disabled={true} />

                  {productData.images?.length === 0 && errors.images && (
                    <Text style={styles.error}>{errors.images}</Text>
                  )}
                  <MyButton title="Add Product" onPress={handleSubmit} disabled={true} />
                </View>
              </View>
            )}
          </Formik>
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
    width: 100,
    height: 80,
    marginVertical: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
