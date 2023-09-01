# 비교 연산자
+ x == y (동등 비교) : x와 y의 값이 같음
+ x === y (일치 비교) : x와 y의 값과 타입이 같음
+ != / !===  는 위와 반대
```
🗒️ NAN 주의! 
NaN === NaN; // -> false

Number.isNaN(NaN); // true
Number.isNaN(10); // false
Number.isNaN( 1 + undefined ); // true

🗒️ 0 주의! 
// 양의 0과 음의 0의 비교, 일치비교/동등비교 모두 결과는 true
0 === -0; // true
0 == -0; // true
```
# 삼항 조건 연산자
> -
<br/><br/>
# ⭐ 논리 연산자
> || (논리합), && (논리곱), ! (논리부정)
+ || (논리합), && (논리곱)은 언제나 2개의 피연산자 중 어느 한쪽으로 평가된다.
```js
'Cat' && 'Dog'; // => 'Dog'
```
<br/><br/>
# typeof 연산자
+ typeof 연산자로 null 연산시 "null"이 아닌 "object" 반환 -> 자바스크립트 버그
```js
typeof null  // "object"
```
+ null 타입 확인시 typeof 연산자 사용 x 일치 연산자 사용 o
```js
var foo = null;

typeof foo === null; // false
foo === null; // true
```
+ 선언하지 않은 식별자 typeof 연산자로 연산시 ReferenceError 발생 아닌 undefined 반환
```js
// undeclared 식별자 선언한 적 x
typeof undeclared; // undefined
```


