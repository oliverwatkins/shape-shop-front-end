
/**
 * Are of the form :
 *
 * SomeType extends OtherType ? TrueType : FalseType
 */

interface Animal {
    live(): void;
}
interface Dog extends Animal {
    woof(): void;
}

type Example1 = Dog extends Animal ? number : string; // = number


//here is ane example of Exclude

type Animal2 = "dog" | "cat" | "bird" | "fish";
type SmallAnimal = Exclude<Animal2, "dog" | "cat">;


// Here is an example of a conditional type that checks whether a given type is an array and, if so, returns the type of its elements:

type ArrayElementType<T> = T extends (infer U)[] ? U : never;

//TODO explain infer

// Example usage:
type StringArray = ArrayElementType<string[]>; // Type of StringArray is string
type NumberArray = ArrayElementType<number[]>; // Type of NumberArray is number


/**
 * Can have generic that checks constraint
 */
type StringFromType<T> = T extends string ? 'string' : never

type lorem = StringFromType<'lorem ipsum'> // 'string'
type ten = StringFromType<10> // never


/**
 * Can also chain
 */

type StringFromType2<T> = T extends string ? 'string' : T extends boolean ? 'boolean' : T extends Error ? 'error' : never

type lorem2 = StringFromType<'lorem ipsum'> // ok
type ten2 = StringFromType<10> // ok


/**
 *union type
 */

type NullableString = string | null | undefined

type NonNullable<T> =  T extends null | undefined ? never : T

type CondUnion = NonNullable<NullableString> //evaluates to string



//more examples :
interface IdLabel {
    id: number /* some fields */;
}
interface NameLabel {
    name: string /* other fields */;
}
type NameOrId<T extends number | string> = T extends number
    ? IdLabel
    : NameLabel;

let x: NameOrId<string> = {name:"asdf"}


//conditional type constraints. You could do this :
type MessageOf<T extends { message: unknown }> = T["message"];
interface Email {
    message: string;
}
const x2: MessageOf<Email> = "x";


//or you could do this with a conditional :
type MessageOf2<T> = T extends { message: unknown } ? T["message"] : never;
interface Dog {
    bark(): void;
}

type EmailMessageContents2 = MessageOf2<Email>; //type = never
type DogMessageContents = MessageOf2<Dog>; //type = never



type Flatten<T> = T extends any[] ? T[number] : T;
// TODO I dont understand the T[number] bit

type Str = Flatten<string[]>; //type = string
type Num = Flatten<number>; //type = number


//can use INFER :
type Flatten2<T> = T extends Array<infer Item> ? Item : T;




//in this example we have a helper type that uses infer to extract the return type
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
    ? Return
    : never;

type Num2 = GetReturnType<() => number>; //type = number
type Str2 = GetReturnType<(x: string) => string>; //type = string
type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>; //type = boolean[]




//overloaded functions example - inferences made from the last signature (presumeably the most permissive):
declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;

//ReturnType is a UtillityType from TS
type T1 = ReturnType<typeof stringOrNum>; //T1 = string | number




//distributive conditional types
type ToArray<Type> = Type extends any ? Type[] : never;

type StrArrOrNumArr = ToArray<string | number>; //type = string[] | number[];

//...but can use square brackets to prevent iterating over each union element
type ToArrayNonDist2<Type> = [Type] extends [any] ? Type[] : never;

// 'StrArrOrNumArr' is no longer a union.
type StrArrOrNumArr2 = ToArrayNonDist2<string | number>; //type = (string | number) [];











interface IdLabel {
    id: number /* some fields */;
}
interface NameLabel {
    name: string /* other fields */;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
    throw "unimplemented";
}



export {}