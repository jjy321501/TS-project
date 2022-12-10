"use strict";
let userInput;
let userName;
userInput = 5;
userName = "Max";
// userName = userInput // unknown =! string
if (typeof userInput === "string") {
    userName = userInput;
}
function generateError(message, code) {
    throw { message: message, errorCode: code };
    //   while (true) {}
}
generateError("An error occurred!", 500);
