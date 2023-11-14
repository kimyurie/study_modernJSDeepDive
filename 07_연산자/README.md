# 7.3 비교 연산자
### 1. x == y (동등 비교) 
+ x와 y의 `값`이 같음
```js
// 타입은 다르지만 암묵적 타입 변환 통해 타입을 일치시키면 동등하다. 
5 == '5' // true
```
+ 동등 비교(==)는 예측하기 어려운 결과 만들어내므로 아래 일치 비교 연산자(===)를 사용하는 것이 더 좋다.
### 2. x === y (일치 비교)
+ x와 y의 `값`과 `타입`이 같음
```js
5 === '5' // false
```
+ ⚠️ NaN 주의! <br/>
```js
// NaN은 자신과 일치하지 않는 유일한 값이다 
NaN === NaN; // -> false

// 따라서 숫자가 NaN인지 조사하려면 아래처럼 Number.isNaN 함수를 사용해야 한다 
Number.isNaN(NaN); // true
Number.isNaN(10); // false
Number.isNaN( 1 + undefined ); // true
```
+ ⚠️ 0 주의! <br/>
```js
// 양의 0과 음의 0의 비교 → 일치 비교/동등 비교 모두 결과는 true
0 === -0; // true
0 == -0; // true
```
```
[🗒️ Object.is 메서드 ]
Object.is 메서드는 위와 다르게 다음과 같이 예측 가능한 정확한 비교 결과를 반환한다.
-0  === +0; // true
Object.is(-0, +0); // false

NaN === NaN; // false
Object.is(NaN, NaN); // true
```
___
<br/><br/>
# 7.4 삼항 조건 연산자
+ 삼항 조건 연산자 표현식은 값처럼 사용 가능하지만 if...else 문은 값처럼 사용 불가능하다.
```js
var x = 10;

var result = if (x%2) {result = '홀수';} else {resutl = '짝수';}; // Error
var result = x % 2 ? '홀수 : '짝수';  // 삼항 조건 연산자 표현식은 표현식인 문이므로 값처럼 사용 가능 
console.log(result); // 짝수    
```
+ 조건에 따라 어떤 값을 결정해야 할 때 : 삼항 조건 연산자 사용하는게 더 유리
+ 조건에 따라 수행해야 할 문이 여러개 일 때 : if..else문 쓰는게 가독성 더 좋음
___
<br/><br/>
# 7.5 논리 연산자
> || (논리 합), && (논리 곱), ! (논리 부정)
+ ! (논리 부정) 연산자는 언제나 불리언 값을 반환한다
```js
// 피연산자가 불리언값이 아니라면 아래처럼 불리언 타입으로 암묵적 타입 변환   
!0; // true
!'Hello'; // false 
```
+ || (논리 합), && (논리 곱)은 언제나 2개의 피연산자 중 어느 한쪽으로 평가된다 (ㄴ9장 단축 평가에 나옴)
```js
'Cat' && 'Dog'; // => 'Dog'
```
___
<br/><br/>
# 7.8 typeof 연산자
+ typeof 연산자로 null값 연산시 "null"이 아닌 "object" 반환 -> js 버그
```js
typeof null  // "object"
```
+ null 타입 확인시 typeof 연산자 사용❌ 일치 연산자 사용⭕
```js
var foo = null;

typeof foo === null; // false
foo === null; // true
```
+ 선언하지 않은 식별자 typeof 연산자로 연산시 ReferenceError 발생 아닌 undefined 반환
```js
// undeclared 식별자 선언한 적없는데 undefined 반환
typeof undeclared; // undefined
```
___
<br/><br/>
# 7.9 지수 연산자
> 좌항 피연산자 밑으로, 우항 피연산자 지수로 거듭 제곱하여 숫자 값 반환
```js
2 ** 2; // 4
2 ** 0; // 1 
```
+ 지수 연산자 도입이전에는 `Math.pow` 메서드 사용 
```js
Math.pow(2,2); // 4
Math.pow(2,0); // 1 
```
___

옵셔널체이닝 연산자 , null 병합, instanceof, in 프로퍼티 
7.11



