import "./GoogleSearch.scss";
import React, { useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function GoogleSearch({ foodSearch }) {
    // Using functional hooks for state
    const [location, setLocation] = useState({ lat: 49.2827, lng: -123.1207 });

    const loader = new Loader({
        apiKey: "AIzaSyC6axoOOEq8kjBPHcDmJM5mCNyU__-k4Vc",
        version: "weekly",
        libraries: ["places"],
    });

    loader
        .load()
        .then((google) => {
            // Location

            // Load Map
            const map = new google.maps.Map(document.getElementById("map"), {
                center: location,
                zoom: 15,
                disableDefaultUI: true,
                zoomControl: true,
            });

            const infoWindow = new google.maps.InfoWindow();

            // Adds the current location button
            const locationButton = document.createElement("button");
            locationButton.textContent = "My Current Location";
            locationButton.classList.add("googlesearch");
            map.controls[google.maps.ControlPosition.TOP_RIGHT].push(
                locationButton
            );

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
                            setLocation(pos);
                            console.log(location);

                            infoWindow.setPosition(pos);
                            infoWindow.setContent("You are here");
                            infoWindow.open(map);
                            map.setCenter(pos);
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
                const placesList = document.getElementById("places");
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

                        li.textContent = place.name;
                        placesList.appendChild(li);

                        // window.map = map;
                        li.addEventListener("click", () => {
                            map.setCenter(place.geometry.location);
                        });
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

            service.textSearch(
                // Search criterias
                {
                    location: location,
                    radius: 300,
                    query: foodSearch,
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
            <div id="container">
                <div id="sidebar">
                    <h2> {"← " + foodSearch}</h2>
                    <ul id="places"></ul>
                    <button id="more">Load more results</button>
                </div>
                <div id="map" className="map"></div>
            </div>
        </>
    );
}
