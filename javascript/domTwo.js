let colorButt = document.querySelector("#changeColor");
// addCoffButton.addEventListener("click", addCoffee);
colorButt.addEventListener("click", colorChange);

function colorChange() {
    let r = Math.floor(Math.random() * 255) + 1;
    let g = Math.floor(Math.random() * 255) + 1;
    let b = Math.floor(Math.random() * 255) + 1;
    let colory = [r, g, b];
    console.log(colory);
    let stringy = colory.toString();
    console.log(stringy);
    let thisWon = `rgb(${stringy})`;
    console.log(thisWon);

    let colorButter = document.querySelector("#changeColor");
    colorButter.addEventListener("click", colorThang);
    function colorThang() {
        let colorWutt = document.getElementById("changeColor");
        var matt = (colorWutt.style.color = `${thisWon}`);
        console.log(matt);
    }
}
// console.log(colorChange.colory);
// let mat = (colorChange.style.color = colory);
// console.log(mat);
