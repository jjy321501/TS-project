"use strict";
let userInput;
let strName;
userInput = 5;
strName = "Max";
// userName = userInput // unknown =! string
if (typeof userInput === "string") {
    strName = userInput;
}
function generateError(message, code) {
    throw { message: message, errorCode: code };
    //   while (true) {}
}
generateError("An error occurred!", 500);
