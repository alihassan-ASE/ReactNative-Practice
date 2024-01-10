import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    ScrollView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import { Formik } from 'formik';
import { TextInput } from 'react-native-paper';
import MyButton from '../components/MyButton';

const AddProductModal = ({
    isVisible,
    onClose,
    onSubmit,
    clicked,
    setClicked,
    handleImagePicker,
    handleImageFromCamera,
    productData,
    setIsNestedModal,
    isNestedModal,
    closeModal,
    closeNestedModal,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={isVisible}
            onRequestClose={onClose}
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
                    // images: [],
                }}
                onSubmit={(values, { resetForm }) => {
                    onSubmit(values, productData);
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
                        errors.discountPercentage =
                            'Discounted Percentage must be a number';
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
                    <TouchableWithoutFeedback
                        onPress={Keyboard.dismiss}
                        accessible={false}
                    >
                        <KeyboardAvoidingView style={styles.modalContainer}>
                            <View>
                                <TouchableOpacity
                                    onPress={closeModal}
                                    style={{
                                        position: 'absolute',
                                        right: -20,
                                        top: -15,
                                        backgroundColor: 'black',
                                        borderRadius: 25,
                                        zIndex: 10,
                                    }}
                                >
                                    <Icon name="close" size={20} color="white" />
                                </TouchableOpacity>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <View>
                                        <Text style={styles.modalTitle}>Add New Product</Text>

                                        <TextInput
                                            style={styles.input}
                                            label="Id"
                                            mode="outlined"
                                            activeOutlineColor="black"
                                            placeholderTextColor="grey"
                                            value={values.id}
                                            autoCapitalize="none"
                                            onBlur={handleBlur('id')}
                                            onChangeText={handleChange('id')}
                                        />
                                        {errors.id && touched.id && (
                                            <Text style={styles.error}>{errors.id}</Text>
                                        )}

                                        <TextInput
                                            style={styles.input}
                                            label="Title"
                                            mode="outlined"
                                            activeOutlineColor="black"
                                            placeholderTextColor="grey"
                                            value={values.title}
                                            autoCapitalize="none"
                                            onBlur={handleBlur('title')}
                                            onChangeText={handleChange('title')}
                                        />
                                        {errors.title && touched.title && (
                                            <Text style={styles.error}>{errors.title}</Text>
                                        )}
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={handleChange('category')}
                                            label="Category"
                                            activeOutlineColor="black"
                                            mode="outlined"
                                            placeholderTextColor="grey"
                                            value={values.category}
                                            onBlur={handleBlur('category')}
                                            autoCapitalize="none"
                                        />
                                        {errors.category && touched.category && (
                                            <Text style={styles.error}>{errors.category}</Text>
                                        )}

                                        <TextInput
                                            style={styles.input}
                                            label="Brand"
                                            mode="outlined"
                                            activeOutlineColor="black"
                                            onChangeText={handleChange('brand')}
                                            placeholderTextColor="grey"
                                            value={values.brand}
                                            onBlur={handleBlur('brand')}
                                            autoCapitalize="none"
                                        />
                                        {errors.brand && touched.brand && (
                                            <Text style={styles.error}>{errors.brand}</Text>
                                        )}

                                        <TextInput
                                            style={styles.input}
                                            label="Description"
                                            mode="outlined"
                                            activeOutlineColor="black"
                                            onChangeText={handleChange('description')}
                                            placeholderTextColor="grey"
                                            value={values.description}
                                            onBlur={handleBlur('description')}
                                            autoCapitalize="none"
                                        />
                                        {errors.description &&
                                            touched.description && (
                                                <Text style={styles.error}>{errors.description}</Text>
                                            )}

                                        <TextInput
                                            style={styles.input}
                                            label="Discount Percentage"
                                            mode="outlined"
                                            activeOutlineColor="black"
                                            onChangeText={handleChange('discountPercentage')}
                                            placeholderTextColor="grey"
                                            value={values.discountPercentage}
                                            onBlur={handleBlur('discountPercentage')}
                                            autoCapitalize="none"
                                        />
                                        {errors.discountPercentage &&
                                            touched.discountPercentage && (
                                                <Text style={styles.error}>
                                                    {errors.discountPercentage}
                                                </Text>
                                            )}

                                        <TextInput
                                            style={styles.input}
                                            label="Price"
                                            mode="outlined"
                                            activeOutlineColor="black"
                                            onChangeText={handleChange('price')}
                                            placeholderTextColor="grey"
                                            value={values.price}
                                            onBlur={handleBlur('price')}
                                            autoCapitalize="none"
                                        />
                                        {errors.price && touched.price && (
                                            <Text style={styles.error}>{errors.price}</Text>
                                        )}

                                        <TextInput
                                            style={styles.input}
                                            label="Rating"
                                            mode="outlined"
                                            activeOutlineColor="black"
                                            onChangeText={handleChange('rating')}
                                            placeholderTextColor="grey"
                                            value={values.rating}
                                            onBlur={handleBlur('rating')}
                                            autoCapitalize="none"
                                        />
                                        {errors.rating && touched.rating && (
                                            <Text style={styles.error}>{errors.rating}</Text>
                                        )}

                                        <TextInput
                                            style={styles.input}
                                            label="Stock"
                                            mode="outlined"
                                            activeOutlineColor="black"
                                            onChangeText={handleChange('stock')}
                                            placeholderTextColor="grey"
                                            value={values.stock}
                                            onBlur={handleBlur('stock')}
                                            autoCapitalize="none"
                                        />
                                        {errors.stock && touched.stock && (
                                            <Text style={styles.error}>{errors.stock}</Text>
                                        )}

                                        {productData?.images.length > 0 && (
                                            <View>
                                                <Text style={styles.titleInput}>
                                                    Thumbnail<Text style={styles.star}>*</Text>
                                                </Text>

                                                <View style={{ height: 200 }}>
                                                    <Image
                                                        source={{ uri: productData.images[0] }}
                                                        style={{ width: '100%', height: '100%' }}
                                                    />
                                                </View>

                                                <Text style={styles.titleInput}>Images<Text style={styles.star}>*</Text></Text>
                                                <Swiper
                                                    style={{ height: 200 }}
                                                    showsButtons={true}
                                                    loop={true}
                                                >
                                                    {productData?.images.map((item, index) => (
                                                        <View key={index}>
                                                            <Image
                                                                source={{ uri: item }}
                                                                style={{ width: '100%', height: '100%' }}
                                                            />
                                                        </View>
                                                    ))}
                                                </Swiper>
                                            </View>
                                        )}
                                        <View style={{ alignItems: 'center' }}>
                                            <MyButton
                                                title={'Upload Image'}
                                                onPress={() => setIsNestedModal(true)}
                                                disabled={true}
                                            />
                                            {productData?.images?.length === 0 &&
                                                touched.images &&
                                                (
                                                    <Text style={styles.error}>{errors.images}</Text>
                                                )}
                                            <MyButton
                                                title="Add Product"
                                                onPress={() => {
                                                    handleSubmit();
                                                    console.log(Object.keys(errors))
                                                }
                                                }
                                                disabled={true}
                                            />
                                        </View>
                                        <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={isNestedModal}
                                            onRequestClose={closeModal}
                                        >
                                            <View
                                                style={{
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    position: 'relative',
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        height: 150,
                                                        paddingTop: 8,
                                                        backgroundColor: 'rgba(240, 240, 240, 1)',
                                                        borderRadius: 20,
                                                        width: 300,
                                                    }}
                                                >
                                                    <TouchableOpacity
                                                        onPress={closeNestedModal}
                                                        style={{
                                                            position: 'absolute',
                                                            right: -2,
                                                            top: -2,
                                                            backgroundColor: 'black',
                                                            borderRadius: 25,
                                                            zIndex: 2,
                                                        }}
                                                    >
                                                        <Icon name="close" size={20} color="white" />
                                                    </TouchableOpacity>
                                                    <View
                                                        style={{
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        <MyButton
                                                            title={'Choose From Device'}
                                                            onPress={() => {
                                                                handleImagePicker(values);
                                                            }}
                                                            disabled={true}
                                                        />
                                                        <MyButton
                                                            title={'Open Camera'}
                                                            onPress={() => handleImageFromCamera(values)}
                                                            disabled={true}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </Modal>
                                    </View>
                                </ScrollView>
                            </View>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                )}
            </Formik>
        </Modal>
    );
};

export default AddProductModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        padding: 40,
        paddingTop: Platform.OS === 'ios' ? 60 : 20,
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
        marginBottom: 10,
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
        alignSelf: 'flex-start',
        color: 'black',
        fontSize: 16,
        margin: 5
    },
    outline: {

    },
});