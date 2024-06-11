import React, { useState, useEffect ,useCallback } from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import InputLabel from "../UI/InputLabel";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/place";
import { nullValidation } from "../../validation/nullValidation";

const PlaceForm = ({onCreatePlace, mode, place}) => {
    //set a state for title
    const [enteredTitle, setEnteredTitle] = useState();
    //set a state for selected image
    const [selectedImage, setSelectedImage] = useState();
    //set a state for picked location
    const [pickedLocation, setPickedLocation] = useState();

    useEffect(()=>{
        //if mode is edit set states
        if(mode==="edit" && place)
        {
            setEnteredTitle(place.title);
            setSelectedImage(place.imageUri);
            setPickedLocation({
                lat: place.lat,
                lng: place.lng
            });
        }
    },[place]);

    const titleChangeHandler = (enteredText) => {
        setEnteredTitle(enteredText);
    };

    const getImageHandler = (imageUri) => {
        setSelectedImage(imageUri);
    };

    const pickLocationHandler = useCallback((location)=>{
        setPickedLocation(location);
    },[]);

    const savePlaceHandler = () => {
        //check nullidity of states
        const isValid = nullValidation([enteredTitle, selectedImage, pickedLocation]);
        if(isValid)
        {
            //set place data
            let placeData;
            if(mode ==="edit" && place)
            {
                placeData = {
                    id: place.id,
                    title: enteredTitle,
                    imageUri: selectedImage,
                    lat: pickedLocation.lat,
                    lng: pickedLocation.lng
                }
            }
            else
            {
                placeData = new Place(enteredTitle, selectedImage, pickedLocation);
            }
            onCreatePlace(placeData);
        }
        else
        {   
            //show alertbox to user
            Alert.alert(
                "Input Validation",
                "Please enter all values.\n(Title, Photo, Location)",
            );
        }
    };

    //return jsx
    return (
        <View style={styles.container}>
            <InputLabel text="Title" />
            <View style={styles.inputContainer}>
                <Ionicons 
                    style={styles.inputIcon}
                    name="document" 
                    size={25} 
                    color={Colors.gold} 
                />
                <TextInput 
                    style={styles.textInput} 
                    onChangeText={titleChangeHandler}
                    value={enteredTitle}
                    placeholder="Enter Title" 
                    placeholderTextColor={Colors.gold} 
                />
            </View>
            <InputLabel text="Photo" />
            <ImagePicker 
                getImage={getImageHandler} 
                mode="edit" 
                imageUri={mode === "edit" ? (place && place.imageUri) : null}
            />
            <InputLabel text="Location" />
            <LocationPicker 
                onPickLocation={pickLocationHandler} 
                mode={mode}
                location={mode === "edit" ? (place && {lat: place.lat, lng: place.lng}) : null
            }
            />
            <Button 
                text={mode === "edit" ? (place && "Edit Place") : "Add Place"}
                onPress={savePlaceHandler}
            />
        </View>
    );
};

export default PlaceForm;

//define styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        overflow: "scroll",
    },
    inputContainer: {
        flexDirection: "row",
        width: "80%",
        height: 60,
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 2,
        borderColor: Colors.white,
    },
    inputIcon: {
        marginLeft: 10,
        marginRight: 20
    },
    textInput: {
        width: "90%",
        backgroundColor: "transparent",
        fontSize: 16,
        color: Colors.gold
    }
});
