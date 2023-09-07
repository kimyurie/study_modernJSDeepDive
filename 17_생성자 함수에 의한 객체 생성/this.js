function foo(){
    console.log(this);
}

// 일반 함수로서 호출
foo(); // window

const obj = {foo};
// 메서드로서 호출
obj.foo(); // obj (메서드를 호출한 객체 - 메서드 앞의 객체)

// 생성자 함수로서 호출
const inst = new foo(); // inst (생성자 함수가 생성할 인스턴스)