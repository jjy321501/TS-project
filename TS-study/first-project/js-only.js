// const button = document.querySelector("button");
// const input1 = document.getElementById("num1");
// const input2 = document.getElementById("num2");

// function add(num1, num2) {
// if(typeof) 분기문으로 오류제거 및 변수 앞 +로 숫자타입 변환
if (typeof num1 === "number" && typeof num2 === "number") {
  return num + num2;
}
return +num1 + +num2;
// }

button.addEventListener("click", function () {
  console.log(add(input1.value, input2.value));
});
