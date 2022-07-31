const rpsForm = document.querySelector("#enterRPS");
const rpsInput = document.querySelector("#enterRPSInput");
const rpsSpan = document.querySelector("#showRPSSpan");
// const rps = Math.floor(Math.random() * 3) + 1;
const rpsCompH2 = document.querySelector("#compRPS");
const rpsCompSpan = document.querySelector("#showCompRPSSpan");

rpsForm.addEventListener("submit", function (e) {
    e.preventDefault();
    rpsSpan.innerText = `${rpsInput.value}`;
    rpsInput.value = "";

    const rps = Math.floor(Math.random() * 3) + 1;

    console.log(rps);
    if (rps === 1) {
        console.log("rock");
        console.log(rpsSpan.innerText);
        // rpsCompSpan.innerText = "ROCK";
        if (rpsSpan.innerText === "scissors") {
            rpsCompSpan.innerText = `ROCK, beats ${rpsSpan.innerText}. You lose.`;
        } else if (rpsSpan.innerText === "paper") {
            rpsCompSpan.innerText = `${rpsSpan.innerText} beats ROCK. You WIN!`;
        } else {
            rpsCompSpan.innerText = `${rpsSpan.innerText} does not beat or lose to ROCK. It's a tie.`;
        }
    } else if (rps === 2) {
        console.log("paper");
        console.log(rpsSpan.innerText);
        // rpsCompSpan.innerText = "PAPER";
        if (rpsSpan.innerText === "rock") {
            rpsCompSpan.innerText = `PAPER, beats ${rpsSpan.innerText}. You lose.`;
        } else if (rpsSpan.innerText === "scissors") {
            rpsCompSpan.innerText = `${rpsSpan.innerText} beat PAPER. You WIN!`;
        } else {
            rpsCompSpan.innerText = `${rpsSpan.innerText} does not beat or lose to PAPER. It's a tie.`;
        }
    } else {
        console.log("scissors");
        console.log(rpsSpan.innerText);
        // rpsCompSpan.innerText = "SCISSORS";
        if (rpsSpan.innerText === "paper") {
            rpsCompSpan.innerText = `SCISSORS, beats ${rpsSpan.innerText}. You lose.`;
        } else if (rpsSpan.innerText === "rock") {
            rpsCompSpan.innerText = `${rpsSpan.innerText} beat SCISSORS. You WIN!`;
        } else {
            rpsCompSpan.innerText = `${rpsSpan.innerText} does not beat or lose to SCISSORS. It's a tie.`;
        }
    }

    // console.log(rpsSpan.innerText);
    // if (rpsSpan.innerText === "paper") {
    //     console.log("You got paper");
    // }
});
