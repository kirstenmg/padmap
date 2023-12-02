# This file adds latitude and longitude coordinates to buildings in restrooms.json and saves in new file

import requests
import json

def get_coordinates(building, zipcode="98105"):
    """
    Return latitude and longitude of given address
    :param address: building name
    :param zipcode: zip code default 98105
    :return: lat, long or None if no address found
    """
    address = f"{building}, {zipcode}"
    base_url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": address,
        "format": "json",
    }

    response = requests.get(base_url, params=params)
    data = response.json()

    if data and isinstance(data, list) and len(data) > 0:
        print(f"Coordinates found for {address}")
        latitude = data[0]["lat"]
        longitude = data[0]["lon"]

        # Sanity check
        print(str(float(latitude)))
        print(str(float(longitude)))

        return float(latitude), float(longitude)
    else:
        return None

# Load the existing JSON data from file
with open("restrooms.json", "r") as file:
    existing_data = json.load(file)

# Process the JSON data and add coordinates
for building in existing_data:
    coordinates = get_coordinates(building)
    if coordinates:
        print(coordinates)
        existing_data[building]["latitude"] = coordinates[0]
        existing_data[building]["longitude"] = coordinates[1]
    else:
        print(f"Coordinates not found for {building}")

# Save the updated JSON data to file
with open("../restroomsWithLatLong.json", "w") as file:
    json.dump(existing_data, file, indent=2)

print("Coordinates added and saved to restroomsWithLatLong.json")
