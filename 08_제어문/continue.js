// 문자열에서 특정 문자의 개수를 세는 예제
var string = 'Hello World.';
var search = 'l';
var count = 0;

for(var i = 0; i < string.length; i++){
    if(string[i] !='l') continue; // 'l'이 아니면 반복문 중단하고 반복문의 증감식으로 이동
    count++; // continue문 실행 시 이 문은 실행되지 않음
}

// // 위와 동일하게 동작
// for(var i = 0; i < string.length; i++){
//     if(string[i] == 'l') count++;
// }

console.log(count); // 3

// String.prototype.match 메서드 사용해도 같은 동작
const regexp = new RegExp(search, 'g');
console.log(string.match(regexp).length);
