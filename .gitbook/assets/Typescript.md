# Typescript

## `Global types`

In typescript global types can be declared in a `.d.ts` file and used anywhere without explicitly importing them. Our project's `.d.ts` file is named `project.d.ts`.

It contains:

1. Some library types in the form of [triple slash directives](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html). **These need to be placed at the top of the file.**

2. Some library module declarations (usually these are included because these libs don't have typings but we still need to use them).

3. Our own global types.

Typescript provides many [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html) which are useful for manipulating the base types in the global ComponentTypes interface.

A few basic ones to know:

### `Pick<Type, Keys>`

Only use the specified Keys from the Type.

```ts
Pick<ComponentTypes, "text">;
// only use 'text' type
```

### `Partial<Type>`

Allows the type to be optional (undefined)

```ts
Partial<Pick<ComponentTypes, "text">>;
// only use 'text' type
// the text type is optional
```

### `Required<Type>`

Opposite of Partial, the type must be defined

```ts
Required<Pick<ComponentTypes, "text">>;
// only use 'text' type
// the text type is required
```

Using the stategies above you can select types from the global source and compose them to create a representation of the props in a specific component. While the global types live in `project.d.ts`, component level types should generally be placed in a `types.ts` file within the component directory and imported for use.

_Although ComponentTypes is a :white_check_mark: Good starting place, some components may require a type that is more specific and not usefully included in the global declaration._

---

## `Naming`

<ul>
  {['class', 'enum', 'interface', 'namespace', 'type', 'variable-and-function'].map(item => (
    <li>
      <a href={`#${item}`}>{item.split('-').join(' ')}</a>
    </li>
  ))}
</ul>

---

### `class`

**🧑‍🔬 PascalCase**

:no_entry_sign: Bad

```ts
class foo {}
```

:white_check_mark: Good

```ts
class Foo {}
```

For memebers/methods use **🐪 camelCase**

:no_entry_sign: Bad

```ts
class Foo {
  Bar: number;
  BazQux() {}
}
```

:white_check_mark: Good

```ts
class Foo {
  bar: number;
  bazQux() {}
}
```

---

### `enum`

**🧑‍🔬 PascalCase**

:no_entry_sign: Bad

```ts
enum backgroundColor {}
```

:white_check_mark: Good

```ts
enum BackgroundColor {}
```

---

### `interface`

**🧑‍🔬 PascalCase**

:no_entry_sign: Bad

```ts
interface checkboxProps {}
```

:white_check_mark: Good

```ts
interface CheckboxProps {}
```

For memebers use **🐪 camelCase**

:no_entry_sign: Bad

```ts
interface CheckboxProps {
  IsSelected: boolean;
}
```

:white_check_mark: Good

```ts
interface CheckboxProps = {
  isSelected: boolean;
}
```

---

### `namespace`

**🧑‍🔬 PascalCase**

:no_entry_sign: Bad

```ts
namespace foo {}
```

:white_check_mark: Good

```ts
namespace Foo {}
```

---

### `type`

**🧑‍🔬 PascalCase**

:no_entry_sign: Bad

```ts
type imageProps = { src: string; alt: string };
```

✅ :white_check_mark: Good

```ts
type ImageProps = { src: string; alt: string };
```

---

### `variable and function`

**🐪 camelCase**

:no_entry_sign: Bad

```ts
const FooBar = "baz";
const FooBar = () => "baz";
```

:white_check_mark: Good

```ts
const fooBar = "baz";
const fooBar = () => "baz";
```

---

[React](./React.md) | [Typescript](./Typescript.md) | [Tailwind](./Tailwind.md) | [Forms](./Forms.md) | [Unit Tests](./UnitTests.md)
