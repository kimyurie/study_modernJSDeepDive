# 9.1 타입 변환이란?
> `명시적 타입 변환(타입 캐스팅)` : 개발자가 의도적으로 값의 타입을 변환하는 것
```js
var x = 10;

var str = x.toString(); // 명시적 타입 변환 (숫자 → 문자열)
console.log(typeof str, str); // string 10

console.log(typeof x, x); // number 10 // x 변수의 값이 변경된 것은 아님
```
> `암묵적 타입 변환(타입 강제 변환)` : 개발자의 의도와 상관없이 표현식을 평가하는 도중에 자바스크립트 엔진에 의해 암묵적으로 타입을 자동 변환하는 것
```js
var x = 10;

var str = x + ''; // 암묵적 타입 변환 (x변수 숫자값 10 바탕으로 새로운 문자열 '10' 생성)
console.log(typeof str, str); // string, 10

cosole.log(typeof x, x); // number, 10 // x 변수의 값이 변경된 것은 아님

```
+ 명시적 타입 변환이나 암묵적 타입 변환은 기존 윈시 값을 직접 변경하는 것은 ❌ (원시 값은 변경 불가능한 값이므로)
+ 타입 변환은 기존 원시 값 이용해 다른 타입의 새로운 원시 값을 생성하는 것이다
___
<br/><br/>
# 9.2 암묵적 타입 변환
## 9.2.1 문자열 타입으로 변환
```js
// 숫자 타입
-0 + '' // "0"
NaN + '' // "NaN"
Infinity + '' // "Infinity"
-Infinity + '' // "-Infinity"

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
## 9.2.2 숫자 타입으로 변환
+ 아래와 같이 산술 연산자 사용시 숫자 타입으로 변환
```js
1 - '1' // 0
1 * '10' // 10
1 / 'one' // NaN
```
+ 아래와 같이 비교 연산자 사용시 숫자 타입으로 변환
```js
'1' > 0 // true
```
+ 즉, + 단항 연산자는 피연산자가 숫자 타입이 아니면 숫자 타입의 값으로 암묵적 타입 변환을 수행한다
+ ( ⚠️ 표시된 부분 주의 )
```js
// 문자열 타입
+'' // 0 ⚠️
+'0' // 0
+'1' // 1
+'string' // NaN

// 불리언 타입
+true // 1 ⚠️
+false // 0 ⚠️

// null 타입
+null // 0 ⚠️

//  undefined 타입
+undefined // NaN ⚠️

// 심벌 타입
+Symbol() // TypeError

// 객체 타입
+{} // NaN ⚠️
+[] // 0 ⚠️
+[10,20] // NaN ⚠️
+(function(){}) // NaN
```
<br/><br/>
## 9.2.3 불리언 타입으로의 변환
### Truthy 값 Falsy 값
```js
if(!false) console.log(false)
```
+ js 엔진은 불리언 타입이 아닌 값을 Truthy 값(참으로 평가되는 값) 또는 Falsy 값(거짓으로 평가되는 값)으로 구분
```js
// ㄴ아래 코드는 모두 true로 나와 console.log를 실행한다
if(!false) console.log(false +'는 falsy 값이다'); // false는 falsy 값이다
if(!undefined) console.log(undefined + '는 falsy 값이다'); // undefined는 falsy 값이다
if(!null) console.log(null + '는 falsy 값이다'); // null는 falsy 값이다
if(!0) console.log(0 + '는 falsy 값이다'); // 0는 falsy 값이다
if(!NaN) console.log(NaN + '는 falsy 값이다'); // NaN는 falsy 값이다
if(!'') console.log('' + '는 falsy 값이다'); // 는 falsy 값이다
```
+ Falsy 값 : `false, undefined, null, 0, -0, NaN, ' '(빈 문자열)`
+ Truthy 값 : `Falsy 값 외 모두`
___
<br/><br/>
# 9.3 명시적 타입 변환
+ 명시적 타입 변환의 종류 : 표준 빌트인 생성자 함수(String, Number, Boolean)를 new 연산자 없이 호출하는 방법, 빌트인 메서드를 사용하는 방법, 암묵적 타입 변환을 이용하는 방법
```
[ 📓표준 빌트인 생성자 함수와 빌트인 메서드 ]
둘 다 js에서 기본 제공하는 함수
- 표준 빌트인 생성자 함수 : 객체를 생성하기 위한 함수로 new 연산자와 함께 호출
- 표준 빌트인 메서드 : js에서 기본 제공하는 빌트인 객체의 메서드 (ㄴ21장 빌트인 객체에 나옴)
```
## 9.3.1 문자열 타입으로 변환 방법
1️⃣ String 생성자 함수를 new 연산자 없이 호출하는 방법
```js
String(1); // "1"
String(NaN); // "NaN"
String(Infinity); // "Infinity"
```
2️⃣ Object.prototype.toString 메서드를 사용하는 방법
```js
(1).toString; // "1"
(NaN).toString; // "NaN"
(Infinity).toString; // "Infinity"
```
3️⃣ 문자열 연결 연산자를 이용하는 방법 
```js
1 + ''; // "1"
NaN + ''; // "NaN"
Infinity + ''; // "Infinity"
```
## 9.3.2 숫자 타입으로 변환 방법
1️⃣ Number 생성자 함수를 new 연산자 없이 호출하는 방법
```js
Number('0'); // 0
Number(true); // 1
```
2️⃣ parseInt, parseFloat 함수를 사용하는 방법(문자열만 숫자 타입으로 변환 가능) 
```js
parseInt('0'); // 0
parseFloat('10.53'); // 10.53 
```
3️⃣ + 단항 산술 연산자를 사용하는 방법 
```js
+'0'; // 0
+true; // 1
```
4️⃣ * 산술 연산자를 사용하는 방법 
```js
'0' * 1; // 0
true * 1; // 1 
```
## 9.3.3 불리언 타입으로 변환 방법
1️⃣ Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
```js
Boolean('x'); // true
Boolean(''); // false
Boolean('false'); // true
Boolean(NaN); // false
Boolean(Infinity); // true
Boolean(null); // false
Boolean(undefined); // false
Boolean({}); // true
Boolean([]); // true
```
2️⃣ ! 부정 논리 연산자를 두 번 사용하는 방법 
```js
!!'x'; // true
!!{}; // true
// ... 나머지 예시 생략 .. 위와 결과값 동일하게 나옴
```
___
<br/><br/>
# 9.4 단축 평가
> 표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지 평가 과정을 생략하는 것
## 9.4.1 논리 연산자를 사용한 단축 평가
+ 논리곱(&&) 연산자는 두 개의 피연산자가 모두 true일 때 논리 연산의 결과를 결정하는 두번째 피연산자를 반환한다 
```
true && anything -> anything
false && anything  ->  false
```
+ 논리합(||) 연산자는 두 개의 피연산자 중 하나만 true로 평가되어도 true인 피연산자를 반환한다 
```
true || anything -> true
false || anything -> anything
```
+ 단축 평가 사용 시 if문을 대체할 수 있다<br/>
1️⃣ 어떤 조건이 Truthy 값일 때 
```js
var done = true;
var message = '';

if (done) message = '완료'; // m1) if문 사용
// 위와 아래식 동일 - && 연산자 표현식으로 if문 대체 가능
message = done && '완료'; // m2) 단축 평가 사용 

console.log(message); // 완료
```
 2️⃣ 어떤 조건이 Falsy 값일 때 
```js
var done = false;
var message = '';

if (!done) message = '미완료'; // m1) if문 사용
// 위와 아래식 동일 - || 연산자 표현식으로 if문 대체 가능
message = done || '미완료'; // m2) 단축 평가 사용 

console.log(message); // 미완료
```
___
## 9.4.2 옵셔널 체이닝 연산자
> ?.
## 9.4.3 null 병합 연산자
> ??








