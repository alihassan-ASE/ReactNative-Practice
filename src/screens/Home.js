import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, addProduct } from '../redux/features/ProductsSlice';
import MyButton from '../components/MyButton';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import AddProductModal from '../components/addProductModal';

const Home = () => {
  // hooks
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { products, isSuccess } = useSelector(state => state.products);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNestedModal, setIsNestedModal] = useState(false);
  const [productData, setProductData] = useState({ images: [] });
  const [clicked, setClicked] = useState(false)

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
  const addProductData = (values, uri) => {
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
      images: productData?.images ? [...productData?.images, uri] : [uri],
      thumbnail: uri,
    });
  };

  const handleAddProduct = () => {
    console.log(productData);
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
        closeNestedModal();
        addProductData(values, response.assets[0].uri);
      }
    });
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
      closeNestedModal();
      addProductData(values, response.assets[0].uri)
    }
  };


  return (
    <View style={styles.container}>

      <View style={{}}>
        <MyButton onPress={openModal} title='Add New Product' disabled={true} />
      </View>

      <AddProductModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onSubmit={(values, product) => {
          handleAddProduct(values, product);
        }}
        handleImagePicker={(values) => handleImagePicker(values)}
        handleImageFromCamera={(values) => handleImageFromCamera(values)}
        clicked={clicked}
        setClicked={setClicked}
        productData={productData}
        setIsNestedModal={setIsNestedModal}
        isNestedModal={isNestedModal}
        closeModal={closeModal}
        closeNestedModal={closeNestedModal}
      />

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
});
