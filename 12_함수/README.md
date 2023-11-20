# 12.1 함수란?
> 일련의 과정을 문으로 구현하고 코드 블록으로 감싸서 하나의 실행 단위로 정의한 것
```js
// 함수 정의
function add(x, y){   // x,y → 매개변수 
    return x + y;
}

// 함수 호출
var result = add(2, 5); // 2,5 → 인수
console.log(result); // 7
```
___
<br/><br/>
# 12.2 함수를 사용하는 이유
> 코드의 재사용을 통해 중복 제거 / 유지보수의 편의성 높임 / 코드의 신뢰성 높임 / 코드 가독성 향상시킴
___
<br/><br/>
# 12.3 함수 리터럴 
```js
// 변수에 함수 리터럴을 할당
var f = function add(a,b){
    return a + b;
};
```
+ 함수 리터럴도 평가되어 값을 생성하므로 ⭐함수는 객체이다(js의 중요한 특징 ㄴ18장 함수와 일급 객체)
+ 일반 객체는 호출❌ 함수는 호출⭕
___
<br/><br/>
# 12.4 함수 정의
> 함수를 호출하기 이전에 인수를 전달받을 매개변수와 실행할 문들, 반환할 값을 지정하는 것으로 정의된 함수는 js엔진에 의해 평가되어 함수 객체가 된다 
+ 함수 정의 방식 4가지
```js
// 1. 함수 선언문
function add(x,y){
    return x + y;
}

// 2. 함수 표현식
var add = function (x,y){
    return x + y;
};

// 3. Function 생성자 함수
var add = new Function('x', 'y', 'return x + y');

// 4. 화살표 함수
var add = (x,y) => x + y;
```
```
[ 🗒️변수 선언과 함수 정의 ]
변수는 '선언한다', 함수는 '정의한다'고 표현
→ 함수 선언문이 평가되면 식별자가 암묵적으로 생성되고 함수 객체가 할당된다 
```
___
<br/><br/>
## 12.4.1~2 함수 선언문과 함수 리터럴
+ 함수 선언문은 함수 리터럴과 형태가 동일하며 문맥에 따라 함수 선언문으로 해석될수도 있고, 함수 리터럴 표현식으로 해석될 수도 있다
+ 단, 함수 선언문은 `함수 이름을 생략 불가능❌` 함수 리터럴은 `함수 이름 생략 가능⭕` (기명 함수 리터럴일 때 함수 선언문과 형태 동일)
+ 함수 선언문과 함수 리터럴 표현식이든 함수가 생성되는 건 동일하지만 함수를 생성하는 내부 동작에 차이가 있다
```js
function foo() { console.log('foo');} // 함수 선언문

foo(); // foo

(function bar() {console.log('bar');}) // 그룹 연산자() 내에 있으므로 함수 리터럴 표현식
bar(); // ReferenceError: bar is not defined
```
+ 위 코드에서 함수 선언문으로 생성된 foo()는 호출 가능하고 함수 리터럴 표현식으로 생성된 bar()는 호출할 수 없는 이유?<br/>
→ `함수 리터럴에서 함수 이름은 함수 몸체 내에서만 참조할 수 있는 식별자다.` 아래 그림과 같이 함수 이름 bar()는 함수 몸체 내에서만 참조할 수 있는 식별자이므로 몸체 외부에서는 함수를 호출할 수 없다 
<img src="https://velog.velcdn.com/images/kozel/post/979ec28d-9cce-4f91-9d0d-9dcf7edad2e6/image.jpeg" width='600'/><br/><br/>
→ foo는 js 엔진이 암묵적으로 생성한 식별자다. `js 엔진은 생성된 함수를 호출하기 위해 함수 이름과 동일한 식별자를 암묵적으로 생성하고 거기에 함수 객체를 할당한다`
<img src="https://velog.velcdn.com/images/kozel/post/3b48511a-ac0e-441e-a2a9-f31ba2325374/image.jpeg" width='600'/><br/><br/>
+ 즉, 함수는 함수 이름으로 호출하는 것이아니라 `함수 객체를 가리키는 식별자로 호출`한다
<img src="https://velog.velcdn.com/images/kozel/post/4a5174b1-b72e-4a5b-8350-91e30f3af9e0/image.jpeg" width='600'/><br/><br/>
+ js 함수는 값의 성질을 갖는 객체인 일급 객체이다 (함수를 값처럼 자유롭게 사용 가능)
___
<br/><br/>
## 12.4.3 함수 생성 시점과 호이스팅 
```js
// 함수 참조
console.dir(add); // [Function: add]
console.dir(sub); // undefined 

// 함수 호출
console.log(add(2,5)); // 7 // 함수 선언문으로 정의한 함수는 함수 선언문 이전에 호출 가능 (함수 호이스팅 발생되었기 때문)
console.log(sub(2,5)); // TypeError: sub is not a function // 함수 표현식으로 정의한 함수는 함수 표현식 이전에 호출 불가능 (undefined를 호출하는 것과 마찬가지이므로 타입에러 발생)

// 함수 선언문
function add(x, y) {
    return x + y;
}

// 함수 표현식
var sub = function (x, y) {
    return x - y;
};
```
+ 함수 선언문으로 정의한 함수와 함수 표현식을 정의한 함수의 생성 시점이 다르다 (다시 설명 적어놓기 164, 165p)
```
⚠️ 변수 호이스팅과 함수 호이스팅의 차이? ⚠️
  - var 키워드로 선언된 변수는 `undefined`로 초기화 → var 키워드를 사용한 변수 선언문 이전에 변수를 참조하면 변수 호이스팅에 의해 `undefined으로 평가`
  - 함수 선언문을 통해 생성된 식별자는 `함수 객체`로 초기화 → 함수 선언문으로 정의한 함수를 함수 선언문 이전에 호출하면 함수 호이스팅에 의해 `호출이 가능`
```
+ 함수 표현식으로 정의한 함수는 반드시 함수 표현식 이후에 참조 또는 호출해야 한다
+ 함수 호이스팅은 함수 호출 전 반드시 함수 선언해야 한다는 규칙 무시하므로 함수 선언문 대신 함수 표현식 사용을 권장한다
___
<br/><br/>
## 12.4.4 Function 생성자 함수 
___
<br/><br/>
## 12.4.5 화살표 함수
> function 키워드 대신 화살표=> 를 사용해 좀 더 간략한 방법으로 함수를 선언
+ 화살표 함수는 항상 익명 함수로 정의한다
```js
// 화살표 함수
const add = (x, y) => x + y;
console.log(add(2,5)); // 7
```
+ 화살표 함수는 기존의 함수보다 내부 동작 또한 간략화되어 있다
  (생성자 함수로 사용 불가 / 기존 함수와 this 바인딩 방식 다름 / prototype 프로퍼티 x / arguments 객체 생성 x) => ㄴ26.3 화살표 함수
___
<br/><br/>
# 12.5 함수 호출 
## 12.5.1 매개변수와 인수
> 함수 실행을 위해 필요한 값을 함수 외부에서 내부로 전달할 필요가 있는 경우, 매개변수를 통해 인수를 전달
+ 인수는 값으로 표현될 수 있는 표현식이어야 되며, 함수를 호출할 때 지정하며 개수와 타입에 제한이 없다
```js
function add(x, y){
    return x + y;
}

// 아래처럼 함수가 호출되면 함수 몸체 내에 암묵적으로 매개변수가 생성되고 일반 변수와 마찬가지로 undefined로 초기화된 이후
// 인수 1과 2가 매개변수 x와 y에 순서대로 할당되고 함수 몸체의 문들이 실행
var result = add(1, 2); 
```
```js
function add(x, y){
    console.log(x, y); // 2,5  // 매개변수 x, y는 함수 몸체 내부에서만 참조 가능
    return x + y;
}

add(2, 5);

// 함수 몸체 외부에서는 참조 불가능 ( → 매개변수의 스코프(유효 범위)는 함수 내부이다) ㄴ13. 스코프 
console.log(x, y); // ReferenceError: x is not defined
```
```js
function add(x, y){
    return x + y;
}

// 함수 호출 시 매개변수의 개수만큼 인수를 전달하지 않아도 에러발생x
console.log(add(2)); // NaN (2 + undefined이기 때문에)
```
```js
function add(x, y){
    // 초과된 인수 포함 모든 인수는 암묵적으로 arguments 객체의 프로퍼티에 보관
    console.log(arguments); // [Arguments] { '0': 2, '1': 5, '2': 7 }
    return x + y;
}

// 매개변수보다 인수가 더 많은 경우 초과된 인수는 무시
console.log(add(2,5,7)); 
```
+ arguments 객체는 함수를 정의할 때 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하게 사용 (ㄴ18.2.1 arguments 프로퍼티)
___
<br/><br/>
## 12.5.2 인수 확인 
```
- js 함수는 매개변수와 인수의 개수가 일치하는 지 확인 ❌
- js는 동적 타입언어이므로 js 함수는 매개변수 타입을 사전에 지정할 수 ❌
  → 따라서 함수를 정의할 때 적절한 인수가 전달되었는지 확인할 필요가 있다
```
### 인수 확인 방법 <br/>
1️⃣  `typeof 사용`해서 인수 타입 확인하는 방법 
```js
function add(x, y){
    if (typeof x !== 'number' || typeof y !== 'number'){
        throw new TypeError('인수는 모두 숫자 값이어야 합니다');
    }

    return x + y;
}

console.log(add(2,3)); // 5
console.log(add(2)); // TypeError: 인수는 모두 숫자 값이어야 합니다
console.log(add('a', 'b')); // TypeError: 인수는 모두 숫자 값이어야 합니다
```
```
- 위와 같이 함수 내부에서 적절한 인수가 전달되었는지 확인하더라도 부적절한 호출을 사전에 방지할 수 없고 에러는 런타임에 발생
  → 타입 스크립트 사용해 컴파일 시점에 부적절한 호출 방지하여 해결 가능 
- arguments 객체 통해 인수 개수 확인도 가능
```
2️⃣  인수가 전달되지 않은 경우 `단축평가를 사용`해 매개변수에 기본값을 할당하는 방법 
```js
function add(a,b,c){
    a = a || 0;
    b = b || 0;
    c = c || 0;
    return a + b + c;
}

console.log(add(1,2,3)); // 6
console.log(add(1,2)); // 3
console.log(add(1)); // 1
console.log(add()); // 0
```
3️⃣  ES6에서 도입된 `매개변수 기본값 사용`해 인수 체크 및 초기화 간소화 가능 <br/>
   (매개변수 기본값은 매개변수에 인수를 전달하지 않았을 경우와 undefined를 전달한 경우에만 유효)
```js
function add(a = 0, b = 0, c = 0){
    return a + b + c;
}

console.log(add(1,2,3)); // 6
console.log(add(1,2)); // 3
console.log(add(1)); // 1
console.log(add()); // 0
```
___
<br/><br/>
## 12.5.3 매개변수의 최대 개수 
+ 충분히 많은 매개변수를 지정할 수 있지만 이상적인 매개변수의 개수는 0개이며 적을수록 좋다(매개변수의 개수가 많다 = 함수가 여러가지 일을 한다) <br/>
  → `이상적인 함수는 한 가지일만 해야하며 가급적 작게 만들어야 한다`
+ 매개변수는 최대 3개 이상 넘지 않는 것을 권장하며 그 이상의 매개변수가 필요하다면 하나의 매개변수를 선언하고 객체를 인수로 전달하는 것이 유리하다 (172p)
___
<br/><br/>
## 12.5.4 반환문
+ 반환문은 함수의 실행을 중단하고 함수 몸체를 빠져나간다 
```js
function multiply(x, y){
    return x * y; // 반환문
    // 반환문 이후에 다른 문이 존재하면 그 문은 실행❌
    console.log('실행되지 않는다');
}

console.log(multiply(3, 5)); // 15
```
+ return 키워드 뒤에 표현식 명시적으로 지정하지 않거나 아예 생략하면 undefined 반환
+ return 키워드와 반환값 사이에 줄바꿈이 있으면 세미콜론 자동 삽입 기능에 의해 세미콜론이 추가되어 아래 코드와 같이 의도치 않은 결과 발생 
```js
function multiply(x, y){
    return 
    x * y;
}

console.log(multiply(3, 5)); // undefined
```
+ 반환문은 함수 몸체 내부에서만 사용 가능하며 전역에서 사용시 문법 에러 발생
___
<br/><br/>
# 12.6 참조에 의한 전달과 외부 상태의 변경
___
<br/><br/>
# 12.7 다양한 함수의 형태 
## 12.7.1 즉시 실행 함수
> 함수 정의와 동시에 즉시 호출되는 함수로 단 한번만 호출되며 다시 호출할 수 ❌
+ 즉시 실행 함수는 함수명이 없는 익명 함수를 사용하는 것이 일반적
```js
(function (){
    var a = 3;
    var b = 5;
    return a * b;
}());
```
+ 그룹 연산자로 함수를 묶은 이유는 먼저 함수 리터럴을 평가해서 함수 객체를 생성하기 위해서이다
```js
// 그룹 연산자의 피연산자는 값으로 평가되므로 기명 or 무명 함수를
// 그룹 연산자로 감싸면 함수 리터럴로 평가되어 함수 객체가 된다 
console.log(typeof(function f(){})); // function
console.log(typeof(function(){})); // function
```
+ 즉시 실행 함수도 일반 함수처럼 값을 반환할 수 있고 인수를 전달할 수도 있다
```js
var res = (function (){
    var a = 3;
    var b = 5;
    return a * b;
}());

console.log(res); // 15

res2 = (function (a, b){
    return a * b;
}(3, 5));

console.log(res2); // 15
```
+ 즉시 실행 함수 내에 코드를 모아두면 혹시나 있을 변수나 함수 이름의 충돌을 방지할 수 있다(ㄴ14.3 전역변수의 사용을 억제하는 방법)
___
<br/><br/>
## 12.7.2 재귀 함수 
> 자기 자신을 호출하는 행위, 즉 재귀 호출을 수행하는 함수
```js
// 10부터 0까지 출력하는 함수 (반복문 사용)
function countdown(n){
    for (var i = n; i >= 0; i--) console.log(i);
}

countdown(10);
```
```js
// 10부터 0까지 출력하는 함수 (재귀함수 사용)
function countdown(n){
    if (n < 0) return;
    console.log(n);
    countdown(n - 1); // 재귀 호출
}

countdown(10);
```
--ㄴㄴㄴㄴㄴㄴㄴ팩토리얼 추가
___
<br/><br/>
## 12.7.3 중첩 함수 
> 함수 내부에 정의된 함수
```js
function outer() {
    var x = 1;

    // 중첩 함수
    function inner() {
        var y = 2;
        // 외부 함수(outer())의 변수(x)를 참조할 수 있다 
        console.log(x + y); // 3
    }
    inner(); // 중첩 함수는 외부 함수 내부에서만 호출 가능 (외부함수 : 중첩 함수를 포함하는 함수)
}

outer(); 
```
## 12.7.4 콜백 함수
> 함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수 
+ 아래 코드의 문제 : repeat 함수는 console.log(i)에 강하게 의존하고 있어 다른 일을 할 수 x <br/>
  → repeat 함수의 반복문 내부에서 다른 일을 하고 싶다면 함수를 새롭게 정의해야한다
```js
// n만큼 반복하는 함수
function repeat1(n) {
    for (var i = 0; i < n; i++) console.log(i);
}

repeat1(5); // 0 1 2 3 4

function repeat2(n) {
    for (var i = 0; i < n; i++){
        if (i % 2) console.log(i);
    }
}

repeat2(5); // 1 3
```
+ 해결 : 함수를 합성한다 <br/>
  → 함수의 변하지 않는 공통 로직은 미리 정의해두고 경우에 따라 변경되는 로직은 추상화해서 함수 외부에서 내부로 전달한다
```js
// 고차 함수 repeat
function repeat(n, f){ 
    for (var i = 0; i < n; i++){
        f(i); // 경우에 따라 변경되는 일을 함수 f로 추상화
    }
}

// 콜백 함수 logAll
var logAll = function (i) {
    console.log(i);
};

// 반복호출할 함수를 인수로 전달
repeat(5, logAll); // 0 1 2 3 4

// 콜백 함수 logOdds
var logOdds = function (i) {
    if (i % 2) console.log(i);
};

// 반복호출할 함수를 인수로 전달
repeat(5, logOdds); // 1 3
```
> 고차 함수 : 매개변수를 통해 함수의 외부에서 콜백 함수를 전달받은 함수 (ㄴ27.9 배열 고차 함수) 
+ 고차 함수는 콜백함수를 자신의 일부분으로 합성한다
+ 고차 함수는 매개변수를 통해 전달받은 콜백 함수의 호출 시점을 결정해서 호출한다
+ 콜백 함수는 고차 함수에 의해 호출되며 이떄 고차 함수는 필요에 따라 콜백 함수에 인수를 전달할 수 있다 (고차 함수에 콜백 함수를 전달할 때 콜백 함수를 호출하지 않고 함수 전체를 전달해야 한다)
+ ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ다시 정리
___
<br/><br/>
## 12.7.5 순수 함수와 비순수 함수
> 순수 함수 : 어떤 외부 상태(전역 변수, 서버 데이터, 파일, console, DOM 등)에 의존하지도, 변경하지도 않는 즉 부수 효과가 없는 함수
```js
var count = 0;

// 순수 함수 increase는 동일한 인수가 전달되면 언제나 동일한 값을 반환
function increase(n) {
    return ++n;
}

// 순수 함수가 반환한 결과값을 변수에 재할당해 상태 변경
count = increase(count);
console.log(count); // 1

count = increase(count);
console.log(count); // 2
```
+ 순수 함수는 일반적으로 최소 하나 이상의 인수를 전달받으며 인수를 변경하지 ❌(인수의 불변성 유지)
+ 순수 함수는 함수의 외부 상태를 변경하지 ❌
> 비순수 함수 : 외부 상태에 의존하거나 외부 상태를 변경하는 즉 부수 효과가 있는 함수
```js
var count = 0;

// 비순수 함수
function increase() {
    return ++count; // 외부 상태에 의존해 외부 상태를 변경
}

// 외부 상태 (count) 변경하므로 상태 변화 추적하기 어려움 => 비순수 함수 줄여야하는 이유 
increase();
console.log(count); // 1

increase();
console.log(count); // 2
```
+ 위 코드와 같이 인수를 전달받지 않고 함수 내부에서 외부 상태 직접 참조하면 외부 상태에 의존하게 되어 반환값이 변할 수 있고, 외부 상태도 변할 수 있으므로 비순수 함수가 된다
+ 함수 내부에서 외부 상태를 직접 참조하지 않더라도 매개변수를 통해 객체를 전달받으면 비순수 함수가 된다
```
함수형 프로그래밍은 순수 함수를 통해 부수 효과를 최대한 억제해(비순수 함수 사용 지양) 오류를 피하고 프로그래밍의 안전성을 높인다 
```
___


