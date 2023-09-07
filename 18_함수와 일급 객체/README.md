# 18.1 일급 객체
```js
// 일급 객체의 특징
// 1. 함수는 무명의 리터럴로 생성할 수 있다.
// 2. 함수는 변수에 저장할 수 있다
// 런타임(할당 단계)에 함수 리터럴이 펑가되어 함수 객체가 생성되고 변수에 할당된다. 
const increase  = function(num){
    return ++num;
};

const decrease = function(num){
    return --num;
};

// 2. 함수는 객체에 저장할 수 있다. 
const auxs = { increase, decrease };

// 3. 함수의 매개변수에 전달할 수 있다.
// 4. 함수의 반환값으로 사용할 수 있다. 
function makeCounter(aux) {
    let num = 0;

    return function(){
        num = aux(num);
        return num;
    };
}

// 3. 함수는 매개변수에게 함수를 전달할 수 있다.
const increaser = makeCounter(auxs.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

// 3. 함수는 매개변수에게 함수를 전달할 수 있다.
const decreaser = makeCounter(auxs.decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```
<br/><br/>
# 18.2 함수 객체의 프로퍼티
> 함수도 객체이므로 프로퍼티를 가질 수 있다
## 18.2.1 arguments 프로퍼티
> 함수 객체 arguments의 프로퍼티 값은 arguments 객체로 함수 호출 시 전달된 인수들의 정보를 담고 있는 순회 가능한 유사 배열 객체이다.
+ 함수 내부에서 지역 변수처럼 사용 (함수 외부에서 참조 불가)
+ js는 함수의 매개변와 인수의 개수가 일치하는지 확인하지 않는다. => 함수 호출 시 매개변수 개수만큼 인수를 전달하지 않아도 에러 발생 x
```js
function multiply(x, y){
    console.log(arguments);
    return x * y;
}

console.log(multiply()); // NaN
console.log(multiply(1)); // NaN
console.log(multiply(1,2)); // 2
console.log(multiply(1,2,3)); // 2
```
+ arguments 객체는 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용
```js
function sum(){
    let res = 0;

    for (let i = 0; i < arguments.length; i++){
        res += arguments[i];
    }

    return res;
}

console.log(sum()); // 0
console.log(sum(1,2)); // 3
console.log(sum(1,2,3)); // 6
```
+ arguments 객체는 유사 배열 객체로 유사 배열 객체란 length 프로퍼티를 가진 객체로 for문으로 순회할 수 있는 객체를 말한
<br/><br/>
## 18.2.2 caller 프로퍼티
> 사용x
<br/><br/>
## 18.2.3 length 프로퍼티
> 함수를 정의할 때 선언한 매개변수의 개수를 가리킴
+ arguments 객체의 length 프로퍼티 : 인자의 개수 / 함수 객체의 length 프로퍼티 : 매개변수의 개수
<br/><br/>
## 18.2.4 name 프로퍼티
> 함수 이름을 나타냄
+ ES5 -> 빈 문자열 ('') / ES6 -> 함수 객체를 가리키는 식별자
```js
// 함수 객체 name 프로퍼티 - 무명 함수 표현식 
// - ES5 에서는 빈 문자열('')
// - ES6 에서는 함수 객체를 가리키는 식별자
const anonymousFunc = function () {};
console.log(anonymousFunc.name); // anonymousFunc
```
## 18.2.5 __proto__ 접근자 프로퍼티
> [[Prototype]] 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티
+ 모든 객체는 [[Prototype]]이라는 내부 슬롯을 가짐 => 이 내부 슬롯은 프로토타입 객체를 가리킴
```js
const obj = {a:1};

// 객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 Object.prototype이다.
console.log(obj.__proto__  === Object.prototype); // true

// hasOwnProperty 메서드는 인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만 true 반환하고
// 상속받은 프로토타입의 프로퍼티 키인 경우 false 반환
console.log(obj.hasOwnProperty('a')); // true
console.log(obj.hasOwnProperty('__proto__ ')); // false
// 객체 리터럴 방식으로 생성한 객체는 프로토타입 객체인 Object.prototype의 프로퍼티를 상속받음
```
<br/><br/>
## 18.2.6 prototype 프로퍼티
+ 생성자 함수로 호출할 수 있는 함수 객체로 constructor만이 소유하는 프로퍼티 
+ 함수가 객체를 생성하는 생성자 함수로 호출될 때 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.
```js
// 함수 객체는 prototype 프로퍼티를 소유한다
(function(){}).hasOwnProperty('prototype'); // true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다
({}).hasOwnProperty('prototype'); // false
```





