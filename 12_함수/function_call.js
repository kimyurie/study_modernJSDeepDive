// 함수는 매개변수 개수와 인수의 개수가 일치하는 지 체크 x
function add(x,y){
    return x + y;
}

console.log(add(2)); // NaN ( 2 + undefined = NaN)

// 매개변수보다 인수가 더 많은 경우 초과된 인수는 무시
function add1(x, y){
    return x + y;
}

console.log(add(2,3,7)); // 5

// 반환문
function multiply(x, y){
    return x * y;
    // 반환문 이후 다른 문이 존재하면 그 문은 실행되지 않고 무시
    console.log('실행되지 않는다'); 
}

console.log(multiply(3, 5)) // 15