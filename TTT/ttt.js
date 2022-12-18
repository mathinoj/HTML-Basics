let clickBox = document.querySelector("#griddy");
clickBox.addEventListener("click", function (e) {
    let eyeD = e.path[0].id;
    //Grabs ID of element

    const hitIt = e.path[0].innerText;
    //This shows the innerText of an element

    //--------------------------------------------------------------
    let count = document.getElementById("countClick").innerText;
    count++;
    let upCount = document.querySelector("#countClick");
    let showNumChange = (upCount.innerText = count);
    console.log(showNumChange);
    //THIS is the counter used for the if/else statement for X/O ^^^^^^^

    let xoMan = e.path[0].innerText;

    let takeOneAway = hitIt - 1;
    //This is for the INDEX. Subtracts actual number by 1.^^^^^^^^^^^^^^

    /////////////////THESE grab the chosen boxes/////////////////
    let getBoxX = document.getElementById(`${eyeD}`).innerHTML;
    let getBoxO = document.getElementById(`${eyeD}`).innerHTML;
    /////////////////THESE grab the chosen boxes/////////////////
    if (showNumChange % 2 != 0 && getBoxX !== "O") {
        let replaceX = getBoxX.replace(`${hitIt}`, "X");
        let showX = (document.getElementById(`${eyeD}`).innerHTML = replaceX);
        console.log(showX);

        //Was trying something different with ARRAY-------------------
        // let getBoxX = document.getElementById(`${eyeD}`);
        // let createElemX = document.createElement("span");
        // createElemX.setAttribute("id", `${eyeD}`);
        // createElemX.innerText = "X";
        // getBoxX.append(createElemX);
        //Was trying something different with ARRAY^^^^^^^^^^^^^^^^^^^^
    } else if (getBoxO !== "X") {
        let replaceO = getBoxO.replace(`${hitIt}`, "O");
        document.getElementById(`${eyeD}`).innerHTML = replaceO;

        //Was trying something different with ARRAY-------------------
        // let getBoxO = document.getElementById(`${eyeD}`);
        // let createElemO = document.createElement("span");
        // createElemO.setAttribute("id", `${eyeD}`);
        // createElemO.innerHTML = "O";
        // getBoxO.append(createElemO);
        //Was trying something different with ARRAY^^^^^^^^^^^^^^^^^^^^
    } else if (getBoxX == "O" || getBoxO == "X") {
        alert("llll");
    }

    let one = document.getElementById("one").innerText;
    let two = document.getElementById("two").innerText;
    let three = document.getElementById("three").innerText;
    let four = document.getElementById("four").innerText;
    let five = document.getElementById("five").innerText;
    let six = document.getElementById("six").innerText;
    let seven = document.getElementById("seven").innerText;
    let eight = document.getElementById("eight").innerText;
    let nine = document.getElementById("nine").innerText;

    // console.dir(e);
    let going = e.path[0].innerText;
    console.log(going);
    // console.dir(e.path[0].innerText);

    if (
        (one === "X" && five === "X" && nine === "X") ||
        (three === "X" && five === "X" && seven === "X") ||
        (one === "X" && four === "X" && seven === "X") ||
        (two === "X" && five === "X" && eight === "X") ||
        (three === "X" && six === "X" && nine === "X") ||
        (one === "X" && two === "X" && three === "X") ||
        (four === "X" && five === "X" && six === "X") ||
        (seven === "X" && eight === "X" && nine === "X")
    ) {
        alert("X wins!");
        // break;
    } else if (
        (one === "O" && five === "O" && nine === "O") ||
        (three === "O" && five === "O" && seven === "O") ||
        (one === "O" && four === "O" && seven === "O") ||
        (two === "O" && five === "O" && eight === "O") ||
        (three === "O" && six === "O" && nine === "O") ||
        (one === "O" && two === "O" && three === "O") ||
        (four === "O" && five === "O" && six === "O") ||
        (seven === "O" && eight === "O" && nine === "O")
    ) {
        alert("O wins!");
        // break;
    }
});
//THIS WAS AN ATTEMPT TO CHANGE THE ARRAY!!!!!!!!!!!!!
//     const getIt = document.getElementById("griddy").innerText;
// // console.log(getIt);
// const arrr = Array.from(getIt);
// // console.log(arrr);
// const removeNs = arrr.filter((removal) => {
//     return removal !== "\n";
//     //https://bobbyhadz.com/blog/javascript-remove-empty-strings-from-array
// });
// // console.log(removeNs);
// let matt = removeNs.map(Number);
// // console.log(matt);
// let inSpan = document.querySelectorAll("span");
// // console.log(inSpan);
// for (let i = 1; i <= inSpan.length; i++) {
//     // console.log(i);
// }
// const rando = Math.floor(Math.random() * matt.length) + 1;
// console.log(rando);
// const boxing = document.getElementById("griddy").innerText;
// const art = Array.from(boxing);
// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
// const removeNz = art.filter((removal) => {
//     return removal !== "\n";
//     //https://bobbyhadz.com/blog/javascript-remove-empty-strings-from-array
// });
// const matthias = removeNz.map(Number);

// let rst = Object.values(removeNz).length;
// const tart = Array.from(matthias);

// for (let i = 0; i < removeNz.length; i++) {
//     let firstValue = Object.values(removeNz)[i]; // 👉️ "Chile"
//     console.log(firstValue);
// }
//THIS WAS AN ATTEMPT TO CHANGE THE ARRAY!!!!!!!!!!!!!
