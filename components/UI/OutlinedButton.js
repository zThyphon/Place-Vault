import { Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const OutlinedButton = ({text, icon, onPress}) => {
    return (
        <Pressable 
            style={styles.buttonContainer}
            onPress={onPress}
        >
            <Ionicons 
                style={styles.buttonIcon}
                name={icon} 
                size={24} 
                color={Colors.gold}
            />

            <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
    );
};

export default OutlinedButton;

const styles = StyleSheet.create({
    buttonContainer: {
        width: 160,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 7,
        backgroundColor: Colors.darkGray,
        borderColor: Colors.gold,
        borderWidth: 2,
        borderRadius: 5
    },
    buttonIcon: {
        marginHorizontal: 5,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 14
    }
});