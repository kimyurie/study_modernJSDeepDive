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

console.log(x); // ✔️100
console.log(y); // ✔️1
```
+ 동일한 이름의 변수가 선언되있는 것을 모르고 변수를 중복 선언하면서 값까지 할당하면 의도치 않게 먼저 선언된 변수 값이 변경되는 부작용이 발생한다
___
<br/><br/>
## 15.1.2 함수 레벨 스코프
> var 키워드로 선언한 변수는 오로지 `함수의 코드 블록만을` 지역 스코프로 인정<br/>
→ 함수 외부에서 var 키워드로 선언한 변수는 코드 블록 내에서 선언해도 모두 전역 변수가 된다
+ 함수 레벨 스코프는 전역 변수 남발 가능성을 높여 의도치 않게 전역 변수가 중복 선언되는 경우 발생
___
<br/><br/>
## 15.1.3 변수 호이스팅
> 변수 선언문이 스코프의 선두로 끌어올려진 것처럼 동작 
+ 에러 발생은 안되지만 가독성이 낮고 오류 발생 여지 남김
___
<br/><br/>
# 15.2 let 키워드
> var 키워드 단점 보완하기 위해 let, const 키워드 도입 
## 15.2.1 변수 중복 선언 금지
+ ✔️let 키워드로 이름 같은 변수 중복 선언 시 문법 에러 발생
___
## 15.2.2 블록 레벨 스코프
+ let 키워드로 선언한 변수는 모든 코드 블록을 지역 스코프로 인정하는 블록 레벨 스코프를 따른다
```js
let foo = 1; // 전역 변수

{
    let foo = 2; // 지역 변수 - 위 foo와는 다른 별개의 변수!
    let bar = 3; // 지역 변수 
}

console.log(foo); // 1
// 전역에서 bar 변수 참조 불가
console.log(bar); // ReferenceError: bar is not defined
```
+ 함수도 코드 블록이므로 스코프를 만들며 함수 내 코드 블록은 함수 레벨 스코프에 중첩된다
<img src="https://velog.velcdn.com/images/ssomcandy777/post/8c94e56f-0a65-4ac5-a58a-1acb487c0ed2/image.PNG" width ='600'/><br/>
___
<br/><br/>
## 15.2.3 ⭐변수 호이스팅
+ let 키워드 선언한 변수는 var 키워드와 달리 `변수 호이스팅이 발생하지 않는 것처럼` 동작
```js
console.log(foo); // ReferenceError: foo is not defined
let foo;
```
+ ✔️let 키워드로 선언한 변수는 `선언 단계와 초기화 단계가 분리`되어 실행 (var은 같이 실행됨)<br/>
  → 런타임 이전에 js 엔진에 의해 암묵적으로 선언 단계가 먼저 실행되지만 초기화 단계는 변수 선언문에 도달했을 때 실행된다
```js
// 초기화 단계가 실행되기 이전에 변수에 접근하려고 하면 참조 에러 발생
// 초기화 이전의 일시적 사각 지대
console.log(foo); // ReferenceError: foo is not defined

let foo; // 변수 선언문에서 초기화 단계가 실행된다 
console.log(foo); // undefined

foo = 1;
console.log(foo); // 1
```
+ let 키워드로 선언한 변수는 호이스팅 발생하지 않는 것처럼 보이지만 그렇지 않다
```js
let foo = 1; // 전역 변수

{
    console.log(foo); // ReferenceError // 만약 변수 호이스팅 발생하지 않는다면 전역 변수 foo값 출력 되어야 함
    let foo = 2; // 지역 변수 
}
```
+ js는 let, const 포함 모든 선언을 호이스팅하지만 let, const, class를 사용한 선언문은 호이스팅이 발생하지 않는 것처럼 동작한다
___
<br/><br/>
## 15.2.4 전역 객체와 let
+ var 키워드로 선언한 전역 변수 / 전역 함수 / 선언하지 않은 변수에 값을 할당한 암묵적 전역은 `전역 객체 window의 프로퍼티`가 된다
+ 전역 객체 프로퍼티 참조 시 window는 생략 가능 
```js
// 브라우저 환경에서 실행하기
var x = 1; // 전역 변수
y = 2; // 암묵적 전역
 
function foo(){} // 전역 함수

console.log(window.x); // 1
console.log(x); // 1

console.log(window.y); // 2
console.log(y); /// 2

console.log(window.foo); // ƒ foo(){}
console.log(foo()); // ƒ foo(){}
```
+ let 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 ❌ <br/>
  → let 전역 변수는 보이지 않는 개념적 블록 내에 존재(전역 렉시컬 환경의 선언적 환경 레코드)ㄴ23.실행 컨텍스트 
```js
// 브라우저 환경에서 실행하기 
let x = 1;
 
// let, const 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티가 아니다
console.log(window.x); // undefined
console.log(x); // 1
```
___
<br/><br/>
# 15.3 ⭐const 키워드
## 15.3.1 선언과 동시에 초기화
+ ✔️const 키워드로 선언한 변수는 반드시 선언과 동시에 초기화해야 한다 (선언만 하면 에러 발생)
```js
const foo = 1;
```
+ ✔️const 키워드로 선언한 변수는 블록 레벨 스코프를 가지며 변수 호이스팅이 발생하지 않는 것처럼 동작한다 
```js
{
    // 변수 호이스팅이 발생하지 않는 것처럼 동작
    console.log(foo); // ReferenceError: foo is not defined
    const foo = 1;
    console.log(foo); // 1
}

// 블록 레벨 스코프 가짐
console.log(foo); // ReferenceError: foo is not defined
```
___
## 15.3.2 재할당 금지
+ ✔️const 키워드로 선언한 변수는 재할당이 금지된다.
___
## 15.3.3 상수
> 상수는 재할당이 금지된 변수이며 const 키워드를 사용한다 
+ 상수는 상태 유지와 가독성, 유지보수의 편의를 위해 적극적으로 사용해야 한다
+ const 변수에 원시 값을 할당한 경우 할당된 값을 변경할 수 있는 방법은 없다 
+ 일반적으로 상수 이름은 ✔️대문자로 선언하며 여러 단어로 이루어진 경우 스네이크 케이스(_)로 표현하는 게 일반적이다 
___
## 15.3.4 const 키워드와 객체
+ ✔️const 키워드로 선언한 변수에 객체를 할당한 경우에는 값을 변경할 수 있다(객체는 재할당 없이 직접 변경 가능하기 때문)
```js
const person = {
    name : 'Lee'
};

// 객체는 변경 가능한 값이므로 재할당 없이 변경 가능
person.name = 'Kim';

console.log(person); // { name: 'Kim' }
```
+ const 키워드는 재할당을 금지할 뿐 "불변"을 의미하지는 않는다
___
<br/><br/>
# 15.4 var vs. let vs. const
```
- ES6를 사용한다면 var 키워드는 사용하지 않는다
- 재할당이 필요한 경우에 한정해 let 키워드를 사용하며 이 때 변수의 스코프는 최대한 좁게 만든다
- 변경이 발생하지 않고 읽기 전용으로 사용하는(재할당이 필요없는 상수) 원시 값과 객체에는 const 키워드를 사용한다
  (const 키워드는 재할당을 금지하므로 var, let 키워드보다 안전하다 
```


