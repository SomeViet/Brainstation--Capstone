import "./GoogleSearch.scss";
import React from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function GoogleSearch({ foodSearch }) {
    const loader = new Loader({
        apiKey: "AIzaSyC6axoOOEq8kjBPHcDmJM5mCNyU__-k4Vc",
        version: "weekly",
        libraries: ["places"],
    });

    console.log(foodSearch);
    loader
        .load()
        .then((google) => {
            const vancouver = { lat: 49.2827, lng: -123.1207 };
            const map = new google.maps.Map(document.getElementById("map"), {
                center: vancouver,
                zoom: 17,
            });

            const service = new google.maps.places.PlacesService(map);
            let getNextPage: () => void | false;
            const moreButton = document.getElementById("more");

            function addPlaces(
                places: google.maps.places.PlaceResult[],
                map: google.maps.Map
            ) {
                const placesList = document.getElementById("places");

                for (const place of places) {
                    if (place.geometry && place.geometry.location) {
                        const image = {
                            url: place.icon,
                            size: new google.maps.Size(71, 71),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(17, 34),
                            scaledSize: new google.maps.Size(25, 25),
                        };

                        new google.maps.Marker({
                            map,
                            icon: image,
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

            service.nearbySearch(
                { location: vancouver, radius: 100, type: "restaurant" },
                (
                    results: google.maps.places.PlaceResult[] | null,
                    status: google.maps.places.PlacesServiceStatus,
                    pagination: google.maps.places.PlaceSearchPagination | null
                ) => {
                    if (status !== "OK" || !results) return;

                    addPlaces(results, map);

                    moreButton.disabled =
                        !pagination || !pagination.hasNextPage;

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
            console.log(e, "You have an loader error");
        });

    return (
        <>
            <div id="container">
                <div id="sidebar">
                    <h2>Japanese</h2>
                    <ul id="places"></ul>
                    <button id="more">Load more results</button>
                </div>
                <div id="map" className="map"></div>
            </div>
            <input type="text" id="searchTextField" />
        </>
    );
}
