import React, { useState, useEffect } from "react";
import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/database";
import { useIsFocused } from "@react-navigation/native";

const AllPlaces = () => {
    //set a state for monitoring loaded places
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    //set a state for monitoring navigation status
    const [isNavigated, setIsNavigated] = useState(false);
    //get screen is focused status with using useIsFocused hook
    const isFocused = useIsFocused();

    const navigationHandler = () => {
        setIsNavigated(!isNavigated);
    };

    useEffect(() => {
        //get loaded places
        const loadPlaces = async () => {
            //get places from database
            const places = await fetchPlaces();
            //set loaded place state
            setLoadedPlaces(places);
        };

        //if screen is focused load places
        if (isFocused) {
            loadPlaces();
        }
    }, [isFocused, isNavigated]);

    //return placeslist component 
    return (
        <PlacesList 
            places={loadedPlaces} 
            navigationHandler={navigationHandler}

        />
    );
};

export default AllPlaces;
