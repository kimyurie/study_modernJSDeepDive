# 12.1 함수란?
> 일련의 과정을 문으로 구현하고 코드 블록으로 감싸서 하나의 실행 단위로 정의한 것
```js
// 함수 정의
function add(x, y){   // x,y → 매개변수 
    return x + y;
}

// 함수 호출
var result = add(2, 5); // 2,5 → 인수
console.log(result); // 7
```
___
<br/><br/>
# 12.2 함수를 사용하는 이유
> 코드의 재사용을 통해 중복 제거 / 유지보수의 편의성 높임 / 코드의 신뢰성 높임 / 코드 가독성 향상시킴
___
<br/><br/>
# 12.3 함수 리터럴 
```js
// 변수에 함수 리터럴을 할당
var f = function add(a,b){
    return a + b;
};
```
+ 함수 리터럴도 평가되어 값을 생성하므로 ⭐함수는 객체이다(js의 중요한 특징 ㄴ18장 함수와 일급 객체)
+ 일반 객체는 호출❌ 함수는 호출⭕
___
<br/><br/>
# 12.4 함수 정의
> 함수를 호출하기 이전에 인수를 전달받을 매개변수와 실행할 문들, 반환할 값을 지정하는 것으로 정의된 함수는 js엔진에 의해 평가되어 함수 객체가 된다 
+ 함수 정의 방식 4가지
```js
// 1. 함수 선언문
function add(x,y){
    return x + y;
}

// 2. 함수 표현식
var add = function (x,y){
    return x + y;
};

// 3. Function 생성자 함수
var add = new Function('x', 'y', 'return x + y');

// 4. 화살표 함수
var add = (x,y) => x + y;
```
```
[ 🗒️변수 선언과 함수 정의 ]
변수는 '선언한다', 함수는 '정의한다'고 표현
→ 함수 선언문이 평가되면 식별자가 암묵적으로 생성되고 함수 객체가 할당되기 때문 
```
___
<br/><br/>
## 12.4.1 함수 선언문
```js
// 함수 선언문
function add(x, y){
    return x + y;
}

console.log(add(2,5)); // 7
```
+ 함수 선언문은 함수 이름을 생략할 수 ❌ (함수 리터럴은 함수 이름 생략 가능⭕)
+ 함수 선언문은 `표현식이 아닌 문`이기 때문에 크롬 개발자 도구 콘솔에서 실행 시 완료 값 undefined가 출력된다 (만약 `표현식인 문`이라면 표현식이 평가되어 생성된 함수가 출력되어야 한다) → [5.6 표현식인 문과 표현식이 아닌 문]( https://github.com/kimyurie/study_modernJSdeepDive/tree/master/05_%ED%91%9C%ED%98%84%EC%8B%9D%EA%B3%BC%20%EB%AC%B8#56-%ED%91%9C%ED%98%84%EC%8B%9D%EC%9D%B8-%EB%AC%B8%EA%B3%BC-%ED%91%9C%ED%98%84%EC%8B%9D%EC%9D%B4-%EC%95%84%EB%8B%8C-%EB%AC%B8) 참고
```js
```



