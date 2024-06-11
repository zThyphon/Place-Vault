import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Image, BackHandler } from "react-native";
import { Colors } from "../../constants/Colors";
import OutlinedButton from "../UI/OutlinedButton";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import { getAddress, getMapPreview } from "../../util/location";

const LocationPicker = ({ onPickLocation, location, mode }) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [processedLocation, setProcessedLocation] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

  useEffect(() => {
    if (location) {
      setPickedLocation(location);
    }
  }, [location]);

  useEffect(() => {
    try
    {
      if (isFocused && route.params) {
        //get pickedLat and picked Lng
        const { pickedLat, pickedLng } = route.params;
        if (pickedLat !== undefined && pickedLng !== undefined) {
          //set map picked location
          const mapPickedLocation = {
            lat: pickedLat,
            lng: pickedLng,
          };
          setPickedLocation(mapPickedLocation);
        }
      }
    }
    catch(error)
    {
      throw error;
    }
  }, [route, isFocused]);

  useEffect(() => {
    const locationHandler = async () => {
      try
      {
        if (pickedLocation && !processedLocation) {
          //set on pick location
          const lat = parseFloat(pickedLocation.lat);
          const lng = parseFloat(pickedLocation.lng);
          const address = await getAddress(lat, lng);
          onPickLocation({ ...pickedLocation, address });
          setProcessedLocation(true);
        }
      }
      catch(error)
      {
        throw error;
      }
    };
    locationHandler();
  }, [pickedLocation, processedLocation, onPickLocation]);

  //verify the location access from native device
  const verifyPermissions = async () => {
    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Access Denied",
        "You need to grant location permissions to use this app"
      );
      return false;
    }

    return true;
  };

  const locateUserHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    //get currenct location of the user
    const location = await getCurrentPositionAsync();
    const lat = location.coords.latitude;
    const lng = location.coords.longitude;

    setPickedLocation({lat,lng});
    //set target screen
    const targetScreen = mode === "edit" ? "EditPlace": "AddPlace";
    //navigate to target screen with corresponding parameters
    navigation.navigate(targetScreen,{
      pickedLat: parseFloat(lat),
      pickedLng: parseFloat(lng),
      navigatorScreen: "map"
    });
  };

  const addLocationHandler = () => {
    //navigate to map screen
    navigation.navigate("Map", {
      mode: mode
    });
  };

  //set location preview
  let locationPreview = <Text style={styles.noLocationText}>No Location Added Yet</Text>;
  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.mapView}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

  //return jsx
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        {locationPreview}
      </View>
      <View style={styles.actions}>
        <OutlinedButton
          text="Locate Me"
          icon="location"
          onPress={locateUserHandler}
        />
        <OutlinedButton
          text="Add Location"
          icon="map"
          onPress={addLocationHandler}
        />
      </View>
    </View>
  );
};

export default LocationPicker;

//define styles
const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "90%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.darkGray,
    margin: 10,
    borderWidth: 3,
    borderColor: Colors.gold,
    overflow: "hidden"
  },
  actions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  noLocationText: {
    fontSize: 14,
    color: Colors.white
  },
  mapView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});
