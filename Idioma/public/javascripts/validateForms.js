// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    "use strict";
    // The purpose of "use strict" is to indicate that the code should be executed in "strict mode". With strict mode, you can not, for example, use undeclared variables. Undeclared − It occurs when a variable which hasn't been declared using var, let or const is being tried to access.

    const forms = document.querySelectorAll(".validated-form");
    // this selects all form with the class 'validated form'
    // Loop over them and prevent submission
    Array.from(forms).forEach((form) => {
        //here we name the function 'form'
        //Array.from(forms) makes an array from all inputs retrieved anywhere there was a FORM with the 'validated-form' class
        //So basically it breaks down each <textarea> and <input> input. We use this to as part of the checking process.
        //Then we run a forEach loop on the array to check for to see if any part of the form has empty values.
        form.addEventListener(
            "submit",
            (event) => {
                if (!form.checkValidity()) {
                    // checkValidity returns true if an input element contains valid data.
                    //here we are saying if the 'form' function that we named in the 'Array.from part', if that is NOT true - is NOT VALID (!form.checkValidity), then we WILL GO ONTO the NEXT STEPS.
                    //not true meaning there is NOTHING written in the inputs by the user
                    // IF form DOES contain all valid inputs then the form will submit and it WILL NOT go onto the next steps.
                    event.preventDefault();
                    // The event.preventDefault() method stops the default action of an element from happening. For example: Prevent a submit button from submitting a form OR Prevent a link from following the URL
                    // The event continues to propagate as usual, unless one of its event listeners calls stopPropagation()
                    event.stopPropagation();
                    // This prevents further propagation of the current event in the capturing and bubbling phases.
                    //SO in the form, to check if user left text in the <input>, the capture phase would go from the <form>to<div>to<input>. Then once inside the <input> it checks for TEXT. If there IS writtedn TEXT by the user then it propogates to the bubbling phase which then goes from <input>to<div>to<form>. HOWEVER, if there is no written TEXT in the <input> then no bubbling occurs, and the event.stopPropogation() stops the form from processing!
                }

                form.classList.add("was-validated");
                // classList is a convenient alternative to accessing an element's list of classes as a space-delimited string (I asssume space-delimited string in this scenario is 'was-validated'). A delimiter is a character used to separate items in a string.
                // classList returns a live DOMTokenList collection of the class attributes of the element. This can then be used to manipulate the class list. The  DOMTokenList includes the add.() DOMToken.
            },
            false
        );
    });
})();
