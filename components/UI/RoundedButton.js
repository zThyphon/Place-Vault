import { Pressable, View, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const RoundedButton = ({icon, onPress, navigator}) => {
    return (
        <Pressable 
            style={({pressed})=>
                [
                    navigator==="noPlace" ? styles.absoluteContainer : styles.container, 
                    pressed && styles.pressed]}
            onPress={onPress}
        >
            <Ionicons 
                style={styles.icon} 
                name={icon}
                color={Colors.white} 
            />
        </Pressable>
    );
};

export default RoundedButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.darkBlue,
        width: 80,
        height: 80,
        borderRadius: 40,
        marginTop: 20,
        alignSelf: "flex-end",
        bottom: 15,
        right: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    absoluteContainer: {
        backgroundColor: Colors.darkBlue,
        width: 80,
        height: 80,
        borderRadius: 40,
        position: "absolute",  
        bottom: 15,            
        right: 15,             
        justifyContent: "center", 
        alignItems: "center"    
    },
    pressed: {
        opacity: 0.75,
    },
    icon: {
        fontSize: 30,
        fontWeight: "bold",
        color: Colors.gold
    }
});