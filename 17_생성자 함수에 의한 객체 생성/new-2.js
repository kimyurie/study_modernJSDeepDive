// 생성자 함수
function Circle(radius){
    this.radius = radius;
    this.getDiameter = function(){
        return 2 * this.radius;
    };
}

// new 연산자 없이 생성자 함수 호출하면 일반 함수로서 호출된다. 
const circle = Circle(5);
console.log(circle); // undefined // new 붙이면 결과값 5

// 일반 함수 내부의 this는 전역 객체 window를 가리킴
console.log(radius); // 5 // new 붙이면 결과값 10
console.log(getDiameter()); // 10 // new 붙이면 결과값 10

circle.getDiameter(); // TypeError