import restroomData from "./restroomsWithLatLong.json";

export function filterRestrooms(requireADA, requireAllGender) {
    // Turn the dictionary into a list of entries
    var restroomDataList = Object.entries(restroomData);

    // Filter out buildings for which we don't have coordinates
    restroomDataList = restroomDataList.filter(([_, data]) => {
        return 'longitude' in data
    });
    
    // Filter out buildings that don't meet the user criteria
    restroomDataList = restroomDataList.filter(([_, data]) => {
        return (!requireADA || data.contains_ADA)
        && (!requireAllGender || data.contains_allgender)
        && (!(requireADA && requireAllGender) || data.contains_ADAallgender)
    });

    return restroomDataList;
}