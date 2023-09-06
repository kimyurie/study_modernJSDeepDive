let foo = 1; // 전역 변수

{
    let foo = 2; // 지역 변수 - 위 foo와는 다른 별개의 변수!
    let bar = 3; // 지역 변수 
}

console.log(foo); // 1
console.log(bar); // ReferenceError: bar is not defined