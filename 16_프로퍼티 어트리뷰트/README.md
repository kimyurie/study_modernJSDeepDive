# 16.1 내부 슬롯과 내부 메서드
+ js 엔진 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 의사 프로퍼티와 의사 메서드
+  이중 대괄호로 감싼 이름들 ([[...]])
```js
const o = {};

// 내부 슬롯은 js 엔진 내부 로직이므로 직접 접근 불가
o.[[Prototype]] // Error

// 일부 내부 슬롯, 메서드에 한하여 간접적으로 접근 가능
o.__proto__ // Object.prototype
```
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
# 16.3 데이터 프로퍼티와 접근자 프로퍼티
> 데이터 프로퍼티 : 키와 값으로 구성된 일반적인 프로퍼티<br/>
> 접근자 프로퍼티 : 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티 값을 읽거나 저장할 때 호출되는 접근자 함수로 구성된 프로퍼티
<br/><br/>
# 16.3.1 데이터 프로퍼티
| 프로퍼티 어트리뷰트 | 프로퍼티 디스크립터 객체의 프로퍼티 | 설명                                                     |
| ------------------- | ----------------------------------- | -------------------------------------------------------- |
| [[Value]]           | value                               | + 프로퍼티 키를 통해 프로퍼티 값에 접근하면 반환 되는 값 |
| [[Writable]]        | writable                            | + 프로퍼티 값 변경 가능 여부 → boolean                   |
| [[Enumerable]]      | enumerable                          | + 프로퍼티의 열거 가능 여부 → boolean                    |
| [[Configurable]]    | configurable                        | + 프로퍼티의 재정의 가능 여부 → boolean                  |
```js
const person = {
  name: 'Lee'
};

person.age = 20; // 프로퍼티 동적 생성

console.log(Object.getOwnPropertyDescriptors(person));
// name : {value: 'Lee', writable: true, enumerable: true, configurable: true} // 프로퍼티 생성 시 [[Value]] 값은 프로퍼티 값으로 초기화 / 나머지 값들은 true로 초기
// age: {value: 20, writable: true, enumerable: true, configurable: true} // 동적 추가해도 마찬가

```
# 16.3.2 접근자 프로퍼티




