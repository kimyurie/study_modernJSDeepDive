// 브라우저 환경에서 실행
var x = 1; // 전역 변수
y = 2; // 암묵적 전역
 
function foo(){} // 전역 함수

console.log(window.x); // 1
console.log(x); // 1

console.log(window.y); // 2
console.log(y); /// 2

console.log(window.foo); // ƒ foo(){}
console.log(foo()); // ƒ foo(){}

// -------------------
// 브라우저 환경에서 실행
let x = 1;
 
// let, const 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티가 아니다
console.log(window.x); // undefined
console.log(x); // 1
