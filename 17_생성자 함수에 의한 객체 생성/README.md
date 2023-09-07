# 17.1 Object 생성자 함수
```js
// 빈 객체의 생성
const person = new Object();

// 프로퍼티 추가
person.name = 'Lee';
person.sayHello = function(){
    console.log('Hi! My name is ' + this.name);
};

console.log(person); // { name: 'Lee', sayHello: [Function] }
person.sayHello(); // Hi! My name is Lee
```
+ 생성자 함수 : new 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수
+ 인스턴스 : 생성자 함수에 의해 생성된 객체
+ 자바스크립트에서는 Object 생성자 함수 이외에도 String, Number, Boolean, Function, Array, Date, RegExp, Promise 등의 빌드인(built-in) 생성자 함수를 제공
<br/><br/>
# 17.2 생성자 함수
## 17.2.1 객체 리터럴({...})에 의한 객체 생성 방식의 문제점
> 단 하나의 객체만 생성하므로 동일한 프로퍼티를 갖는 객체를 여러 개 생성해야 하는 경우 매번 같은 프로퍼티를 기술해야 하기 때문 비효율적
```js
const circle1 = {
    radius: 5,
    getDiameter(){
        return 2 * this.radius; // this는 circle1
    }
};

console.log(circle1.getDiameter()); // 10

const circle2 = {
    radius: 10,
    getDiameter(){
        return 2 * this.radius;
    }
}

console.log(circle2.getDiameter()); // 20
```
<br/><br/>
## 17.2.2 생성자 함수에 의한 객체 생성 방식의 장점
> 마치 객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼 생성자 함수를 사용하여 프로퍼티 구조가 동일한 객체 여러개를 간편하게 생성 가능
```js
// 생성자 함수
function Circle(radius){
    // 인스턴스 초기화 - 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킴 
    this.radius = radius;
    this.getDiameter = function(){
        return 2 * this.radius;
    };
}

// 인스턴스 생성
const circle1 = new Circle(5); // 반지름 5인 Circle 객체 생성
const circle2 = new Circle(10); // 반지름 10인 Circle 객체 생성

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```
```
📔 this
```
> new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작하며 new 연산자 붙이지 않으면 일반 함수로 동작
<br/><br/>
## 17.2.3 생성자 함수의 인스턴스 생성 과정
> 생성자 함수 역할 : 인스턴스 생성 / 생성된 인스턴스 초기화(인스턴스 프로퍼티 추가 및 초기값 할당)<br/>

1️⃣ 인스턴스 생성과 this 바인딩
```
📔 바인딩
- 식별자와 값을 연결하는 과정
- this 바인딩은 this(키워드로 분류되지만 식별자 역할을 함)와 this가 가리킬 객체를 바인딩하는 것
```
```
function Circle(radius){
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩
    console.log(this); // Circle {}

    this.radius = radius;
    this.getDiameter = function(){
        return 2 * this.radius;
    };
}
```
2️⃣ 인스턴스 초기화
+ this에 바인딩되어 있는 인스턴스에 프로퍼티나 메서드를 추가하고 생성자 함수가 인수로 전달받은 초기값을 인스턴스 프로퍼티에 할당하여 초기화하거나 고정값을 할당
```js
function Circle(radius){
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩

    // 2. this에 바인딩되어 있는 인스턴스를 초기화
    this.radius = radius;
    this.getDiameter = function(){
        return 2 * this.radius;
    };
}
```
3️⃣ 인스턴스 반환
```js
function Circle(radius){
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩
    // console.log(this); // Circle {}

    // 2. this에 바인딩되어있는 인스턴스를 초기화
    this.radius = radius;
    this.getDiameter = function(){
        return 2 * this.radius;
    };

    // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환
}

const circle = new Circle(1);
console.log(circle); // Circle { radius: 1, getDiameter: [Function] }
```
+ this가 아닌 다른 객체를 명시적으로 반환하면 this가 반환되지 못하고 return 문에 명시한 객체가 반환
```js
// 앞 코드 동일
  return {};
}

// 인스턴스 생성. Circle 생성자 함수는 명시적으로 반환한 객체를 반환
const Circle = new Circle(1);
console.log(circle); // {}
```
+ 명시적으로 원시 값을 반환하면 원시 값 반환은 무시되고 암묵적으로 this가 반환
```js
// 앞 코드 동일
  return 100;
}

const Circle = new Circle(1);
console.log(circle); // Circle { radius: 1, getDiameter: [Function] }
```
+ 생성자 함수 내부에서 명시적으로 this가 아닌 다른 값 반환은 생성자 함수 기본 동작 훼손 => 생성자 함수 내부에서 return문을 반드시 생략해야함!
<br/><br/>
## 17.2.4 내부 메서드 [[Call]]과 [[Construct]]
```js
function foo(){}

foo(); // 일반적인 함수로서 호출 : [[Call]]이 호출된다.

new foo(); // 생성자 함수로서 호출 : [[Construct]]가 호출된다.  
```
+ 내부 메서드 [[Call]]을 갖는 함수 객체 : callable ( = 호출할 수 있는 객체 = 함수)
+ 내부 메서드 [[Construct]]를 갖는 함수 객체 : constructor ( = 생성자 함수)
+ 내부 메서드 [[Construct]]를 갖지 않는 함수 객체 : non-constructor ( = 객체를 생성자 함수로서 호출할 수 없는 함수)
<br/><br/>
## 17.2.5 constructor와 non-constructor의 구분
> - constructor : 함수 선언문, 함수 표현식, 클래스(클래스도 함수다)
> - non-constructor : 메서드
+ 모든 함수 객체는 반드시 내부 메서드 [[ Call ]] 을 가지고 있다.
+ 모든 함수 객체가 [[ Construct ]] 을 가지고 있는 것은 아니다.
> 즉, 함수 객체는 callable 이면서 constructor 이거나, callable 이면서 non-constructor 다. 모든 함수 객체는 호출할 수 있지만, 모든 함수 객체가 생성자 함수로써 호출할 수 있는 것은 아니다.
## 17.2.6 new 연산자
+ new 연산자와 함께 함수를 호출하면 해당 함수는 생성자 함수로 동작 => [[Call]]이 호출되는 것이 아니라 [[Construct]]가 호출
```js
// 생성자 함수로서 정의하지 않은 일반 함수 -> non-constructor
function add(x, y){
    return x + y;
}

// 생성자 함수로서 정의하지 않은 일반 함수를 new 연산자와 함께 호출
let inst = new add();

// 함수가 객체를 반환하지 않았으므로 반환문이 무시 -> 빈 객체가 생성되어 반환
console.log(inst); // {}

// 객체를 반환하는 일반 함수 -> construnctor
function createUser(name, role){
    return {name, role};
}

// 일반함수를 new 연산자와 함께 호출
inst = new createUser('Lee', 'admin');
// 함수가 생성한 객체를 반환
console.log(inst); // { name: 'Lee', role: 'admin' }
```
+ new 연산자 없이 생성자 함수 호출 시 일반 함수로 호출 => [[Construct]]이 호출되는 것이 아니라 [[Call]]가 호출
```js
// 생성자 함수
function Circle(radius){
    this.radius = radius;
    this.getDiameter = function(){
        return 2 * this.radius;
    };
}

// new 연산자 없이 생성자 함수 호출하면 일반 함수로서 호출된다. 
const circle = Circle(5);
console.log(circle); // undefined // new 붙이면 결과값 5

// 일반 함수 내부의 this는 전역 객체 window를 가리킴
console.log(radius); // 5 // new 붙이면 결과값 10
console.log(getDiameter()); // 10 // new 붙이면 결과값 10

circle.getDiameter(); // TypeError
```
## 17.2.7 new.target
> 함수 내부에서 new.target을 사용하면 new 연산자와 함께 생성자 함수로서 호출되었는지 확인 가능<br/>
> => ☑️new 연산자와 함께 생성자 함수로서 호출되면 함수 내부의 new.target은 함수 자기 자신을 가리키며 new 연산자 없이 일반 함수로 호출되면 함수 내부의 new.target은 undefined이다. 
```js
function Circle(radius){
    // 이 함수가 new 연산자와 함께 호출되지 않았다면 new.target 
    if(!new.target){
        return new Circle(radius);
    }
    this.radius = radius;
    this.getDiameter = function(){
        return 2 * this.radius;
    };
}

// new 연산자 없이 생성자 함수를 호출하여도 new.target을 통해 생성자 함수로서 호출된다. 
const circle = Circle(5);
console.log(circle.getDiameter()); // 10
```
```
📔 스코프 세이프 생성자 패턴
```




