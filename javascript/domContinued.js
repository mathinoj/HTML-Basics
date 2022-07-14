//WORKS BUT NOT, CORRECT ON UDEMY************************
// const form = document.querySelector("form");
// const listUL = document.querySelector("#list");

// const inputProduct = document.querySelector("#product");
// const inputQty = document.querySelector("#qty");
// form.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const userInputProduct = form.elements.product;
//     const userInputQty = form.elements.qty;
//     addInputs(userInputProduct.value, userInputQty.value);
//     userInputProduct.value = "";
//     userInputQty.value = "";
// });

// const addInputs = (product, qty) => {
//     const newProduct = document.createElement("li");
//     newProduct.append(`${qty} `, product);
//     list.appendChild(newProduct);
// };

//REFACTORED from solution above
// const form = document.querySelector("form");
// const listUL = document.querySelector("#list");

// const inputProduct = document.querySelector("#product");
// const inputQty = document.querySelector("#qty");
// form.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const userInputProduct = form.elements.product;
//     const userInputQty = form.elements.qty;
//     const newProduct = document.createElement("li");
//     newProduct.innerText = `${qty.value} ${product.value}`;
//     listUL.appendChild(newProduct);
//     userInputProduct.value = "";
//     userInputQty.value = "";
//     console.log(newProduct);
// });

//REFACTORED Again, but based off help!!!!!!!!
// const form = document.querySelector("form");
// const listUL = document.querySelector("#list");
// form.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const inputProduct = document.querySelector("#product");
//     const inputQty = document.querySelector("#qty");
//     const newProduct = document.createElement("li");
//     newProduct.innerText = `${qty.value} ${product.value}`;
//     listUL.appendChild(newProduct);
//     inputProduct.value = "";
//     inputQty.value = "";
// });

const userInput = document.querySelector("#username");
const headerChange = document.querySelector("h1");
const h1 = document.querySelector("h1");
userInput.addEventListener("input", function (e) {
    headerChange.innerText = `Welcome, ${userInput.value}`;
    // userInput.value = "";
    if (userInput.value === "") {
        return (headerChange.innerText = "Enter Your Username");
    }

    userInput.addEventListener("change", function (e) {
        headerChange.innerText = "Enter Your Username";
        userInput.value = "";
    });
});
