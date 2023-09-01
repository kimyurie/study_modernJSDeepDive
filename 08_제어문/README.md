# 조건문 
## if ... else문
+ 삼항조건연산자( ? : )는 표현식이므로 값처럼 사용할 수 있기 때문에 변수에 할당 가능
+ if ...  else문은 표현식이 아닌 문이므로 값처럼 사용할 수 없기 때문에 변수에 할당 불가
<br/><br/>
## switch문
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
<br/><br/>
# 반복문
> for문, while문, do ... while문
```
📔 반복문을 대체할 수 있는 다양한 기능

- forEach 메서드 : 배열을 순회할 때 사용
- for...in 문 : 객체의 프로퍼티를 열거할 때 사용
- for...of 문 : 이터러블 순회 가능
```
<br/><br/>
# break문
> 레이블 문, 반복문, switch문 코드 블록 탈출
+ 중첩 for문 탈출 : 레이블문 사용 -> 그 밖 경우 권장 x 오류 가능성 높아짐
```js
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
```
<br/><br/>
# continue 문
> 반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 실행 흐름을 이동시킨다. (break문처럼 반복문 탈출x)
```js
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

```



  
  




