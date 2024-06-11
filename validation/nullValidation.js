//gets an array of states as parameter
export const nullValidation = (states) => {
    //for of loop on each state
    for (const state of states)
    {
        //if state is undefined so state is not assigned
        if(state === undefined)
        {
            //return false
            return false;
        }
    }
    /*if loop is not returned it means that all 
    states have been initialized*/

    return true;
};