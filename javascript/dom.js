// const div = document.querySelector("#container");

// div.style.textAlign = "center";

// const image = document.querySelector("img");
// image.style.width = "150px";
// image.style.borderRadius = "50%";

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

// const allSpan = document.querySelectorAll("span");
// let i = 0;
// for (let spans of colors) {
//     allSpan[i].style.color = spans;
//     i++;
// }

const allSpan = document.querySelectorAll("span");
for (let i = 0; i < colors.length; i++) {
    allSpan[i].style.color = colors[i];
}
