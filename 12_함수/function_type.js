// 즉시 실행 함수
(function (){
    var a = 3;
    var b = 5;
    return a * b;
}());

// 재귀 함수
// 10부터 0까지 출력하는 함수 (재귀 함수 사용 x)
function countdown(n){
    for(var i = n; i>=0; i--) console.log(i);
}

countdown(10);

// (재귀 함수 사용 o)
function countdown(n){
    if (n < 0) return;
    console.log(n);
    countdown(n - 1); // 재귀 호출
}

countdown(10);


// 외부 함수
function outer(){
    var x = 1;

    // 중첩 함수
    function inner(){
        var y = 2;
        console.log(x + y); // 3 // 외부 함수의 변수 참조 가능
    }
    inner();
}

outer();