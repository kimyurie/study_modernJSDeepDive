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




