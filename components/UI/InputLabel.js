import { Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { RFPercentage } from "react-native-responsive-fontsize";

const InputLabel = ({text}) =>{
    return <Text style={styles.text}>{text}</Text>
};

export default InputLabel;

const styles = StyleSheet.create({
    text: {
        color: Colors.white,
        fontFamily: "DancingScript-Bold",
        textAlign: "center",
        margin: 1,
        fontSize: RFPercentage(3.5),  
    }
});