// function upOne() {
//     // let start = 0;
//     let clicked = wow;
// }

let upButton = document.querySelector("#upOneClick");
upButton.addEventListener("click", alertAdd);

// upButton.addEventListener("click", alertAdd);

function alertAdd() {
    // alert("Your coffee has been added to the list.");
    let start = 1;
    let add = upButton.addEventListener("click", alertAdd);
    for (let i = 0; i < add; i++) {
        let hell = add + 1;
    }
    // console.log(add);
    console.log(start);
}

function sumArray(arrNums) {
    let total = 0;
    // let oneNum = arrNums.length;
    for (let i = 0; i < arrNums.length; i++) {
        total += arrNums[i];
    }
    return total;
}
