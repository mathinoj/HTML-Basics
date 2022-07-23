// https://api.tvmaze.com/search/shows?q=girls

const form = document.querySelector("#searchForm");
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    // console.dir(form); //THIS allows you to find name of the INPUT, which is located in ELEMENT
    // console.log(form.elements.whatYouLookinForTheInput.value); //This will give input value
    const searching = form.elements.whatYouLookinForTheInput.value;
    // const res = await axios.get(
    //     `https://api.tvmaze.com/search/shows?q=${searching}`
    // );
    const config = { params: { q: searching } };

    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    imageShow(res.data);
    // console.log(imageShow);
    //IN ORDER TO await WE HAVE TO MAKE THIS AN async function (line 4)
    // console.log(res.data); This allows us to see what we want to extract
    // console.log(res.data[0].show.image.medium);
    //This ^^^ gets us the medium image for the first show in the array list
    // const displayImage = document.createElement("IMG");
    // displayImage.src = res.data[0].show.image.medium;
    // document.body.append(displayImage);
    form.elements.whatYouLookinForTheInput.value = "";
});

const imageShow = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const displayImage = document.createElement("IMG");
            displayImage.src = result.show.image.medium;
            document.body.append(displayImage);
        }
    }
};
