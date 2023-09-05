function foo(){
    // 변수 x 생성
    var x = 'local'; // 변수 x에 값 할당
    console.log(x);
    return x;
    // 변수 x 소멸
} // 변수 x 생명 주기

foo(); // local
console.log(x); // ReferenceError

//----------------------------------------

var x = 'global';

function foo(){
    console.log(x); // 지역변수 x는 여기서 이미 선언되었고 undefined로 초기화 => 지역 변수 x를 참조해 값을 출력!
    var x = 'local';
}

foo(); // undefined // 변수 할당문 실행되기 전까지는 undefined 값
console.log(x); // global


