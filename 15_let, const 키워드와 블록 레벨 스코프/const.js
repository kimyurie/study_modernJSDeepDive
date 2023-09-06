{
    // 변수 호이스팅이 발생하지 않는 것처럼 동작
    console.log(foo); // ReferenceError: foo is not defined
    const foo = 1;
    console.log(foo); // 1
}

// 블록 레벨 스코프 가짐
console.log(foo); // ReferenceError: foo is not defined

//-------------------------------------

const person = {
    name : 'Lee'
};

// 객체는 변경 가능한 값으로 재할당 없이 변경 가능
person.name = 'Kim';

console.log(person); // { name: 'Kim' }