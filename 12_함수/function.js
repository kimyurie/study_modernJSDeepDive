// 함수 정의
function add(x, y){
    return x + y;
}

// 함수 호출
var result = add(2, 5);
console.log(result); // 7

// 함수 리터럴
// 변수에 함수 리터럴을 할당
var f = function add(a,b){
    return a + b;
};

// 함수 선언문
function add(x,y){
    return x + y;
}

// 함수 표현식
var add = function (x,y){
    return x + y;
};

// Function 생성자 함수
var add = new Function('x', 'y', 'return x + y');

// 화살표 함수
var add = (x,y) => x + y;

