let upButton = document.querySelector("#upOneClick");
upButton.addEventListener("click", buttClick);

let start = 0;

function buttClick(e) {
    //HAD THIS PART HERE BUT THIS IS WHAT WAS MESSING THINGS UP. REMOVED IT AND CHANGED A FEW OTHER THINGS JUST TO CLEAN UP, AND NOW THINGS WORK PROPERLY!!
    // start++;
    // // let showScoreThis = document.getElementById("one").innerHTML;
    // // console.log("NEED THIS one: " + showScoreThis);
    // const scored = document.querySelector("#one");
    // // console.log("NEED THIS one: " + start);
    // let matt = (scored.innerText = start);
    // console.log("NEED THIS one: " + matt);
}

//THIS BRINGS SCORES DOWN - P1
let dButton = document.querySelector("#downOneClick");
dButton.addEventListener("click", function (e) {
    let showScore = document.getElementById("one").innerText;

    showScore--;

    const scoreDown = document.querySelector("#one");
    let showScoreDown = (scoreDown.innerText = showScore);
    console.log("Down P1: " + showScoreDown);
});

//THIS BRINGS SCORES UP - P1
let upButtAgain = document.querySelector("#upOneClick");
upButtAgain.addEventListener("click", function (e) {
    let willUp = document.getElementById("one").innerText;

    willUp++;
    const scoring = document.querySelector("#one");
    let scoringz = (scoring.innerText = willUp);
    console.log("Up P1: " + scoringz);
});

//THIS BRINGS SCORE DOWN - P2
let dButton2 = document.querySelector("#downOneClick2");
dButton2.addEventListener("click", function (e) {
    let showScore2 = document.getElementById("two").innerHTML;

    showScore2--;

    const scoreDown2 = document.querySelector("#two");
    let showScoreDown2 = (scoreDown2.innerText = showScore2);
    console.log("Down P2 " + showScoreDown2);
});

//THIS BRINGS SCORE UP - P2
let upButtAgain2 = document.querySelector("#upOneClick2");
upButtAgain2.addEventListener("click", function (e) {
    let showScoreDown2Again = document.getElementById("two").innerText;
    showScoreDown2Again++;
    const scoring2 = document.querySelector("#two");
    scoring2.innerText = showScoreDown2Again;
    console.log("Up P2 " + showScoreDown2Again);
});

//THIS RESETS BOTH SCORES
var resetButt = document.querySelector("#resetClick");
resetButt.addEventListener("click", resetClicker);
let resetStart = 0;

function resetClicker() {
    const resetUno = document.querySelector("#one");
    const resetTwo = document.querySelector("#two");
    start = 0;
    startToo = 0;
    resetUno.innerText = resetStart;
    resetTwo.innerText = resetStart;
    console.log("Reset Activated ");
}
