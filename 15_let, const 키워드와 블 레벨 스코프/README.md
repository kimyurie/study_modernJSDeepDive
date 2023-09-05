# 15.1 var 키워드로 선언한 변수의 문제점
## 15.1.1 변수 중복 선언 허용
```js
var x = 1;
var y = 1;

// var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
// 초기화문(변수 선언과 동시에 초기값 할당하는 문)이 있는 변수 선언문은 js엔진에 의해 var키워드가 없는 것처럼 동작!
var x = 100;
// 초기화문이 없는 변수 선언문은 무시된다. 
var y;

console.log(x);
console.log(y);
```
## 15.1.2 함수 레벨 스코프
+ var 키워드로 선언한 변수는 오로지 함수의 코드 블록만을 지역 스코프로 인정
+ 함수 외부에서 var 키워드로 선언한 변수는 코드 블록 내에서 선언해도 모두 전역 변수가 된다.
<br/><br/>
## 15.1.3 변수 호이스팅
```js
// 변수 호이스팅에 의해 var 키워드로 선언한 변수는 변수 선언문 이전에 참조 가능 
// 단, 할당문 이전에 변수를 참조하면 언제나 undefined
console.log(foo); // undefined

foo = 123;

console.log(foo); // 123

// 변수 선언은 런타임 이전에 js 엔진에 의해 암묵적으로 실행
var foo;
```
* 가독성이 낮고 오류 발생 여지 남김
<br/><br/>
# 15.2 let 키워드
## 15.2.1 변수 중복 선언 금지
+ let 키워드로 이름 같은 변수 중복 선언 시 문법 에러 발생
## 15.2.2 블록 레벨 스코프
+ let 키워드로 선언한 변수는 모든 코드 블록을 지역 스코프로 인정하는 블록 레벨 스코프를 따른다.
```js
let foo = 1; // 전역 변수

{
    let foo = 2; // 지역 변수 - 위 foo와는 다른 별개의 변수!
    let bar = 3; // 지역 변수 
}

console.log(foo); // 1
console.log(bar); // ReferenceError: bar is not defined
```
## 15.2.3 변수 호이스팅
+ let 키워드 선언한 변수는 변수 호이스팅이 발생하지 않는 것처럼 동작
```js
console.log(foo); // ReferenceError: foo is not defined
let foo;
```
> ☑️ let 키워드로 선언한 변수는 "선언 단계"와 "초기화 단계"가 분리되어 실행 (var은 같이 실행됨)<br/>
> => 런타임 이전에 js 엔진에 의해 암묵적으로 선언 단계가 먼저 실행되지만 초기화 단계는 변수 선언문에 도달했을 때 실행된다.
* let 키워드로 선언한 변수는 스코프 시작 지점 ~ 초기화 단계 시작 지점(변수 선언문)까지 변수를 참조할 수 없다.
```js
// 초기화 단계가 실행되기 이전에 변수에 접근하려고 하면 참조 에러 발생
// 초기화 이전의 일시적 사각 지대
console.log(foo); // ReferenceError: foo is not defined

let foo; // 변수 선언문에서 초기화 단계 실행
console.log(foo); // undefined

foo = 1;
console.log(foo); // 1
```
+ let 키워드로 선언한 변수는 호이스팅 발생
```js
let foo = 1;

{
    console.log(foo); // ReferenceError // 만약 let이 호이스팅 발생하지 않는다면 foo 값 출력 되어야 함
    let foo = 2;
}
```
## 15.2.4 전역 객체와 let
+ var 키워드로 선언한 전역 변수와 전역 함수, 그리고 선언하지 않은 변수에 값을 할당한 암묵적 전역은 전역 객체 window의 프로퍼티가 된다.
+ 전역 객체 프로퍼티 참조 시 window는 생략 가능
```js
```

