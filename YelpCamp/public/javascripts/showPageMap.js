mapboxgl.accessToken =
    "pk.eyJ1IjoibWF0aGlub2oiLCJhIjoiY2w3a3Y2d3VnMDZmeDNwbWtrdmdvcGJ4bSJ9.7g4j_G_hqIhGMmCpcAZIqg";
const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 9, // starting zoom
    projection: "globe", // display the map as a 3D globe
});
map.on("style.load", () => {
    map.setFog({}); // Set the default atmosphere style
});

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            // .setLngLat(e.lngLat)
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
        // .setMaxWidth("300px")
    )
    .addTo(map);
