+ 생성자 함수 : new 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수
+ 인스턴스 : 생성자 함수에 의해 생성된 객체
+ js에서는 Object 생성자 함수 이외에도 String, Number, Boolean, Function, Array, Date, RegExp, Promise 등의 빌드인(built-in) 생성자 함수를 제공
___
<br/><br/>
# 17.2 생성자 함수
## 17.2.1 객체 리터럴에 의한 객체 생성 방식의 문제점
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
___
<br/><br/>
## 17.2.2 생성자 함수에 의한 객체 생성 방식의 장점
> 마치 객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼 생성자 함수를 사용하여 프로퍼티 구조가 동일한 객체 여러개를 간편하게 생성 가능
```js
// 생성자 함수
function Circle(radius){
    // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킴 
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

// ⚠️new 연산자와 함께 호출하지 않으면 생성자 함수로 동작X
// => 일반 함수로서 호출 
const circle3 = Circle(15);

console.log(circle3); // undefined
// 일반 함수로 호출된 Circle 내의 this는 전역 객체를 가리킨다 
console.log(radius); // 15
```
___
<br/><br/>
## 17.2.3 생성자 함수의 인스턴스 생성 과정
1️⃣ 인스턴스 생성과 this 바인딩
```js
function Circle(radius){
    // 1. 암묵적으로 빈 객체(인스턴스)가 생성되고 this에 바인딩
    console.log(this); // Circle {}

    this.radius = radius;
    this.getDiameter = function(){
        return 2 * this.radius;
    };
}
```
```
📔 바인딩
- 식별자와 값을 연결하는 과정
  ex) this 바인딩은 this(식별자 역할을 함)와 this가 가리킬 객체를 바인딩하는 것
```
<br/><br/>
2️⃣ 인스턴스 초기화
> this에 바인딩되어 있는 인스턴스에 프로퍼티나 메서드를 추가하고 생성자 함수가 인수로 전달받은 초기값을 인스턴스 프로퍼티에 할당하여 초기화하거나 고정값을 할당
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
<br/><br/>
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
+ ⚠️생성자 함수 내부에서 명시적으로 this가 아닌 다른 값 반환은 생성자 함수 기본 동작 훼손한다<br/>
  → 생성자 함수 내부에서 return문을 반드시 생략해야 한다
___
<br/><br/>
## 17.2.4 내부 메서드 [[Call]]과 [[Construct]]
```js
function foo(){}

foo(); // 일반적인 함수로서 호출 : [[Call]]이 호출된다.
new foo(); // 생성자 함수로서 호출 : [[Construct]]가 호출된다.  
```
+ 내부 메서드 [[Call]]을 갖는 함수 객체 : callable ( = 호출할 수 있는 객체 = 함수)
+ 내부 메서드 [[Construct]]를 갖는 함수 객체 : constructor ( = 생성자 함수로서 호출할 수 있는 함수 )
+ 내부 메서드 [[Construct]]를 갖지 않는 함수 객체 : non-constructor ( = 생성자 함수로서 호출할 수 없는 함수)
<img src="https://velog.velcdn.com/images%2Fgavri%2Fpost%2F187f5c59-2ad0-45fe-a51b-9701d33faa0b%2Fimage.png" width="600"/><br/>
___
<br/><br/>
## 17.2.5 constructor와 non-constructor의 구분
> constructor은 new 연산자로 호출 가능⭕ non-constructor은 new 연산자로 호출 불가능❌
+ constructor : 함수 선언문, 함수 표현식, 클래스(클래스도 함수다) 
+ non-constructor : 메서드(ES6 메서드 축약 표현), 화살표 함수
___
<br/><br/>
## 17.2.6 new 연산자
### case1) new 연산자와 함께 일반 함수를 호출했을 때
> 해당 함수는 생성자 함수로 동작 → [[Call]]이 호출되는 것이 아니라 [[Construct]]가 호출
>(단, new 연산자와 함께 호출하는 함수는 contructor이어야 한다)
```js
// 생성자 함수로서 정의하지 않은 일반 함수 → non-constructor
function add(x, y){
    return x + y;
}

// 생성자 함수로서 정의하지 않은 일반 함수를 new 연산자와 함께 호출
let inst = new add();

// 함수가 객체를 반환하지 않았으므로 반환문이 무시 → 빈 객체가 생성되어 반환
console.log(inst); // {}

// 객체를 반환하는 일반 함수 → construnctor
function createUser(name, role){
    return {name, role};
}

// 일반 함수를 new 연산자와 함께 호출
inst = new createUser('Lee', 'admin');
// 함수가 생성한 객체를 반환
console.log(inst); // { name: 'Lee', role: 'admin' }
```
### case2) new 연산자 없이 생성자 함수 호출했을 때 
> 일반 함수로 호출 → [[Construct]]이 호출되는 것이 아니라 [[Call]]가 호출
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
console.log(circle); // undefined 

// 일반 함수 내부의 this는 전역 객체 window를 가리킴
console.log(radius); // 5 
console.log(getDiameter()); // 10 

circle.getDiameter(); // TypeError
```
___
<br/><br/>
## 17.2.7 new.target
> ES6에 도입되어, new 연산자 와 함께 생성자 함수로서 호출되었는지 확인할 수 있는 문법
+ `new 연산자와 함께` 생성자 함수로서 호출되면 함수 내부의 new.target은 `함수 자기 자신`을 가리킨다 
+ `new 연산자 없이` 일반 함수로 호출되면 함수 내부의 new.target은 `undefined`을 가리킨다 
```js
function Circle(radius){
    // 이 함수가 new 연산자와 함께 호출되지 않았다면 new.target은 undefined다 
    if(!new.target){
        // new 연산자와 함께 생성자 함수를 재귀 호출하여 생성된 인스턴스를 반환한다 
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
+ 단, IE에서는 이 기능 지원X
```
📔 스코프 세이프 생성자 패턴
```




