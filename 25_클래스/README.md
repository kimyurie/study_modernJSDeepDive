# 25.1 클래스는 프로토타입의 문법적 설탕인가?
+ 프로토타입 기반 객체지향 언어는 클래스가 필요없는 객체지향 프로그래밍 언어 => 클래스 없이도 생성자 함수와 프로토타입 통해 객체지향 언어의 상속 구현 가능
> 클래스는 함수이며 기존 프로토타입 기반 패턴을 클래스 기반 패턴처럼 사용할 수 있도록 하는 문법적 설탕
+ 클래스는 생성자 함수와 유사하게 동작하지만 아래와 같은 몇가지 차이가 있음
![image](https://github.com/kimyurie/study_modernJSdeepDive/assets/111670913/9db1e3b0-0f08-4fdb-80a1-00a5212742fa)
> ☑️ 클래스는 새로운 객체 생성 메커니즘!
<br/><br/>
# 25.2 클래스 정의
```js
// 클래스 선언문
class Person{}

// 익명 클래스 표현식
const Person = class {};
// 기명 클래스 표현식
const Person = class MyClass {};
```
📔 클래스는 일급 객체로서 아래와 같은 특징을 갖는다
- 무명의 리터럴로 생성 가능 (런타임에 생성 가능)
- 변수나 자료구조(객체, 배열 등)에 저장 가능
- 함수의 매개변수에 전달 가능
- 함수의 반환값으로 사용 가능
<br/><br/>
> 클래스 몸체에서 정의할 수 있는 메서드는 constructor(생성자), 프로토타입 메서드, 정적 메서드 세가지이다. 
```js
class Person{
    // 생성자
    constructor(name){
        this.name = name;
    }

    // 프로토타입 메서드
    sayHi(){
        console.log(`Hi! My name is ${this.name}`);
    }

    // 정적 메서드
    static sayHello(){
        console.log('Hello!');
    }
}
```
<br/><br/>
# 25.3 클래스 호이스팅
+ 클래스 선언문으로 정의한 클래스는 런타임 이전에 먼저 평가되어 함수 객체를 생성한다. 
```js
class Person{} // 클래스 선언문

console.log(typeof Person); // function
```
+ 클래스는 클래스 정의 이전에 참조할 수 없다.
```js
console.log(Person); // ReferenceError: Person is not defined
class Person{}
```
+ 클래스 선언문은 호이스팅 발생안하는 것처럼 보이지만 변수 선언, 함수 정의와 마찬가지로 호이스팅이 발생 (단, 클래스는 let, const 키워드로 선언한 변수처럼 호이스팅 된다)
```js
const Person = '';

{
    // 호이스팅이 발생하지 않는다면 '' 출력되어야 함
    console.log(Person); // ReferenceError: Person is not defined

    class Person{}
}
```
<br/><br/>
# 25.4 인스턴스 생성
+ 클래스는 인스턴스를 생성하는 것이 유일한 존재 이유이므로 반드시 new 연산자와 함께 호출해야 한다.
```js
class Person{}

const me = new Person();
console.log(me); // Person {}
```
+ 클래스 표현식으로 정의된 클래스의 경우 클래스를 가리키는 식별자를 사용해 인스턴스를 생성하지 않고 기명 클래스 표현식의 클래스 이름을 사용해 인스턴스를 생하면 에러 발생
(클래스 표현식에서 사용한 클래스 이름은 외부 코드에서 접근 불가능하기 때문)
<br/><br/>
# 25.5 메서드
## 25.5.1 constructor




