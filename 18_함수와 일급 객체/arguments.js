function multiply(x, y){
    console.log(arguments);
    return x * y;
}

console.log(multiply()); // NaN
console.log(multiply(1)); // NaN
console.log(multiply(1,2)); // 2
console.log(multiply(1,2,3)); // 2

// ----------------------------------

function sum(){
    let res = 0;

    for (let i = 0; i < arguments.length; i++){
        res += arguments[i];
    }

    return res;
}

console.log(sum()); // 0
console.log(sum(1,2)); // 3
console.log(sum(1,2,3)); // 6