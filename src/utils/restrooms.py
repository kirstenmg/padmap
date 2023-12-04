import pandas as pd

url = "https://facilities.uw.edu/catalog/free-menstrual-product-program"

# Get first table on page (the only table is the FMP table)
fmp_data = pd.read_html(url, header=0, index_col=0)[0]
fmp_data.columns.values[0] = "Rooms"

# Create columns for whether there is an ADA accessible restroom on the FMP list
# in the building, and whether ther is an all-gender FMP restroom
fmp_data["contains_ADA"] = fmp_data["Rooms"].str.contains(r"\*")
fmp_data["contains_allgender"] = fmp_data["Rooms"].str.contains("All-gender")

# Returns true if a restroom in the passed-in string listing restrooms is both
# all-gender and ADA accessible
# Example "restrooms" strings:
#   162B, 262A  All-gender restroom: 034
#   G010*  All-gender restrooms: 212, 213*
#   003, 227
def allgender_and_ada(restrooms):
    split = restrooms.split("All-gender restroom")
    if len(split) > 1:
        # Check if there is a * to mark ADA accessibility in the restrooms
        # marked as all-gender
        return "*" in split[1]
    return False

def classify_restrooms(restrooms):
    if "All-gender restroom" in restrooms:
        single, allgender = restrooms.split("All-gender restroom")
        single = single.split(",")
        allgender = allgender.split(",")
    else:
        single = restrooms.split(",")
        allgender = []

    print(single)
    print(allgender)

    ADA = [restroom.strip()[:-1] for restroom in (single + allgender) if r"\*" in restroom]
    
    return single, allgender, ADA


fmp_data["contains_ADAallgender"] = fmp_data["Rooms"].apply(allgender_and_ada)
fmp_data.drop("Rooms", axis=1, inplace=True)

# fmp_data["single"], fmp_data["allgender"], fmp_data["ADA"] = zip(*fmp_data["Rooms"].apply(classify_restrooms))

print(fmp_data.to_json(orient="index", indent=2, force_ascii=False))
