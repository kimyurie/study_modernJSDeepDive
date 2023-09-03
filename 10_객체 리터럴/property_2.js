var x = 1, y = 2;

var obj1 = {
    x: x,
    y: y
};

console.log(obj1); // { x: 1, y: 2 }

let a = 1, b = 2;

const obj2 = {a, b}; // 프로퍼티 축약 표현

console.log(obj2); // { a: 1, b: 2 }

// 계산된 프로퍼티 이름
var prefix = 'prop';
var i = 0;

var obj = {};

// 계산된 프로퍼티 이름으로 프로퍼티 키 동적 생성
obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;

console.log(obj); // { 'prop-1': 1, 'prop-2': 2, 'prop-3': 3 }

const pre = 'prop';
let c = 0;

// 객체 리터럴 내부에서 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성
const obj3 = {
    [`${pre}-${++c}`]: c,
    [`${pre}-${++c}`]: c,
    [`${pre}=${++c}`]: c 
};

console.log(obj3); // { 'prop-1': 1, 'prop-2': 2, 'prop=3': 3 }

