//define google maps api key
const GOOGLE_API_KEY = "GOOGLE_API_KEY";

//get map preview from google maps api
export const getMapPreview = (lat, lng) => {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
    return imagePreviewUrl;
};

/*get address in verbal form from google maps api 
with using latitude and longitude*/

export const getAddress = async(lat, lng) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
    //http request to google maps api and get response
    const response = await fetch(url);

    //if an error occurs in http request throw an error
    if(!response.ok)
    {
        throw new Error("Failed to fetch address!");
    }

    //otherwise get data
    const data = await response.json();
    //get address
    const address = data.results[0].formatted_address;
    //and return the address
    return address;
};