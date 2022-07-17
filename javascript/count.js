// function upOne() {
//     // let start = 0;
//     let clicked = wow;
// }

let upButton = document.querySelector("#upOneClick");
upButton.addEventListener("click", buttClick);

let start = 0;

function buttClick(e) {
    start++;

    let showScoreThis = document.getElementById("one").innerHTML;
    console.log("NEED THIS one: " + showScoreThis);
    const scored = document.querySelector("#one");
    scored.textContent = start;
}

//THIS BRINGS SCORES DOWN
let dButton = document.querySelector("#downOneClick");

dButton.addEventListener("click", function (e) {
    let showScore = document.getElementById("one").innerHTML;

    showScore--;

    const scoreDown = document.querySelector("#one");
    let showScoreDown = (scoreDown.innerText = showScore);
    console.log("You NEED this number " + showScoreDown);

    let upButtAgain = document.querySelector("#upOneClick");
    upButtAgain.addEventListener("click", function (e) {
        showScoreDown++;
        const scoring = document.querySelector("#one");
        scoring.innerText = showScoreDown;
    });
});

//////////////////////////////////////////////////////////////////
let upButton2 = document.querySelector("#upOneClick2");
upButton2.addEventListener("click", buttClick2);
let startToo = 0;
function buttClick2(e) {
    //  e.stopPropagation();
    startToo++;

    const scored2 = document.querySelector("#two");
    let showScore2 = (scored2.innerText = startToo);
    console.log(showScore2);
}

var resetButt = document.querySelector("#resetClick");
resetButt.addEventListener("click", resetClicker);
let resetStart = 0;

function resetClicker() {
    // resetStart++;

    const resetUno = document.querySelector("#one");
    const resetTwo = document.querySelector("#two");
    // let both = resetUno || resetTwo;
    start = 0;
    startToo = 0;
    resetUno.innerText = resetStart;
    resetTwo.innerText = resetStart;
}
// }
// resetAll.addEventListener("change", function () {
//     resetingAll = parseInt(this.value);
// });
// }
// let upButton = document.querySelector("#upOneClick");
// upButton.addEventListener("click", buttonUpTry);
// let newerStart = showScoreDown;
// function buttonUpTry() {
//     newerStart++;

//     const reScore = document.querySelector("#one");
//     reScore.innerText = newerStart;
