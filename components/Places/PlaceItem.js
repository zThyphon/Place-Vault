import { 
    Pressable, 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    Alert, 
} from "react-native";
import { Colors } from "../../constants/Colors";
import IconButton from "../UI/IconButton";
import { deletePlace } from "../../util/database";
import * as Sharing from "expo-sharing";

const PlaceItem = ({ place, onSelect, navigationHandler }) => {

    const deletePlaceHandler = async() => {
        //get place title
        const placeTitle = place.title;

        //show an confirmation dialog to user
        Alert.alert(
            "Delete Confirmation",
            `Are you sure you want to delete the item with title ${placeTitle}`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => deleteSelectedPlace(place.id),
                    style: "destructive",
                },
            ],
            {cancelable: true},
        );

        const deleteSelectedPlace = async(id) =>{
            //delete place from database
            await deletePlace(id);
            navigationHandler();
        };
    };

    const sharePlaceHandler = async () => {
        //set image options
        const fileExtension = place.imageUri.split(".").pop();
        let mimeType = "image/jpeg"; 
        let uti = "public.jpeg";
    
        if (fileExtension === "png") {
          mimeType = "image/png";
          uti = "public.png";
        }

        try 
        {
            //set message
            const message = `${place.title}\n${place.address}`
            //share
            await Sharing.shareAsync(place.imageUri, {
              dialogTitle: place.title,
              mimeType: "image/jpeg", // Adjust MIME type based on your image type
              UTI: "public.jpeg", // Uniform Type Identifier for JPEG
              message
            });
        } 
        catch (error) 
        {
            throw error;
        }
    };

    // return jsx
    return (
        <Pressable 
            style={({ pressed }) => [styles.item, pressed && styles.pressed]} 
            onPress={onSelect.bind(this, place.id)}
        >
            <Image 
                style={styles.image}
                source={{ uri: place.imageUri }}
                resizeMode="cover"
            />
            <View style={styles.details}>
                <Text style={styles.title}>{place.title}</Text>
                <Text style={styles.address}>{place.address}</Text>
                <View style={styles.actions}>
                    <IconButton icon="share-social" onPress={sharePlaceHandler} />
                    <IconButton icon="trash-sharp" onPress={deletePlaceHandler} />
                </View>
            </View>
        </Pressable>
    );
};

export default PlaceItem;

//define styles
const styles = StyleSheet.create({
    item: {
        width: "90%",
        minHeight: 110,
        maxHeight: 200,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.darkGray,
        borderColor: Colors.orange,
        borderWidth: 3,
        borderRadius: 3,
        margin: 10,
    },
    pressed: {
        opacity: 0.6,
    },
    image: {
        width: "30%",
        height: "100%",
        backgroundColor: Colors.white,
        borderRadius: 3,
    },
    details: {
        flex: 1,
        height: "100%",
        margin: 5,
        justifyContent: "center",
        paddingHorizontal: 10,
        overflow: "hidden",
    },
    title: {
        fontSize: 16,
        color: Colors.gold,
        textAlign: "center",
        marginBottom: 5,
    },
    address: {
        fontSize: 12,
        color: Colors.white,
        textAlign: "center",
        overflow: "hidden"
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    }
});
