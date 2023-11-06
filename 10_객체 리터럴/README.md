# 10.1 객체란?
> js를 구성하는 거의 모든 것, 원시값을 제외한 나머지 값(함수, 배열, 정규 표현식 등)이 객체
+ 원시값은 `변경 불가능한 값`  ↔ 객체 타입의 값(객체)은 `변경 가능한 값` (ㄴ11장 원시값과 객체의 비교)
+ 객체는 0개 이상의 `프로퍼티`로 구성된 집합 ( 프로퍼티 = `키 + 값` )
```js
var person = {
  name : 'Lee', // 프로퍼티
  age : 20 // age가 키, 20이 값 // 프로퍼티
};
```
+ `메서드` : 프로퍼티 값이 함수인 경우
```js
var counter = {
  num : 0,  // 프로퍼티
  increase : function(){
    this.num++;
  } // 메서드
};
```
+ 프로퍼티는 객체의 `상태`를 나타내는 값이고 메서드는 프로퍼티를 참조하고 나타낼 수 있는 `동작`
```
[🗒️객체와 함수]
함수로 객체를 생성하기도 하고 함수 자체가 객체이기도 하다  
```
+ 객체 지향 프로그래밍 : 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임 (ㄴ19.1 객체 지향 프로그래밍)
___
<br/><br/>
# 10.2 객체 리터럴에 의한 객체 생성
+ C++, 자바(클래스 기반 객체 지향 언어)에서의 객체 생성 방식 <br/>
  → ① 클래스를 사전에 정의 ② 필요한 시점에 new 연산자와 함께 생성자 호출해 인스턴스 생성하는 방식으로 객체 생성
```
[ 🗒️인스턴스 ]
클래스에 의해 생성되어 메모리에 저장된 실체 (객체 지향 프로그래밍에서 객체는 클래스와 인스턴스를 포함한 개념)
(클래스는 인스턴스를 생성하기 위한 템플릿 역할)
```
+ js는 프로토타입 기반 객체지향 언어로 클래스 기반 객체 지향 언어와는 달리 다양한 객체 생성 방법을 지원<br/>
  (객체 리터럴, Object 생성자 함수, 생성자 함수, Object.create 메서드, 클래스(ES6))
> `객체 리터럴` : 중괄호 {...} 내에 0개 이상의 프로퍼티를 정의하며 변수에 할당되는 시점에 js엔진은 객체 리터럴을 해석해 객체를 생성한다
```js
var person = {
    name: 'Lee',
    sayHello: function(){
        console.log('hi');
    }
}; // 객체 리터럴의 중괄호는 코드 블록을 의미하지 않고 값을 의미하기 때문에 세미콜론을 붙인다 

console.log(typeof person); // object
console.log(person); // { name: 'Lee', sayHello: [Function: sayHello] }
```
```js
var empty = {}; // 중괄호 내 프로퍼티를 정의하지 않으면 빈객체 생성 
console.log(typeof empty); // object
```
___
<br/><br/>
# 10.3 프로퍼티
> 객체는 프로퍼티의 집합이며 프로퍼티는 키와 값으로 구성
+ 프로퍼티 키 : 프로퍼티 값에 접근할 수 있는 이름으로 식별자 역할을 함 (🚫식별자 네이밍 규칙 따르지 않는 이름에는 반드시 따옴표 사용)
+ 문자열 또는 문자열로 평가 가능한 표현식을 사용해 키를 동적으로 생성 가능하며 이 경우 프로퍼티 키를 대괄호 [] 로 묶어야 한다 
```js
var obj = {};
var key = 'hello';

obj[key] = 'world'; // 프로퍼티 키 동적 생성

console.log(obj); // { hello : 'world' }
```
+ 프로퍼티 키에 문자열이나 심벌 값 외의 값을 사용하면 암묵적 타입 변환을 통해 문자열이 된다
___
<br/><br/>
# 10.4 메서드
> 객체에 묶여있는 함수 (프로퍼티 값이 함수인 경우)
```js
var circle = {
    radius: 5, // 프로퍼티
    getDiameter: function() { // 메서드
        return 2 * this.radius; // this는 circle 가리키는 참조변수 (ㄴ22.this)
    }
};

console.log(circle.getDiameter()); // 10
```
___
<br/><br/>
# 10.5 프로퍼티 접근
> 마침표 표기법(.) / 대괄호 표기법([])
```js
var person = {
    name: 'Lee'
};

 // 마침표 표기법에 의한 접근
console.log(person.name); // Lee
// 대괄호 표기법에 의한 접근
// ➡️ 대괄호 프로퍼티 접근 연산자 내부에 지정하는 프로퍼티 키는 반드시 '따옴표로 감싼 문자열'이여야 한다
console.log(person['name']);// Lee

// ⚠️ 아래처럼 대괄호로 감싸지 않은 이름을 프로퍼티 키로 사용하면 js 엔진은 이를 식별자로 해석한다 (숫자는 따옴표 생략 가능)
console.log(person[name]); // ReferenceError: name is not defined 
// ⚠️ 아래처럼 존재하지 않는 프로퍼티(age)에 접근하면 undefined 반환 (ReferenceError가 발생하지 않는데 주의)
console.log(person.age); // undefined
 
```
___
<br/><br/>
# 10.6 프로퍼티 값 갱신
```js
var person = {
    name: 'Lee'
};

// person 객체에 name 프로퍼티가 존재하므로 name 프로퍼티 값이 갱신된다 
person.name = 'Kim';

console.log(person); // { name: 'Kim' }
```
___
<br/><br/>
# 10.7 프로퍼티 동적 생성
```js
var person = {
    name : 'Lee'
};

// person 객체에 존재하지 않은 프로퍼티인 age에 값을 할당하면 
person.age = 20;
// 아래 결과와 같이 person 객체에 age 프로퍼티가 동적으로 생성되고 값이 할당된다 
console.log(person); // { name: 'Lee', age: 20 }
```
___
<br/><br/>
# 10.8 프로퍼티 삭제
+ delete 연산자 사용
```js
var person = {
    name : 'Lee'
};

person.age = 20; // 프로퍼티 동적 생성 
console.log(person); // { name: 'Lee', age: 20 }

delete person.age; // 프로퍼티 삭제
delete person.address; // person 객체에 존재하지 않은 address 프로퍼티를 삭제시 삭제 불가(이때 에러 발생x)
console.log(person); // { name: 'Lee' }
```
___
<br/><br/>
# 10.9 ES6에서 추가된 객체 리터럴의 확장 기능
## 10.9.1 프로퍼티 축약 표현
+ 프로퍼티 값은 변수에 식별자 표현식일 수 있다 
```js
var x = 1, y = 2;

var obj = {
    x: x,
    y: y
};

console.log(obj); // { x: 1, y: 2 }
```
+ 변수 이름과 프로퍼티 키가 동일한 이름일 때 프로퍼티 키는 생략 가능하고 이때 프로퍼티 키는 변수 이름으로 자동 생성
```js
let a = 1, b = 2;

// 프로퍼티 축약 표현 ( 프로퍼티 키 생략 )
const obj2 = {a, b}; 

console.log(obj2); // { a: 1, b: 2 }
```
## 10.9.2 계산된 프로퍼티 이름
> 문자열 또는 문자열로 타입 변환할 수 있는 값으로 평가되는 표현식을 사용해 프로퍼티 키를 동적으로 생성할 수 있다. 프로퍼티 키로 사용할 표현식은 대괄호[]로 묶어야 한다 
```js
// ES5
// ES5에서는 객체 리터럴 외부에서 대괄호 표기법을 사용해야 한다 
var prefix = 'prop';
var i = 0;

var obj = {};

// 계산된 프로퍼티 이름으로 프로퍼티 키 동적 생성
obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;

console.log(obj); // { 'prop-1': 1, 'prop-2': 2, 'prop-3': 3 }
```
```js
// ES6
const pre = 'prop';
let c = 0;

// ES6에서는 객체 리터럴 내부에서 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성할 수 있다 
const obj3 = {
    [`${pre}-${++c}`]: c,
    [`${pre}-${++c}`]: c,
    [`${pre}=${++c}`]: c 
};

console.log(obj3); // { 'prop-1': 1, 'prop-2': 2, 'prop=3': 3 }
```
## 10.9.3 메서드 축약 표현
+ ES6에서는 메서드를 정의할 때 function 키워드를 생략한 축약 표현을 사용할 수 있다 
```js
const obj = {
    name: 'Lee',
   // ES5에서는 메서드 정의시 프로퍼티 값으로 함수를 할당
   // sayHi: function () {
   //   console.log(`Hi! ${this.name}`);
   // },

     // ES6에서는 메서드 축약 표현 사용 
    sayHi() {
        console.log('Hi!' + this.name);
    }
};

obj.sayHi(); // Hi! Lee
```
+ 메서드 축약 표현으로 정의한 메서드는 프로퍼티에 할당한 함수와 다르게 동작한다 (ㄴ26.2 메서드)
___




  
  
