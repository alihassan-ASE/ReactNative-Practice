import {ActivityIndicator, Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

const MyButton = ({title, onPress, isLoading, disabled}) => {
  return (
    <Pressable onPress={onPress} style={disabled ? styles.container : styles.disabledButton}>
      <Text style={styles.title}>{title}</Text>
      {isLoading && <ActivityIndicator size="small" color={'white'} />}
    </Pressable>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightcoral',
    borderRadius: 25,
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 15,
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  disabledButton: {
    backgroundColor: 'gray',
    borderRadius: 25,
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 15,
    textAlign: 'center',
  },
});
