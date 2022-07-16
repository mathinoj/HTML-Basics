// function upOne() {
//     // let start = 0;
//     let clicked = wow;
// }

let upButton = document.querySelector("#upOneClick");
upButton.addEventListener("click", buttClick);

let start = 0;

function buttClick(e) {
    //  e.stopPropagation();

    start++;
    // console.log(e);
    // let what = e.stopPropagation();
    // console.log(`stopProp ${what}`);

    const scored = document.querySelector("#one");
    let showScore = (scored.innerText = start);
    console.log(showScore);
    e.stopPropagation();

    let dButton = document.querySelector("#downOneClick");
    dButton.addEventListener("click", buttDownClick);

    let end = showScore;
    function buttDownClick() {
        end--;

        const scoreDown = document.querySelectorAll("span");
        let showScoreDown = (scoreDown.innerText = end);
        console.log(showScoreDown);
        // }
        // console.log(upButton);

        // let newStart = showScoreDown;
        // console.log(`newStart ${newStart}`);
        // function buttClick() {
        //     // let start = 1;
        //     // document.getElementById("upOneClick").innerText = start;
        //     const scoredAgain = document.querySelector("h2");
        //     let showScoreAgain = (scoredAgain.innerText = newStart);
        //     console.log(showScoreAgain);
    }
    // return true;
}

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

    resetUno.innerHTML = resetStart;
    resetTwo.innerHTML = resetStart;
}
