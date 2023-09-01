// 문자열에서 특정 문자의 인덱스(위치)를 검색하는 예제
var string = 'Hello World';
var search = 'l';
var index;

for(var i = 0; i < string.length; i++){
    if(string[i] === search){
        index = i;
        break; // 반복문 탈출
    }
}

console.log(index); // 2
console.log(string.indexOf(search)); // 2 메서드 사용으로 위와 동일하게 실행