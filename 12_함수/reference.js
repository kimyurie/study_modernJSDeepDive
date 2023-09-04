// primitive는 원시값 전달받고, obj는 객체 전달받음
function changeVal(primitive, obj){
    primitive += 100;
    obj.name = 'Kim';
}

var num = 100;
var person = {name:'Lee'};

console.log(num); // 100
console.log(person); // { name: 'Lee' }

changeVal(num, person); // 원시값은 값 자체가 복사되어 전달되고 객체는 참조값이 복사되어 전달

console.log(num); // 100 // 원시값은 원본이 훼손되지 않음
console.log(person); // { name: 'Kim' } // 객체는 원본이 훼손됨