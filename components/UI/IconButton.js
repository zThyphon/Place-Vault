import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

const IconButton = ({icon, onPress}) => {
    return (
        <Pressable 
            style={({pressed})=>[styles.button, pressed && styles.pressed]}
            onPress={onPress}
        > 
            <Ionicons 
                name={icon} 
                size={24} 
                color={Colors.gold} 
            />
        </Pressable>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    button: {
        padding: 8,
        justifyContent: "center",
        alignItems: "center",
        margin: 10
    },
    pressed: {
        opacity: 0.7
    }
});