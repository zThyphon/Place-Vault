import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import RoundedButton from "../UI/RoundedButton";
import { useNavigation } from "@react-navigation/native";
import NoPlace from "./NoPlace";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/Colors";
import { Fragment } from "react";

const PlacesList = ({places, navigationHandler}) => {
    //get navigation with using useNavigation hook
    const navigation = useNavigation();

    const addPlaceHandler = () => {
        //navigate to add place screen
        navigation.navigate("AddPlace");
    };

    const selectPlaceHandler = (id) => {
        //redirect to edit place screen with corresponding id
        navigation.navigate("EditPlace", {
            placeId: id
        });

    };

    //If no place show no place component
    if(!places || places.length === 0)
    {
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <NoPlace />
                </View>
                <RoundedButton 
                        icon="add" 
                        onPress={addPlaceHandler}
                        navigator="noPlace"
                />
            </View>
        );
    }

    //return place list
    return (
        <Fragment>
            <FlatList 
                contentContainerStyle={styles.list}
                data={places}
                keyExtractor={(item)=>item.id}
                renderItem={({ item }) => (
                    <PlaceItem 
                        place={item} 
                        onSelect={selectPlaceHandler} 
                        navigationHandler={navigationHandler}
                    />
                )}/>
            <RoundedButton icon="add" onPress={addPlaceHandler}/>
        </Fragment>
    );
};

export default PlacesList;

//define styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    innerContainer: {
        width: "90%",
        height: "30%",
        justifyContent: "center",
        alignItems: "center",
    },
    list: {
        flexGrow: 1,
        margin: 24,
        padding: 20,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        elevation: 7,
        backgroundColor: Colors.darkGray,
    }
});