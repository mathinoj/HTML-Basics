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
console.log();
let clickBox = document.querySelector("#griddy");
// console.log(clickBox.children);
for (let i = 1; i <= clickBox.children.length; i++) {
    // console.log(i);
    // console.log(clickBox);
}
clickBox.addEventListener("click", function (e) {
    // console.dir(e);
    // console.dir(e.path);
    // console.dir(e.path[0].id);
    let eyeD = e.path[0].id;
    console.log(eyeD);
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
        // let getBoxX = document.getElementById(`${eyeD}`).innerHTML;
        // console.log(getBoxX);
        // let replaceX = getBoxX.replace(`${hitIt}`, "X");
        // let matt = (document.getElementById(`${eyeD}`).innerHTML = replaceX);
        // console.log(matt);

        let getBoxX = document.getElementById(`${eyeD}`);
        let createElemX = document.createElement("span");
        createElemX.setAttribute("id", `${eyeD}`);
        createElemX.innerText = "X";
        getBoxX.append(createElemX);
    } else {
        // alert("O");
        // let getBoxO = document.getElementById(`${eyeD}`).innerHTML;
        // console.log(getBoxO);
        // let replaceO = getBoxO.replace(`${hitIt}`, "O");
        // document.getElementById(`${eyeD}`).innerHTML = replaceO;

        let getBoxO = document.getElementById(`${eyeD}`);
        let createElemO = document.createElement("span");
        createElemO.setAttribute("id", `${eyeD}`);
        createElemO.innerHTML = "O";
        getBoxO.append(createElemO);
    }

    console.dir(e);
    console.dir(e.path[0].innerText);
    let xoMan = e.path[0].innerText;

    console.log("hitIt: " + hitIt);
    let takeOneAway = hitIt - 1;
    console.log(takeOneAway);

    // for (let i = 1; i <= matt.length; i++) {
    // console.log("hitIt3: " + hitIt);

    // console.log("this is i: " + i);
    // console.log("Matt: " + matt);
    // alert(i);
    // console.log(matt.indexOf(i));
    const boxing = document.getElementById("griddy").innerText;
    const art = Array.from(boxing);
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
    const removeNz = art.filter((removal) => {
        return removal !== "\n";
        //https://bobbyhadz.com/blog/javascript-remove-empty-strings-from-array
    });
    const matthias = removeNz.map(Number);
    // console.log(matthias.length);
    // console.log(matthias.indexOf(9));
    // console.log(takeOneAway);
    const saver = matthias.splice(`${takeOneAway}`, 1, `${xoMan}`);
    console.log("saver: " + saver);

    // console.log("current arrary w/matthias const: " + matthias);
    // const maver = Array.from(saver);
    // }
    // console.dir(e.path[0].innerText);
    console.log("w/matthias const: " + matthias);
    let newArr = matthias.concat(saver);
    console.log(newArr);
    // const tart = Array.from(matthias);
    // console.log("saver: " + saver);
    // let `hit${hitIt}` =
});

let clickBoxWin = document.querySelector("#griddy");
clickBoxWin.addEventListener("click", function (e) {
    //     console.dir(e.path[0]);
    //     let eyeDa = e.path[0].id;
    //     let getBoxXz = document.getElementById(`${eyeDa}`).innerHTML;
    //     console.log(eyeDa);
    //     console.log(getBoxXz.indexOf());

    //     console.log(clickBoxWin);
    //     console.log(clickBoxWin.children);

    //     let boxing = document.getElementById("griddy").innerText;
    //     const art = Array.from(boxing);
    //     // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
    //     const removeNz = art.filter((removal) => {
    //         return removal !== "\n";
    //         //https://bobbyhadz.com/blog/javascript-remove-empty-strings-from-array
    //     });
    //     let matthias = removeNz.map(Number);
    //     console.dir(e);
    //     console.dir(e.path[0].innerText);

    //     // console.log("hitItHere: " + hitIt);

    //     let newArray = e.path[0].innerText;
    //     console.log(Array.from(newArray));

    //     // let set = `"${bet}"`;
    //     // console.log(set);
    //     console.log(matthias);
    //     // console.log(matthias.replace("NaN", `${newArray}`));

    //     console.dir(e);
    //     // let nice = matthias.splice(0, `"${set}"`);
    //     // https://www.fwait.com/how-to-include-double-quotes-in-a-string-in-javascript/
    //     // console.log(nice);
    //     let counter = document.getElementById("countClick").innerText;
    //     // console.log(count);
    //     // counter++;
    //     let upCount2 = document.querySelector("#countClick");
    //     let showNumChanged = (upCount2.innerText = counter);
    //     // console.log(showNumChanged);

    //     // console.log(matthias.indexOf(e.path[0]));

    //     // for (let i = 1; i <= matthias.length; i++) {
    //     // console.log(i);
    //     // console.log(matthias);
    //     // console.log(matthias.indexOf(i));

    //     // let indexed = matthias.indexOf(i);
    //     // console.log(indexed);

    //     // console.log(matthias);
    //     // if ((indexed = "NaN" && showNumChanged % 2 != 0)) {
    //     //     console.log(indexed);
    //     //     console.log(matthias);
    //     // }

    //     // console.log(showNumChanged);

    //     // console.log(matthias.indexOf(9));
    //     // console.dir(e.path[0]);

    //     // const x = matthias.indexOf(matthias[i], i + 1);
    //     // console.log(`${i}: ${x}`);
    //     // https://stackoverflow.com/questions/59396013/javascript-using-an-indexof-inside-for-loop
    //     // console.log(clickBoxWin.children[indexed]);
    //     // console.log(clickBoxWin.children[indexed].innerText);
    //     // }

    //     console.log(clickBoxWin.children[0]);
    //     console.log(clickBoxWin.children[0].innerText);

    //     // console.log(clickBoxWin);
    //     // console.dir(e);
    //     // console.dir(e.path);
    //     // console.dir(e.path[0]);
    //     // const hitIt = e.path[0].innerText;
    //     // console.log("hitIt: " + hitIt);
    //     // if (hitIt == 1 && hitIt == 5 && hitIt == 9) {
    //     //     alert("win");
    //     // }
    //     let eyeD = e.path[0].id;
    //     console.log(eyeD);
    //     let eyeDz = e.path[0].innerText;
    //     console.log(eyeDz);
    //     console.log(matthias);
    //     let splicer = matthias.splice(4, 1);
    //     // console.log(splicer);
    //     console.log(matthias);

    //     let getBoxX = document.getElementById(`${eyeD}`).innerHTML;
    //     console.log(getBoxX);

    //     // if (getBoxX === "X") {
    //     //     alert("win");
    //     // }
    const hitIt = e.path[0].innerText;
    console.log(hitIt);
    let xoMan = e.path[0].innerText;

    let takeOneAway = hitIt - 1;
    console.log(takeOneAway);

    const boxing = document.getElementById("griddy").innerText;
    const art = Array.from(boxing);
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
    const removeNz = art.filter((removal) => {
        return removal !== "\n";
        //https://bobbyhadz.com/blog/javascript-remove-empty-strings-from-array
    });
    const matthias = removeNz.map(Number);
    // console.log(matthias);
    // console.log(takeOneAway);
    const saver = matthias.splice(`${takeOneAway}`, 1, `${xoMan}`);
    // console.log("current arrary w/matthias const: " + matthias);
    // const maver = Array.from(saver);
    // }
    // console.dir(e.path[0].innerText);
    // console.log("w/matthias const: " + matthias);
    // const tart = Array.from(matthias);
});
