// 변수 호이스팅에 의해 var 키워드로 선언한 변수는 변수 선언문 이전에 참조 가능 
// 단, 할당문 이전에 변수를 참조하면 언제나 undefined
console.log(foo); // undefined

foo = 123;

console.log(foo); // 123

// 변수 선언은 런타임 이전에 js 엔진에 의해 암묵적으로 실행
var foo;