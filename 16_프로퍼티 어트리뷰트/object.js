function deepFreeze(target){
    // 객체이고 동결되지 않은 객체만 동결
    if (target && typeof target === 'object' && !Object.isFrozen(target)){
        Object.freeze(target);
        // 모든 프로퍼티 순회하며 재귀적으로 동결
        // Object.keys 메서드 : 객체 자신의 열거 가능한 프로퍼티를 배열로 반환 
        // forEach 메서드 : 배열 순회하며 배열 각 요소에 대해 콜백함수 실행
        Object.keys(target).forEach(key => deepFreeze(target[key]));
    }
    return target;
}

const person = {
    name: 'Lee',
    address: {city: 'Seoul'}
};

deepFreeze(person);

console.log(Object.isFrozen(person)); // true
console.log(Object.isFrozen(person.address)); // true // 중첩 객체까지 동결

person.address.city = 'Busan';
console.log(person); // { name: 'Lee', address: { city: 'Seoul' } }

