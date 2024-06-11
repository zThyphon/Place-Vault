import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

const AddPlace = ({ navigation }) => {    
    const createPlaceHandler = async (place) => {
        place.lat = parseFloat(place.lat);
        place.lng = parseFloat(place.lng);
        
        //Call the database insertPlace function from database.js 
        await insertPlace(place);

        //navigate to all places screen
        navigation.navigate("AllPlaces");
    };

    //return placeform component
    return <PlaceForm onCreatePlace={createPlaceHandler} mode="add" />;
};

export default AddPlace;