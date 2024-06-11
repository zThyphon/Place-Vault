import { useEffect, useState } from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { fetchPlace, updatePlace } from "../util/database";
import { getAddress } from "../util/location";

const EditPlace = ({navigation,route}) =>{
    //set a state for monitoring place
    const [ place, setPlace ] = useState(); 
    /*If they are exists it means that this page 
    redirected by Map Screen*/  
    //get required parameters
    const {pickedLat, pickedLng, navigatorScreen} = route.params;

    useEffect(()=>{
        //get placeId as parameter
        const placeId = route.params.placeId;
        //fetch place from database for getting place info 
        fetchPlace(placeId)
        .then(place=>{
            //set place
            setPlace(place);
        });
    },[]);

    const editPlaceHandler = async(place) => {
        //define updated place object
        let updatedPlace = {
            id: place.id,
            title: place.title,
            imageUri: place.imageUri,
            lat: parseFloat(place.lat),
            lng: parseFloat(place.lng),
        };

        /*if page is redirected by map screen get corresponding
        values from map screen and set updatedPlace lat and lng*/
        if(navigatorScreen === "map"){
            updatedPlace.lat = parseFloat(pickedLat);
            updatedPlace.lng = parseFloat(pickedLng);
        }

        //get address in verbal verbs with using google maps api
        const address = await getAddress(updatedPlace.lat, updatedPlace.lng);
        //update updatedPlace address
        updatedPlace.address = address;
        try
        {
            //update place in database
            await updatePlace(updatedPlace);
        }
        catch(error)
        {
            throw error;
        }
        
        //navigate to all places screen
        navigation.navigate("AllPlaces");
    };

    //return placeform component
    return (
        <PlaceForm 
            onCreatePlace={editPlaceHandler} 
            mode="edit" 
            place={place}
        />);
};

export default EditPlace;