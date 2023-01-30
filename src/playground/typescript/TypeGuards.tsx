
//narrowing on conditionals and switch statements

// Type guards are regular functions that return a boolean
// uses builtin JS typeof instanceof


function doSomething(x: number | string) {
    if (typeof x === 'string') { // Within the block TypeScript knows that `x` must be a string
        // console.log(x.subtr(1)); // Error, 'subtr' does not exist on `string`
        console.log(x.substr(1)); // OK
    }
    // x.substr(1); // Error: There is no guarantee that `x` is a `string`
}

export {}

//'in' key. Checks property
interface A {
    x: number;
}
interface B {
    y: string;
}
function doStuff(q: A | B) {
    if ('x' in q) {
        // q: A
    }
    else {
        // q: B
    }
}

//Literal type guards (use ==,===,!==,!===)
type Foo = {
    kind: 'foo', // Literal type
    foo: number
}
type Bar = {
    kind: 'bar', // Literal type
    bar: number
}

function doStuff2(arg: Foo | Bar) {
    if (arg.kind === 'foo') {
        console.log(arg.foo); // OK
        // console.log(arg.bar); // Error!
    }
    else {  // MUST BE Bar!
        // console.log(arg.foo); // Error!
        console.log(arg.bar); // OK
    }
}



interface Foo3 {
    foo: number;
    common: string;
}

interface Bar3 {
    bar: number;
    common: string;
}
/**
 * User Defined Type Guard!
 *
 * I dont quite understand the point of them. I think the reason is that you cant do something like this in TS :
 *
 * function doStuff3(arg: Foo | Bar) {
 *     if (typeof arg === Foo) {
 *         console.log(arg.foo); // OK
 *     }
 * }
 *
 * so you need something like
 */

function isFoo(arg: any): arg is Foo3 {
    return arg.foo !== undefined;
}



