import "./GoogleSearch.scss";
import React, { useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { withRouter, useHistory } from "react-router-dom";

// https://developers.google.com/maps
// Documentation for Google Maps API
const API_KEY = process.env.REACT_APP_API_KEY;

function GoogleSearch({ foodSearch }) {
    // Using functional hooks for state
    // Initial location from city of the user (another feature to be added, possibly after OAuth)
    let [location, setLocation] = useState({ lat: 49.2827, lng: -123.1207 });

    let { goBack } = useHistory();

    const loader = new Loader({
        apiKey: API_KEY,
        version: "weekly",
        libraries: ["places"],
    });

    loader
        .load()
        .then((google) => {
            // Load Map
            let map, infoWindow;
            map = new google.maps.Map(document.getElementById("map"), {
                center: location,
                zoom: 14,
                disableDefaultUI: true,
                zoomControl: true,
            });

            let placesList = document.getElementById("places");

            // Adds the current location button
            let locationButton = document.createElement("button");
            locationButton.textContent = "Current Location";
            locationButton.classList.add("googlesearch__location-button");
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(
                locationButton
            );

            infoWindow = new google.maps.InfoWindow();

            // Event listener for current location
            locationButton.addEventListener("click", () => {
                // Try HTML5 geolocation.
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position: GeolocationPosition) => {
                            const pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            };

                            infoWindow.setPosition(pos);
                            infoWindow.setContent("Location found.");
                            infoWindow.open(map);
                            map.setCenter(pos);

                            // Re-rendering of state is removing marker.
                            setLocation(pos);
                            placesList.innerHTML = "";
                        },
                        // Error handling if browser doesn't have geolocation
                        () => {
                            handleLocationError(
                                true,
                                infoWindow,
                                map.getCenter()
                            );
                        }
                    );
                } else {
                    // Browser doesn't support Geolocation
                    handleLocationError(false, infoWindow, map.getCenter());
                }
            });

            // Error handling if browser doesn't have geolocation
            function handleLocationError(
                browserHasGeolocation: boolean,
                infoWindow: google.maps.InfoWindow,
                pos: google.maps.LatLng
            ) {
                infoWindow.setPosition(pos);
                infoWindow.setContent(
                    browserHasGeolocation
                        ? "Error: The Geolocation service failed."
                        : "Error: Your browser doesn't support geolocation."
                );
                infoWindow.open(map);
            }

            let getNextPage: () => void | false;

            // Reference the Load More Results Button
            const moreButton = document.getElementById("more");

            // Function to add places and markers to Google Maps
            function addPlaces(
                places: google.maps.places.PlaceResult[],
                map: google.maps.Map
            ) {
                for (const place of places) {
                    if (place.geometry && place.geometry.location) {
                        // const image = {
                        //     url: place.icon,
                        //     size: new google.maps.Size(71, 71),
                        //     origin: new google.maps.Point(0, 0),
                        //     anchor: new google.maps.Point(17, 34),
                        //     scaledSize: new google.maps.Size(25, 25),
                        // };
                        new google.maps.Marker({
                            map,
                            // icon: image,
                            title: place.name,
                            position: place.geometry.location,
                        });

                        const li = document.createElement("li");
                        // window.map = map;
                        li.addEventListener("click", () => {
                            map.setCenter(place.geometry.location);
                        });
                        li.textContent = place.name;
                        placesList.appendChild(li);
                    }
                }
            }

            moreButton.onclick = function () {
                moreButton.disabled = true;

                if (getNextPage) {
                    getNextPage();
                }
            };

            // Use PlacesService app and do a nearby search
            const service = new google.maps.places.PlacesService(map);

            service.nearbySearch(
                // Search criterias
                {
                    location: location,
                    radius: 1000,
                    keyword: foodSearch,
                },
                // Callback
                (
                    results: google.maps.places.PlaceResult[] | null,
                    status: google.maps.places.PlacesServiceStatus,
                    pagination: google.maps.places.PlaceSearchPagination | null
                ) => {
                    // If error, stop here
                    if (status !== "OK" || !results) return;
                    // Invoke AddPlaces with arguments

                    addPlaces(results, map);

                    // Disable more button if less than 20 places
                    moreButton.disabled =
                        !pagination || !pagination.hasNextPage;

                    // Invoke next pages
                    if (pagination && pagination.hasNextPage) {
                        getNextPage = () => {
                            // Note: nextPage will call the same handler function as the initial call
                            pagination.nextPage();
                        };
                    }
                }
            );
        })
        .catch((e) => {
            console.log(e, "You have a loader error");
        });

    return (
        <>
            <div id="container" className="googlesearch">
                <div id="sidebar" className="googlesearch__sidebar">
                    <div className="googlesearch__back-button" onClick={goBack}>
                        <h2 className="googlesearch__cuisine">
                            {"← " + foodSearch}
                        </h2>
                    </div>
                    <ul id="places" className="googlesearch__places"></ul>
                    <button id="more" className="googlesearch__more-button">
                        Load more results
                    </button>
                </div>
                <div id="map" className="map"></div>
            </div>
        </>
    );
}

export default withRouter(GoogleSearch);
