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
    console.dir(e);
    console.dir(e.path);
    console.dir(e.path[0].id);
    let eyeD = e.path[0].id;
    console.log(eyeD);
    console.dir(e.path[0].innerText);
    const hitIt = e.path[0].innerText;
    // alert(`Square ${hitIt} was toca'd!`);

    let count = document.getElementById("countClick").innerText;
    console.log(count);
    count++;
    let upCount = document.querySelector("#countClick");
    let another = (upCount.innerText = count);
    console.log(another);

    if (another % 2 != 0) {
        // alert("X");
        let getBoxX = document.getElementById(`${eyeD}`).innerHTML;
        console.log(getBoxX);
        let replaceX = getBoxX.replace(`${hitIt}`, "X");
        document.getElementById(`${eyeD}`).innerHTML = replaceX;
    } else {
        // alert("O");
        let getBoxO = document.getElementById(`${eyeD}`).innerHTML;
        console.log(getBoxO);
        let replaceO = getBoxO.replace(`${hitIt}`, "O");
        document.getElementById(`${eyeD}`).innerHTML = replaceO;
    }

    for (let i = 1; i <= matt.length; i++) {
        // console.log("this is i: " + i);
        // console.log("Matt: " + matt);
        // alert(i);
        // console.log(matt.indexOf(i));
    }
});
// let move1 = document.querySelector("#one");
// move1.addEventListener("click", function (e) {
//     // alert("1 Clicked");
//     let get1 = document.getElementById("one").innerHTML;
//     let replace1 = get1.replace(1, "X");
//     document.getElementById("one").innerHTML = replace1;

//     // let get3 = document.getElementById("three").innerHTML;
//     // let replace3 = get3.replace(3, "X");
//     // document.getElementById("three").innerHTML = replace3;

//     //////////////////////////////////
//     // if (one) {
//     let get5 = document.getElementById("five").innerHTML;
//     let replace5 = get5.replace(5, "O");
//     // const setTime = setTimeout(dropOhh, 2000);
//     // function dropOhh() {
//     document.getElementById("five").innerHTML = replace5;
//     // }
//     // }
//     const getIt = document.getElementById("griddy").innerText;
//     const arrr = Array.from(getIt);
//     const removeNs = arrr.filter((removal) => {
//         return removal !== "\n";
//     });
//     console.log(removeNs);
//     let matt = removeNs.map(Number);
//     console.log(matt);

//     for (let i = 1; i <= removeNs.length; i++) {
//         // console.log("this is i: " + i);
//         console.log("Matt: " + removeNs);
//         // console.log(removeNs.replace("NaN", ""));

//         // console.log([...matt]);
//         // let spreadIt = [...matt];
//         // console.log(spreadIt);
//     }
//     const rando = Math.floor(Math.random() * matt.length) + 1;
//     console.log(rando);
//     console.log("mattttt: " + matt);
// });
// /////////////////////////////////============================
// let move2A = document.querySelector("#seven");
// move2A.addEventListener("click", function (e) {
//     // alert("1 Clicked");
//     let get7 = document.getElementById("seven").innerHTML;
//     let replace7 = get7.replace(7, "X");
//     document.getElementById("seven").innerHTML = replace7;
//     // if (one) {
//     let get4 = document.getElementById("four").innerHTML;
//     let replace4 = get4.replace(4, "O");
//     // const setTime = setTimeout(dropOhh, 2000);
//     // function dropOhh() {
//     document.getElementById("four").innerHTML = replace4;
//     // }
//     // }
// });

// let move2B = document.querySelector("#three");
// move2B.addEventListener("click", function (e) {
//     let get3 = document.getElementById("three").innerHTML;
//     let replace3 = get3.replace(3, "X");
//     document.getElementById("three").innerHTML = replace3;
//     ////////////////////////
//     let get2 = document.getElementById("two").innerHTML;
//     let replace2 = get2.replace(2, "O");
//     document.getElementById("two").innerHTML = replace2;
// });

// let move2C = document.querySelector("#nine");
// move2C.addEventListener("click", function (e) {
//     let get9 = document.getElementById("nine").innerHTML;
//     let replace9 = get9.replace(9, "X");
//     document.getElementById("nine").innerHTML = replace9;
//     ////////////////////////
//     let get2 = document.getElementById("two").innerHTML;
//     let replace2 = get2.replace(2, "O");
//     document.getElementById("two").innerHTML = replace2;
// });

// let move3A = document.querySelector("#six");
// move3A.addEventListener("click", function (e) {
//     let get6 = document.getElementById("six").innerHTML;
//     let replace6 = get6.replace(6, "X");
//     document.getElementById("six").innerHTML = replace6;
//     ////////////////////////
//     // let get2 = document.getElementById("two").innerHTML;
//     // let replace2 = get2.replace(2, "O");
//     // document.getElementById("two").innerHTML = replace2;
// });
