const person = {
    // 데이터 프로퍼티
    firstName : 'Yuri',
    lastName: 'Kim',

    // fullName()은 접근자 함수로 구성된 접근자 프로퍼티
    // getter 함수
    get fullName(){
        return `${this.firstName} ${this.lastName}`;
    },
    // setter 함수
    set fullName(name){
     [this.firstName, this.lastName] = name.split(' ');
    }
};

// 데이터 프로퍼티 통한 프로퍼티 값의 참조
console.log(person.firstName + ' ' + person.lastName); // Yuri Kim

// 접근자 프로퍼티 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수 호출
person.fullName = 'Heegun Kim';
console.log(person); // {firstName: 'Heegun', lastName: 'Kim'}

// 접근자 프로퍼티 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수 호출
console.log(person.fullName); // Heegun Kim

let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log(descriptor); // {value: 'Heegun', writable: true, enumerable: true, configurable: true}
descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(descriptor); // {enumerable: true, configurable: true, get: ƒ, set: ƒ}

