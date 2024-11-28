import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const [showAll, setShowAll] = useState(false);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const [latitude, setLatitude] = useState(51.505);
  const [longitude, setLongitude] = useState(-0.09);
  const [locations, setLocations] = useState([]);

  const filteredLocations = showAll ? locations : locations.slice(0, 5);

  const toggleSeeMore = () => {
    setShowAll((prevStatus) => !prevStatus);
  };

  const customIcon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });

  const locationExists = (lat, lng) => {
    return locations.some(
      (location) => location.lat === lat && location.lng === lng
    );
  };

  const updateMap = () => {
    if (locationExists(latitude, longitude)) {
      console.log("This location is already registered.");
      return;
    }

    if (mapRef.current) {
      const newLocation = { lat: latitude, lng: longitude };
      setLocations((prevLocations) => {
        const updatedLocations = [...prevLocations, newLocation];
        localStorage.setItem("locations", JSON.stringify(updatedLocations));
        return updatedLocations;
      });

      const newMarker = L.marker([latitude, longitude], {
        icon: customIcon,
      }).addTo(mapRef.current);
      newMarker.bindPopup("User Defined Location").openPopup();

      markersRef.current.push(newMarker);
    }
  };

  const panToLocation = (lat, lng) => {
    if (mapRef.current) {
      mapRef.current.setView([lat, lng], 13);
    }
  };

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = L.map("map").setView([latitude, longitude], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    const storedLocations = localStorage.getItem("locations");
    if (storedLocations) {
      const parsedLocations = JSON.parse(storedLocations);
      setLocations(parsedLocations);

      parsedLocations.forEach((location) => {
        const marker = L.marker([location.lat, location.lng], {
          icon: customIcon,
        }).addTo(mapRef.current);
        marker.bindPopup("User Defined Location").openPopup();
        markersRef.current.push(marker);
      });
    }

    const initialMarker = L.marker([latitude, longitude], {
      icon: customIcon,
    }).addTo(mapRef.current);
    initialMarker.bindPopup("User Defined Location").openPopup();
    markersRef.current.push(initialMarker);
  }, []);

  const removeLocation = (lat, lng) => {
    const updatedLocations = locations.filter(
      (location) => !(location.lat === lat && location.lng === lng)
    );
    setLocations(updatedLocations);
    localStorage.setItem("locations", JSON.stringify(updatedLocations));
  };

  return (
    <div className="w-full">
      <div
        id="map"
        className="h-96 w-full border rounded-lg shadow-sm -z-10"
      ></div>

      <div className="space-y-4">
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-600">
              Latitude:
            </label>
            <input
              type="number"
              value={latitude}
              onChange={(e) => setLatitude(parseFloat(e.target.value))}
              step="any"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customgreen"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-600">
              Longitude:
            </label>
            <input
              type="number"
              value={longitude}
              onChange={(e) => setLongitude(parseFloat(e.target.value))}
              step="any"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customgreen"
            />
          </div>
        </div>

        <button
          onClick={updateMap}
          className="mt-4 w-full py-2 bg-customgreen text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-customgreen"
        >
          Register Location
        </button>
      </div>

      <div className="w-full bg-white my-4 rounded-lg px-4 py-2">
        <div className="mb-2 bg-white flex justify-between items-center">
          <p className="rounded-lg">Registered Locations</p>
          <p
            className="text-customgreen text-xs cursor-pointer"
            onClick={toggleSeeMore}
          >
            {showAll ? "Show less" : "See More"}
          </p>
        </div>
        <div className="w-full m-auto mt-4">
          {filteredLocations.map((location, index) => (
            <div
              className="flex items-center justify-between border-b py-4"
              key={index}
            >
              <p
                onClick={() => panToLocation(location.lat, location.lng)}
                className="cursor-pointer text-sm"
              >
                Latitude: {location.lat}, Longitude: {location.lng}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#A6ABC8"
                className="hover:fill-red-500 cursor-pointer"
                onClick={() => removeLocation(location.lat, location.lng)}
              >
                <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.242 4.242 1.414-1.414-4.242-4.242 4.242-4.242z"></path>
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map;
