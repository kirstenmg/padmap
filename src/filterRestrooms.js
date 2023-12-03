// import restroomData from "./utils/newrestrooms.json";
import restroomData from "./utils/restrooms.json";

export function filterRestrooms(requireADA, requireAllGender) {
    // console.log(typeof restroomData)
    // console.log(Object.keys(restroomData));  // returns a list of buildings
    // let result;
    if (requireADA && requireAllGender) {
        return Object.keys(restroomData).filter(buildingName => restroomData[buildingName].contains_ADAallgender === true);
    // console.log(hmm);
        // let result = restroomData.filter(function (entry) {
        //     return entry.contains_ADAallgender === true;
        // });
        // console.log(result);     
    } else if (requireADA) {
        return Object.keys(restroomData).filter(buildingName => restroomData[buildingName].contains_ADA === true);
    } else if (requireAllGender) {
        return Object.keys(restroomData).filter(buildingName => restroomData[buildingName].contains_ADA === true);
    } else {
        return Object.keys(restroomData);
    }
}