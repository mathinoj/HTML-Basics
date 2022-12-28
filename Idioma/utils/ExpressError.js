class ExpressError extends Error {
    //the keyword 'class; creates a class
    //we define the class as ExpressError and it will extends the native built in Error handling middleware provided by EXPRESS

    //Error is the super classs of ExpressError
    //So in the ExpressError class we'll use the super keyword to access things in the Express class

    // Whenever an ERROR happens (like maybe a card has been deleted but a user is still trying to access it cuz the card was bookmarked by that user) an new instance is created. The new error would be an instance of EXPRESSERROR.

    // function Person(name) {
    //   this.name = name;
    // }
    //a constructor is automatically called when we create an object. So an example of creating an object would be: let loginError = new ExpressError("wrong p-word", 501). Here message = 'wrong p-word', and statusCode = 501.
    constructor(message, statusCode) {
        // The constructor method is a special method of a class for creating and initializing an object instance of that class. The class (ExpressError) initializes (gets created) when an error happens (like maybe a card has been deleted but a user is still trying to access it cuz the card was bookmarked by that user). As the error happens the constructor activates it's two parameters (message/statusCode).
        //SO when an error happens it calls on this EXPRESS ERROR function, which has the three methods: super(), this.message/this.statusCode.

        //OBJECT is a container for properties/methods. Ex: a CUP is an OBJECT, with PROPERTIES like: color, size, material.
        //PROPERTIES are values/variables that describe what an object has
        //methods are functions that describe with an object can do (EX: this.message)
        //special method for assigning properties
        //message and statusCode are the constructor parameters.
        //when an error object occurs or is created we can pass in the parameters(aka values) as arguments
        super(); //method
        //so SUPER() allows us to grab from the parent class, which in this case is ExpressError. Our ExpressError parent class extends Error, which is errorhandling middleware provided by Express. By extending into Error we are allowing our error handler to reach in and grab whatever we need from Express's Error handling middleware (default error handlers). With super() we extend into Error and grab MESSAGE/STATUS-CODE! We are accessing the properties from the parent class, without needing to write them manually in the child constructor.
        //this class has 2 properties that we assign it: 'message' and 'statusCode'
        //can use status or statusCode cuz either are part of the build in Express error handler
        this.message = message; //method
        //after we pass in message/statusCode we set this.message = message
        //to assign an error (that we receive as arguments) to each error occurence that was exprienced by the user and assign them to the properties (message/statusCode) we have to do the whole this ='s thing
        //so if there is an error occurence the error is assigned to the constructor properties (message/statusCode). We assign them by using the this ='s
        this.statusCode = statusCode; //method
        //then we add this.statusCode
        //this will give us a 401 error
        //the default err handler in express looks for a particular property on the error object called err.status or err.statusCode, and since we made this app with the error class that has status or statusCode then the error is automatically setup for us.

        //every error has its own error stack
    }
    //this is a tool that allows us to throw an app error where there is a message and then a status code
}
module.exports = ExpressError;
