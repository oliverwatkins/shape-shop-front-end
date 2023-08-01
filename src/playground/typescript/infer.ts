


type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

function foo(): string {
    return "Hello, world!";
}

type FooReturnType = ReturnType<typeof foo>; // string

export {}