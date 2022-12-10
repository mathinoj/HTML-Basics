let clickOne = document.querySelector("#one");
// console.log(numz);
clickOne.addEventListener("click", function (e) {
    // alert("1 Clicked");
    let get1 = document.getElementById("one").innerHTML;
    let replace1 = get1.replace(1, "X");
    document.getElementById("one").innerHTML = replace1;
    if (one) {
        let get5 = document.getElementById("five").innerHTML;
        let replace5 = get5.replace(5, "O");
        const setTime = setTimeout(dropOhh, 2000);
        function dropOhh() {
            document.getElementById("five").innerHTML = replace5;
        }
    }
});
