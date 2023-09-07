function Circle(radius){
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩
    // console.log(this); // Circle {}

    // 2. this에 바인딩되어있는 인스턴스를 초기화
    this.radius = radius;
    this.getDiameter = function(){
        return 2 * this.radius;
    };

    // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환
}

const circle = new Circle(1);
console.log(circle); // Circle { radius: 1, getDiameter: [Function] }