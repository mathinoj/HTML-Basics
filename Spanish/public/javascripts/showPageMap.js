mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v12", // style URL
    center: centerMapBox.geometry.coordinates, // starting position [lng, lat]
    zoom: 9, // starting zoom
});

// new mapboxgl.Marker().setLngLat(centerMapBox.geometry.coordinates).addTo(map);
new mapboxgl.Marker()
    .setLngLat(centerMapBox.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${centerMapBox.title}</h3><p>${centerMapBox.location}</p>`
        )
    )
    .addTo(map);
