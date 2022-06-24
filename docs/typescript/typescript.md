# 📼 Typescript

## `Global types`

In typescript global types can be declared in a `.d.ts` file and used anywhere without explicitly importing them. Our project's `.d.ts` file is named `project.d.ts`.

<details>

<summary>project.d.ts</summary>

```typescript
enum GlobalConfigKey {
  ApigeeServiceHost,
  ApigeeServiceHostCC,
  ApiHost,
  AppInsightsKey,
  SITECORE_API_KEY,
  GoogleTagManagerId,
}

type GlobalConfig = {
  [key in keyof typeof GlobalConfigKey]?: string;
};

interface Window {
  globalConfig: GlobalConfig;
  angular?: any;
}

declare let globalConfig: GlobalConfig;

declare namespace JSS {
  import("@sitecore-jss/sitecore-jss-react");
  import { Text } from "@sitecore-jss/sitecore-jss-react";

  type Field<
    Component extends (...args: any) => any,
    Key extends Parameters<Component>[0] = "field"
  > = Pick<Parameters<Component>[0], Key>[Key];

  export type LinkField = {
    value: {
      [K in
        | "href"
        | "id"
        | "querystring"
        | "text"
        | "title"
        | "target"
        | "class"
        | "url"
        | "linktype"]?: string;
    };
    editable?: string;
    editableFirstPart?: string;
    editableLastPart?: string;
  };

  type ImageField = {
    value?: {
      [K in "alt" | "height" | "src" | "width"]?: string;
    };
    editable?: string;
  };

  type TextField = Field<typeof Text>;

  export type { LinkField, ImageField, TextField };
}
```

</details>

It contains:

1. Some library types in the form of \[triple slash directives]\(https: //www.typescriptlang.org/docs/handbook/triple-slash-directives.html). **These need to be placed at the top of the file.**
2. Some library module declarations (usually these are included because these libs don't have typings but we still need to use them).
3. Our own global types.

Typescript provides many \[Utility Types]\(https: //www.typescriptlang.org/docs/handbook/utility-types.html) which are useful for manipulating the base types in the global ComponentTypes interface.

<details>

<summary>Utility Types</summary>

#### TypeScript: Documentation - Utility Types

**Excerpt**

Types which are globally included in TypeScript

---

TypeScript provides several utility types to facilitate common type transformations. These utilities are available globally.

**`Partial<Type>`**

Released:\
\[2.1]\(https: //www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#partial-readonly-record-and-pick)

constructs a type with all properties of `Type` set to optional. This utility will return a type that represents all subsets of a given type.

**Example**

```
tsinterface Todo {  title: string;  description: string;}function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {  return { ...todo, ...fieldsToUpdate };}
const todo1 = {  title: "organize desk",  description: "clear clutter",};
const todo2 = updateTodo(todo1, {  description: "throw out trash",});Try
```

**`Required<Type>`**

Released:\
\[2.8]\(https: //www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#improved-control-over-mapped-type-modifiers)

constructs a type consisting of all properties of `Type` set to required. The opposite of \[`Partial`]\(https: //www.typescriptlang.org/docs/handbook/utility-types.html#partialtype).

**Example**

```
tsinterface Props {  a?: number;  b?: string;}
const obj: Props = { a: 5 };
const obj2: Required<Props> = { a: 5 };Property 'b' is missing in type '{ a: number; }' but required in type 'Required<Props>'.2741Property 'b' is missing in type '{ a: number; }' but required in type 'Required<Props>'.Try
```

**`Readonly<Type>`**

Released:\
\[2.1]\(https: //www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#partial-readonly-record-and-pick)

constructs a type with all properties of `Type` set to `readonly`, meaning the properties of the constructed type cannot be reassigned.

**Example**

```
tsinterface Todo {  title: string;}
const todo: Readonly<Todo> = {  title: "Delete inactive users",};todo.title = "Hello";Cannot assign to 'title' because it is a read-only property.2540Cannot assign to 'title' because it is a read-only property.Try
```

This utility is useful for representing assignment expressions that will fail at runtime (i.e. when attempting to reassign properties of a \[frozen object]\(https: //developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)).

**`Object.freeze`**

```
tsfunction freeze<Type>(obj: Type): Readonly<Type>;
```

**`Record<Keys, Type>`**

Released:\
\[2.1]\(https: //www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#partial-readonly-record-and-pick)

constructs an object type whose property keys are `Keys` and whose property values are `Type`. This utility can be used to map the properties of a type to another type.

**Example**

```
tsinterface CatInfo {  age: number;  breed: string;}type CatName = "miffy" | "boris" | "mordred";
const cats: Record<CatName, CatInfo> = {  miffy: { age: 10, breed: "Persian" },  boris: { age: 5, breed: "Maine Coon" },  mordred: { age: 16, breed: "British Shorthair" },};cats.boris;
const cats: Record<CatName, CatInfo>Try
```

**`Pick<Type, Keys>`**

Released:\
\[2.1]\(https: //www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#partial-readonly-record-and-pick)

constructs a type by picking the set of properties `Keys` (string literal or union of string literals) from `Type`.

**Example**

```
tsinterface Todo {  title: string;  description: string;  completed: boolean;}type TodoPreview = Pick<Todo, "title" | "completed">;
const todo: TodoPreview = {  title: "Clean room",  completed: false,};todo;
const todo: TodoPreviewTry
```

**`Omit<Type, Keys>`**

Released:\
\[3.5]\(https: //www.typescriptlang.org/docs/handbook/release-notes/typescript-3-5.html#the-omit-helper-type)

constructs a type by picking all properties from `Type` and then removing `Keys` (string literal or union of string literals).

**Example**

```
tsinterface Todo {  title: string;  description: string;  completed: boolean;  createdAt: number;}type TodoPreview = Omit<Todo, "description">;
const todo: TodoPreview = {  title: "Clean room",  completed: false,  createdAt: 1615544252770,};todo;
const todo: TodoPreviewtype TodoInfo = Omit<Todo, "completed" | "createdAt">;
const todoInfo: TodoInfo = {  title: "Pick up kids",  description: "Kindergarten closes at 5pm",};todoInfo;
const todoInfo: TodoInfoTry
```

**`Exclude<UnionType, ExcludedMembers>`**

Released:\
\[2.8]\(https: //www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types)

constructs a type by excluding from `UnionType` all union members that are assignable to `ExcludedMembers`.

**Example**

```
tstype T0 = Exclude<"a" | "b" | "c", "a">;     type T0 = "b" | "c"type T1 = Exclude<"a" | "b" | "c", "a" | "b">;     type T1 = "c"type T2 = Exclude<string | number | (() => void), Function>;     type T2 = string | numberTry
```

Released:\
\[2.8]\(https: //www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types)

constructs a type by extracting from `Type` all union members that are assignable to `Union`.

**Example**

```
tstype T0 = Extract<"a" | "b" | "c", "a" | "f">;     type T0 = "a"type T1 = Extract<string | number | (() => void), Function>;     type T1 = () => voidTry
```

**`NonNullable<Type>`**

Released:\
\[2.8]\(https: //www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types)

constructs a type by excluding `null` and `undefined` from `Type`.

**Example**

```
tstype T0 = NonNullable<string | number | undefined>;     type T0 = string | numbertype T1 = NonNullable<string[] | null | undefined>;     type T1 = string[]Try
```

**`Parameters<Type>`**

Released:\
\[3.1]\(https: //github.com/microsoft/TypeScript/pull/26243)

constructs a tuple type from the types used in the parameters of a function type `Type`.

**Example**

```
tsdeclare function f1(arg: { a: number; b: string }): void;type T0 = Parameters<() => string>;     type T0 = []type T1 = Parameters<(s: string) => void>;     type T1 = [s: string]type T2 = Parameters<<T>(arg: T) => T>;     type T2 = [arg: unknown]type T3 = Parameters<typeof f1>;     type T3 = [arg: {
    a: number;
    b: string;
}]type T4 = Parameters<any>;     type T4 = unknown[]type T5 = Parameters<never>;     type T5 = nevertype T6 = Parameters<string>;Type 'string' does not satisfy the
constraint '(...args: any) => any'.2344Type 'string' does not satisfy the
constraint '(...args: any) => any'.     type T6 = nevertype T7 = Parameters<Function>;Type 'Function' does not satisfy the
constraint '(...args: any) => any'.
  Type 'Function' provides no match for the signature '(...args: any): any'.2344Type 'Function' does not satisfy the
constraint '(...args: any) => any'.
  Type 'Function' provides no match for the signature '(...args: any): any'.     type T7 = neverTry
```

**\`**

constructorParameters\`

Released:\
\[3.1]\(https: //github.com/microsoft/TypeScript/pull/26243)

constructs a tuple or array type from the types of a constructor function type. It produces a tuple type with all the parameter types (or the type `never` if `Type` is not a function).

**Example**

```
tstype T0 =
constructorParameters<Error
constructor>;     type T0 = [message?: string]type T1 =
constructorParameters<Function
constructor>;     type T1 = string[]type T2 =
constructorParameters<RegExp
constructor>;     type T2 = [pattern: string | RegExp, flags?: string]type T3 =
constructorParameters<any>;     type T3 = unknown[]type T4 =
constructorParameters<Function>;Type 'Function' does not satisfy the
constraint 'abstract new (...args: any) => any'.
  Type 'Function' provides no match for the signature 'new (...args: any): any'.2344Type 'Function' does not satisfy the
constraint 'abstract new (...args: any) => any'.
  Type 'Function' provides no match for the signature 'new (...args: any): any'.     type T4 = neverTry
```

**`ReturnType<Type>`**

Released:\
\[2.8]\(https: //www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types)

constructs a type consisting of the return type of function `Type`.

**Example**

```
tsdeclare function f1(): { a: number; b: string };type T0 = ReturnType<() => string>;     type T0 = stringtype T1 = ReturnType<(s: string) => void>;     type T1 = voidtype T2 = ReturnType<<T>() => T>;     type T2 = unknowntype T3 = ReturnType<<T extends U, U extends number[]>() => T>;     type T3 = number[]type T4 = ReturnType<typeof f1>;     type T4 = {
    a: number;
    b: string;
}type T5 = ReturnType<any>;     type T5 = anytype T6 = ReturnType<never>;     type T6 = nevertype T7 = ReturnType<string>;Type 'string' does not satisfy the
constraint '(...args: any) => any'.2344Type 'string' does not satisfy the
constraint '(...args: any) => any'.     type T7 = anytype T8 = ReturnType<Function>;Type 'Function' does not satisfy the
constraint '(...args: any) => any'.
  Type 'Function' provides no match for the signature '(...args: any): any'.2344Type 'Function' does not satisfy the
constraint '(...args: any) => any'.
  Type 'Function' provides no match for the signature '(...args: any): any'.     type T8 = anyTry
```

**`InstanceType<Type>`**

Released:\
\[2.8]\(https: //www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types)

constructs a type consisting of the instance type of a constructor function in `Type`.

**Example**

```
tsclass C {  x = 0;  y = 0;}type T0 = InstanceType<typeof C>;     type T0 = Ctype T1 = InstanceType<any>;     type T1 = anytype T2 = InstanceType<never>;     type T2 = nevertype T3 = InstanceType<string>;Type 'string' does not satisfy the
constraint 'abstract new (...args: any) => any'.2344Type 'string' does not satisfy the
constraint 'abstract new (...args: any) => any'.     type T3 = anytype T4 = InstanceType<Function>;Type 'Function' does not satisfy the
constraint 'abstract new (...args: any) => any'.
  Type 'Function' provides no match for the signature 'new (...args: any): any'.2344Type 'Function' does not satisfy the
constraint 'abstract new (...args: any) => any'.
  Type 'Function' provides no match for the signature 'new (...args: any): any'.     type T4 = anyTry
```

**`ThisParameterType<Type>`**

Released:\
\[3.3]\(https: //github.com/microsoft/TypeScript/pull/28920)

Extracts the type of the \[this]\(https: //www.typescriptlang.org/docs/handbook/functions.html#this-parameters) parameter for a function type, or \[unknown]\(https: //www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type) if the function type has no `this` parameter.

**Example**

```
tsfunction toHex(this: Number) {  return this.toString(16);}function numberToString(n: ThisParameterType<typeof toHex>) {  return toHex.apply(n);}Try
```

**`OmitThisParameter<Type>`**

Released:\
\[3.3]\(https: //github.com/microsoft/TypeScript/pull/28920)

Removes the \[`this`]\(https: //www.typescriptlang.org/docs/handbook/functions.html#this-parameters) parameter from `Type`. If `Type` has no explicitly declared `this` parameter, the result is simply `Type`. Otherwise, a new function type with no `this` parameter is created from `Type`. Generics are erased and only the last overload signature is propagated into the new function type.

**Example**

```
tsfunction toHex(this: Number) {  return this.toString(16);}
const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);console.log(fiveToHex());Try
```

**`ThisType<Type>`**

Released:\
\[2.3]\(https: //github.com/microsoft/TypeScript/pull/14141)

This utility does not return a transformed type. Instead, it serves as a marker for a contextual \[`this`]\(https: //www.typescriptlang.org/docs/handbook/functions.html#this) type. Note that the \[`noImplicitThis`]\(https: //www.typescriptlang.org/tsconfig#noImplicitThis) flag must be enabled to use this utility.

**Example**

```
tstype ObjectDescriptor<D, M> = {  data?: D;  methods?: M & ThisType<D & M>;
// Type of 'this' in methods is D & M};function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {  let data: object = desc.data || {};  let methods: object = desc.methods || {};  return { ...data, ...methods } as D & M;}let obj = makeObject({  data: { x: 0, y: 0 },  methods: {    moveBy(dx: number, dy: number) {      this.x += dx;
// Strongly typed this      this.y += dy;
// Strongly typed this    },  },});obj.x = 10;obj.y = 20;obj.moveBy(5, 5);Try
```

In the example above, the `methods` object in the argument to `makeObject` has a contextual type that includes `ThisType<D & M>` and therefore the type of \[this]\(https: //www.typescriptlang.org/docs/handbook/functions.html#this) in methods within the `methods` object is `{ x: number, y: number } & { moveBy(dx: number, dy: number): number }`. Notice how the type of the `methods` property simultaneously is an inference target and a source for the `this` type in methods.

The `ThisType<T>` marker interface is simply an empty interface declared in `lib.d.ts`. Beyond being recognized in the contextual type of an object literal, the interface acts like any empty interface.

**Intrinsic String Manipulation Types**

**`Uppercase<StringType>`**

**`Lowercase<StringType>`**

**`Capitalize<StringType>`**

**`Uncapitalize<StringType>`**

To help with string manipulation around template string literals, TypeScript includes a set of types which can be used in string manipulation within the type system. You can find those in the \[Template Literal Types]\(https: //www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype) documentation.

</details>

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

_Although ComponentTypes is a_ :white*check_mark: \_Good starting place, some components may require a type that is more specific and not usefully included in the global declaration.*

---

## `Naming`

```
{['class', 'enum', 'interface', 'namespace', 'type', 'variable-and-function'].map(item => (
{item.split('-').join(' ')}
))}
```

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

React | Typescript | Tailwind | Forms | Unit Tests
