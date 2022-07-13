let colorButt = document.querySelector("#changeColor");
colorButt.addEventListener("click", colorChange);

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
