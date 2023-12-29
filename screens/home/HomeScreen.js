import React from "react";
import { View, Button, FlatList } from "react-native";
import CardItem from "../../components/cardItems";

function HomeScreen({ navigation }) {
  const data = [
    {
      title: 'Samsung S21 Ultra',
      images: [
        require('../../assets/images/samsung1.jpg'),
        require('../../assets/images/samsung2.jpg'),
      ]
    },
    {
      title: 'Samsung A12',
      images: [
        require('../../assets/images/samsung2.jpg'),
        require('../../assets/images/samsung1.jpg'),
      ]
    },
    {
      title: 'Headphone Pro',
      images: [
        require('../../assets/images/headphone1.jpg'),
        require('../../assets/images/samsung2.jpg'),
      ]
    }
  ];

  return (
    <View>
      <Button
        onPress={() => navigation.navigate('Notification')}
        title="Go to notifications"
      />
      <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <CardItem title={item.title} images={item.images} />
        )}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        horizontal={true}
      />
      </View>
    </View>
  );
}

export default HomeScreen;