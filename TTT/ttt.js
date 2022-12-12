const getIt = document.getElementById("griddy").innerText;
// console.log(getIt);
const arrr = Array.from(getIt);
// console.log(arrr);
const removeNs = arrr.filter((removal) => {
    return removal !== "\n";
    //https://bobbyhadz.com/blog/javascript-remove-empty-strings-from-array
});
// console.log(removeNs);
let matt = removeNs.map(Number);
// console.log(matt);
let inSpan = document.querySelectorAll("span");
// console.log(inSpan);
for (let i = 1; i <= inSpan.length; i++) {
    // console.log(i);
}
// const rando = Math.floor(Math.random() * matt.length) + 1;
// console.log(rando);

let clickBox = document.querySelector("#griddy");
clickBox.addEventListener("click", function (e) {
    // console.dir(e);
    // console.dir(e.path);
    // console.dir(e.path[0].id);
    let eyeD = e.path[0].id;
    // console.log(eyeD);
    // console.dir(e.path[0].innerText);
    const hitIt = e.path[0].innerText;
    // alert(`Square ${hitIt} was toca'd!`);

    let count = document.getElementById("countClick").innerText;
    // console.log(count);
    count++;
    let upCount = document.querySelector("#countClick");
    let showNumChange = (upCount.innerText = count);
    console.log(showNumChange);

    if (showNumChange % 2 != 0) {
        // alert("X");
        let getBoxX = document.getElementById(`${eyeD}`).innerHTML;
        console.log(getBoxX);
        let replaceX = getBoxX.replace(`${hitIt}`, "X");
        let matt = (document.getElementById(`${eyeD}`).innerHTML = replaceX);
        console.log(matt);
    } else {
        // alert("O");
        let getBoxO = document.getElementById(`${eyeD}`).innerHTML;
        console.log(getBoxO);
        let replaceO = getBoxO.replace(`${hitIt}`, "O");
        document.getElementById(`${eyeD}`).innerHTML = replaceO;
    }

    console.dir(e);
    console.dir(e.path[0].innerText);
    console.log("hitIt: " + hitIt);

    for (let i = 1; i <= matt.length; i++) {
        // console.log("this is i: " + i);
        // console.log("Matt: " + matt);
        // alert(i);
        // console.log(matt.indexOf(i));
    }
});

let clickBoxWin = document.querySelector("#griddy");
clickBoxWin.addEventListener("click", function (e) {
    console.log(clickBoxWin);
    console.dir(e);
    console.dir(e.path);
    console.dir(e.path[0]);
    const hitIt = e.path[0].innerText;
    console.log("hitIt: " + hitIt);
    // if (hitIt == 1 && hitIt == 5 && hitIt == 9) {
    //     alert("win");
    // }
    let eyeD = e.path[0].id;
    console.log(eyeD);
    let getBoxX = document.getElementById(`${eyeD}`).innerHTML;
    console.log(getBoxX);

    if (getBoxX === "X") {
        alert("win");
    }
});
