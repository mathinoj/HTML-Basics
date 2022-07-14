let colorButt = document.querySelector("#changeColor");
// colorButt.addEventListener("click", colorChange);
// ^^^^Had to block out this so shelterForm could work starting at line44

function colorChange() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let colory = [r, g, b];
    let stringy = colory.toString();
    let thisWon = `rgb(${stringy})`;
    console.log(thisWon);
    document.body.style.backgroundColor = thisWon;

    // const addRGB = document.createElement("h1");
    // addRGB.innerText = thisWon;
    const placingRGB = document.querySelector("h1");
    placingRGB.innerText = thisWon;

    // let colorButter = document.querySelector("#changeColor");
    // colorButter.addEventListener("click", colorThang);
    // function colorThang() {
    //     let colorWutt = document.getElementById("changeColor");
    //     var matt = (colorWutt.style.backgroundColor = `${thisWon}`);
    //     console.log(matt);
    // }
}

//This wont work cuz the event will want to take you to a new page
// const form = document.querySelector("#shelterForm");
// form.addEventListener('submit', function (e){
//   console.log('submitted');
// })

//e.preventDefault prevents the default behavior triggered by a given event, and in this case the event is to act like a form and submit the info and go to new page
//
// const form = document.querySelector("#shelterForm");
// form.addEventListener("submit", function (e) {
//     e.preventDefault();
//     console.log("form submitted");
// });

const form = document.querySelector("#shelterForm");
const input = document.querySelector("#personName");
const nameList = document.querySelector("#persons");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("submitted");
    const personName = input.value;
    const newLI = document.createElement("li");
    newLI.innerText = personName;
    nameList.append(newLI);
    input.value = "";
});
