import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getCartData } from '../../services/storage';

const WishList = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [usersData, setUsersData] = useState([]);

  const fetchData = async () => {
    const userData = await getCartData('users');
    const actualData = await JSON.parse(userData.data);
    setUsersData(actualData);
  };

  // For Async Storage
  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      fetchData();
    }, [])
  );

  useEffect(() => {
    let timer;
    if (usersData.length > 0) {
      timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [usersData]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          usersData.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text>
                {index + 1}. {item.first_name}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
