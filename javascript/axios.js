// axios.get("https://swapi.dev/api/people/1/").then((res) => {
//     console.log("Response: ", res);
// });

const jokez = document.querySelector("#jokes");
const button = document.querySelector("button");

const addNewJoke = async () => {
    const jokeText = await getDad();
    const newLI = document.createElement("LI");
    newLI.append(jokeText);
    jokez.append(newLI);
};

const getDad = async () => {
    try {
        const config = { headers: { Accept: "application/json" } };
        const res = await axios.get("https://icanhazdadjoke.com", config);
        console.log(res);
        return res.data.joke;
    } catch (e) {
        return "No jokes readily available";
    }
};
button.addEventListener("click", addNewJoke);
