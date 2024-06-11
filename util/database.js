import * as SQLite from "expo-sqlite/legacy";
import { Place } from "../models/place";

/*creates a database and opens it (if a database exists with 
this name it doesn't creates a database, only opens the database)*/
const database = SQLite.openDatabase("places.db");

//database table creation function
export const init = () => {
    //create a promise
    const promise = new Promise((resolve,reject)=>{
        //create a database transaction
        database.transaction((tx)=>{
            /*execute an sql query on transaction
            first parameter is sql query
            second parameter is an array of which includes
            variables in sql query
            in order to avoiding sql injection
            third parameter is an function which has been operated
            when the transaction is succeed
            fourth parameter is an function which has been operated
            when transaction is failed.
            */
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS places (
                    id INTEGER PRIMARY KEY NOT NULL,
                    title TEXT NOT NULL,
                    imageUri TEXT NOT NULL,
                    address TEXT NOT NULL,
                    lat REAL NOT NULL,
                    lng REAL NOT NULL 
                )`,
                [],
                ()=>{
                    resolve();
                },
                (_,error)=>{
                    reject(error);
                }
            );
        });
    });

    return promise;
};

//inserts a place to places tabdle
export const insertPlace = (place) => {
    //create a promise
    const promise = new Promise((resolve,reject)=>{
    //create a database transaction
    database.transaction((tx)=>{
        /*execute an sql query on transaction
        first parameter is sql query
        second parameter is an array of which includes
        variables in sql query
        in order to avoiding sql injection
        third parameter is an function which has been operated
        when the transaction is succeed
        fourth parameter is an function which has been operated
        when transaction is failed.
        */
        tx.executeSql(
                `INSERT INTO places (title, imageUri, address, lat, lng) VALUES(?,?,?,?,?)`,
                [
                    place.title,
                    place.imageUri,
                    place.address,
                    place.location.lat,
                    place.location.lng
                ],
                (_,result)=>{
                    resolve(result);
                },
                (_,error)=>{
                    reject(error);
                }
            );
        });
    });

    return promise;
};

//updates the place in database
export const updatePlace = (place) =>{
       //create a promise
       const promise = new Promise((resolve,reject)=>{
        //create a database transaction
        database.transaction((tx)=>{
            /*execute an sql query on transaction
            first parameter is sql query
            second parameter is an array of which includes
            variables in sql query
            in order to avoiding sql injection
            third parameter is an function which has been operated
            when the transaction is succeed
            fourth parameter is an function which has been operated
            when transaction is failed.
            */
            tx.executeSql(`
                UPDATE places 
                SET
                    title = ?,
                    imageUri = ?,
                    address = ?,
                    lat = ?,
                    lng = ?
                WHERE id = ?`,
                [
                    place.title, 
                    place.imageUri, 
                    place.address, 
                    place.lat, 
                    place.lng, 
                    place.id
                ],
                (_,result)=>{
                    resolve(result);
                },
                (_,error)=>{
                    reject(error);
                }
            );
        });
    });
    
    return promise;
};

//gets all places in the places table
export const fetchPlaces = () => {
        //create a promise
        const promise = new Promise((resolve,reject)=>{
            //create a database transaction
            database.transaction((tx)=>{
                /*execute an sql query on transaction
                first parameter is sql query
                second parameter is an array of which includes
                variables in sql query
                in order to avoiding sql injection
                third parameter is an function which has been operated
                when the transaction is succeed
                fourth parameter is an function which has been operated
                when transaction is failed.
                */
                tx.executeSql(
                "SELECT * FROM places",
                [],
                (_,result)=>{
                    const places = [];

                    for(const dp of result.rows._array)
                    {
                        const place = new Place(
                            dp.title,
                            dp.imageUri,
                            {
                                address: dp.address,
                                lat: dp.lat,
                                lng: dp.lng
                            },
                            dp.id
                        );
                        places.push(place);
                    }
                    resolve(places);
                },
                (_,error)=>{
                    reject(error);
                },
            );
        });
    });

    return promise;
};

//gets the place from database accordingly its id
export const fetchPlace = (id) => {
    //create a promise
    const promise = new Promise((resolve,reject)=>{
        //create a database transaction
        database.transaction((tx)=>{
            /*execute an sql query on transaction
            first parameter is sql query
            second parameter is an array of which includes
            variables in sql query
            in order to avoiding sql injection
            third parameter is an function which has been operated
            when the transaction is succeed
            fourth parameter is an function which has been operated
            when transaction is failed.
            */
            tx.executeSql(
                `SELECT * FROM places WHERE id=?`,
                [id],
                (_,result)=>{
                    const place = result.rows._array[0];
                    resolve(place);
                },
                (_,error)=>{
                    reject(error);
                },
            );
        });
    });

    return promise;
}

//deletes the place from table accordingly it's id
export const deletePlace = (id) => {
    //create a promise
    const promise = new Promise((resolve,reject)=>{
        //create a database transaction
        database.transaction((tx)=>{
            /*execute an sql query on transaction
            first parameter is sql query
            second parameter is an array of which includes
            variables in sql query
            in order to avoiding sql injection
            third parameter is an function which has been operated
            when the transaction is succeed
            fourth parameter is an function which has been operated
            when transaction is failed.
            */
            tx.executeSql(
                `DELETE FROM places WHERE id=?`,
                [id],
                (_,result)=>{
                    resolve(result);
                },
                (_,error)=>{
                    reject(error);
                }
            );
        });
    });

    return promise;
};