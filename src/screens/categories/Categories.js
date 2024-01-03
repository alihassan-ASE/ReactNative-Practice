import React, { useState } from 'react';
import { TextInput, Text, Button, View, StyleSheet, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { postData } from '../../services/apicalls';
import { fetchUsersData } from '../../redux/action';

const Categories = ({ navigation }) => {
    const [information, setInformation] = useState({ first_name: '', email: '', last_name: '', gender: '' });
    const [errors, setErrors] = useState({ first_name: '', email: '', last_name: '', gender: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    const handleNext = () => {
        const newErrors = { first_name: '', email: '', last_name: '', gender: '' };

        if (information.first_name === '') {
            newErrors.first_name = 'Please enter your First Name';
        }

        if (information.last_name === '') {
            newErrors.last_name = 'Please enter your Last Name';
        }

        if (information.email === '') {
            newErrors.email = 'Please enter your Email';
        }

        if (information.gender === '') {
            newErrors.gender = 'Please enter your Gender';
        }

        if (newErrors.first_name !== '' || newErrors.email !== '' || newErrors.last_name !== '' || newErrors.gender !== '') {
            setErrors(newErrors);
        } else {
            setErrors({ first_name: '', email: '', gender: '', last_name: '' });
            setIsModalOpen(true);
        }
    };

    const handleModalYes = async () => {
        setIsModalOpen(false);
        await postData(information);
        dispatch(fetchUsersData());
        setInformation({
            first_name: '', email: '', last_name: '', gender: '' 
        })
        // navigation.navigate('Wishlist');
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
                    value={information.first_name}
                    onChangeText={(text) => {
                        setInformation({ ...information, first_name: text });
                        setErrors({ ...errors, first_name: '' });
                    }}
                    placeholder='First Name'
                    style={styles.textInput}
                />
                {errors.first_name !== '' && <Text style={styles.errorText}>{errors.first_name}</Text>}

                <TextInput
                    value={information.last_name}
                    onChangeText={(text) => {
                        setInformation({ ...information, last_name: text });
                        setErrors({ ...errors, last_name: '' });
                    }}
                    placeholder='Last Name'
                    style={styles.textInput}
                />
                {errors.last_name !== '' && <Text style={styles.errorText}>{errors.last_name}</Text>}

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

                <TextInput
                    value={information.gender}
                    onChangeText={(text) => {
                        setInformation({ ...information, gender: text });
                        setErrors({ ...errors, gender: '' });
                    }}
                    placeholder='Gender'
                    style={styles.textInput}
                />
                {errors.gender !== '' && <Text style={styles.errorText}>{errors.gender}</Text>}

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