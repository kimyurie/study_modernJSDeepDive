// 즉시 실행 함수
(function(){
    var foo = 10; // 즉시 실행 함수에서의 지역 변수
    //...
}());

console.log(foo); // ReferenceError: foo is not defined

