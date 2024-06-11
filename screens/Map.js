import { Alert, StyleSheet } from "react-native";
import { useCallback, useState, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const Map = ({ navigation, route }) => {
  /*get initial lattitude, longitude and mode if exists
  mode has two options edit and add*/ 
  const { initialLat, initialLng, mode } = route.params || {};
  //set location if initialLat and initialLng exists
  const initialLocation = initialLat != null && initialLng != null ? { lat: initialLat, lng: initialLng } : null;
  //set a state for monitoring selectedLocation
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  //define map starting point options
  const region = {
    latitude: initialLocation ? initialLocation.lat : 41.01,
    longitude: initialLocation ? initialLocation.lng : 29.00,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  //get user current location (requires native device location access)
  const selectLocationHandler = (event) => {
    //get current location latitude
    const lat = event.nativeEvent.coordinate.latitude;
    //get current location longitude
    const lng = event.nativeEvent.coordinate.longitude;
    //assign selected location
    setSelectedLocation({ lat, lng });
  };

  const savePickedLocationHandler = useCallback(() => {
    //if location is not selected show an alertbox
    if (!selectedLocation) {
      Alert.alert(
        "No Location Picked!",
        "You have to pick a location (by tapping on the map) first!"
      );
      return;
    }

    //get target screen according to mode prop
    const targetScreen = mode === "edit" ? "EditPlace" : "AddPlace";
    //navigate to corresponding screen with pickedLat and pickedLng values
    navigation.navigate(targetScreen, {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
      navigatorScreen: "map"
    });
  }, [navigation, selectedLocation, mode]);

  useLayoutEffect(() => {
    //define navigation options
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="save"
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);


  //return map jsx
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
      provider={PROVIDER_GOOGLE}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

//define styles
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
