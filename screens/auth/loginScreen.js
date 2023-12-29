import React, { useState } from 'react';
import { TextInput, Text, Button, View, StyleSheet, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { userCredentials } from '../../redux/action';

const LoginScreen = ({ navigation }) => {
    const [information, setInformation] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    const handleNext = () => {
        const newErrors = { email: '', password: '' };

        if (information.email === '') {
            newErrors.name = 'Please enter your email';
        }

        if (information.password === '') {
            newErrors.email = 'Please enter your password';
        }

        if (newErrors.email !== '' || newErrors.password !== '') {
            setErrors(newErrors);
        } else {
            setErrors({ email: '', password: '' });
            setIsModalOpen(true);
        }
    };

    const handleModalYes = () => {
        setIsModalOpen(false);
        dispatch(userCredentials(information));
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
                <Text style={styles.title}>Login Information</Text>
                <TextInput
                    value={information.email}
                    onChangeText={(text) => {
                        setInformation({ ...information, email: text });
                        setErrors({ ...errors, email: '' });
                    }}
                    placeholder='Your Email'
                    style={styles.textInput}
                />
                {errors.email !== '' && <Text style={styles.errorText}>{errors.email}</Text>}

                <TextInput
                    value={information.password}
                    onChangeText={(text) => {
                        setInformation({ ...information, password: text });
                        setErrors({ ...errors, password: '' });
                    }}
                    placeholder='Your password'
                    style={styles.textInput}
                    secureTextEntry={true}
                />
                {errors.password !== '' && <Text style={styles.errorText}>{errors.password}</Text>}

                <View style={styles.buttonContainer}>
                    <Button title='Login' onPress={handleNext} />
                </View>

                <Modal style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} visible={isModalOpen} transparent animationType="slide">
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
        borderRadius: 4,
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

export default LoginScreen;