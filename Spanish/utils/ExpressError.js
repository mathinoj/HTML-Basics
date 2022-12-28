class ExpressError extends Error {
    //the keyword 'class; creates a class
    //we define the class as ExpressError and it will extends the native built in Error

    //Error is the super classs of ExpressError
    //So in the ExpressError class we'll use the super keyword to access things in the Express class
    constructor(message, statusCode) {
        //after adding/creating the class we ALWAYS add the method named 'constructor()'
        //this class has 2 properties that we assign it: 'message' and 'statusCode'
        super();
        //first thing we do is call super() and then we pass in the message/statusCode above
        this.message = message;
        //after we pass in message/statusCode we set this.message = message
        this.statusCode = statusCode;
        //then we add this.statusCode
        //this will give us a 401 error
        //the default err handler in express looks for a particular property on the error object called err.status or err.statusCode, and since we made this app with the error class that has status or statusCode then the error is automatically setup for us.

        //every error has its own error stack
    }
    //this is a tool that allows us to throw an app error where there is a message and then a status code
}
module.exports = ExpressError;
//this allows us to use this in other parts of the app files like app.js

//this is a generic error that we can throw, rather than having to apply multiple errors to each route.

// A JavaScript class is not an object. It is a template for JavaScript objects.
// The constructor method is a special method: It has to have the exact name "constructor"; It is executed automatically when a new object is created; It is used to initialize object properties
