# 타입 변환이란?
> 명시적 타입 변환(타입 캐스팅) : 개발자가 의도적으로 값의 타입 변환
```js
var x = 10;

var str = x.toString(); // 명시적 타입 변환 (숫자 -> 문자열)
console.log(typeof str, str); // string, 10

console.log(typeof x, x); // number 10 // x 변수의 값이 변경된 것은 아님
```
> 암묵적 타입 변환(타입 강제 변환) : 개발자의 의도와 상관없이 표현식을 평가하는 도중에 자바스크립트 엔진에 의해 암묵적으로 타입 자동 변환
```js
var x = 10;

var str = x + ' '; // 암묵적 타입 변환 (숫자 -> 새로운 문자열 생)
console.log(typeof str, str); // string, 10

cosole.log(typeof x, x); // number, 10 // x 변수의 값이 변경된 것은 아님

```
+ 명시적 타입 변환 or 암묵적 타입 변환은 윈시값을 직접 변경하는 것은 x -> 변경 불가능한 값
+ 기존 원시값 이용해 다른 타입의 새로운 값을 생성하는 것
<br/><br/>
# 암묵적 타입 변환
## 문자열 타입으로 변환
```js
// 숫자 타입
NaN + '' // "NaN"
Infinity + '' // "Infinity"

// 불리언 타입
true + '' // "true"
false + '' // "false"

// null 타입
null + '' // "null"

// undefined 타입
undefined + '' // "undefined"

// 심벌 타입
(Symbol())  + '' // TypeError

// 객체 타입
({}) + '' // "[object Object]"
Math + '' // "[object Math]"
[] + '' // ""
[10,20] + '' // "10,20"
(function(){}_ + '' // "function(){}"
Array + '' //  "function Array() { [native code] }"
```
<br/><br/>
## 숫자 타입으로 변환
```js
// 문자열 타입
+'' // 0
+'0' // 0
+'1' // 1
+'string' // NaN

// 불리언 타입
+true // 1
+false // 0

// null 타입
+null // 0

//  undefined 타입
+undefined // NaN

// 심벌 타입
+Symbol() // TypeError

// 객체 타입
+{} // NaN
+[] // 0
+[10,20] // NaN
+(function(){}) // NaN
```
+ ' ', [ ], null, false 는 0
+ 객체와 빈 배열이 아닌 배열, undefined는 변환이 되지 않아 NaN
<br/><br/>
## 불리언 타입으로의 변환
### ⭐ Truthy 값 Falsy 값
> 자바스크립트 엔진은 불리언 타입이 아닌 값을 Truthy 값(참으로 평가되는 값) 또는 Falsy 값(거짓으로 평가되는 값)으로 구분
+ Falsy 값 : false, undefined, null, 0, -0, NaN, ' '(빈 문자열)
+ Truthy 값 : Falsy 값 외 모두
<br/><br/>
# 명시적 타입 변환
## 문자열 타입으로 변환
```js
1️⃣ ex) String(1); // "1"
2️⃣ ex) (1).toString; // "1"
3️⃣ ex) 1 + ' '; // "1"
```
## 숫자 타입으로 변환
```js
1️⃣ ex) Number('0'); // 0
2️⃣ ex) parseInt('0'); // 0
3️⃣ ex) +'0' // 0
4️⃣ ex) '0' * 1 // 0
```
## 불리언 타입으로 변환
```js
1️⃣ ex) Boolean('x'); // true
2️⃣ ex) !!'x'; // true
```
<br/><br/>
# 단축 평가
> 표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지 평가 과정을 생략하는 것
## 논리 연산자를 사용한 단축 평가
```
ex)
true || anything  -> true
false || anything -> anything
true && anything -> anything
false && anything  ->  false
```
+ 단축 평가 사용 시 if문 대체 가능
```js
var done = true;
var message = '';

if (done) message = '완료';
// 위와 아래식 동일 - && 연산자 표현식으로 if문 대체 가능
message = done && '완료';

console.log(message); // 완료
```
```js
var done = false;
var message = '';

if (!done) message = '미완료';
// 위와 아래식 동일 - || 연산자 표현식으로 if문 대체 가능
message = done || '미완료';

console.log(message); // 미완료
```
## 옵셔널 체이닝 연산자
> ?.
## null 병합 연산자
> ??








