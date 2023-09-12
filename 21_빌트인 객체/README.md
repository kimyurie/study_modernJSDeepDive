# 21.1 자바스크립트 객체의 분류
+ 표준 빌트인 객체 : ECMAScript 사양에 정의된 객체로 애플리케이션 전역의 공통 기능을 제공 / 전역 객체의 프로퍼티로서 제공되므로 별도의 선언 없이 전역 변수처럼 언제나 참조 가능
+ 호스트 객체 : ECMAScript 사양에 정의되어 있지 않지만 js 실행 환경에서 추가로 제공하는 객체 / 브라우저나 Node.js 환경에서 추가로 제공하는 객체
+ 사용자 정의 객체 : 위 두개처럼 기본 제공되는 객체가 아닌 사용자가 직접 정의한 객체
<br/><br/>
# 21.2 표준 빌트인 객체
+ ex ) Object, String, Number, Boolean, Symbol ....
+ Math, Reflect, JSON 제외한 표준 빌트인 객체 = 인스턴스를 생성할 수 있는 생성자 함수 객체
+ 생성자 함수 객체인 표준 빌트인 객체 : 프로토타입 메서드와 정적 메서드 제공 / 생성자 함수 객체가 아닌 표준 빌트인 객체 : 정적 메서드만 제공
+ 생성자 함수인 표준 빌트인 객체가 생성한 인스턴스의 프로토타입 => 표준 빌트인 객체의 prototype 프로퍼티에 바인딩된 객체 
```js
// String 생성자 함수에 의한 String 객체 생성 
const strObj = new String('Lee'); // String {"Lee"}
console.log(typeof strObj); // object
// 표준 빌트인 객체인 String을 생성자 함수로서 호출하여 생성한 String 인스턴스의 프로토타입은 String.prototype이다. 
console.log(Object.getPrototypeOf(strObj) === String.prototype); // true
```
+ 표준 빌트인 객체의 prototype 프로퍼티에 바인딩된 객체(ex)String.prototype)는 다양한 기능의 빌트인 프로토타입 메서드를 제공 / 인스턴스 없이도 호출 가능한 빌트인 정적 메서드를 제공
```js
// Number 생성자 함수에 의한 Number 객체 생성
const numObj = new Number(1.5);

// Number.prototype 에 프로토타입 메서드인 toFixed
console.log(numObj.toFixed()); // 2

// Number 빌트인 객체의 정적 메서드
console.log(Number.isInteger(0.5)); // false
```
# 21.3 원시값과 래퍼 객체 
> 래퍼 객체 : 문자열, 숫자, 불리언 값에 대해 객체처럼 접근(마침표(.) 나 대괄호 표기법)하면 생성되는 임시 객체
```js
const str = 'hi';

// 원시 타입인 문자열이 래퍼 객체인 String 인스턴스로 변환 => 문자열은 래퍼 객체의 [[StringData]] 내부 슬롯에 할당
console.log(str.length); // 2
console.log(str.toUpperCase()); // HI

// 래퍼 객체로 프로퍼티에 접근하거나 메서드를 호출한 후 다시 원시값으로 되돌린다. 
console.log(typeof str); // string
```
+ 래퍼 객체의 처리가 종료되면 식별자가 원시값을 갖도록 되돌리고 래퍼 객체는 가비지 컬렉션의 대상이 된다.
```js
const str = 'hello';

str.name = 'Lee';

console.log(str.name); // undefined
console.log(typeof str, str); // string hello
```
```js
const num = 1.5;

console.log(num.toFixed()); // 2
// 래퍼 객체로 프로퍼티에 접근하거나 메서드를 호출한 후 다시 원시값으로 되돌린다. 
console.log(typeof num, num); // number 1.5
```
+ String, Number, Boolean 생성자 함수를 new 연산자와 함께 호출하여 인스턴스 생성할 필요 없으며 권장 xx
+ undefined, null은 래퍼 객체 생성 xx
<br/><br/>
# 21.4 전역 객체


