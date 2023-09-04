# 함수란?
> 일련의 과정을 문으로 구현하고 코드 블록으로 감싸서 하나의 실행 단위로 정의한 것
```js
// 함수 정의
function add(x, y){
    return x + y;
}

// 함수 호출
var result = add(2, 5);
console.log(result); // 7
```
# 함수를 사용하는 이유
> 코드의 재사용 / 유지보수의 편의성 높임 / 코드의 신뢰성 높임 / 코드 가독성 향상
<br/><br/>
# 함수 리터럴 
> 리터럴 - 사람이 이해할 수 있는 문자 또는 약속된 기호를 사용해 값을 생성하는 표기 방식
```js
// 변수에 함수 리터럴을 할당
var f = function add(a,b){
    return a + b;
};
```
+ 함수 리터럴도 평가되어 값을 생성하므로 객체! (함수 = 객체)
+ 일반 객체는  호출x 함수는 호출o
<br/><br/>
# 함수 정의
> 함수를 호출하기 이전에 매개변수와 실행할 문들, 반환할 값을 지정하는 것<br/>
#### [ 함수 정의 방식 4가지 ]
```js
// 함수 선언문
function add(x,y){
    return x + y;
}

// 함수 표현식
var add = function (x,y){
    return x + y;
};

// Function 생성자 함수
var add = new Function('x', 'y', 'return x + y');

// 화살표 함수
var add = (x,y) => x + y;
```
## 함수 선언문
> 함수 선언문은 함수 이름 생략 불가<br/>
```js
// 기명 함수 리터럴을 단독으로 사용하면 함수 선언문으로 해석
// 함수 선언문에서는 함수 이름 생략 불가
function foo() {console.log('foo');}
foo(); // foo

// 함수 리터럴을 피연산자로 사용하면 함수 선언문이 아니라 함수 리터럴 표현식으로 해석
// 함수 리터럴에서는 함수 이름 생략 가능
(function bar() {console.log('bar');});
bar(); // ReferenceError: bar is not defined
```
+ 자바스크립트 엔진은 생성된 함수를 호출하기 위해 함수 이름과 동일한 이름의 식별자를 암묵적으로 생성하고 거기에 함수 객체를 할당한다.
```js
   // 식별자       // 함수 이름
var add = function add(x, y){
    return x + y;
};
        // 식별자
console.log(add(2, 5)); // 7 
```
+ 함수는 함수 이름으로 호출하는 것이 아니라 함수 객체를 가리키는 식별자로 호출한다.
<br/><br/>
## 함수 표현식
> 자바스크립트 함수는 일급 객체! -> 함수를 값처럼 자유롭게 사용 가능
+ 함수 리터럴의 함수 이름은 생략 가능 => 익명 함수
```js
// 기명 함수 표현식
var add1 = function foo(x, y){
    return x + y;
};

console.log(add1(2, 5)); // 함수 객체를 가리키는 식별자로 호출 / foo로 호출하면 에러
```
## 함수 생성 시점과 함수 호이스팅
> 함수 호이스팅 : 함수 선언문이 코드의 선두로 끌어올려진 것처럼 동작하는 자바스크립트 고유의 특징<br/>
> 함수 생성 시점 : 함수 선언문으로 정의한 함수와 함수 표현식으로 정의한 함수의 생성 시점이 다르다. 
```js
console.log(add(2, 5)); // 7
console.log(sub(2, 5)); // TypeError: sub is not a function

// 함수 선언문
function add(x,y){
    return x + y;
}

// 함수 표현식
var sub = function (x, y){
    return x - y;
};
```
+ 함수 선언문은 런타임 이전에 js 엔진에 의해 먼저 실행되므로 함수 선언문 이전에 함수 참조할 수 있으며 호출도 가능
+ 함수 표현식은 함수 호이스팅 아닌 변수 호이스팅 발생 -> 변수 호이스팅은 런타임에 평가 -> 반드시 함수 표현식 이후에 참조 또는 호출! 아님 에러 발생
## Function 생성자 함수
> 일반적 x 바람직 x
## 화살표 함수
```js
// 화살표 함수
const add2 = (x, y) => x + y;
console.log(add2(1, 2));  // 3
```
# 함수 호출
## 매개변수와 인수
+ 매개변수는 함수 내부에서만 참조 가능, 함수 외부에서는 참조 불가 => 매개변수의 스코프(유효 범위)는 함수 내부!
+ 함수는 매개변수 개수와 인수의 개수가 일치하는 지 체크 x
```js
function add(x,y){
    return x + y;
}

console.log(add(2)); // NaN ( 2 + undefined = NaN)
```
+ 매개변수보다 인수가 더 많은 경우 초과된 인수는 무시
```js
function add1(x, y){
    return x + y;
}

console.log(add(2,3,7)); // 5
```
## 인수 확인
## 매개변수의 최대 개수
> 이상적인 함수는 한가지 일만 해야하며 가급적 작게 만들어야 함 (이상적 0개 ~최대 3개)
## 반환문
> 실행 결과를 함수 외부로 반환
* 반환문은 함수의 실행을 중단하고 함수 몸체를 빠져 나간다.
```js
function multiply(x, y){
    return x * y;
    // 반환문 이후 다른 문이 존재하면 그 문은 실행되지 않고 무시
    console.log('실행되지 않는다'); 
}

console.log(multiply(3, 5)) // 15
```
# 참조에 의한 전달과 외부 상태의 변경  
```js
// primitive는 원시값 전달받고, obj는 객체 전달받음
function changeVal(primitive, obj){
    primitive += 100;
    obj.name = 'Kim';
}

var num = 100;
var person = {name:'Lee'};

console.log(num); // 100
console.log(person); // { name: 'Lee' }

changeVal(num, person); // 원시값은 값 자체가 복사되어 전달되고 객체는 참조값이 복사되어 전달

console.log(num); // 100 // 원시값은 원본이 훼손되지 않음
console.log(person); // { name: 'Kim' } // 객체는 원본이 훼손됨
```
# 다양한 함수의 형태
## 즉시 실행 함수
> 단 한번만 호출, 다시 실행 x
+ 반드시 그룹 연산자(...)로 감쌈
+ 익명 함수 사용하는 것이 일반적
```js
(function (){
    var a = 3;
    var b = 5;
    return a * b;
}());
```
## 재귀 함수
> 함수가 자기 자신을 호출하는 것을 수행하는 함수
```js
// 10부터 0까지 출력하는 함수 (재귀 함수 사용 x)
function countdown(n){
    for(var i = n; i>=0; i--) console.log(i);
}

countdown(10);

// (재귀 함수 사용 o)
function countdown(n){
    if (n < 0) return;
    console.log(n);
    countdown(n - 1); // 재귀 호출
}

countdown(10);
```
## 중첩 함수
> 함수 내부에 정의된 함수
+ 중첩 함수를 포함하는 함수 : 외부 함수
+ 중첩 함수는 외부 함수 내부에서만 호출 가능
```js
function outer(){
    var x = 1;

    // 중첩 함수
    function inner(){
        var y = 2;
        console.log(x + y); // 3 // 외부 함수의 변수 참조 가능
    }
    inner();
}

outer();
```
## ⭐콜백 함수
> 함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수<br/>
> 고차 함수 : 매개변수를 통해 함수의 외부에서 콜백 함수를 전달받은 함수
```js
// 외부에서 전달받은 f를 n만큼 반복 호출
function repeat(n,f){
    for(var i = 0; i < n; i++){
        f(i); // i를 전달하면서 f를 호출
    }
}

var logAll = function(i){
    console.log(i);
};

// 반복 호출할 함수를 인수로 전달
repeat(5, logAll); // 0 1 2 3 4 5 // logAll이 콜백함수


var logOdds = function (i){
    if(i%2) console.log(i);
};

// 반복 호출할 함수를 인수로 전달
repeat(5, logOdds); // 1 3 // logOdds이 콜백함수
```






