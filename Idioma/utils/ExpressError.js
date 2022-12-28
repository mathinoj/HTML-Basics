class ExpressError extends Error {
    //the keyword 'class; creates a class
    //we define the class as ExpressError and it will extends the native built in Error handling middleware provided by EXPRESS

    //Error is the super classs of ExpressError
    //So in the ExpressError class we'll use the super keyword to access things in the Express class
    constructor(message, statusCode) {
        super();
        //so SUPER() allows us to grab from the parent class, which in this case is ExpressError. Our ExpressError parent class extends Error, which is errorhandling middleware provided by Express. By extending into Error we are allowing our error handler to reach in and grab whatever we need from Express's Error handling middleware (default error handlers). With super() we extend into Error and grab MESSAGE/STATUS-CODE! We are accessing the properties from the parent class, without needing to write them manually in the child constructor.
        //this class has 2 properties that we assign it: 'message' and 'statusCode'
        //can use status or statusCode cuz either are part of the build in Express error handler
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
