const obj = {a:1};

// 객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 Object.prototype이다.
console.log(obj.__proto__  === Object.prototype); // true

// hasOwnProperty 메서드는 인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만 true 반환하고
// 상속받은 프로토타입의 프로퍼티 키인 경우 false 반환
console.log(obj.hasOwnProperty('a')); // true
console.log(obj.hasOwnProperty('__proto__ ')); // false
// 객체 리터럴 방식으로 생성한 객체는 프로토타입 객체인 Object.prototype의 프로퍼티를 상속받음

