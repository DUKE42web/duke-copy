# Typescript Interfaces

When we talk about a type in TypeScript, we mean a collection of things that you can do with a variable (or expression). You might be able to read or write a given property, call a function, use the expression as a
constructor, or index into the object. Some objects (like Date) in JavaScript can do nearly all of those! In TypeScript, interfaces are the most flexible way of describing types.

You'll see interfaces used to describe existing JavaScript APIs, create shorthand names for commonly-used types,
constrain class implementations, describe array types, and more. While they don't generate any code (and thus have no runtime cost!), they are often the key point of contact between any two pieces of TypeScript code, especially when working with existing JavaScript code or built-in JavaScript objects.

The only job of an interface in TypeScript is to describe a type. While class and function deal with implementation, interface helps us keep our programs error-free by providing information about the shape of the data we work with. Because the type information is erased from a TypeScript program during compilation, we can freely add type data using interfaces without worrying about the runtime overhead.

While that sounds like a simple, one-purpose task, interfaces role in describing types becomes manifest in a large variety of ways. Let's look at some of them and how they can be used in TypeScript programs.

## Basics <a href="#basics" id="basics"></a>

To define an interface in TypeScript, use the interface keyword:

```
interface Greetable {    greet(message: string): void;}
```

This defines a type, Greetable, that has a member function called greet that takes a string argument. You can use this type in all the usual positions; for example in a parameter type annotation. Here we use that type annotation to get type safety on the g parameter:

```
function helloEnglish(g: Greetable) {    g.greet('Hello there!');
// OK    g.greet(42);
// Not OK -- 42 is not a string    g.greep('Hi');
// Not OK -- 'greep' is not a member of 'Greetable'}
```

When this code compiles, you won't see any mention of Greetable in the JavaScript code. Interfaces are only a compile-time
construct and have no effect on the generated code.

## Interfaces: TypeScript's Swiss Army Knife <a href="#interfaces-typescripts-swiss-army-knife" id="interfaces-typescripts-swiss-army-knife"></a>

Interfaces get to play a lot of roles in TypeScript code. We'll go into more detail on these after a quick overview.

**Describing an Object**

Many JavaScript functions take a "settings object". For example, jQuery's $.ajax takes an object that can have up to several dozen members that control its behavior, but you're only likely to pass a few of those in any given instance. TypeScript interfaces allow optional properties to help you use these sorts of objects correctly.

**Describing an Indexable Object**

JavaScript freely mixes members (foo.x) with indexers (foo\['x']), but most programmers use one or the other as a semantic hint about what kind of access is taking place. TypeScript interfaces can be used to represent what the expected type of an indexing operation is.

**Ensuring Class Instance Shape**

Often, you'll want to make sure that a class you're writing matches some existing surface area. This is how interfaces are used in more traditional OOP languages like C# and Java, and we'll see that TypeScript interfaces behave very similarly when used in this role.

**Ensuring the Static Shape of a Class or
constructor Object**

Interfaces normally describe the shape of an instance of a class, but we can also use them to describe the static shape of the class (including its
constructor function). We'll cover this in a later post.

## Describing an Object <a href="#describing-an-object" id="describing-an-object"></a>

You can also use interfaces to define the shape of objects that will typically be expressed in an object literal. Here's an example:

**Describing Simple Types**

```
interface ButtonSettings {    text: string;    size?: { width: number; height: number; };    color?: string;}function createButton(settings: ButtonSettings) { ... }
```

Note the use of the ? symbol after some of the names. This marks a member as being optional. This lets callers of createButton supply only the members they care about, while maintaining the
constraint that the required parts of the object are present:

```typescript
createButton({ text: "Submit" });
// OKcreateButton({ text: 'Submit', size: { width: 70, height: 30 }});
// OKcreateButton({ text: 'Submit', color: 43);
// Not OK: 43 isn't a stringcreateButton({ text: 'Submit', size: { width: 70 });
// Not OK: size needs a height as wellcreateButton({ color: 'Blue'});
// Not OK: 'text' member is required
```

You typically won't use optional members when defining interfaces that are going to be implemented by classes.

Here's another example that shows an interesting feature of types in TypeScript:

```
interface Point {    x: number;    y: number;}function getQuadrant(pt: Point) { ... }var pt = { x: 0, y: -1 };getQuadrant(pt);
// OK: pt has members x and y of type number
```

Note that we didn't annotate pt in any way to indicate that it's of type Point. We don't need to, because type checking in TypeScript is structural: types are considered identical if they have the same surface area. Because pt has at least the same members as Point, it's suitable for use wherever a Point is expected.

**Describing External Types**

Interfaces are also used to describe code that is present at runtime, but not implemented in the current TypeScript project. For example, if you open the lib.d.ts file that all TypeScript projects implicitly reference, you'll see an interface declaration for Number:

```
interface Number {    toString(radix?: number): string;    toFixed(fractionDigits?: number): string;    toExponential(fractionDigits?: number): string;    toPrecision(precision: number): string;}
```

Now if we have an expression of type Number, the compiler knows that it's valid to call toPrecision on that expression.

**Extending Existing Types**

Moreover, interfaces in TypeScript are open, meaning you can add your own members to an interface by simply writing another interface block. If you have an external script that adds members to Date, for example, you simply need to write interface Date { /\*...\*/ } and declare the additional members.\*

\* Note: There are some known issues with the Visual Studio editor that currently prevent this scenario from working as intended. We'll be fixing this limitation in a later release.

## Describing an Indexable Object <a href="#describing-an-indexable-object" id="describing-an-indexable-object"></a>

A common pattern in JavaScript is to use an object (e.g. {}) as way to map from a set of strings to a set of values. When those values are of the same type, you can use an interface to describe that indexing into an object always produces values of a certain type (in this case, Widget).

```
interface WidgetMap {    [name: string]: Widget;}var map: WidgetMap = {};map['gear'] = new GearWidget();var w = map['gear'];
// w is inferred to type Widget
```

## Ensuring Class Instance Shape <a href="#ensuring-class-instance-shape" id="ensuring-class-instance-shape"></a>

Let's extend the Greetable example above:

```
/** Represents an object that can be greeted */interface Greetable {    /** Used to welcome someone */    greet(message: string): void;    /** The preferred language of this object */    language: string;}
```

We can implement this interface in a class using the implements keyword:

```
class Person implements Greetable {    language = 'English';    greet(message: string) {        console.log(message);    }}
```

Now we can use an instance of Person wherever a Greetable is expected:

var g: Greetable = new Person();

Similarly, we can take advantage of the structural typing of TypeScript to implement Greetable in an object literal:

```
var greeter = {    greet: (message: string) => { console.log(message) };    language: 'Any';};
```
