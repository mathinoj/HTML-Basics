// const form = document.querySelector("#beltSet");
// const userInput = document.querySelector("#setBelt");
// const spanChange = document.querySelector("#listBelt");
// console.log(form);
// console.log(userInput);
// console.log(spanChange);
// form.addEventListener("submit", function (e) {
//     e.preventDefault();
//     spanChange.innerText = `${userInput.value}`;
//     userInput.value = "";
//     console.log(spanChange);
// });

// const form = document.querySelector("#beltSet");
// const userInputBelt = document.querySelector("#setBelt");
// const userInputStripe = document.querySelector("#setStripes");
// console.log("check It: " + userInputStripe);
// const userInputClass = document.querySelector("#setClasses");
// const spanChangeBelt = document.querySelector("#listBelt");
// const spanChangeStripe = document.querySelector("#listStripes");
// console.log(spanChangeStripe);
// const spanChangeClass = document.querySelector("#listClasses");
// form.addEventListener("submit", function (e) {
//     e.preventDefault();
//     spanChangeBelt.innerText = `${userInputBelt.value}`;
//     userInputBelt.value = "";
//     const newOne = (spanChangeStripe.innerText = `${userInputStripe.value}`);
//     console.log("spanChangeStripe.innerText: " + spanChangeStripe.innerText);
//     console.log("`${userInputStripe.value}`: " + `${userInputStripe.value}`);
//     console.log("userInputStripe.value: " + userInputStripe.value);
//     console.log("newOne: " + newOne);
//     const oldOne = (userInputStripe.value = "");
//     console.log("oldOne: " + oldOne);
//     spanChangeClass.innerText = `${userInputClass.value}`;
//     userInputClass.value = "";
//     console.dir(e.target);
// });

// let upButt = document.querySelector("#upOneClick");
// upButt.addEventListener("click", function (e) {
//     let addClass = document.getElementById("classCheck").innerText;

//     addClass++;

//     const classAdd = document.querySelector("#classCheck");
//     classAdd.innerText = addClass;
//     console.log("Up Class: " + addClass);
// });

// const setClass = document.querySelector("#upOneClick");
// const stripeAdd = document.querySelector("#stripeCheck");
// //^^where we want LI to go
// const beltAdd = document.querySelector("#newBelt");
// setClass.addEventListener("click", function (e) {
//     e.preventDefault();
//     const grabClickUp = document.getElementById("classCheck").innerText;

//     const getSetClass = document.querySelector("#listClasses").innerText;
//     const getSetStripe = document.querySelector("#listStripes").innerText;

//     const newLi = document.createElement("li");
//     newLi.innerText = "Stripe";

//     const newBeltAdd = document.createElement("h3");
//     newBeltAdd.innerText = "New Belt Earned";

//     for (let i = 1; i <= getSetStripe; i++) {
//         // console.log("getSetClass: " + getSetClass);
//         console.log("getSetStripe: " + getSetStripe);

//         const numToGet = i * getSetClass;

//         console.log("This is numToGet: " + numToGet);
//         console.log("This is grabClickUp: " + grabClickUp);

//         const timed = getSetClass * getSetStripe;
//         // console.log("This is TIMED: " + timed);
//         const lastNum = grabClickUp;
//         // console.log("List-o-nums: " + lastNum);

//         if (numToGet == grabClickUp) {
//             stripeAdd.append(newLi);
//             alert("INPUT STUDENTS NAME earned a stripe!");
//         } else if (timed == lastNum) {
//             // alert("Advance to next belt!");
//             beltAdd.append(newBeltAdd);
//             alert("Advance to next belt!");
//             break;
//         }
//     }
// });

let showForm = document.querySelector("#submitBelt");
console.log(showForm);
const beltForming = document.querySelector("#tryThis");
//^^ where we want FORM to go
const newButtsToForm = document.querySelector("#buttsHere");
const newCounterToForm = document.querySelector("#counterHere");
const willItAddVar = document.querySelector("#willItAdd");
// let numz = document.getElementById("formNum").innerText;
// console.log(numz);
showForm.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(beltForming);
    console.log(showForm);

    let numz = document.getElementById("formNum").innerText;
    console.log("Before numz++ (form): " + numz);
    numz++;
    console.log("AFTER numz++ (form): " + numz);
    const addFormer = document.querySelector("#formNum");
    console.log(addFormer);
    const how = (addFormer.innerText = numz);
    console.log(how);
    console.log("Form number is: " + numz);
    // if (numz > 0) {
    //     let bye = numz - numz;
    //     console.log(bye);
    // }

    console.dir(e.target);
    // console.dir(e.path[3].childNodes[5].childNodes[0].classList.value);
    // const whe = newBeltForm.setAttribute("title", how);
    // console.log(whe);
    console.dir(e.path);
    // console.dir(e.path[3].childNodes[5]);
    // const popo = document.querySelector("#addedForm").title;
    // console.log(popo);

    const willForm = document.getElementById("beltSet").innerHTML;
    console.log(willForm);
    const newBeltForm = document.createElement("form");
    console.log(newBeltForm);
    newBeltForm.setAttribute("id", `addedForm-${how}`);
    // newBeltForm.setAttribute("id", "addedForm");
    newBeltForm.innerHTML = willForm;
    beltForming.append(newBeltForm);

    const getSubFormDiv = document.querySelector(`#addedForm-${how}`);
    console.log(getSubFormDiv);
    const sure = document.querySelector(".divFormSub").innerHTML;
    console.log(sure);
    const newby = document.createElement("div");
    console.log(newby);
    newby.setAttribute("id", `#divForSubmitForm-${how}`);
    newby.innerHTML = sure;
    getSubFormDiv.append(newby);

    const boo = document.getElementById(`#divForSubmitForm-${how}`);
    console.log(boo);
    const surely = document.querySelector(".buttSetBelt").innerHTML;
    console.log(surely);
    const booby = document.createElement("button");
    console.log(booby);
    booby.setAttribute("id", `#submitForm-${how}`);
    booby.innerHTML = surely;
    boo.append(booby);

    // const who = document.getElementById(`#submitForm-${how}`);
    // console.log(who);
    const burley = document.querySelector(".subzeroNum").innerHTML;
    console.log(burley);
    const gooby = document.createElement("span");
    console.log(gooby);
    gooby.setAttribute("id", `#subNum-${how}`);
    gooby.innerHTML = burley;
    boo.append(gooby);

    console.dir(e);
    // const formAdded = beltForming.append(newBeltForm);
    console.dir(e);
    // console.dir(e.path[3].childNodes[5].childNodes);
    // console.dir(e.path[3].childNodes[5].childNodes);

    // console.dir(e.path[3].childNodes[5].childNodes[0].id);
    // const replica = e.path[3].childNodes[5].childNodes[0];
    console.log(`addedForm-${how}`);

    // const replica = e.path[3].childNodes[5].childNodes[0].id.replace(
    //     "addedForm-",
    //     ""
    // );
    // console.log(replica);
    // console.log(formAdded);

    const yoloz = document.querySelector(`#addedForm-${how}`);
    const getDisplay = document.getElementById("getBelt").innerHTML;
    console.log(getDisplay);
    const newDisplay = document.createElement("h3");
    console.log(newDisplay);
    newDisplay.setAttribute("id", `newDisplay-${how}`);
    newDisplay.innerHTML = getDisplay;
    yoloz.append(newDisplay);

    // const meet = document.querySelector(`#addedForm-${how}`);
    // console.log(meet);
    // // let holla = `#addedForm-${how}`.replace("#addedForm-", "");
    // // console.log(holla);
    // const reed = document.querySelector(`#addedForm-${how}`)

    // const getSubFormDiv = document.querySelector("#divForSubmitForm");
    // const getSubFormDiv = document.querySelector(".divFormSub");

    // holla++;
    // console.log(grabNew);
    // console.dir(grabNew[3]);
    // const manny = document.querySelector("#submitForm");
    // console.log(manny);

    // const deduce = `counters-${how}`.replace("counters-", "");
    // console.log(deduce);
    // const classAdd = document.querySelector("#classCheck");
    // classAdd.setAttribute("id", `#classCheck-${deduce}`);

    const recluse = `newDisplay-${how}`.replace("newDisplay-", "");
    console.log(recluse);
    const gettingClass = document.querySelector("#listClasses");
    console.log(gettingClass);
    gettingClass.setAttribute("id", `#listClasses-${recluse}`);

    // const deluz = `newDisplay-${how}`
    const gettingStripe = document.querySelector("#listStripes");
    console.log(gettingStripe);
    gettingStripe.setAttribute("id", `#listStripes-${recluse}`);

    // const yolo = document.querySelector(`#addedForm-${how}`);
    const getCounters = document.getElementById("displayBelt").innerHTML;
    console.log(getCounters);
    const newCountHeading = document.createElement("h4");
    console.log(newCountHeading);
    // newCountHeading.setAttribute("id", "counters");

    newCountHeading.setAttribute("id", `counters-${how}`);
    newCountHeading.innerHTML = getCounters;
    yoloz.append(newCountHeading);

    // const setClass = document.querySelector("#upOneClick");
    // setClass.setAttribute("id", `#upOneClick-${reduce}`);
    const deduce = `counters-${how}`.replace("counters-", "");
    console.log(deduce);
    const classAdd = document.querySelector("#classCheck");
    console.log(classAdd);
    classAdd.setAttribute("id", `#classCheck-${deduce}`);

    const stipeChecker = document.querySelector("#stripeCheck");
    stipeChecker.setAttribute("id", `#stripeCheck-${deduce}`);

    const newBeltChecker = document.querySelector("#newBelt");
    newBeltChecker.setAttribute("id", `#newBelt-${deduce}`);

    // console.log(beltForming.append(newBeltForm));
    // let numz = document.getElementById("formNum").innerText;
    // console.log("Before numz++ (form): " + numz);
    // numz++;
    // console.log("AFTER numz++ (form): " + numz);
    // const addFormer = document.querySelector("#formNum");
    // const how = (addFormer.innerText = numz);
    // // addFormer.innerText = "Form Number is: " + numz;
    // // newCounterToForm.innerText = numz;
    // console.log("Form number is: " + numz);

    //GETS BUTTONS AND ADDS TO FORM
    // const yolo = document.querySelector("#addedForm");
    // const yolo = document.querySelector(`#addedForm-${how}`);
    console.log(yoloz);
    const getButts = document.getElementById("theButts").innerHTML;
    console.log(getButts);
    const newButtDiv = document.createElement("div");
    console.log(newButtDiv);
    // newButtDiv.setAttribute("id", "countClass");
    newButtDiv.setAttribute("id", `countClass-${how}`);
    newButtDiv.innerHTML = getButts;
    // buttsHere.append(newButtDiv);
    // newButtsToForm.append(newButtDiv);
    // const buttonsAdded = newButtsToForm.append(newButtDiv);
    const buttonsAdded = yoloz.append(newButtDiv);
    console.log(buttonsAdded);
    console.log(`countClass-${how}`);
    // console.log(countClass.length);
    console.dir(`countClass-${how}`);
    // ^^^^ GETS BUTTONS AND ADDS TO FORM ^^^^^

    // const getCounters = document.getElementById("displayBelt").innerHTML;
    // console.log(getCounters);

    // const newCountDiv = document.createElement("h4");
    // console.log(newCountDiv);
    // newCountDiv.setAttribute("id", "counters");
    // newCountDiv.innerHTML = getCounters;
    // yolo.append(newCountDiv);

    //THIS SHOULD ADD A NUMBER (1, 2, 3, ...) TO EACH BUTTON
    // let buttNumz = document.getElementById("buttNumber").innerText;
    // console.log("BEFORE buttNumz++ : " + buttNumz);
    // // let removeValQuotes = e.path[3].childNodes[9].attributes[1].value.replace(
    // //     "",
    // //     ""
    // // );
    // buttNumz++;
    // console.log("AFTER buttNumz++ : " + buttNumz);
    // const newlyVal = document.querySelector("#buttNumber");
    // newlyVal.innerText = buttNumz;
    // // newlyVal.innerText = "Butt Number is: " + buttNumz;
    // console.log("Button number is: " + buttNumz);
    //THIS SHOULD ADD A NUMBER (1, 2, 3, ...) TO EACH BUTTON ^^^^^^^

    console.dir(e.path);

    //Class counter with up click COMMENTING OUT THIS PART MAKES 0 WORK PROPERLY
    // console.log(newCounterToForm);
    // const getClassCounter = document.getElementById("classCheck").innerHTML;
    // console.log(getClassCounter);
    // const newClassCounter = document.createElement("span");
    // console.log(newClassCounter);
    // newClassCounter.setAttribute("id", "classCheck");
    // const goll = (newClassCounter.innerHTML = getClassCounter);
    // console.log(goll);
    // newCounterToForm.append(newClassCounter);
    //Class counter with up click ^^^^^^^^
    // COMMENTING OUT THIS PART MAKES 0 WORK PROPERLY^^^^^^^^^^^^^

    // const grabNew = document.querySelector("#addedForm");
    console.log(`countClass-${how}`);
    // console.log(`countClass-${how}`.replace("countClass-", ""));
    const reduce = `countClass-${how}`.replace("countClass-", "");
    console.log(reduce);

    const setClass = document.querySelector("#upOneClick");
    // const setClass = document.querySelector(`#upOneClick-${how}`);
    setClass.setAttribute("id", `#upOneClick-${reduce}`);

    let grabNew = document.querySelector(`#addedForm-${how}`);

    console.log(grabNew);
    console.dir(e.target);
    const userInputBelt = document.querySelector("#setBelt");
    console.log(userInputBelt);
    const spanChangeBelt = document.querySelector("#listBelt");
    console.log(spanChangeBelt);

    // const userThisInput = document.querySelectorAll("#setStripes");
    // console.log("userThisInput: " + userThisInput);
    const stripeSpan = document.querySelector("#listStripes");
    console.dir(e);
    console.dir(e.path);
    // console.dir(e.path[2]);
    console.dir(e.path[3]);
    // console.dir(e.path[2].childNodes);
    console.dir(e.path[3].childNodes[5].innerText);
    // console.dir(e.path[2].childNodes[11]);
    // console.dir(e.path[2].childNodes[11].innerText);
    console.log(stripeSpan);
    // const userInputClass = document.querySelector("#setClasses");
    const spanChangeClass = document.querySelector("#listClasses");
    // const willis = document.querySelector("#listStripes");
    const grabClassCounter = document.querySelector("#classCheck");
    console.log(grabClassCounter);
    console.dir(e);
    const deez = document.querySelector(`#newDisplay-${how}`);
    console.log(deez);
    console.dir(deez);
    console.dir(deez.childNodes[1]);
    const deezerD = deez.childNodes[1];
    console.log(deezerD);
    console.dir(deez.childNodes[5]);
    console.log(deez);
    const stripeToNeWForm = deez.childNodes[5];
    console.log(stripeToNeWForm);
    const classToNewForm = deez.childNodes[9];
    console.log(classToNewForm);
    console.dir(e);
    // console.dir(deez.childNodes[1].innerHTML);
    // let ruby = e.submitter.nextElementSibling.innerHTML;
    // let ruby = document.getElementById(`#subNum-${how}`).innerText;
    // console.log(ruby);
    // ruby++;

    grabNew.addEventListener("submit", function (e) {
        e.preventDefault();
        // alert(`submit clicked for form# ${how}`);

        console.log(userInputBelt);

        console.dir(e);

        let ruby = e.submitter.nextElementSibling.innerText;
        console.log(ruby);
        ruby++;
        console.log(ruby);
        const subAdd = document.getElementById(`#subNum-${how}`);
        console.log(subAdd);
        const party = (subAdd.innerText = ruby);
        console.log(party);

        // manny.setAttribute("id", `submitForm-${holla}`);
        console.log(grabNew);
        console.dir(grabNew);

        // newby.setAttribute("id", `#divForSubmitForm-${how}`);

        // const deduce = `counters-${how}`.replace("counters-", "");
        // console.log(deduce);
        // const classAdd = document.querySelector("#classCheck");
        // classAdd.setAttribute("id", `#classCheck-${deduce}`);

        // console.log(`countClass-${how}`);
        // // console.log(`countClass-${how}`.replace("countClass-", ""));
        // const reduce = `countClass-${how}`.replace("countClass-", "");
        // console.log(reduce);

        const bluey = (deezerD.innerHTML =
            "Belt Color: " + `${e.path[0][0].value}`);
        console.log(bluey);
        e.path[0][0].value = "";
        //     const yoloz = document.querySelector(`#addedForm-${how}`);
        // const getDisplay = document.getElementById("getBelt").innerHTML;
        // console.log(getDisplay);
        // const newDisplay = document.createElement("h3");
        // console.log(newDisplay);
        // newDisplay.setAttribute("id", `newDisplay-${how}`);
        // newDisplay.innerHTML = getDisplay;
        // yoloz.append(newDisplay);

        console.log(spanChangeBelt);

        console.dir(e);

        console.log(stripeToNeWForm);
        console.log(stripeToNeWForm.innerHTML);
        console.dir(e);
        console.dir(e.path[0][1].value);

        const striper =
            (stripeToNeWForm.innerText = `# of Stripes: ${e.path[0][1].value}`);
        e.path[0][1].value = "";
        console.log(striper);

        console.log(stripeToNeWForm);
        console.log(stripeToNeWForm.innerHTML);
        console.dir(e);
        console.dir(deez);

        const classer =
            (classToNewForm.innerText = `# of Classes: ${e.path[0][2].value}`);
        e.path[0][2].value = "";
        console.log(classer);

        console.dir(e);

        alert(`submit clicked for form# ${how}`);

        // });
        // if (grabNew) {
        // if (base > 0) {
        //     alert(`Again for form# ${how}`);
        // }

        //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
        // const setClass = document.querySelector("#upOneClick");
        // console.log(setClass);

        // const setClass = document.querySelector("#upOneClick");
        // const setClass = document.querySelector(`#upOneClick-${reduce}`);
        // setClass.setAttribute("id", `#upOneClick-${how}`);

        // const stripeAdd = document.querySelector("#stripeCheck");
        // const stripeAdd = document.querySelector("#stripeCheck");

        // console.log(stripeAdd);
        //^^where we want LI to go
        const beltAdd = document.querySelector("#newBelt");

        // let addClass = document.getElementById("classCheck").innerHTML;
        // let addClassez = document.getElementById(`counters-${how}`);
        let addClassez = document.getElementById(`counters-${deduce}`);

        console.log(addClassez);
        console.dir(addClassez.childNodes[7]);
        let addClass = addClassez.childNodes[7].innerHTML;
        console.log(addClass);
        console.dir(addClass);
        // console.dir(grabNew);
        // console.dir(grabNew.childNodes[26].childNodes[7]);
        // console.log(grabNew);
        console.dir(e);

        console.dir(grabNew);

        console.log(`counters-${how}`);
        console.dir(`counters-${how}`);

        let bing = document.getElementById(`stripeCheck-${deduce}`);
        console.log(bing);

        let bong = document.getElementById(`newBelt-${deduce}`);
        console.log(bong);
        // let paul = `counters-${how}`;
        // console.log(paul);
        // console.dir(paul);
        // console.dir(e.path[0].childNodes[26].childElementCount);

        // const setCounter = document.getElementById(`newCountHeading-${how}`);
        // console.log(setCounter);

        // const setCounterz = document.getElementById(`counters-${how}`);
        // console.log(setCounterz);
        // console.dir(setCounterz);
        // console.dir(setCounterz.childNodes[1].innerText);
        // let numz = document.getElementById("formNum").innerText;
        // const setCounter = setCounterz.childNodes[1].innerText;
        // console.log(setCounter);
        console.log(numz);
        console.dir(e);
        console.dir(numz);
        // const stripeAdd = document.querySelector("#stripeCheck");
        // const stripeAdd = document.querySelector(`#stripeCheck-${how}`);
        // console.dir(stripeAdd);
        // console.log(stripeAdd);
        // const scrilla = `stripeAdd-${how}`;
        // console.log(scrilla);
        // console.dir(scrilla);

        setClass.addEventListener("click", function (e) {
            e.preventDefault();
            console.dir(e);
            // console.log(stripeAdd);
            console.log(`counters-${how}`);
            console.log(setClass);
            console.dir(setClass);

            // let numz = document.getElementById("formNum").innerText;
            console.log(numz);
            console.dir(e);
            console.dir(numz);

            console.log(grabNew);

            // const setCounter = document.querySelector(`#newCountHeading-${how}`);
            // const setCounter = document.querySelector(`#counters-${how}`);
            // const setCounter = document.querySelector(`#counters`);

            // console.log(setCounter);
            // console.log(setCounter);
            // console.log(addClass);
            // alert(`upButton cliqd for form ${how}`);
            // const zero =
            //     e.path[2].childNodes[5].childNodes[1].childNodes[25].childNodes[1]
            //         .innerText;
            // console.log(zero);
            //button click counter
            console.dir(e);
            // let addClass = document.getElementById("classCheck").innerText;
            // let addClass = document.getElementById("counters").innerText;
            // let addClass = document.getElementById(`counters-${how}`).innerText;
            console.dir(addClass);
            console.dir(e.target);
            console.dir(addClass);
            console.dir(e);
            console.log(addClass);

            addClass++;
            console.log(addClass);

            // const classAdd = document.querySelector("#classCheck");
            // classAdd.setAttribute("id", `#classCheck-${reduce}`);
            const really = (classAdd.innerText = addClass);
            console.log(really);
            console.log("Up Class: " + addClass);
            // alert("click");
            //button click counter ^^^^^^^^^^

            // const grabClickUp = document.getElementById("classCheck").innerText;
            // console.log(grabClickUp);
            console.log("Classes attended: " + classAdd.innerText);
            console.log(stipeChecker.innerText.replace("# of Stripes: ", ""));
            console.log(newBeltChecker.innerText);

            // const gettingClass =
            // document.querySelector("#listClasses").innerText;
            // document.querySelector(`#listClasses-${recluse}`).innerText;
            // console.log(gettingClass);
            console.log(classer);
            console.dir(e);
            // const getSetClass = gettingClass.replace("# of Classes: ", "");
            const getSetClass = classer.replace("# of Classes: ", "");
            console.log(getSetClass);

            // const getSetStripe =
            // const gettingStripe =
            // document.querySelector("#listStripes").innerText;
            // document.querySelector(`#listStripes-${recluse}`).innerText;
            // console.log(gettingStripe);
            console.log(striper);
            // const getSetStripe = gettingStripe.replace("# of Stripes: ", "");
            const getSetStripe = striper.replace("# of Stripes: ", "");
            console.log(getSetStripe);

            // const deduce = `counters-${how}`.replace("counters-", "");
            // console.log(deduce);
            // const classAdd = document.querySelector("#classCheck");
            // classAdd.setAttribute("id", `#classCheck-${deduce}`);

            // const stipeChecker = document.querySelector("#stripeCheck");
            // stipeChecker.setAttribute("id", `#stripeCheck-${deduce}`);

            // const stripeAdd = document.querySelector("#stripeCheck");

            // console.log(stripeAdd);
            console.dir(e);
            console.dir(e.path[4].childNodes[9]);
            console.dir(e.path[4].childNodes[9].childNodes);

            // console.dir(stripeAdd);
            // console.log(stripeAdd.childElementCount);

            // let addClassez = document.getElementById(`counters-${how}`);
            // console.log(addClassez);
            // console.dir(addClassez.childNodes[7]);
            // let addClass = addClassez.childNodes[7].innerHTML;

            // const yoloz = document.querySelector(`#addedForm-${how}`);
            // const getDisplay = document.getElementById("getBelt").innerHTML;
            // console.log(getDisplay);
            // const newDisplay = document.createElement("h3");
            // console.log(newDisplay);
            // newDisplay.setAttribute("id", `newDisplay-${how}`);
            // newDisplay.innerHTML = getDisplay;
            // yoloz.append(newDisplay);

            let newLi = document.createElement("li");
            console.log(newLi);
            console.dir(e);
            newLi.setAttribute("id", `newStripeSee-${how}`);
            newLi.innerText = "Stripe";

            const newBeltAdd = document.createElement("h3");
            console.log(newBeltAdd);
            newBeltAdd.innerText = "New Belt Earned";
            console.dir(e);

            // alert(`up button clicked`);

            console.log(`countClass-${how}`);
            // console.dir(countClass.childNodes[3]);
            // const maybe = countClass.childNodes[3];
            // console.log(maybe);

            for (let i = 1; i <= getSetStripe; i++) {
                // for (let i = 1; i <= removedStripeText; i++) {
                // console.log("getSetClass: " + getSetClass);
                console.dir(e);
                console.log(i);
                // console.log("getSetStripe: " + removedStripeText);
                console.log("getSetStripe: " + getSetStripe);

                // const numToGet = i * removedClassText;
                const numToGet = i * getSetClass;

                console.log("This is numToGet: " + numToGet);
                // console.log("This is grabClickUp: " + grabClickUp);

                const timed = getSetClass * getSetStripe;
                // const timed = removedClassText * removedStripeText;
                // console.log("This is TIMED: " + timed);
                // const lastNum = grabClickUp
                const lastNum = classAdd.innerText;
                // console.log("List-o-nums: " + lastNum);
                // if (numToGet == grabClickUp) {
                // console.log(stripeAdd);

                console.dir(e.path);
                console.dir(e.path[2].childNodes[26].childNodes[11]);
                console.log(`counters-${how}`);
                console.dir(`counters-${how}`);
                console.dir(`newStripeSee-${how}`);
                console.log(`newStripeSee-${how}`);
                const playa = `counters-${how}`.replace("counters-", "");
                console.log(playa);
                const laya = `newStripeSee-${how}`.replace("newStripeSee-", "");
                console.log(laya);
                console.log(addClassez);

                if (numToGet == classAdd.innerText) {
                    // console.log(stripeAdd);
                    // yoloz.append(glow);
                    // yoloz.append(newLi);
                    addClassez.append(newLi);
                    // bing.append(newLi);

                    console.dir(e);
                    alert("INPUT STUDENTS NAME earned a stripe!");
                    console.log(newLi);
                } else if (timed == lastNum) {
                    // alert("Advance to next belt!");
                    // beltAdd.append(newBeltAdd);
                    addClassez.append(newBeltAdd);
                    // bong.append(newBeltAdd);

                    alert("Advance to next belt!");
                    break;
                }
            }
            // alert("LOOP");
        });
    });
});
