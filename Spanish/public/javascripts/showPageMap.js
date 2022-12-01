mapboxgl.accessToken =
    "pk.eyJ1IjoibWF0aGlub2oiLCJhIjoiY2w3a3Y2d3VnMDZmeDNwbWtrdmdvcGJ4bSJ9.7g4j_G_hqIhGMmCpcAZIqg";
const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v12", // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
});
