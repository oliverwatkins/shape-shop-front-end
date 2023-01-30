

function describePerson(person: {
    name: string;
    age: number;
    hobbies: [string, string]; // tuple
}) {
    return `${person.name} is ${person.age} years old and love ${person.hobbies.join(" and  ")}.`;
}

const alex: GetFirstArgumentOfAnyFunction<typeof describePerson> = {
    name: 'Alex',
    age: 20,
    hobbies: ['walking', 'cooking'] // type string[] != [string, string]
}

describePerson(alex)


// type GetFirstArgumentOfAnyFunction<T> = T extends (first: infer R,...args: any) => any
//     ? FirstArgument
//     : never;

type StringFromType<T> = T extends string ? 'string' : never



export {}