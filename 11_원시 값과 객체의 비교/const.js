const o = {};

o.a = 1; // const 키워드 사용해 선언한 변수에 할당한 객체는 변경 가능
console.log(o); // { a: 1 }

// 문자열은 유사 배열 객체 
var str = 'string';

console.log(str[0]); // S
console.log(str.length); // 5
console.log(str.toUpperCase()); // STRING

var str1 = 'apple';

str1[0] = 'A'; // 문자열은 원시값이므로 변경할 수 없음

console.log(str1); // apple   