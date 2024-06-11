import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import { MediaTypeOptions, launchImageLibraryAsync, useMediaLibraryPermissions, PermissionStatus } from "expo-image-picker";
import { Colors } from "../../constants/Colors";
import OutlinedButton from "../UI/OutlinedButton";

const ImagePicker = ({ getImage, imageUri }) => {
    const [pickedImage, setPickedImage] = useState(null);
    const [mediaPermissionInformation, requestPermission] = useMediaLibraryPermissions();

    //verify permission to gallery access of the native device
    const verifyPermissions = async () => {
        if (mediaPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if (mediaPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                "Access Denied",
                "You need to grant media permissions to use this app"
            );
            return false;
        }

        return true;
    };

    const addPhotoHandler = async () => {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        //set image options
        const image = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5
        });

        if (!image.canceled) {
            const imageUri = image.assets[0].uri;
            setPickedImage(imageUri);
            getImage(imageUri);
        }
    };

    useEffect(() => {
        if (imageUri) {
            setPickedImage(imageUri);
        }
    }, [imageUri]);

    //define image preview
    let imagePreview = <Text style={styles.noPhotoText}>No Photo Added Yet</Text>;

    if (pickedImage) {
        imagePreview = (
            <Image
                style={styles.image}
                source={{ uri:pickedImage}}
            />
        );
    }

    //return jsx
    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                {imagePreview}
            </View>
            <OutlinedButton
                text="Add Photo"
                icon="camera"
                onPress={addPhotoHandler}
            />
        </View>
    );
};

export default ImagePicker;

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
    noPhotoText: {
        fontSize: 14,
        color: Colors.white
    },
    image: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
});
