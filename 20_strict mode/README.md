# 20.1 strict mode란?
```js
function foo(){
    // 선언을 안하였지만 js 엔진은 암묵적으로 전역 객체에 x 프로퍼티를 동적 생성
    // => 전역 객체 x 프로퍼티는 전역 변수처럼 사용 가능! = 암묵적 전역    
    x = 10; 
}
foo();

console.log(x); // 10
```
+ 암묵적 전역은 오류 발생시킬 원인크므로 반드시 var, let, const 키워드를 사용하여 변수 선언한 다음 사용해야 한다.
> strict mode : js 언어 문법을 좀 더 엄격히 적용하여 오류를 발생시킬 가능성이 높거나 js 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적 에러를 발생시킴
+ ESLint도 유사한 효과로 정적 분석 기능을 통해 소스코드 실행 전에 소스코드를 스캔하여 문법적 오류만이 아니라 잠재적 오류까지 찾아내고 오류의 원인 리포팅 해주는 도구이다.
(strict mode보다 강력한 효과로 이거 쓰는 걸 더 추천!)
<br/><br/>
# 20.2 strict mode의 적용
> 전역의 선두 또는 함수 몸체의 선두에 'use strict';를 추가하면 스크립트 전체에 strict mode 적용
```js
'use strict';

function foo(){
  x = 10; // ReferenceError 
}
foo();
```
+ 함수 몸체의 선두에 추가하면 해당 함수와 중첩 함수에 strict mode가 적용
+ 코드의 선두에 위치시키지 않으면 strict mode가 제대로 동작하지 않음
<br/><br/>
# 20.3 전역에 strict mode를 적용하는 것은 피하자
+ 전역에 적용한 strict mode는 script 단위(<script></script>)로 적용
+ strict mode 스크립트와 non-strict mode 스크립트 혼용하는 것은 오류 발생시킬 수 있으므로 바람직하지 않음
+ 해결책 => 즉시 실행 함수 사용
```js
// 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 strict mode를 적용
(function(){
    'use strict';
    // ...
}());
```
<br/><br/>
# 20.4 함수 단위로 strict mode를 적용하는 것도 피하자
+ 해결책 => 위와 같이 즉시 실행 함수 사용
<br/><br/>
# 20.5 strict mode 발생시키는 에러
## 20.5.1 암묵적 전역
> 선언하지 않은 변수 참조 시 에러 발생
## 20.5.2 변수, 함수, 매개변수의 삭제 
> delete 연산자로 변수, 함수, 매개변수 삭제 시 에러 발생
## 20.5.3 매개변수 이름의 중복
> 중복된 매개변수 이름 사용하면 에러 발생!
## 20.5.4 with문의 사용
> 안좋으므로 사용하지xx<br/>

# 20.6 strict mode 적용에 대한 변화
## 20.6.1 일반 함수의 this
```js
(function(){
    'use strict';

    function foo(){
        // strict 모드에서는 함수를 일반 함수로 호출하면 this에 undefined 바인딩 
        // => 생성자 함수가 아닌 함수 내부에서는 this를 사용할 필요 없기 때문
        console.log(this); // undefined
    }
    foo();

    function Foo(){
        console.log(this); // Foo
    }
    new Foo();
}());
```
## 20.6.2 arguments 객체
```js
(function (a){
    'use strict';
    // 매개변수에 전달된 인수를 재할당하여 변경
    a = 2;

    // 변경된 인수가 arguments 객체에 반영되지 않는다. 
    console.log(arguments); // { '0': 1 }
}(1));
```

