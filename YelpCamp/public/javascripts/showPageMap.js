mapboxgl.accessToken = "<%-process.env.MAPBOX_TOKEN%>";
const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
});
