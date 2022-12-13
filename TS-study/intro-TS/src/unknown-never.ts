let userInput: unknown;
let strName: string;

userInput = 5;
strName = "Max";

// userName = userInput // unknown =! string

if (typeof userInput === "string") {
  strName = userInput;
}

function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
  //   while (true) {}
}

generateError("An error occurred!", 500);
