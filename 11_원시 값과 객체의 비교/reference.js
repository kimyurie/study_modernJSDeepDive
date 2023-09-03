var person = {
    name : 'Yuri'
};

var copy = person; // 참조 값을 복사 (얇은 복사) - copy와 person은 동일한 참조 값 가짐

console.log(copy === person); // true

copy.name = 'Kim';
person.address = 'Seoul';

// copy와 person은 동일한 객체를 가리킴 
// 어느 한 쪽에서 객체를 변경하면 서로 영향을 주고받음
console.log(person); // { name: 'Kim', address: 'Seoul' }
console.log(copy); // { name: 'Kim', address: 'Seoul' }


var person1 = {
    name : 'Lee'
};

var person2 = {
    name : 'Lee'
};

console.log(person1 === person2); // false
console.log(person1.name === person2.name); // true