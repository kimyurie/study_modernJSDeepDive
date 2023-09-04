# 객체란?
> 자바스크립트를 구성하는 거의 모든 것, 원시값을 제외한 나머지 값(함수, 배열, 정규 표현식 등)이 객체
* 원시값 - 변경 불가능한 값 / 객체 타입의 값(객체) - 변경 가능한 값
* 객체 = 0개 이상의 프로퍼티로 구성 ( 프로퍼티 = 키 + 값 )
```js
var person = {
  // 프로퍼티
  name : 'Lee',
  age : 20 // age가 키, 20이 값
};
```
+ 함수도 프로퍼티 값으로 사용 가능 => 메서드
```js
var counter = {
  num : 0,  // 프로퍼티
  increase : function(){
    this.num++;
  } // 메서드
};
```
* 프로퍼티와 메서드의 역할
```
프로퍼티 : 객체의 상태를 나타내는 값
메서드 : 프로퍼티를 참조하고 나타낼 수 있는 동작
```
# 객체 리터럴에 의한 객체 생성
+ 리터럴 : 사람이 이해할 수 있는 문자 또는 약속된 기호를 사용하여 값을 생성하는 표기법
+ 객체 리터럴 : 객체를 생성하기 위한 표기로 중괄호 내에 0개 이상의 프로퍼티 정의하며 변수 할당되는 시점에 js엔진은 객체 리터럴 해석해 객체 생성
<br/><br/>
# 프로퍼티
> 객체는 프로퍼티의 집합이며 프로퍼티는 키와 값으로 구성
* 프로퍼티 키 : 프로퍼티 값에 접근할 수 있는 이름으로 식별자 역할을 함 (🚫식별자 네이밍 규칙 따르지 않는 이름에는 반드시 따옴표 사용)
* 문자열 또는 문자열로 평가 가능한 표현을 사용해 키를 동적으로 생성 가능하며 이 경우 프로퍼티 키를 대괄호로 묶어야 함 
```js
var obj = {};
var key = v
```
* 프로퍼티 키에 문자열이나 심벌 외의 값을 사용하면 암묵적 타입 변환 통해 문자열이 된다.
```js
var foo = {
    0: 1,
    1: 2,
    2: 3
};

console.log(foo); // { '0': 1, '1': 2, '2': 3 }
```
# 메서드
```js
var circle = {
    radius: 5, // 프로퍼티
    getDiameter: function() { // 메서드
        return 2 * this.radius; // this는 circle을 가리킴
    }
};

console.log(circle.getDiameter()); // 10
```
# 프로퍼티 접근
> 마침표 표기법 : . / 대괄호 표기법 : []
```js
var person = {
    name: 'Lee'
};

console.log(person.name); // Lee // 마침표 표기법에 의한 접근
console.log(person['name']);// Lee // 대괄호 표기법에 의한 접근
```
+ 대괄호 프로퍼티 접근 연산자 내부에 지정하는 프로퍼티 키는 반드시 따옴표로 감싼 문자열이여야 함 (ex) person['name']
# 프로퍼티 값 갱신
```js
var person = {
    name: 'Lee'
};

person.name = 'Kim';

console.log(person); // { name: 'Kim' }
```
# 프로퍼티 동적 생성
+ 존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적으로 생성되어 추가되고 프로퍼티 값이 할당
```js
var person = {
    name : 'Lee'
};

person.age = 20;

console.log(person); // { name: 'Lee', age: 20 }
```
# 프로퍼티 삭제
+ delete 연산자 사용
```js
var person = {
    name : 'Lee'
};

person.age = 20;

console.log(person); // { name: 'Lee', age: 20 }

// 프로퍼티 삭제
delete person.age;
delete person.name;

console.log(person); // {}
```
# ES6에서 추가된 객체 리터럴의 확장 기능
## 프로퍼티 축약 표현
+ 프로퍼티 값은 변수에 할당된 값, 즉 식별자 표현식일 수 있다
```js
var x = 1, y = 2;

var obj = {
    x: x,
    y: y
};

console.log(obj); // { x: 1, y: 2 }
```
+ 변수 이름과 프로퍼티 키가 동일한 이름일 때 프로퍼티 키 생략 가능, 이때 키는 변수 이름으로 자동 생성
```js
let a = 1, b = 2;

const obj2 = {a, b}; // 프로퍼티 축약 표현 ( 프로퍼티 키 생략 )

console.log(obj2); // { a: 1, b: 2 }
```
## 계산된 프로퍼티 이름
> 프로퍼티 키로 사용할 표현식을 대괄호([])로 묶어야 함
+ 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성하려면 객체 리터럴 외부에서 대괄호([]) 표기법을 사용해야 함
```js
var prefix = 'prop';
var i = 0;

var obj = {};

// 계산된 프로퍼티 이름으로 프로퍼티 키 동적 생성
obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;

console.log(obj); // { 'prop-1': 1, 'prop-2': 2, 'prop-3': 3 }
```
+ 객체 리터럴 내부에서도 계산된 프로퍼티 이름으로 프로퍼티 키 동적 생성 가능
```js
const pre = 'prop';
let c = 0;

// 객체 리터럴 내부에서 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성
const obj3 = {
    [`${pre}-${++c}`]: c,
    [`${pre}-${++c}`]: c,
    [`${pre}=${++c}`]: c 
};

console.log(obj3); // { 'prop-1': 1, 'prop-2': 2, 'prop=3': 3 }
```
## 메서드 축약 표현
* 메서드를 정의할 때 function 키워드를 생략한 축약 표현 사용 가능
```js
const obj = {
    name: 'Lee',
    // sayHi : function(){
    //     console.log('Hi!' + this.name);
    // }

    sayHi() { // 메서드 축약 표현
        console.log('Hi!' + this.name);
    }
};

obj.sayHi(); // Hi!Lee
```




  
  
