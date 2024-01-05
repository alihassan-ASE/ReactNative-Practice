import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Formik } from 'formik';
import MyButton from '../components/MyButton';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/features/AuthSlice';

const Login = () => {
  // hooks
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

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
      <View style={styles.container}>
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
              {errors.email && <Text style={styles.error}>{errors.email}</Text>}
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
              <MyButton
                isLoading={isLoading}
                title="Login"
                onPress={handleSubmit}
                disabled={Object.keys(errors).length > 0 ? false: true}
              />
            </>
          )}
        </Formik>
      </View>
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
    borderRadius: 25,
    borderColor: 'coral',
    paddingHorizontal: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
