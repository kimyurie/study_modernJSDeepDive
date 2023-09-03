var circle = {
    radius: 5, // 프로퍼티
    getDiameter: function() { // 메서드
        return 2 * this.radius; // this는 circle을 가리킴
    }
};

console.log(circle.getDiameter()); // 10

// 메서드 축약 표현
const obj = {
    name: 'Lee',
    // sayHi : function(){
    //     console.log('Hi!' + this.name);
    // }

    sayHi() { // 메서드 축약 표현
        console.log('Hi!' + this.name);
    }
};

obj.sayHi(); // Hi!Lee