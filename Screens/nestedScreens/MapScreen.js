import React from "react";
import {View, StyleSheet} from "react-native";
import MapView, {Marker} from 'react-native-maps';

export const MapScreen = ({route}) => {
    console.log("route.params.location", route.params.location);
    const {latitude, longitude} = route.params.location.coords
    return (
        <View style={styles.container}>
            <MapView style={{flex: 1}} initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}>
                <Marker coordinate={{latitude, longitude}}/>
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});