# 🔢 Enums In Javascript

## Using Enums (Enumerations) In Javascript

> **Excerpt**
>
> How to implement and use enumerations (or enum types) in Javascript

---

#### This post will explain how to implement and use <mark style="background-color:blue;">**enumerations**</mark> (or enum types) in Javascript.

!\[]\(https: //www.sohamkamani.com/static/fa26842619224d64f417312ef931f764/5a190/banner.drawio.png)

Enums are types that contain only a limited number of fixed values, as opposed to types like `Number` or `String` which can have a wide range of values.

This is useful for many situations: For example, when describing seasons in temperate climates, you'll want to limit the options to certain possible values: `Summer`, `Winter`, `Spring` and `Autumn`.

Let's look at different ways of implementing this type of data:

### Naive Implementation

The simplest way to implement enums for season options is to create a constant for each season:

```typescript
const Summer = 0;

const Autumn = 1;

const Winter = 2;

const Spring = 3;

const Summer = "summer";

const Autumn = "autumn";

const Winter = "winter";

const Spring = "spring";
```

While this would work for small codebases, we will face a few immediate issues:

1. It's easy to make mistakes in your code. A developer can make the mistake of using integers outside the range of the ones defined.
2. Definitions from unrelated enums can overlap and cause conflicts:

```javascript
const Summer = 0;

const Autumn = 1;

const Winter = 2;

const Spring = 3;

const Apples = 0;

const Oranges = 1;

console.log(Summer === Apples);
```

1. This is semantically incorrect - Seasons are not _really_ integers or strings, they're seasons!

### Enums with Symbols

\[Symbols]\(https: //developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) let us define values that are guaranteed not to collide with one another.

For example:

```typescript
const Summer1 = Symbol("summer");

const Summer2 = Symbol("summer");

console.log(Summer1 === Summer2);

console.log(Summer1);
```

We can define our enums using Symbols to ensure that they are not duplicated:

```typescript
const Summer = Symbol("summer");

const Autumn = Symbol("autumn");

const Winter = Symbol("winter");

const Spring = Symbol("spring");

let season = Spring;

switch (season) {
  case Summer:
    console.log("the season is summer");
    break;
  case Winter:
    console.log("the season is winter");
    break;
  case Spring:
    console.log("the season is spring");
    break;
  case Autumn:
    console.log("the season is autumn");
    break;
  default:
    console.log("season not defined");
}
```

Using Symbols ensures that the only way we can assign an enum value is by using the constants that we defined initially.

### Enums with Classes

To make our code more semantically correct, we can create a class to hold groups of enums.

For example, our seasons should have a way for us to identify that they all belong to a similar classification.

Let's see how we can use classes and objects to create distinct enum groups:

```
class Season {

  static Summer = new Season("summer")
  static Autumn = new Season("autumn")
  static Winter = new Season("winter")
  static Spring = new Season("spring")


constructor(name) {
    this.name = name
  }
}



let season = Season.Summer


console.log(season instanceof Season)

console.log(Symbol('something') instanceof Season)



console.log(season.
constructor.name)
```

### Listing All Possible Enum Values

If we used the class-based approach above, we can loop through the keys of the `Season` class to obtain all the enum values under the same group:

```
Object.keys(Season).forEach(season => console.log("season:", season))
```

### When to Use Enums in Javascript?

In general, enums are helpful if there are a **definite** number of **fixed** values for any one variable\_

For example, the \[crypto]\(https: //nodejs.org/api/crypto.html#crypto) standard library for Node.js has a \[list of supported algorithms]\(https: //github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/create-hmac/index.d.ts#L15), that can be considered an enum group.

Using enums in Javascript correctly will lead to better code that is more stable, easier to read and less error prone.
