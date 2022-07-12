// const div = document.querySelector("#container");

// div.style.textAlign = "center";

// const image = document.querySelector("img");
// image.style.width = "150px";
// image.style.borderRadius = "50%";

//EXERCISE 56 - RAINBOW
const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

// const allSpan = document.querySelectorAll("span");
// let i = 0;
// for (let spans of colors) {
//     allSpan[i].style.color = spans;
//     i++;
// }

// const allSpan = document.querySelectorAll("span");
// for (let i = 0; i < colors.length; i++) {
//     allSpan[i].style.color = colors[i];
// }

//EXERCISE 57 TOGGLE
// const allLi = document.querySelectorAll("li");
// console.log(allLi);
// for (let i = 0; i < allLi.length; i++) {
//     allLi[i].classList.toggle("highlight");
// }

//EXERCISE 58 - Add Buttons
//Create exactly 100 new button elements. Add each button inside the container element provided in the HTML. Udemy software REQUIRES use of appendChild. Each button must be appended inside the container div. HINT*** Loop 100 times. Inside loop, create a new empty butotn element. Add some innerText^^^^^^ to the button. Use appendChild to add the button to the container.

/////////////////THIS ONE WORKS -------------------
for (let i = 0; i < 100; i++) {
    const buttonz = document.createElement("button");
    buttonz.append("yo");
    const addIt = document.querySelector("div");
    // console.log(addIt);
    let check = addIt.insertAdjacentElement("afterbegin", buttonz);
    // console.log(check);
}
//$$$$$$$$$$$$$$$$$BUT THIS IS THE ONE THAT GOT ACCEPTED
for (let i = 0; i < 100; i++) {
    const buttonz = document.createElement("button");
    buttonz.innerText = "yo";
    const addIt = document.querySelector("div");
    addIt.insertAdjacentElement("afterbegin", buttonz);
}
