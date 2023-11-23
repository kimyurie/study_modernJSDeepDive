# 16.1 내부 슬롯과 내부 메서드
> js 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 의사 프로퍼티와 의사 메서드
+  이중 대괄호로 감싼 이름들 ([[...]])이 내부 슬롯과 내부 메서드이다 
```js
const o = {};

// 내부 슬롯은 js 엔진 내부 로직이므로 직접 접근 불가
o.[[Prototype]] // Error

// 일부 내부 슬롯, 메서드에 한하여 간접적으로 접근 가능
o.__proto__ // Object.prototype
```
___
<br/><br/>
# 16.2 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체
> js 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다
+ getOwnPropertyDescriptor 메서드는 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환
```js
const person = {
    name: 'Lee'
};

// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환
console.log(Object.getOwnPropertyDescriptor(person, 'name'));
// {value: 'Lee', writable: true, enumerable: true, configurable: true}
```
+ getOwnPropertyDescriptors 메서드는 모든 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환
```js
const person = {
    name : 'Lee'
};

person.age = 20;

console.log(Object.getOwnPropertyDescriptors(person));
// age : {value: 20, writable: true, enumerable: true, configurable: true}
// name : {value: 'Lee', writable: true, enumerable: true, configurable: true}
```
___
<br/><br/>
# 16.3 데이터 프로퍼티와 접근자 프로퍼티
> 프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 구분 
## 16.3.1 데이터 프로퍼티
> 키와 값으로 구성된 일반적인 프로퍼티

| 프로퍼티 어트리뷰트 | 프로퍼티 디스크립터 객체의 프로퍼티 | 설명                                                     |
| ------------------- | ----------------------------------- | -------------------------------------------------------- |
| [[Value]]           | value                               | 프로퍼티 키를 통해 프로퍼티 값에 접근하면 반환 되는 값 |
| [[Writable]]        | writable                            | 프로퍼티 값 변경 가능 여부 → boolean                   |
| [[Enumerable]]      | enumerable                          | 프로퍼티의 열거 가능 여부 → boolean                    |
| [[Configurable]]    | configurable                        | 프로퍼티의 재정의 가능 여부 → boolean                  |
```js
const person = {
  name: 'Lee'
};

person.age = 20; // 프로퍼티 동적 생성

console.log(Object.getOwnPropertyDescriptors(person));
// 프로퍼티 생성 시 [[Value]] 값은 프로퍼티 값으로 초기화 / 나머지 값들은 true로 초기화
// name : {value: 'Lee', writable: true, enumerable: true, configurable: true}
// 프로퍼티를 동적 추가해도 마찬가지
// age: {value: 20, writable: true, enumerable: true, configurable: true}

```
___
<br/><br/>
## 16.3.2 접근자 프로퍼티
> 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티 값을 읽거나 저장할 때 호출되는 `접근자 함수`로 구성된 프로퍼티

| 프로퍼티 어트리뷰트 | 프로퍼티 디스크립터 객체의 프로퍼티 | 설명                                                                     |
| ------------------- | ----------------------------------- | ------------------------------------------------------------------------ |
| [[Get]]             | get                                 | 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수 → getter 함수 호출   |
| [[Set]]             | set                                 | 데이터 프로퍼티의 값을 저장할 때 호출되는 접근자 함수 → setter 함수 호출 |
| [[Enumerable]]      | enumerable                          | 데이터 프로퍼티의 [[Enumerable]] 과 같음                               |
| [[Configurable]]    | configurable                        | 데이터 프로퍼티의 [[Configurable]] 과 같음                            |
```js
const person = {
    // 데이터 프로퍼티
    firstName: 'Yuri',
    lastName: 'Kim',

    // fullName은 접근자 함수로 구성된 접근자 프로퍼티다 
    // getter 함수
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    // setter 함수
    set fullName(name){
        // 배열 디스트럭처링 할당(ㄴ31.1 배열 디스트럭처링)
        [this.firstName, this.lastName] = name.split(' ');
    }
};

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조 
console.log(person.firstName + ' ' + person.lastName); // Yuri Kim

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// fullName에 값을 저장하면 setter 함수가 호출된다 
person.fullName = 'Heegun Kim';
console.log(person); // {firstName: 'Heegun', lastName: 'Kim'} 

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// fullName에 접근하면 getter함수가 호출된다 
console.log(person.fullName); // Heegun Kim

let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log(descriptor);
// {
//     value: 'Heegun',
//     writable: true,
//     enumerable: true,
//     configurable: true
// }

descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(descriptor);
// {
//     get: [Function: get fullName],
//     set: [Function: set fullName],
//     enumerable: true,
//     configurable: true
// }
```
___
<br/><br/>
# 16.4 프로퍼티 정의
> `Object.defineProperty` 메서드 사용
```js
const person = {};

// 데이터 프로퍼티 정의
Object.defineProperty(person, 'firstName',{
    value:'Yuri',
    writable:true,
    enumerable: true,
    configurable: true
});

Object.defineProperty(person, 'lastName',{
    value:'Kim',
});

let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log('firstName', descriptor); // {value: 'Yuri', writable: true, enumerable: true, configurable: true}

// 디스크립터 객체 누락 시 undefined, false가 기본값
descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('firstName', descriptor); // {value: 'Kim', writable: false, enumerable: false, configurable: false}

// 접근자 프로퍼티 정의
Object.defineProperty(person, 'fullName', {
    // getter 함수
    get(){
        return `${this.firstName} ${this.lastName}`;
    },
    // setter 함수 
    set(name){
        [this.firstName, this.lastName] = name.split(' ');
    },
    enumerable:true,
    configurable:true
});

descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log('fullName', descriptor);  // {enumerable: true, configurable: true, get: ƒ, set: ƒ}

person.fullName = 'Heegun Kim';
console.log(person); // {firstName: 'Heegun', lastName: 'Kim'}
```
+ 프로퍼티 디스크립트 객체에서 생략된 어트리뷰트는 기본값(`undefined나 false`)이 적용
+ `Object.defineProperties` 메서드 사용시 여러개의 프로퍼티 한번에 정의 가능
___
<br/><br/>
# 16.5 객체 변경 방지
| 구분           | 메서드                   | 프로퍼티 추가 | 프로퍼티 삭제 | 프로퍼티 값 읽기 | 프로퍼티 값 쓰기 | 프로퍼티 어트리뷰트 재정의 |
| -------------- | ------------------------ | ------------- | ------------- | ---------------- | ---------------- | -------------------------- |
| 객체 확장 금지 | Object.preventExtensions | X             | O             | O                | O                | O                          |
| 객체 밀봉      | Object.isSealed          | X             | X             | O                | O                | X                          |
| 객체 동결      | Object.freeze            | X             | X             | O                | X                | X                          |
___
## 16.5.1 객체 확장 금지
> 확장이 금지된 객체는 프로퍼티 추가가 금지🚫
```js
Object.preventExtensions(객체);

// 확장 가능한 객체인지 판단 여부 메서드 -> boolean
Object.isExtensible(객체);
```
___
## 16.5.2 객체 밀봉
> 밀봉된 객체는 읽기와 쓰기만 가능 (프로퍼티 추가, 삭제, 프로퍼티 어트리뷰트 재정의 금지🚫)
```js
Object.seal(객체);

// 확장 가능한 객체인지 판단 여부 메서드 -> boolean
Object.isSealed(객체);
```
___
## 16.5.3 객체 동결
> 동결된 객체는 읽기만 가능 (프로퍼티 추가,삭제,값 갱신, 프로퍼티 어트리뷰트 재정의 금지🚫)
```js
Object.free(객체);

// 동결된 객체인지 판단 여부 메서드 -> boolean
Object.isFrozen(객체);
```
___
<br/><br/>
## 16.5.4 불변 객체
+ 지금까지 살펴본 변경 방지 메서드들은 얇은 변경 방지로 `중첩 객체까지는 영향을 주지 못한다` (Object.freeze 메서드 사용해도 마찬가지)<br/>
  => `객체를 값으로 갖는 모든 프로퍼티에 대해 재귀적으로 Object.freeze 메서드 호출`해야 한다
```js
function deepFreeze(target){
    // 객체이고 동결되지 않은 객체만 동결
    if (target && typeof target === 'object' && !Object.isFrozen(target)){
        Object.freeze(target);
        // 모든 프로퍼티 순회하며 재귀적으로 동결
        // Object.keys 메서드 : 객체 자신의 열거 가능한 프로퍼티를 배열로 반환 
        // forEach 메서드 : 배열 순회하며 배열 각 요소에 대해 콜백함수 실행
        Object.keys(target).forEach(key => deepFreeze(target[key]));
    }
    return target;
}

const person = {
    name: 'Lee',
    address: {city: 'Seoul'}
};

deepFreeze(person);

console.log(Object.isFrozen(person)); // true
console.log(Object.isFrozen(person.address)); // true // 중첩 객체까지 동결

person.address.city = 'Busan';
console.log(person); // { name: 'Lee', address: { city: 'Seoul' } }
```





