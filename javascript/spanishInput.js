let spanSubmit = document.querySelector("#spanSubmit");
spanSubmit.addEventListener("click", function (e) {
    e.preventDefault();

    let grabText1 = document.getElementById(`textArea1`).value;
    console.log(grabText1);

    let grabText2 = document.getElementById(`textArea2`).value;
    console.log(grabText2);
});

// let showForm = document.querySelector("#submitBelt");

// showForm.addEventListener("click", function (e) {
//     e.preventDefault();
//     console.log(beltForming);
//     console.log(showForm);
