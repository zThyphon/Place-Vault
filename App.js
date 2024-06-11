import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, BackHandler } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import AllPlaces from "./screens/AllPlaces";
import { Colors } from "./constants/Colors";
import HeaderIcon from "./components/UI/HeaderIcon";
import AddPlace from "./screens/AddPlace";
import Map from "./screens/Map";
import { init } from "./util/database";
import * as SplashScreen from "expo-splash-screen";
import EditPlace from "./screens/EditPlace";
import * as Network from "expo-network";

//Hide splash screen when app is ready
SplashScreen.preventAutoHideAsync();

//Define stack navigator for navigating between screens
const Stack = createNativeStackNavigator();

export const App = () => {
    //set a state for monitoring db initializing status
    const [dbInitialized, setDbInitialized] = useState(true);

    useEffect(() => {
        //Chech network connection exists or not
        const checkNetwork = async () => {
            //get network status
            const networkState = await Network.getNetworkStateAsync();
            //check network status
            if (!networkState.isConnected) {
                /*show an alert to user if user 
                don't have an network conenction*/
                showAlert();
            }
        };

        checkNetwork();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            //initialize the database
            await init();
        };

        try 
        {
            fetchData();
            SplashScreen.hideAsync();
        } 
        catch (error) {
            /*set db initialized status to false for 
            changing application content */
            setDbInitialized(false);
        }
    }, [dbInitialized]);

    const showAlert = () => {
        // Show alertbox
        Alert.alert(
            "Connection Failed",
            "This application requires an internet connection. \nPlease check your internet connection and try again.",
            [{ text: "OK", onPress: () => BackHandler.exitApp() }],
            { cancelable: false }
        );
    };

    //Return jsx element (navigation and screens)
    return (
        <React.Fragment>
            <StatusBar style="dark" />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: { backgroundColor: Colors.darkBlue },
                        headerTintColor: Colors.gold,
                        headerTitleAlign: "center",
                        contentStyle: { backgroundColor: Colors.lightBlue }
                    }}
                >
                    <Stack.Screen
                        name="Welcome"
                        component={WelcomeScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="AllPlaces"
                        component={AllPlaces}
                        options={{
                            title: "Places",
                            headerBackVisible: false,
                            headerLeft: () => {
                                return (
                                    <HeaderIcon
                                        image={require("./assets/icons/place.png")}
                                    />
                                );
                            },
                            headerRight: () => {
                                return (
                                    <HeaderIcon
                                        image={require("./assets/icons/place.png")}
                                    />
                                );
                            }
                        }}
                    />
                    <Stack.Screen
                        name="AddPlace"
                        component={AddPlace}
                        options={{
                            title: "Add Place",
                            headerRight: () => {
                                return (
                                    <HeaderIcon
                                        image={require("./assets/icons/addPlace.png")}
                                    />
                                );
                            }
                        }}
                    />
                    <Stack.Screen
                        name="EditPlace"
                        component={EditPlace}
                        options={{
                            title: "Edit Place",
                            headerRight: () => {
                                return (
                                    <HeaderIcon
                                        image={require("./assets/icons/editPlace.png")}
                                    />
                                );
                            }
                        }}
                    />
                    <Stack.Screen
                        name="Map"
                        component={Map}
                        options={{
                            title: "Map",
                            headerRight: () => {
                                return (
                                    <HeaderIcon
                                        image={require("./assets/icons/map.jpg")}
                                    />
                                );
                            }
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </React.Fragment>
    );
};

export default App;
