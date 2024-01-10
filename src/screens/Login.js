import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Button } from 'react-native';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/features/AuthSlice';
import { ActivityIndicator } from 'react-native-paper';

const Login = () => {
  // hooks
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  // functions
  const handlingLogin = (values) => {
    const params = {
      username: values.email,
      password: values.password,
    };
    dispatch(login(params));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handlingLogin}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Email is required';
            }
            if (!values.password) {
              errors.password = 'Password is required';
            }
            if (values.email.trim() !== '') {
              setCredentials({
                ...credentials,
                email: values.email,
              })
            }
            if (values.password.trim() !== '') {
              setCredentials({
                ...credentials,
                password: values.password,
              })
            }
            return errors;
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <TextInput
                value={values.email}
                placeholder="Enter Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                style={styles.input}
                placeholderTextColor="grey"
                autoCapitalize="none"
              />
              {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}
              <TextInput
                value={values.password}
                secureTextEntry={true}
                placeholder="Enter Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                style={styles.input}
                placeholderTextColor="grey"
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
              {isError && <Text style={{color: 'red'}}>Invalid Credentials</Text>}

              <View style={styles.btn}>
                <Button
                  title='Login'
                  isLoading={isLoading}
                  onPress={handleSubmit}
                  disabled={!(values.email && values.password)}
                  color='white'
                />
                {isLoading && <ActivityIndicator size="small" color={'white'} />}
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 36,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    height: 45,
    width: '90%',
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'coral',
    paddingHorizontal: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  btn: {
    backgroundColor: 'coral',
    width: '50%',
    borderRadius: 15,
    margin: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
