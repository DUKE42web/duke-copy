# Types VS Interfaces

## Types vs. interfaces in TypeScript - LogRocket Blog

> **Excerpt**
>
> It is very simple to get started with TypeScript, but sometimes we need to think more about the best use case for us. In this case, types or interfaces?

---

The idea of having static type-checking in JavaScript is really fantastic and the adoption of TypeScript is growing more every day.

You started to use TypeScript in your project, you created your first type, then you jumped to your first interface, and you got it working. You concluded that TypeScript, in fact, was helping your development and saving you precious time, but you might have made some mistakes and not followed the best practices when you started to work with types and interfaces in TypeScript.

This is the case for a lot of developers, they don't really know the real difference between type aliases and interfaces in TypeScript.

It is very simple to get started with TypeScript, but sometimes we need to think more about the best use case for us. In this case, types or interfaces?

### Types and type aliases

Before we jump into the differences between types and interfaces in TypeScript, we need to understand something.

In TypeScript, we have a lot of basic types, such as string, boolean, and number. These are the basic types of TypeScript. You can check the list of all the basic types [here](https:
//www.typescriptlang.org/docs/handbook/basic-types.html#table-of-contents). Also, in TypeScript, we have advanced types and in these [advanced types](https:
//www.typescriptlang.org/docs/handbook/advanced-types.html), we have something called [type aliases](https:
//www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases). With type aliases, we can create a new name for a type but we don't define a new type.

We use the `type` keyword to create a new type alias, that's why some people might get confused and think that it's creating a new type when they're only creating a new name for a type. So, when you hear someone talking about the differences between types and interfaces, like in this article, you can assume that this person is talking about type aliases vs interfaces.

We will use the [TypeScript Playground](https:
//www.typescriptlang.org/play/index.html#) for code examples. The [TypeScript Playground](https:
//www.typescriptlang.org/play/index.html#) allows us to work and test the latest version of TypeScript (or any other version we want to), and we will save time by using this playground rather than creating a new TypeScript project just for examples.

### Types vs. interfaces

The difference between types and interfaces in TypeScript used to be more clear, but with the latest versions of TypeScript, they're becoming more similar.

Interfaces are basically a way to describe data shapes, for example, an object.

Type is a definition of a type of data, for example, a union, primitive, intersection, tuple, or any other type.

#### Declaration merging

One thing that's possible to do with interfaces but are not with types is declaration merging. Declaration merging happens when the TypeScript compiler merges two or more interfaces that share the same name into only one declaration.

Let's imagine that we have two interfaces called `Song`, with different properties:

interface Song { artistName: string; }; interface Song { songName: string; };
const song: Song = { artistName: "Freddie", songName: "The Chain" };

TypeScript will automatically merge both interfaces declarations into one, so when we use this `Song` interface, we'll have both properties.

Declaration merging does not work with types. If we try to create two types with the same names, but with different properties, TypeScript would still throw us an error.

Duplicate identifier Song.

### Extends and implements

In TypeScript, we can easily extend and implement interfaces. This is not possible with types though.

Interfaces in TypeScript can extend classes, this is a very awesome concept that helps a lot in a more object-oriented way of programming. We can also create classes implementing interfaces.

For example, let's imagine that we have a class called `Car` and an interface called `NewCar`, we can easily extend this class using an interface:

class Car { printCar = () => { console.log("this is my car") } }; interface NewCar extends Car { name: string; }; class NewestCar implements NewCar { name: "Car";
constructor(engine:string) { this.name = name } printCar = () => { console.log("this is my car") } };

### Intersection

Intersection allows us to combine multiple types into a single one type. To create an intersection type, we have to use the `&` keyword:

type Name = { name: "string" }; type Age = { age: number }; type Person = Name & Age;

The nice thing here is that we can create a new intersection type combining two interfaces, for example, but not the other way around. We cannot create an interface combining two types, because it doesn't work:

interface Name { name: "string" }; interface Age { age: number }; type Person = Name & Age;

#### Unions

Union types allow us to create a new type that can have a value of one or a few more types. To create a union type, we have to use the `|` keyword.

type Man = { name: "string" }; type Woman = { name: "string" }; type Person = Man | Woman;

Similar to intersections, we can create a new union type combining two interfaces, for example, but not the other way around:

interface Man { name: "string" }; interface Woman { name: "string" }; type Person = Man | Woman;

#### Tuples

[Tuples](https:
//www.typescriptlang.org/docs/handbook/basic-types.html#tuple) are a very helpful concept in TypeScript, it brought to us this new data type that includes two sets of values of different data types.

type Reponse = \[string, number]

But, in TypeScript, we can only declare tuples using types and not interfaces. There's no way we can declare a tuple in TypeScript using an interface, but you still are able to use a tuple inside an interface, like this:

interface Response { value: \[string, number] }

We can see that we can achieve the same result as using types with interfaces. So, here comes the question that a lot of developers might have — should I use a type instead of an interface? If so, when should I use a type?

Let's understand the best use cases for both of them, so you don't need to abandon one for the other.

### What should I use?

This question is really tricky, and the answer to it, you might guess, depends on what you're building and what you're working on.

Interfaces are better when you need to define a new object or method of an object. For example, in React applications, when you need to define the props that a specific component is going to receive, it's ideal to use interface over types:

interface TodoProps { name: string; isCompleted: boolean };
const Todo: React.FC\<TodoProps> = ({ name, isCompleted }) => { ... };

Types are better when you need to create functions, for example. Let's imagine that we have a function that's going to return an object called, type alias is more recommended for this approach:

type Person = { name: string, age: number }; type ReturnPerson = ( person: Person ) => Person;
const returnPerson: ReturnPerson = (person) => { return person; };

At the end of the day, to decide if you should use a type alias or an interface, you should carefully think and analyze the situation — what you're working on, the specific code, etc.

Interface work better with objects and method objects, and types are better to work with functions, complex types, etc.

You should not start to use one and delete the other. Instead of doing that, start to refactor slowly, thinking of what makes more sense to that specific situation.

Remember that you can use both together and they will work fine. The idea here is just to clarify the differences between types and interfaces, and the best use cases for both.

### Conclusion

In this article, we learned more about the differences between types and interfaces in TypeScript. We learned that type aliases are advanced types in TypeScript, we learned the best use cases for both types and interfaces in TypeScript, and how we can apply both of them in real projects.

###
