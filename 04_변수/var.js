// 선언부 호이스팅
console.log(a); // undefined

var a = 5;
console.log(a); // 5
a = 6;
console.log(a); // 6

//
var b; // 선언만 되어있을 뿐 값 할당 되어있지 않음!
console.log(b); // undefined
b = 5;
console.log(b);
b = 6;
console.log(b);

//
var c = null; // 명확히 값이 비어있다고 할당한 것 => null
var c = ''; 
console.log(c);
console.log(1 + 1 + '2'); // 22