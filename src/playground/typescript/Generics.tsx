




//on a function

function getRandomElement<T>(items: T[]): T {
    let randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

let numbers = [1, 5, 7, 4, 2, 9];
let randomEle = getRandomElement<number>(numbers);
console.log(randomEle);

//but dont need to pass T type. Type inference is happening here :
let randomEle2 = getRandomElement(numbers);
console.log(randomEle2);



//multiple types
function merge<U extends object, P extends object>(obj1: U, obj2: P) {
    return {
        ...obj1,
        ...obj2
    };
}

let x = merge({abns: 1}, {pnsd: 4})

console.info(x)



//type parameter in generic constraints :
function prop<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}
let str = prop({ name: 'John' }, 'name'); //ok man!

// in summary:
// Use extends keyword to constrain the type parameter to a specific type.
// Use extends keyof to constrain a type that is the property of another object.






export {}