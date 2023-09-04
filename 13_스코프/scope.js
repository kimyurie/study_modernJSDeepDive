var x = 'global';

function foo(){
    var x = 'local';
    console.log(x); // local
}

foo();

console.log(x); // global

// 스코프 체인에 의한 함수 검색
// 전역 함수
function foo2(){
    console.log('global function foo'); 
}

function bar(){
    // 중첩 함수
    function foo2(){
        console.log('local function foo');
    }
    foo2(); // foo2 함수 호출 시 js 엔진은 함수 호출하기 위해 함수 가리키는 식별자 foo2 검색
}

bar(); // local function foo

// 함수 레벨 스코프
var x = 1;

if(true){
    var x = 10;
}

console.log(x); // 10


// 렉시컬 스코프
var a = 1;

function foo3(){
    var a = 10;
    bar2();
}

function bar2(){ // 전역에서 정의된 함수
    console.log(a);
}

foo3(); // 1
bar2(); // 1 // // 호출 시 호출된 곳이 어디인지 관계없이 언제나 자신이 기억하고 있는 전역 스코프를 상위 스코프로 사용