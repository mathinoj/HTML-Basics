const showForm = document.querySelector("#addForm");
const tryDis = document.querySelector("#formWhenClicked");
showForm.addEventListener("click", function (e) {
    e.preventDefault();

    const grabExistingForm = document.getElementById("practiceForm").innerHTML;
    console.log(grabExistingForm);

    const createNewForm = document.createElement("form");
    console.log(createNewForm);
    createNewForm.setAttribute("id", "practiceForm");

    createNewForm.innerHTML = grabExistingForm;
    tryDis.append(createNewForm);
});
