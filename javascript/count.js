//HAD THIS PART HERE BUT THIS IS WHAT WAS MESSING THINGS UP. REMOVED IT AND CHANGED A FEW OTHER THINGS JUST TO CLEAN UP, AND NOW THINGS WORK PROPERLY!!
// let upButton = document.querySelector("#upOneClick");
// upButton.addEventListener("click", buttClick);

// let start = 0;

// function buttClick(e) {
//     start++;
//     // let showScoreThis = document.getElementById("one").innerHTML;
//     // console.log("NEED THIS one: " + showScoreThis);
//     const scored = document.querySelector("#one");
//     // console.log("NEED THIS one: " + start);
//     let matt = (scored.innerText = start);
//     console.log("NEED THIS one: " + matt);
// }

//THIS BRINGS SCORES DOWN - P1
let dButtonP1 = document.querySelector("#downOneClick");
dButtonP1.addEventListener("click", function (e) {
    let subtractScore = document.getElementById("one").innerText;

    subtractScore--;

    const scoreSubtract = document.querySelector("#one");
    scoreSubtract.innerText = subtractScore;
    console.log("Down P1: " + subtractScore);
});

//THIS BRINGS SCORES UP - P1
let upButtP1 = document.querySelector("#upOneClick");
upButtP1.addEventListener("click", function (e) {
    let addScore = document.getElementById("one").innerText;

    addScore++;

    const scoringAdd = document.querySelector("#one");
    scoringAdd.innerText = addScore;
    console.log("Up P1: " + addScore);
});

//THIS BRINGS SCORE DOWN - P2
let dButtonP2 = document.querySelector("#downOneClick2");
dButtonP2.addEventListener("click", function (e) {
    let subtractScoreP2 = document.getElementById("two").innerText;

    subtractScoreP2--;

    const scoreSubtractP2 = document.querySelector("#two");
    scoreSubtractP2.innerText = subtractScoreP2;
    console.log("Down P2 " + subtractScoreP2);
});

//THIS BRINGS SCORE UP - P2
let upButtP2 = document.querySelector("#upOneClick2");
upButtP2.addEventListener("click", function (e) {
    let addScoreP2 = document.getElementById("two").innerText;

    addScoreP2++;

    const scoring2 = document.querySelector("#two");
    scoring2.innerText = addScoreP2;
    console.log("Up P2 " + addScoreP2);
});

//THIS RESETS BOTH SCORES
var resetButt = document.querySelector("#resetClick");
resetButt.addEventListener("click", resetClicker);

let resetStart = 0;

function resetClicker() {
    const resetUno = document.querySelector("#one");
    const resetTwo = document.querySelector("#two");
    const resetSetScore = document.querySelector("#reachPoint");
    // start = 0;
    // startToo = 0;
    resetUno.innerText = resetStart;
    resetTwo.innerText = resetStart;
    resetSetScore.innerText = resetStart;
    console.log("Reset Activated ");
}

const form = document.querySelector("form");
const userInput = document.querySelector("#setPoint");
const spanChange = document.querySelector("#reachPoint");
form.addEventListener("click", function (e) {
    e.preventDefault();
    spanChange.innerText = `${userInput.value}`;
    userInput.value = "";
});

// let blah = document.getElementById("one").innerText;

// const boo = document.querySelector("#one").innerText;
// boo.innerText = blah;
// console.log(`BBB ${blah}`);
// console.log(`BBB ${boo}`);

let setScoreP1 = document.querySelector("#upOneClick");
setScoreP1.addEventListener("click", function (e) {
    let grabP1Score = document.getElementById("one").innerText;

    const scoreFromP1Span = document.querySelector("#one");
    scoreFromP1Span.innerText = grabP1Score;

    let getSetScore = document.querySelector("#reachPoint").innerText;

    if (grabP1Score === getSetScore) {
        alert("You win!");
        alert("Click 'Reset' to Start a New Game.");
    }
});

let upButtP1Again4 = document.querySelector("#upOneClick2");
upButtP1Again4.addEventListener("click", function (e) {
    let grabP2Score = document.getElementById("two").innerText;
    console.log(grabP2Score);

    const scoreFromP1Span = document.querySelector("#two");
    scoreFromP1Span.innerText = grabP2Score;

    let getSetScore = document.querySelector("#reachPoint").innerText;
    console.log(getSetScore);

    if (grabP2Score === getSetScore) {
        alert("You win!");
        alert("Click 'Reset' to Start a New Game.");
    }
});
