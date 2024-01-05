// import React, {useState} from 'react';
// import { Image, Text, View, TouchableOpacity, Modal, ScrollView, TextInput, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons'
// import MyButton from './MyButton';
// import ImagePicker from 'react-native-image-picker';


// const ModalToAdd = ({isModalVisible, setIsModalVisible, handleAddProduct}) => {
//     const [productData, setProductData] = useState({
//         brand: '',
//         category: '',
//         description: '',
//         discountPercentage: 0,
//         id: 0,
//         images: [],
//         price: 0,
//         rating: 0,
//         stock: 0,
//         thumbnail: '',
//         title: '',
//     });

//     const closeModal = () => {
//         setIsModalVisible(false);
//     }

//     const handleImagePicker = () => {
//         ImagePicker.showImagePicker();
//     }

//     return (
//         <Modal
//         animationType="slide"
//         transparent={false}
//         visible={isModalVisible}
//         onRequestClose={closeModal}
//       >
//         <ScrollView 
//         showsVerticalScrollIndicator={false}
        
//         >
//           <View style={styles.modalContainer}>
//             <TouchableOpacity onPress={closeModal}>
//               <Icon name="close" size={24} color="black" />
//             </TouchableOpacity>
//             <Text style={styles.modalTitle}>Add New Product</Text>

//             <Text style={{ alignSelf: 'flex-start' }}>Title*</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Title"
//               value={productData?.title}
//               onChangeText={(text) => setProductData({ ...productData, title: text })}
//             />

//             <Text style={{ alignSelf: 'flex-start' }}>Category*</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Category"
//               value={productData?.category}
//               onChangeText={(text) => setProductData({ ...productData, category: text })}
//             />

//             <Text style={{ alignSelf: 'flex-start' }}>Category*</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Category"
//               value={productData?.category}
//               onChangeText={(text) => setProductData({ ...productData, category: text })}
//             />
        
//             <Text style={{ alignSelf: 'flex-start' }}>Brand*</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Brand"
//               value={productData?.brand}
//               onChangeText={(text) => setProductData({ ...productData, brand: text })}
//             />

//             <Text style={{ alignSelf: 'flex-start' }}>Desciprtion*</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Description"
//               value={productData?.description}
//               onChangeText={(text) => setProductData({ ...productData, description: text })}
//             />

//             <Text style={{ alignSelf: 'flex-start' }}>Discount Percentage*</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Discount Percentage"
//               value={productData?.discountPercentage}
//               onChangeText={(text) => setProductData({ ...productData, discountPercentage: text })}
//             />

//             <Text style={{ alignSelf: 'flex-start' }}>Price*</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Price"
//               value={productData?.price}
//               onChangeText={(text) => setProductData({ ...productData, price: text })}
//             />

//             <Text style={{ alignSelf: 'flex-start' }}>Rating*</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Rating"
//               value={productData?.rating}
//               onChangeText={(text) => setProductData({ ...productData, rating: text })}
//             />

//             <Text style={{ alignSelf: 'flex-start' }}>Stock*</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Stock"
//               value={productData?.stock}
//               onChangeText={(text) => setProductData({ ...productData, stock: text })}
//             />

//             <Text style={{ alignSelf: 'flex-start' }}>Thumbnail*</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Thumbnail"
//               value={productData?.thumbnail}
//               onChangeText={(text) => setProductData({ ...productData, thumbnail: text })}
//             />
//             <MyButton title={'Pick Image'} onPress={handleImagePicker} disabled={true} />
//             {productData.images.map((image, index) => (
//               <Image key={index} source={{ uri: image }} style={styles.imagePreview} />
//             ))}
//             <MyButton title="Add Product" onPress={handleAddProduct} disabled={true} />
//           </View>
//         </ScrollView>
//       </Modal>
//     )

// }

// const styles = StyleSheet.create ({
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 40,
//       },
//       modalTitle: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//       },
//       input: {
//         height: 40,
//         width: '100%',
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 10,
//         paddingHorizontal: 10,
//       },
//       imagePreview: {
//         width: 50,
//         height: 50,
//         marginBottom: 10,
//       },
// })

// export default ModalToAdd;