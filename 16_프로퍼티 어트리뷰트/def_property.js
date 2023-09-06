const person = {};

// 데이터 프로퍼티 정의
Object.defineProperty(person, 'firstName',{
    value:'Yuri',
    writable:true,
    enumerable: true,
    configurable: true
});

Object.defineProperty(person, 'lastName',{
    value:'Kim',
});

let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log('firstName', descriptor); // {value: 'Yuri', writable: true, enumerable: true, configurable: true}

// 디스크립터 객체 누락 시 undefined, false가 기본값
descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('firstName', descriptor); // {value: 'Kim', writable: false, enumerable: false, configurable: false}

// 접근자 프로퍼티 정의
Object.defineProperty(person, 'fullName', {
    get(){
        return `${this.firstName} ${this.lastName}`;
    },
    set(name){
        [this.firstName, this.lastName] = name.split(' ');
    },
    enumerable:true,
    configurable:true
});

descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log('fullName', descriptor);  // {enumerable: true, configurable: true, get: ƒ, set: ƒ}

person.fullName = 'Heegun Kim';
console.log(person); // {firstName: 'Heegun', lastName: 'Kim'}



