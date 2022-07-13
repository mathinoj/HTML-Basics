// function upOne() {
//     // let start = 0;
//     let clicked = wow;
// }

let upButton = document.querySelector("#upOneClick");
upButton.addEventListener("click", buttClick);

let start = 0;

function buttClick() {
    start++;
    // let start = 1;

    // document.getElementById("upOneClick").innerText = start;
    const scored = document.querySelector("h2");
    let showScore = (scored.innerText = start);
    console.log(showScore);

    // return true;
}
