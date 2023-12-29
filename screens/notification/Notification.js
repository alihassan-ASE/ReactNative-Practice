import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Notifications = ()=>{
    return (
        <View style={styles.container}>
        <Text style={styles.font}>Hello in Notifications Screen</Text>
        </View>
    );
}

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
})

export default Notifications;
