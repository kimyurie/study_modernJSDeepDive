var obj = {};
var key = 'hello';

obj[key] = 'world'; // 프로퍼티 키 동적 생성

console.log(obj); // { hello: 'world' }


var foo = {
    0: 1,
    1: 2,
    2: 3
};

console.log(foo); // { '0': 1, '1': 2, '2': 3 }

// 프로퍼티 접근
var person = {
    name: 'Lee'
};

console.log(person.name); // Lee // 마침표 표기법에 의한 접근
console.log(person['name']);// Lee // 대괄호 표기법에 의한 접근

// 프로퍼티 값 갱신
var person = {
    name: 'Lee'
};

person.name = 'Kim';

console.log(person); // { name: 'Kim' }

// 프로퍼티 동적 생성
var person = {
    name : 'Lee'
};

person.age = 20;

console.log(person); // { name: 'Lee', age: 20 }

// 프로퍼티 삭제
delete person.age;
delete person.name;

console.log(person); // {}

