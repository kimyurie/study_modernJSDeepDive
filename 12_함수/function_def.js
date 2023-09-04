// 기명 함수 리터럴을 단독으로 사용하면 함수 선언문으로 해석
// 함수 선언문에서는 함수 이름 생략 불가
function foo() {console.log('foo');}
foo(); // foo

// 함수 리터럴을 피연산자로 사용하면 함수 선언문이 아니라 함수 리터럴 표현식으로 해석
// 함수 리터럴에서는 함수 이름 생략 가능
// (function bar() {console.log('bar');});
// bar(); // ReferenceError: bar is not defined


// 함수 선언문
   // 식별자       // 함수 이름
var add = function add(x, y){
    return x + y;
};
        // 식별자
console.log(add(2, 5)); // 7 

// 함수 표현식
// 기명 함수 표현식
var add1 = function foo(x, y){
    return x + y;
};

console.log(add1(2, 5)); // 함수 객체를 가리키는 식별자로 호출 / foo로 호출하면 에러

// 화살표 함수
const add2 = (x, y) => x + y;
console.log(add2(1, 2));  // 3