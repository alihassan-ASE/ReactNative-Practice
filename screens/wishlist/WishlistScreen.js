import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getData } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';

const WishList = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const moviesData = useSelector(state => state.data);
  

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      dispatch(getData());
    }, [dispatch])
  );

  useEffect(() => {
    let timer;
    if (moviesData.length > 0) {
      timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [moviesData]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        moviesData.map((item) => (
          item.movies.map((movie) => (
            <View key={movie.id}>
              <Text>
                {movie.id}. {movie.title} {movie.releaseYear}
              </Text>
            </View>
          ))
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  font: {
    fontSize: 25,
    color: 'black'
  }
});

export default WishList;
