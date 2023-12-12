# 19.1 객체 지향 프로그래밍
> 독립적인 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임
+ 객체 : 속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조 (객체 = `프로퍼티(상태)` + `메서드(행동)`)
+ `추상화` :  객체의 다양한 속성 중에서 프로그램에 필요한 속성만 간추려 내여 표현하는 것
+ ⭐객체 지향 프로그래밍의 4가지 특징⭐ : `추상화 / 상속 / 다형성 / 캡슐화`
+ `다형성` : 같은 이름의 메서드나 연산자가 다른 클래스에 대해 다른 동작을 하도록 하는 것 (ex) 메소드 오버라이딩)
___
<br/><br/>
# 19.2 ✔️상속과 프로토타입
> 상속 : 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것
```js
function Circle(radius){
    this.radius = radius;
    this.getArea = function(){
        return Math.PI * this.radius ** 2;
    };
}

const circle1 = new Circle(1);
const circle2 = new Circle(2);

// Circle 생성자 함수는 인스턴스(circle1, circle2)를 생성할 때마다 동일한 동작을 하는
// ⚠️getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유하여 메모리 불필요하게 낭비된다 
console.log(circle1.getArea === circle2.getArea); // false

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
```
<img src='https://user-images.githubusercontent.com/89209626/151707481-00e6d763-0c8e-4378-853f-2fbda2a7338c.png' width='600'/><br/>
+ 위 코드를 상속을 통해 불필요한 중복을 제거하면 아래와 같다<br/>
  (js는 `프로토타입을 기반으로 상속을 구현`한다)
```js
function Circle(radius){
    this.radius = radius;

}

// Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를
// 공유해서 사용할 수 있도록 프로토타입에 추가
// (프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있음)
✔️Circle.prototype.getArea = function(){
    return Math.PI * this.radius ** 2;
}

const circle1 = new Circle(1);
const circle2 = new Circle(2);

// 프로토타입 Circle.prototype으로부터 getArea 메서드를 상속받음
// → Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유
console.log(circle1.getArea === circle2.getArea); // true

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
```
<img src='https://user-images.githubusercontent.com/89209626/151707639-c499c5b4-d963-44e1-9532-8dc47f856d68.png'
width='600'/><br/>
___
<br/><br/>
# 19.3 프로토타입 객체
+ 모든 객체는 하나의 프로토타입을 갖는다 
+ 객체와 프로토타입과 생성자 함수는 서로 연결되어 있다
<img src='https://user-images.githubusercontent.com/89209626/151748880-8fd285b4-f64e-427b-b89a-10a730b38f14.png'
width='600'/><br/>
___
<br/><br/>
## 19.3.1 __proto__ 접근자 프로퍼티
> 모든 객체는 __proto__ 접근자 프로퍼티 를 통해 자신의 프로토타입, 즉 [[Prototype]] 내부 슬롯에 간접적으로 접근 할수 있다.
### __proto__는 접근자 프로퍼티다 
+ 접근자 프로퍼티 = 자체적으로 값을 갖지 않고 접근자 함수([[Get]], [[Set]] 프로퍼티 어트리뷰트로 구성된 프로퍼티)
```js
const obj = {};
const parent = { x : 1 };

// getter 함수인 get __proto__가 호출되어 obj 객체의 프로토타입을 취득
obj.__proto__;
// setter 함수인 set __proto__가 호출되어 obj 객체의 프로토타입을 교체
obj.__proto__ = parent;

console.log(obj.x); // 1
```
___
### __proto__는 접근자 프로퍼티는 상속을 통해 사용된다
+ __proto__ 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 `Object.prototype의 프로퍼티`다
+ 모든 객체는 `상속`을 통해 `Object.prototype.__proto__ 접근자 프로퍼티`를 사용할 수 있다
```js
const person = {name:'Lee'};

// person 객체는 __proto__ 프로퍼티를 소유하지 않는다
console.log(person.hasOwnProperty('__proto__')); // false

// __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티다. 
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// { get: [Function: get __proto__], set: [Function: set __proto__], enumerable: false, configurable: true }

// 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다. 
console.log({}.__proto__ == Object.prototype); // true
```
```
Object.prototype : 프로토타입 체인의 최상위 객체 
```
___
### __proto__ 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유
> 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해서
```js
const parent = {};
const child = {};

// child의 프로토타입을 parent로 설정
child.__proto__ = parent;
// parent의 프로토타입을 children으로 설정
parent.__proto__ = child; // TypeError: Cyclic __proto__ value
// ⚠️서로가 자신의 프로토타입이 되는 비정상적인 프로토타입 체인 생성되므로 에러 발생
```
<img src='https://user-images.githubusercontent.com/89209626/151749500-2b5fd5f6-8f29-499e-96c4-efdb8f211859.png'
width='300'/>
+ 프로토타입 체인은 `단방향 링크드 리스트`로 구현되어야 한다
___
###  __proto__ 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다.
> 모든 객체가 __proto__ 접근자 프로퍼티를 사용할 수 있는 것은 아니기 때문

따라서, __proto__ 접근자 프로퍼티를 사용하는 대신<br/>
+ 프로토타입 `취득`에 경우 → `Object.getPrototypeOf 메서드` 사용
+ 프로토타입 `교체`에 경우 → `Object.setPrototypeOf 메서드` 사용
```js
const obj = {};
const parent = { x : 1 };

// obj 객체의 프로토타입을 취득
Object.getPrototypeOf(obj); // obj.__proto__;
// obj 객체의 프로토타입을 교체
Object.setPrototypeOf(obj, parent); // obj.__proto__ = parent;

console.log(obj.x); // 1
```
___
<br/><br/>
## 19.3.2 ⭐함수 객체의 prototype 프로퍼티
> ✔️함수 객체만이 소유하는 prototype 프로퍼티는 `생성자 함수가 생성할 인스턴스의 프로토타입`을 가리킨다
```js
// 함수 객체는 protoype 프로퍼티를 가진다.
console.log(function () {}.hasOwnProperty("prototype")); // true

// 일반 객체는 prototype 프로퍼티를 가지지 않는다.
console.log({}.hasOwnProperty("prototype")); // false
```
+ ✔️생성자 함수로서 호출할 수 없는 non-constructor 인 ⭐화살표 함수, ES6 메서드 축약 표현으로 정의한 메서드 는 `prototype 프로퍼티를 소유하지 않고, 프로토타입도 생성하지 않는다`
> 모든 객체가 가지고 있는 `__proto__ 접근자 프로퍼티`와 `함수 객체만이 가지고 있는 prototype 프로퍼티`는 `동일한 프로토타입을 가리킨다`
```js
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

// Person 생성자 함수의 prototype 프로퍼티와 me 객체(인스턴스)의 __proto__ 접근자 프로퍼티가 가리키는 것은 동일한 프로토타입이다.
console.log(me.__proto__ === Person.prototype); // true
```
<img src='https://camo.githubusercontent.com/b53ac635da39f80f2eaf8553e7b9cb7d8db0adb64e0f724396b82d1a3206b5a1/68747470733a2f2f6d656469612e766c70742e75732f696d616765732f68616e67656d3432322f706f73742f35663037386238302d393032302d346162342d396232382d3432646239383338333632302f6a6176617363726970742d70726f746f7479706530342e706e67' width='600'/><br/>
- 다만, 사용하는 주체가 다르다.

| 구분                      | 소유        | 값                  | 사용 주체   | 사용 목적                                                                    |
| ------------------------- | ----------- | ------------------- | ----------- | ---------------------------------------------------------------------------- |
| **proto** 접근자 프로퍼티 | 모든 객체   | 프로토타입의 참조값 | 모든 객체   | 객체가 자신의 프로토타입에 접근 또는 교체하기위해 사용                       |
| prototype 프로퍼티        | ✔️`constructor` | 프로토타입의 참조값 | 생성자 함수 | 생성자 함수가 자신이 생성할 객체(인스턴스)의 프로토타입을 할당하기 위해 사용 |
___
<br/><br/>
## 19.3.3 프로토타입의 constructor 프로퍼티와 생성자 함수
> ⭐`모든 프로토타입은 constructor 프로퍼티를 가지며 constructor 프로퍼티는 자신을 참조하고 있는 생성자 함수를 가리킨다`
```js
// 생성자 함수
function Person(name){
    this.name = name;
}

const me = new Person('Lee');
// constructor 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킴
console.log(me.constructor === Person); // true
```
<img src='https://user-images.githubusercontent.com/89209626/151748880-8fd285b4-f64e-427b-b89a-10a730b38f14.png' width='600'/><br/>
___
<br/><br/>
# 19.4 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입
```js
// obj 객체는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴로 생성했다. 
const obj = {};

// 하지만 obj 객체의 생성자 함수는 Object 생성자 함수이다. 
console.log(obj.constructor === Object); // true
```
> ✔️`프로토타입은 생성자 함수와 더불어 생성되며 prototype, constructor 프로퍼티에 의해 연결되어 있다` <br/>
  (프로토타입과 생성자 함수는 단독으로 존재할 수 없고 `언제나 쌍으로 존재!`)
+ 리터럴 표기법으로 생성한 객체도 생성자 함수로 생성한 객체와 본질적인 면에서 큰 차이 x
+ 프로토타입의 constructor 프로퍼티를 통해 연결되어 있는 생성자 함수 = 리터럴 표기법으로 생성한 객체를 생성한 생성자 함수
- 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

| 리터럴 표기법      | 생성자 함수 | 프로토타입         |
| ------------------ | ----------- | ------------------ |
| 객체 리터럴        | `Object`      | `Object.prototype`   |
| 함수 리터럴        | `Function`    | `Function.prototype` |
| 배열 리터럴        | Array       | Array.prototype    |
| 정규 표현식 리터럴 | RegExp      | RegExp.prototype   |
___
<br/><br/>
# 19.5 프로토타입의 생성 시점
> ✔️`프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다`
+ 생성자 함수는 `사용자 정의 생성자 함수` 와 자바스크립트가 기본 제공하는 `빌트인 생성자 함수`로 구분된다
## 19.5.1 사용자 정의 생성자 함수와 프로토타입 생성 시점
> `함수 정의가 평가되어 함수 객체가 생성하는 시점`에 프로토타입도 더불어 생성
```js
// 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입 더불어 생성
// 함수 호이스팅 적용
console.log(Person.prototype); // { constructor: f } 

// 생성자 함수
function Person(name){
    this.name =name;
}
```
<img src='https://velog.velcdn.com/images/ehdfkd941209/post/b3d46c14-67cb-4085-b290-f0e7040ebac6/image.png' width='600'/><br/>
+ ✔️생성된 프로토타입은 `오직 constructor 프로퍼티 만을` 갖는 객체이다
+ ✔️생성된 프로토타입의 프로토타입은 `Object.prototype`
___
<br/><br/>
## 19.5.2 빌트인 생성자 함수와 프로토타입 생성 시점
> `빌트인 생성자 함수가 생성되는 시점`에 프로토타입이 생성
+ 모든 빌트인 생성자 함수는 `전역 객체가 생성되는 시점`에 생성
+ 생성된 프로토타입은 빌트인 생성자 함수의 prototype 프로퍼티에 바인딩
```js
// 빌트인 객체인 Object는 전역 객체 window의 프로퍼티다.
window.Object === Object // true
```
___
<br/><br/>
# 19.6 객체 생성 방식과 프로토타입의 결정
[ 객체 생성 방식 ]<br/>
+ 객체 리터럴
+ Object 생성자 함수
+ 생성자 함수
+ Object.create 메서드
+ 클래스(ES6)
> 공통점 : 추상 연산 OrdinaryObjectCreate에 의해 생성
+ 프로토타입은 추상 연산 OrdinaryObjectCreate에 전달되는 인수에 의해 결정되며 이 인수는 객체가 생성되는 시점에 객체 생성 방식에 의해 결정
## 19.6.1 ⭐객체 리터럴에 의해 생성된 객체의 프로토타입
> 객체 리터럴에 의해 생성되는 객체의 프로토타입은 `Object.prototype`
```js
const obj = { x : 1 };

// 객체 리터럴에 의해 생성된 obj 객체는 Object.prototype을 상속받는다
console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty('x')); // true
```
<img src='https://user-images.githubusercontent.com/31315644/66939451-0dd32e00-f07e-11e9-9129-bc62a2635705.jpeg' width='600'/><br/>
## 19.6.2 Object 생성자 함수에 의해 생성된 객체의 프로토타입
> Object 생성자 함수에 의해 생성되는 객체의 프로토타입은 `Object.prototype`
```js
const obj = new Object();
obj.x = 1;

// Object 생성자함수에 의해 생성된 obj 객체는 Object.prototype을 상속받는다
console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty('x')); // true
```
## 19.6.3 ⭐생성자 함수에 의해 생성된 객체의 프로토타입
> 생성자 함수에 의해 생성되는 객체의 프로토타입은 `생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체`
+ 앞선 객체 리터럴과 Object 생성자 함수에 의해 생성되는 객체의 프로토타입인 Object.prototype과는 달리 `오로지 constructor 프로퍼티만 존재`한다.
<img src='https://velog.velcdn.com/images%2Fminj9_6%2Fpost%2F1c0e1624-3c1b-433a-9183-64ba1984afc7%2Fimage.png' width='600'/><br/>
```js
function Person(name){
    this.name = name;
}

// Person.prototype에 프로퍼티 추가해 하위 객체가 상속받을 수 있도록 구현
// -> sayHello 메서드 상속받아 자신의 메서드처럼 사용 가능
Person.prototype.sayHello = function() {
    console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Lee');
const you = new Person('Kim');

me.sayHello(); // Hi! My name is Lee
you.sayHello(); // Hi! My name is Kim
```
<img src='https://velog.velcdn.com/images/narcoker/post/497a4057-8fb6-47b6-a67c-2fc8bbd164c6/image.png' width='600'/><br/>
___
<br/><br/>
# 19.7 ⭐프로토타입 체인
> js는 객체의 프로퍼티에 접근하려고 할 때 해당 객체에 접하려는 프로퍼티가 없다면 [[Prototype]] 내부의 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색 (프로토타입 체인은 js가 객체 지향 프로그래밍의 상속을 구현하는 메커니즘)
```js
function Person(name){
    this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function (){
    console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Lee');

// hasOwnProperty는 Object.prototype의 메서드다 
console.log(me.hasOwnProperty('name')); // true
```
<img src='https://velog.velcdn.com/images%2Frlatp1409%2Fpost%2F82764c07-8eff-4f75-bcf7-8d49b5e8eeaf%2FIMG_61C4E9C5042D-1.jpeg' width='600'/><br/>
+ Object.prototype는 `프로토타입 체인의 종점(최상위)`
+ 프로토타입 체인은 `상속과 프로퍼티 검색`을 위한 메커니즘
+ 스코프 체인은 식별자 검색을 위한 메커니즘
+ 프로토타입 체인과 스코프 체인은 서로 연관없이 별도로 동작하는 것이 아니라 서로 협력하여 식별자와 프로퍼티를 검색하는 데 사용
___
<br/><br/>
# 19.8 오버라이딩과 프로퍼티 섀도잉
> - ⭐오버라이딩 : `상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용하는 방식`
> - 프로퍼티 섀도잉 : 상속에 의해 프로퍼티가 가려지는 현상(ㄴ별로 안중요)
```js
const Person = (function(){
    function Person(name){
        this.name = name;
    }

    // 프로토타입 메서드
    Person.prototype.sayHello = function(){
        console.log(`Hi! My name is ${this.name}`);
    };

    return Person;
}());

const me = new Person('Lee'); 

// 인스턴스 메서드
// 인스턴스 메서드 sayHello는 프로토타입 메서드 sayHello를 오버라이딩
me.sayHello = function(){
    console.log(`Hey! My name is ${this.name}`); 
};

// 인스턴스 메서드가 호출되며 위의 프로토타입 메서드는 가려짐 -> 프로퍼티 섀도잉
me.sayHello(); // Hey! My name is Lee

// ✔️프로토타입 메서드 삭제
// 프로토타입 프로퍼티를 변경 또는 삭제하려면 하위 객체를 통해 프로토타입 체인으로 접근하는 것이 아니라
// 프로토타입에 직접 접근해야한다
delete Person.prototype.sayHello;
me.sayHello(); // TypeError
```
<img src='https://velog.velcdn.com/images%2Frlatp1409%2Fpost%2F9494d940-71c9-4d89-b9d1-918071ab9e16%2FIMG_82F41D4FD6A2-1.jpeg' width='600'/><br/>
```
📓 오버로딩
함수의 이름은 동일하지만 매개변수의 타입 또는 개수가 다른 메서드를 구현하고 매개변수에 의해 메서드를 구별하여 호출하는 방식
(js는 오버로딩을 지원하지는 않지만 arguments 객체를 사용하여 구현할 수는 있다) 
```
___
<br/><br/>
# 19.9 프로토타입 교체
> 프로토타입은 다른 객체로 변경할 수 있다 즉, 부모 객체인 프로토타입을 동적으로 변경할 수 있다
+ 프로토타입 교체를 통해 객체 간의 상속 관계를 동적으로 변경하는 것은 번거로우며, 직접 프로토타입을 교체하는 것은 바람직하지 않다<br/>
 => 직접 상속 이나 ES6+ 의 클래스 를 사용하면 간편하고 직관적으로 상속 관계를 구현 가능
## 19.9.1 ✔️생성자 함수에 의한 프로토타입의 교체
```js
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  Person.prototype = {
    // constructor 프로퍼티와 생성자 함수 간의 연결을 재설정하면 파괴를 매꿀 수 있다.
    sayHello() {
      console.log(`Hi, My name is ${this.name}`);
    },
  };

  return Person;
})();

const me = new Person("WI");
// ⭐생성자 함수에 프로퍼티로 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴
console.log(me.constructor === Person); // false
// ⭐프로토타입 체인을 따라 Object.prototype 의 constructor 프로퍼티가 검색
console.log(me.constructor === Object); // true
```
<img src='https://velog.velcdn.com/images/hjthgus777/post/9835ed2c-ba41-453f-8202-1c0c5c28ee6a/image.png' width='600'/><br/>
___
## 19.9.2 ✔️인스턴스에 의한 프로토타입의 교체
```js
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

// 프로토타입으로 교체할 객체 
const parent = {
  // 생성자 함수에 의한 프로토타입 재정의 때와 같이 constructor가 파괴되는 것을 constructor 를 해당 생성자 함수로 재설정하면 매꿀 수 있다.
  sayHello() {
    console.log(`Hi, My name is ${this.name}`);
  },
};

// me 객체의 프로토타입을 parent 객체로 교체
Object.setPrototypeOf(me, parent); 
console.log(me.constructor === Person); // false
console.log(me.constructor === Object); // true
```
<img src='https://velog.velcdn.com/images/hjthgus777/post/2eacd664-4df8-4f84-a27f-0806ecad4462/image.png' width='600'/><br/>
___
<br/><br/>
# 19.10 instanceof 연산자
> 객체 instanceof 생성자 함수
+ 우변의 생성자 함수의 prototype에 바인딩된 객체가 좌변의 객체의 프로토타입 체인 상에 존재하면 true 아니면 false 
```js
function Person(name) {
    this.name = name;
}

const me = new Person('Lee');

const parent = {}; // 프로토타입으로 교체할 객체

Object.setPrototypeOf(me, parent); // 프로토타입의 교체

// Person 생성자 함수와 parent 객체는 연결되어 있지 않다
console.log(Person.prototype === parent); // false
console.log(parent.constructor === Person); // false

Person.prototype = parent; // parent 객체를 Person 생성자 함수에 바인딩

console.log(me instanceof Person); // true
console.log(me instanceof Object); // true
```
___
<br/><br/>
# 19.11 직접 상속
## 19.11.1 ⭐Object.create에 의한 직접 상속
> ㄴ 정리해두기 
## 19.11.2 객체 리터럴 내부에서 __proto__에 의한 직접 상속
```js
const myProto = { x : 10 };

// 객체 리터럴 내부에서 __proto__ 접근자 프로퍼티 사용하여 직접 상속 구현 가능 
const obj = {
    y : 20,
    __proto__ : myProto
};

console.log(obj.x, obj.y); // 10 20 
console.log(Object.getPrototypeOf(obj) === myProto); // true
```
<br/><br/>
# 19.12 ⭐정적 프로퍼티 / 메서드
> 생성자 함수로 인스턴스를 생성하지 않아도 참조나 호출이 가능한 프로퍼티 / 메서드<br/>
+ 생성자 함수도 객체로 프로퍼티나 메서드를 소유할 수 있다
+ 생성자 함수가 소유한 프로퍼티나 메서드를 정적 프로퍼티 / 메서드 라고 한다.
+ 정적 프로퍼티 / 메서드는 인스턴스에서 직접 참조 / 호출할 수 있다.
```js
function Person(name){
    this.name = name;
}

Person.prototype.sayHello = function(){
    console.log(`Hi, My name is ${this.name}`);
};

// 정적 프로퍼티
Person.staticProp = 'static prop';

 // 정적 메서드
Person.staticMethod = function(){
    console.log('static method');
};

const me = new Person('Lee');

// 생성자 함수에 추가한 정적 프로퍼티/메서드는 생성자 함수로 참조/호출한다. 
Person.staticMethod(); // static method

// 정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다.
// 인스턴스로 참조/호출할 수 있는 프로퍼티/메서드는 프로토타입 체인 상에 존재해야 함다. 
me.staticMethod(); // TypeError: me.staticMethod is not a function
```
<img src='https://velog.velcdn.com/images%2Fnoahshin__11%2Fpost%2Fc4270666-c565-4b5d-bad0-57b885c20eb9%2Fimage.png' width='600'/><br/>
<br/><br/>
# 19.13 프로퍼티 존재 확인
## 19.13.1 in 연산자 
> 객체 내에 특정 프로퍼티가 존재하는 지 여부를 확인
```js
const person = {
    name : 'Lee',
    address : 'Seoul'
};

console.log('name' in person); // true
console.log('address' in person); // true
console.log('age' in person); // false

// in 연산자가 person 객체가 속한 프로토타입에 존재하는 모든 프로토타입에서 toString 프로퍼티 검색했으므로 true
// => toString은 Object.prototype의 메서드
console.log('toString' in person); // true
```
+ Reflact.has 메서드도 in연산자와 동일하게 동작
## 19.13.2 Object.prototype.hasOwnProperty 메서드
> 객체에 특정 프로퍼티가 존재하는 지 확인 가능
```js
const person = {
    name : 'Lee',
    address : 'Seoul'
};

console.log(person.hasOwnProperty('name'));
console.log(person.hasOwnProperty('age'));
// 인수로 전달받은 키가 객체 고유의 프로퍼티 키인 경우에만 true를 반환하고 상속받은 프로토타입 키인 경우 false 반환
console.log(person.hasOwnProperty('toString')); // false
```
<br/><br/>
# 19.14 프로퍼티 열거
## 19.14.1 for...in 
> 객체의 모든 프로퍼티를 순회하며 열거
```js
const person = {
    name : 'Lee',
    address : 'Seoul'
};

// toString 같은 Object.prototype의 프로퍼티가 열거되지는 않음
console.log('toString' in person); // true

for (const key in person) {
    console.log(key + ":" + person[key]);
    // name:Lee
    // address:Seoul
}
```
+ for...in문은 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 true인 프로퍼티를 순회하며 열거
+ 프로퍼티 열거 시 순서를 보장하지 않음 (숫자인 프로퍼티 키만 정렬 실시)
+ ⭐배열에는 for..in문 말고 for문이나 for...of 또는 Array.prototype.forEach 메서드 사용 권장<br/>
  ☑️ for...in문이 느린 이유? <br/>
  객체는 순서가 정해져있지 않아서 주소값을 일일이 찾아야 하므로 더 느려짐 (for of를 사용하는 게 더 좋음)
```js
const arr = [1,2,3];
arr.x = 10; // 배열도 객체이므로 프로퍼티 가질 수 있다

for(const i in arr) {
    console.log(arr[i]); // 1 2 3 10
};

for(let i = 0; i < arr.length; i++){
    console.log(arr[i]); // 1 2 3
};

// forEach 메서드는 요소가 아닌 프로퍼티는 제외
arr.forEach(v => console.log(v)); // 1 2 3

// for...of 변수 선언문에서 선언한 변수에 키가 아닌 값을 할당
for(const value of arr){
    console.log(value); // 1 2 3
}
```
## 19.14.2 :✔️Object.keys / values / entries 메서드 
> Object.keys 메서드는 객체 자신의 열거 가능한 프로퍼티 키를 배열로 변환
```js
const person = {
    name : 'Lee',
    address : 'Seoul',
    __proto__ : {age:20}
};

console.log(Object.keys(person)); // [ 'name', 'address' ]
```
> Object.values 메서드는 객체 자신의 열거 가능한 프로퍼티 값 배열로 변환
```js
console.log(Object.values(person)); // [ 'Lee', 'Seoul' ]
```
> Object.entries 메서드는 객체 자신의 열거 가능한 프로퍼티 키와 값의 쌍의 배열을 배열에 담아 반환
```js
console.log(Object.entries(person)); // [ [ 'name', 'Lee' ], [ 'address', 'Seoul' ] ]

Object.entries(person).forEach(([key,value]) => console.log(key, value));
// name Lee
// address Seoul
```














