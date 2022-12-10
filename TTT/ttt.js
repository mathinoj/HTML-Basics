let clickOne = document.querySelector("#one");
// console.log(numz);
clickOne.addEventListener("click", function (e) {
    if (one) {
        // alert("1 Clicked");
        let getOne = document.getElementById("one").innerHTML;
        let replaceOne = getOne.replace(1, "X");
        document.getElementById("one").innerHTML = replaceOne;
    }
});

// let str = document.getElementById("demo").innerHTML;
// let res = str.replace(/blue/g, "red");
// document.getElementById("demo").innerHTML = res;
