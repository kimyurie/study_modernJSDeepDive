# 8. 제어문
> 조건문 , 반복문
+ 제어문은 코드 실행 순서 변경시켜 코드의 흐름 이해하기 어렵게 만들어 가독성 해치는 단점이 있음<br/>
 → forEach, map, filter, reduce 사용 시 복잡성 해결(ㄴ나중 단원에 나옴)
<br/><br/>
# 8.1 블록문
> 0개 이상의 문을 {}로 묶은 것
+ 끝에는 세미콜론을 붙이지 않는다
___
<br/><br/>
# 8.2 조건문 
## 8.2.1 if ... else문
+ 아래 코드와 같이 대부분의 if...else문은 삼항 조건 연산자로 바꿔 쓸 수 있다
```js
var num = 2;
var result;

if (num > 0){
    result = '양수';
}else if(num < 0){
    result = '음수';
}else{
    result = '영';
}

console.log(result);  // 양수
```
```js
var num = 2;
var result;

var result = num ? (num > 0 ? '양수' : '음수') : '영';

console.log(result);  // 양수
```
<br/><br/>
## 8.2.2 switch문
+ switch문의 표현식과 일치하는 case문이 없다면 default문으로 이동하며 default문은 선택사항으로 사용할수도, 안할 수도 있다
+ if..else문의 조건식은 불리언 값으로 평가되어야 하지만 switch문의 표현식은 문자열이나 숫자 값인 경우가 많다
+ `break` : 코드 블록에서 탈출하는 역할 (default문에는 필요 없음)
```js
// 윤년인지 판별해서 2월의 일수를 계산하는 예제
// 윤년 계산 알고리즘
// 1. 연도가 4로 나누어떨어지는 해(2000, 2004, 2008, 2012, 2016, 2020...)는 윤년이다.
// 2. 연도가 4로 나누어떨어지더라도 연도가 100으로 나누어떨어지는 해(2000, 2100, 2200...)는 평년이다.
// 3. 연도가 400으로 나누어떨어지는 해(2000, 2400, 2800...)는 윤년이다.

var year = 2000; // 2000년은 윤년으로 2월이 29일이다.
var month = 2;
var days = 0;

switch(month){
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        days = 31;
        break;
    case 4: case 6: case 9: case 11:
        days = 30;
        break;
    case 2:
        days = ((year % 4 === 0 && year % 100 != 0) || (year % 400 === 0)) ? 29 : 28;
        break;
    default:
        console.log('Invalid month');
}

console.log(days); 
```
___ 
<br/><br/>
# 8.3 반복문
> for문, while문, do ... while문
```
[📔 반복문을 대체할 수 있는 다양한 기능 ]

- forEach 메서드 : 배열을 순회할 때 사용
- for...in 문 : 객체의 프로퍼티를 열거할 때 사용
- for...of 문 : 이터러블 순회 가능
(ㄴ 나중에 자세히 나옴)
```
## 8.3.1 for문
```
// for문에서의 무한루프
for(;;){...} 
```
## 8.3.2 while문
+ for문은 반복 횟수 명확할 때, while문은 반복 횟수 불명확할 때 사용
+ while문에서의 무한루프에서 탈출하기 위해서는 코드 블록 내에 if문으로 탈출 조건을 만들고 break문으로 코드 블록을 탈출한다
```js
var count = 0;

while(true) { // 무한 루프 
    console.log(count);
    count++;
    // count 3이면 코드 블록 탈출 
    if (count === 3) break;
} // 0 1 2
```
## 8.3.3 do...while문
+ 코드 블록이 무조건 한번 이상은 실행
___
<br/><br/>
# 8.4 break문
> 레이블 문, 반복문, switch문 코드 블록 탈출
+ 중첩 for문 탈출 : 레이블문 사용 → 그 밖 경우 권장 x 오류 가능성 높아짐
```js
// 문자열에서 특정 문자의 인덱스(위치)를 검색하는 예제
var string = 'Hello World';
var search = 'l';
var index;
// 문자열은 유사 배열이므로 for문으로 순회 가능 
for(var i = 0; i < string.length; i++){
    if(string[i] === search){ // 문자 개별 문자가 l이면 
        index = i;
        break; // 반복문 탈출
    }
}

console.log(index); // 2
// .indexOf 메서드 사용해도 위와 동일하게 실행
console.log(string.indexOf(search)); // 2 
```
___
<br/><br/>
# 8.5 continue 문
> 반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 실행 흐름을 이동시킨다 (break문처럼 반복문 탈출❌)
```js
// 문자열에서 특정 문자의 개수를 세는 예제
var string = 'Hello World.';
var search = 'l';
var count = 0;

for(var i = 0; i < string.length; i++){
    if(string[i] != 'l') continue; // 'l'이 아니면 반복문 중단하고 반복문의 증감식으로 이동
    count++; // continue문 실행 시 이 문은 실행되지 않음
}

// // 위와 동일하게 동작
// for(var i = 0; i < string.length; i++){
//     if(string[i] == 'l') count++;
// }

console.log(count); // 3

// .match 메서드 사용해도 같은 동작
const regexp = new RegExp(search, 'g');
console.log(string.match(regexp).length); // 3

```
+ if문 내에서 실행해야 할 코드가 길 때 continue문 사용하는게 가독성 더 좋음
___ 


  
  




