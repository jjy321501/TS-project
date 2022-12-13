type Combinable = number | string;
type ConversionDescriptor = "as-text" | "as-number";

function combine(
  input1: Combinable,
  input2: Combinable,
  resConversion: ConversionDescriptor
) {
  let res;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resConversion === "as-number"
  ) {
    res = +input1 + +input2;
  } else {
    res = input1.toString() + input2.toString();
  }
  //   if (resConversion === "as-number") {
  //     return +res;
  //   } else {
  //     return res.toString();
  //   }
  return res;
}

const combinedAges = combine(30, 26, "as-number");
console.log(combinedAges);

const combineStringAges = combine("30", "26", "as-number");
console.log(combineStringAges);

const combinedNames = combine("Max", "Anna", "as-text");
console.log(combinedNames);
