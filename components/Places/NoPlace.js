import { Fragment } from "react";
import { Image, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { RFPercentage } from "react-native-responsive-fontsize";

const NoPlace = () => {
    //return jsx
    return (
        <Fragment>
            <Image 
                style={styles.image}
                source={require("../../assets/icons/noPlace.png")}
                resizeMode="contain"
            />
            <Text style={styles.text}>No Place Added Yet</Text>
        </Fragment>
    );
};

export default NoPlace;

//define styles
const styles = StyleSheet.create({
    image: {
        height: 200,
    },
    text: {
        fontSize: RFPercentage(2.7),
        color: Colors.white,
        margin: "10%"
    }
});