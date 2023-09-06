// // 초기화 단계가 실행되기 이전에 변수에 접근하려고 하면 참조 에러 발생
// console.log(foo); // ReferenceError: foo is not defined

// let foo; // 변수 선언문에서 초기화 단계 실행
// console.log(foo); // undefined

// foo = 1;
// console.log(foo); // 1


// ---------------------


let foo = 1;

{
    console.log(foo); // ReferenceError // 만약 let이 호이스팅 발생하지 않는다면 foo 값 출력 되어야 함
    let foo = 2;
}
