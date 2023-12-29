import React, { useState } from 'react';
import { TextInput, Text, Button, View, StyleSheet, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { userCredentials } from '../../redux/action';

const Categories = ({ navigation }) => {
    const [information, setInformation] = useState({ name: '', email: '' });
    const [errors, setErrors] = useState({ name: '', email: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    const handleNext = () => {
        const newErrors = { name: '', email: '' };

        if (information.name === '') {
            newErrors.name = 'Please enter your name';
        }

        if (information.email === '') {
            newErrors.email = 'Please enter your email';
        }

        if (newErrors.name !== '' || newErrors.email !== '') {
            setErrors(newErrors);
        } else {
            setErrors({ name: '', email: '' });
            setIsModalOpen(true);
        }
    };

    const handleModalYes = () => {
        setIsModalOpen(false);
        navigation.navigate('Wishlist', { information });
    };

    const handleModalNo = () => {
        setIsModalOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>User Information</Text>
                <TextInput
                    value={information.name}
                    onChangeText={(text) => {
                        setInformation({ ...information, name: text });
                        setErrors({ ...errors, name: '' });
                    }}
                    placeholder='Full Name'
                    style={styles.textInput}
                />
                {errors.name !== '' && <Text style={styles.errorText}>{errors.name}</Text>}

                <TextInput
                    value={information.email}
                    onChangeText={(text) => {
                        setInformation({ ...information, email: text });
                        setErrors({ ...errors, email: '' });
                    }}
                    placeholder='Email'
                    style={styles.textInput}
                />
                {errors.email !== '' && <Text style={styles.errorText}>{errors.email}</Text>}

                <View style={styles.buttonContainer}>
                    <Button title='Next' onPress={handleNext} />
                </View>

                <Modal visible={isModalOpen} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <Text style={styles.text}>Are you sure to login?</Text>
                        <View style={styles.btn}>
                            <Button title="Yes" onPress={handleModalYes} />
                            <Button title="No" onPress={handleModalNo} />
                        </View>
                    </View>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: '700',
        color: 'black',
        padding: 20,
    },
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        width: 300,
        marginVertical: 10,
    },
    errorText: {
        color: 'red',
        textAlign: 'left',
    },
    buttonContainer: {
        marginVertical: 10,
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        width: 300,
        height: 200,
    },
    btn: {
        flexDirection: 'row',
        margin: 10,
        gap: 10,
    },
    text: {
        fontSize: 18,
        color: 'black',
    },
});

export default Categories;