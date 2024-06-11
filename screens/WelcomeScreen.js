import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import * as Font from "expo-font";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Colors } from "../constants/Colors";
import * as SplashScreen from "expo-splash-screen";

//Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const WelcomeScreen = ({ navigation }) => {
    //set a state for monitoring font loading status
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        //load fonts
        const loadFonts = async () => {
            await Font.loadAsync({
                "Parisienne-Regular": require("../assets/fonts/Parisienne-Regular.ttf"),
                "DancingScript-Bold": require("../assets/fonts/DancingScript-Bold.ttf"),
            });
            setFontsLoaded(true);
            SplashScreen.hideAsync(); //Hide the splash screen once fonts are loaded
        };

        loadFonts();

        //Set a timer for showing welcome screen in 3 seconds
        const timer = setTimeout(() => {
            navigation.replace("AllPlaces");
        }, 3000);

        //Clean up the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [navigation]);

    if (!fontsLoaded) {
        return null; //Render nothing while loading fonts
    }

    //render welcome screen jsx
    return (
        <View style={styles.container}>
            <View style={styles.imageBox}>
                <Image 
                    style={styles.image}
                    source={require("../assets/icons/mainIcon.png")}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.appText}>Place Vault</Text>
            <Text style={styles.informationText}>
                by
                <Text style={styles.authorText}> zThyphon</Text>
            </Text>
        </View>
    );
};

//define styles
const styles = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.lightBlue,
    },
    imageBox: {
        width: "80%",
        height: "40%",
        margin: "20%",
    },
    image: {
        height: "100%",
        width: "100%",
    },
    appText: {
        fontFamily: "DancingScript-Bold",
        color: Colors.white,
        fontSize: RFPercentage(4),
    },
    informationText: {
        fontFamily: "Parisienne-Regular",
        color: Colors.white,
        fontSize: RFPercentage(4),
    },
    authorText: {
        color: Colors.gold,
    },
};

export default WelcomeScreen;
