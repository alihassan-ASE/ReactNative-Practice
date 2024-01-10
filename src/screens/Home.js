import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, addProduct } from '../redux/features/ProductsSlice';
import Icon from 'react-native-vector-icons/Ionicons'
import MyButton from '../components/MyButton';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Swiper from 'react-native-swiper';
import { Formik } from 'formik';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const Home = () => {
  // hooks
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { products, isSuccess } = useSelector(state => state.products);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNestedModal, setIsNestedModal] = useState(false);
  const [productData, setProductData] = useState({ images: [] });

  const { userData } = useSelector(state => state.auth);
  const [hasEffectRun, setHasEffectRun] = useState(false);

  useEffect(() => {
    if (userData && hasEffectRun === false) {
      dispatch(getAllProducts());
      setHasEffectRun(true);
    }
  }, []);

  const askForPermission = (permission) => {
    request(permission).then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('This feature is not available (on this device / in this context)');
          break;
        case RESULTS.DENIED:
          console.log('The permission has not been requested / is denied but requestable');
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    })
  }
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
      images: productData?.images ? [...productData?.images, response.assets[0]?.uri] : [response.assets[0]?.uri],
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
  const closeNestedModal = () => {
    setIsNestedModal(false);

  }

  const handleImagePicker = (values) => {
    if (Platform.OS === 'ios') {
      askForPermission(PERMISSIONS.IOS.MEDIA_LIBRARY);
    }
    else {
      askForPermission(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
    }

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
    closeNestedModal();
  };

  const handleImageFromCamera = async (values) => {
    if (Platform.OS === 'ios') {
      askForPermission(PERMISSIONS.IOS.CAMERA);
    }
    else {
      askForPermission(PERMISSIONS.ANDROID.CAMERA);
    }

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    const response = await launchCamera(options);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      addProductData(values, response)
    }
    closeNestedModal();
  };


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
            if (!values.id) {
              errors.id = 'Id is Required';
            } else if (isNaN(values.id)) {
              errors.id = 'Id must be a number';
            }
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
            } else if (isNaN(values.discountPercentage)) {
              errors.discountPercentage = 'Discounted Percentage must be a number';
            }
            if (!values.price) {
              errors.price = 'Price is Required';
            } else if (isNaN(values.price)) {
              errors.price = 'Price must be a number';
            }
            if (!values.rating) {
              errors.rating = 'Rating is Required';
            } else if (isNaN(values.rating)) {
              errors.rating = 'Rating must be a number';
            }
            if (!values.stock) {
              errors.stock = 'Stock is Required';
            } else if (isNaN(values.stock)) {
              errors.stock = 'Stock must be a number';
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
            <KeyboardAvoidingView style={styles.modalContainer}>
              <View>
                <TouchableOpacity onPress={() => closeModal()} style={{ position: 'absolute', right: -20, top: -15, backgroundColor: 'black', borderRadius: 25, zIndex: 10 }}>
                  <Icon name="close" size={20} color="white" />
                </TouchableOpacity>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  
                >
                  <View>
                    <Text style={styles.modalTitle}>Add New Product</Text>
                    <Text style={styles.titleInput}>Id<Text style={styles.star}>*</Text></Text>
                    <TextInput
                      style={styles.input}
                      onBlur={handleBlur('id')}
                      placeholderTextColor="grey"
                      placeholder="Id"
                      value={values.id}
                      autoCapitalize="none"
                      onChangeText={handleChange('id')}
                    />
                    {errors.id && touched.id && <Text style={styles.error}>{errors.id}</Text>}

                    <Text style={styles.titleInput}>Title<Text style={styles.star}>*</Text></Text>
                    <TextInput
                      style={styles.input}
                      onBlur={handleBlur('title')}
                      placeholderTextColor="grey"
                      placeholder="Title"
                      value={values.title}
                      autoCapitalize="none"
                      onChangeText={handleChange('title')}

                    />
                    {errors.title && touched.title && <Text style={styles.error}>{errors.title}</Text>}
                    <Text style={styles.titleInput}>Category<Text style={styles.star}>*</Text></Text>
                    <TextInput
                      style={styles.input}
                      onBlur={handleBlur('category')}
                      placeholderTextColor="grey"
                      placeholder="Category"
                      value={values.category}
                      autoCapitalize='none'
                      onChangeText={handleChange('category')}

                    />
                    {errors.category && touched.category && <Text style={styles.error}>{errors.category}</Text>}

                    <Text style={styles.titleInput}>Brand<Text style={styles.star}>*</Text></Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('brand')}
                      onBlur={handleBlur('brand')}
                      placeholderTextColor="grey"
                      placeholder="Brand"
                      value={values.brand}
                      autoCapitalize="none"

                    />
                    {errors.brand && touched.brand && <Text style={styles.error}>{errors.brand}</Text>}

                    <Text style={styles.titleInput}>Desciprtion<Text style={styles.star}>*</Text></Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      placeholderTextColor="grey"
                      placeholder="Description"
                      value={values.description}
                      autoCapitalize="none"

                    />
                    {errors.description && touched.description && <Text style={styles.error}>{errors.description}</Text>}

                    <Text style={styles.titleInput}>Discount Percentage<Text style={styles.star}>*</Text></Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('discountPercentage')}
                      onBlur={handleBlur('discountPercentage')}
                      placeholder="Discount Percentage"
                      placeholderTextColor="grey"
                      value={values.discountPercentage}
                      autoCapitalize="none"

                    />
                    {errors.discountPercentage && touched.discountPercentage && <Text style={styles.error}>{errors.discountPercentage}</Text>}

                    <Text style={styles.titleInput}>Price<Text style={styles.star}>*</Text></Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('price')}
                      onBlur={handleBlur('price')}
                      placeholderTextColor="grey"
                      placeholder="Price"
                      value={values.price}
                      autoCapitalize="none"

                    />
                    {errors.price && touched.price && <Text style={styles.error}>{errors.price}</Text>}

                    <Text style={styles.titleInput}>Rating<Text style={styles.star}>*</Text></Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('rating')}
                      onBlur={handleBlur('rating')}
                      placeholderTextColor="grey"
                      placeholder="Rating"
                      value={values.rating}
                      autoCapitalize="none"

                    />
                    {errors.rating && touched.rating && <Text style={styles.error}>{errors.rating}</Text>}

                    <Text style={styles.titleInput}>Stock<Text style={styles.star}>*</Text></Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('stock')}
                      onBlur={handleBlur('stock')}
                      placeholderTextColor="grey"
                      placeholder="Stock"
                      value={values.stock}
                      autoCapitalize="none"

                    />
                    {errors.stock && touched.stock && <Text style={styles.error}>{errors.stock}</Text>}

                    {productData.images?.length > 0 && (
                      <View>
                        <Text style={styles.titleInput}>Thumbnail<Text style={styles.star}>*</Text></Text>

                        <View style={{ height: 200 }}>
                          <Image source={{ uri: productData.images[0] }} style={{ width: '100%', height: '100%' }} />
                        </View>

                        <Text style={styles.titleInput}>Images</Text>
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
                      <MyButton title={'Upload Image'} onPress={() => setIsNestedModal(true)} disabled={true} />

                      {productData.images?.length === 0 && errors.images && touched.images && (
                        <Text style={styles.error}>{errors.images}</Text>
                      )}
                      <MyButton title="Add Product" onPress={handleSubmit} disabled={true} />
                    </View>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={isNestedModal}
                      onRequestClose={closeModal}
                    >
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                        <View style={{ height: 150, paddingTop: 8, backgroundColor: 'white', borderRadius: 20, width: 300 }}>
                          <TouchableOpacity onPress={closeNestedModal} style={{ position: 'absolute', right: -5, top: -5, backgroundColor: 'black', borderRadius: 25, }}>
                            <Icon name="close" size={20} color="white" />
                          </TouchableOpacity>
                          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <MyButton title={'Choose From Device'} onPress={() => handleImagePicker(values)} disabled={true} />
                            <MyButton title={'Open Camera'} onPress={() => handleImageFromCamera(values)} disabled={true} />
                          </View>
                        </View>
                      </View>
                    </Modal>
                  </View>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          )}
        </Formik>
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
    color: 'black',
  },
  cardBox: {
    margin: 'auto',
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
    padding: 40,
    paddingTop: Platform.OS==='ios'? 60: 20,
    backfaceVisibility: 'hidden',
    backgroundColor: 'lightgrey',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
    color: 'black',
    alignSelf: 'center'
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  imagePreview: {
    width: 100,
    height: 80,
    marginVertical: 10,
  },
  error: {
    color: 'red',
    marginBottom: 6,
  },
  star: {
    color: 'red'
  },
  titleInput: {
    alignSelf: 'flex-start' , 
    color: 'black',
    fontSize: 16,
    margin: 5
  }
});
