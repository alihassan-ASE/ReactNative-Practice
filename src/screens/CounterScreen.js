import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MyButton from '../components/MyButton';
import {useDispatch, useSelector} from 'react-redux';
import {decrement, increment} from '../redux/features/CounterSlice';

const CounterScreen = () => {
  // hooks
  const dispatch = useDispatch();
  console.log('Hello')
  const count = useSelector(state => state.counter.Value);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{count}</Text>
      <MyButton title="Add" onPress={() => dispatch(increment())} />
      <MyButton title="Minus" onPress={() => dispatch(decrement())} />
    </View>
  );
};

export default CounterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%',
    gap: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
});
