// 생성자 함수로서 정의하지 않은 일반 함수 -> non-constructor
function add(x, y){
    return x + y;
}

// 생성자 함수로서 정의하지 않은 일반 함수를 new 연산자와 함께 호출
let inst = new add();

// 함수가 객체를 반환하지 않았으므로 반환문이 무시 -> 빈 객체가 생성되어 반환
console.log(inst); // {}

// 객체를 반환하는 일반 함수 -> construnctor
function createUser(name, role){
    return {name, role};
}

// 일반함수를 new 연산자와 함께 호출
inst = new createUser('Lee', 'admin');
// 함수가 생성한 객체를 반환
console.log(inst); // { name: 'Lee', role: 'admin' }