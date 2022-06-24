# ⚛ REACT NOTES

<details>

<summary>Quick Start</summary>

**Quick Start**

**Excerpt**

A JavaScript library for building user interfaces

---

Welcome to the React documentation! This page will give you an introduction to the 80% of React concepts that you will use on a daily basis.

**You will learn**

- How to create and nest components
- How to add markup and styles
- How to display data
- How to render conditions and lists
- How to respond to events and update the screen
- How to share data between components

**Creating and nesting components**

React apps are made out of components. A component is a piece of the UI (user interface) that has its own logic and appearance. A component can be as small as a button, or as large as an entire page.

React components are JavaScript functions that return markup:

Now that you've declared `MyButton`, you can nest it into another component:

Notice that `<MyButton />` starts with a capital letter. That's how you know it's a React component. React component names must always start with a capital letter, while HTML tags must be lowercase.

Have a look at the result:

The `export default` keywords specify the main component in the file. If you're not familiar with some piece of JavaScript syntax, \[MDN]\(https: //developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export) and \[javascript.info]\(https: //javascript.info/import-export) have great references.

**Writing markup with JSX**

The markup syntax you've seen above is called JSX. It is optional, but most React projects use JSX for its convenience. All of the \[tools we recommend for local development]\(https: //beta.reactjs.org/learn/installation) support JSX out of the box.

JSX is stricter than HTML. You have to close tags like `<br />`. Your component also can't return multiple JSX tags. You have to wrap them into a shared parent, like a `<div>...</div>` or an empty `<>...</>` wrapper:

If you have a lot of HTML to port to JSX, you can use an \[online converter]\(https: //transform.tools/html-to-jsx).

**Adding styles**

In React, you specify a CSS class with `className`. It works the same way as HTML \[`class`]\(https: //developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class) attribute:

Then you write the CSS rules for it in a separate CSS file:

React does not prescribe how you add CSS files. In the simplest case, you'll add a \[`<link>`]\(https: //developer.mozilla.org/en-US/docs/Web/HTML/Element/link) tag to your HTML. If you use a build tool or a framework, consult its documentation to learn how to add a CSS file to your project.

**Displaying data**

JSX lets you put markup into JavaScript. Curly braces let you "escape back" into JavaScript so that you can embed some variable from your code and display it to the user. For example, this will display `user.name`:

You can also "escape into JavaScript" from JSX attributes, but you have to use curly braces _instead of_ quotes. For example, `className="avatar"` passes the `"avatar"` string as the CSS class, but `src={user.imageUrl}` reads the JavaScript `user.imageUrl` variable value, and then passes that value as the `src` attribute:

You can put more complex expressions inside the JSX curly braces too, for example, \[string concatenation]\(https: //javascript.info/operators#string-concatenation-with-binary):

In the above example, `style={{}}` is not a special syntax, but a regular `{}` object inside the `style={ }` JSX curly braces. You can use the `style` attribute when your styles depend on JavaScript variables.

**Conditional rendering**

In React, there is no special syntax for writing conditions. Instead, you'll use the same techniques as you use when writing regular JavaScript code. For example, you can use an \[`if`]\(https: //developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) statement to conditionally include JSX:

If you prefer more compact code, you can use the \[conditional `?` operator]\(https: //developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator). Unlike `if`, it works inside JSX:

When you don't need the `else` branch, you can also use a shorter \[logical `&&` syntax]\(https: //developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#short-circuit_evaluation):

All of these approaches also work for conditionally specifying attributes. If you're unfamiliar with some of this JavaScript syntax, you can start by always using `if...else`.

**Rendering lists**

You will rely on JavaScript features like \[`for` loop]\(https: //developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) and the \[array `map()` function]\(https: //developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to render lists of components.

For example, let's say you have an array of products:

Inside your component, use the `map()` function to transform an array of products into an array of `<li>` items:

Notice how `<li>` has a `key` attribute. For each item in a list, you should pass a string or a number that uniquely identifies that item among its siblings. Usually, a key should be coming from your data, such as a database ID. React will rely on your keys to understand what happened if you later insert, delete, or reorder the items.

const products = \[ { title: 'Cabbage', isFruit: false, id: 1 }, { title: 'Garlic', isFruit: false, id: 2 }, { title: 'Apple', isFruit: true, id: 3 }, ];

export default function ShoppingList() { const listItems = products.map(product => \<li key={product.id} style=\{{ color: product.isFruit ? 'magenta' : 'darkgreen' \}} > {product.title} );

return (

- {listItems}

); }

**Responding to events**

You can respond to events by declaring event handler functions inside your components:

```js
function MyButton() {
  function handleClick() {
    alert("You clicked me!");
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

Notice how `onClick={handleClick}` has no parentheses at the end! Do not _call_ the event handler function: you only need to _pass it down_. React will call your event handler when the user clicks the button.

**Updating the screen**

Often, you'll want your component to "remember" some information and display it. For example, maybe you want to count the number of times a button is clicked. To do this, add _state_ to your component.

First, import \[`useState`]\(https: //beta.reactjs.org/apis/usestate) from React:

````js

```js


import { useState } from 'react';
````

Now you can declare a _state variable_ inside your component:

```js
function MyButton() {

const [count, setCount] = useState(0);
```

You will get two things from `useState`: the current state (`count`), and the function that lets you update it (`setCount`). You can give them any names, but the convention is to call them like `[something, setSomething]`.

The first time the button is displayed, `count` will be `0` because you passed `0` to `useState()`. When you want to change state, call `setCount()` and pass the new value to it. Clicking this button will increment the counter:

```js
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Clicked {count} times</button>;
}
```

React will call your component function again. This time, `count` will be `1`. Then it will be `2`. And so on.

If you render the same component multiple times, each will get its own state. Try clicking each button separately:

````js
import { useState } from 'react';

function MyButton() {
const \[count, setCount] = useState(0);

function handleClick() { setCount(count + 1); }

return ( Clicked {count} times ); }

export default function MyApp() { return (

#### Counters that update separately

); }

Notice how each button "remembers" its own `count` state and doesn't affect other buttons.

**Using Hooks**

Functions starting with `use` are called Hooks. `useState` is a built-in Hook provided by React. You can find other built-in Hooks in the [React API reference](https:
//beta.reactjs.org/apis). You can also write your own Hooks by combining the existing ones.

Hooks are more restrictive than regular functions. You can only call Hooks _at the top level_ of your components (or other Hooks). If you want to `useState` in a condition or a loop, extract a new component and put it there.

**Sharing data between components**

In the previous example, each button had its own independent counter:





```js


- MyApp
  - MyButton (count: 3)
  - MyButton (count: 1)
  - MyButton (count: 2)
````

However, you'll often need components to _share data and always update together_.

To make all buttons display the same `count` and update together, you need to move the state from the individual buttons "upwards" to the closest component containing all of them. In this example, it is `MyApp`:

```js
- MyApp (count: 3)
  - MyButton
  - MyButton
  - MyButton
```

Here's how you can express this in code.

First, _move the state up_ from `MyButton` into `MyApp`:

```js
function MyButton() {
  // ... we're moving code from here ...
}

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
      <MyButton />
    </div>
  );
}
```

Then, _pass the state down_ from `MyApp` to each `MyButton`, together with the shared click handler. You can pass information to `MyButton` using the JSX curly braces, just like you previously did with built-in tags like `<img>`:

```js
export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}
```

The information you pass down like this is called _props_. Now the `MyApp` component contains the `count` state and the `handleClick` event handler, and _passes both of them down as props_ to each of the buttons.

Finally, change `MyButton` to _read_ the props you have passed from its parent component:

```js
function MyButton({ count, onClick }) {
  return <button onClick={onClick}>Clicked {count} times</button>;
}
```

When you click the button, the `onClick` handler fires. Each button's `onClick` prop was set to the `handleClick` function inside `MyApp`, so the code inside of it runs. That code calls `setCount(count + 1)`, incrementing the `count` state variable. The new `count` value is passed as a prop to each button, so they all show the new value.

This is called "lifting state up". By moving state up, we've shared it between components.

```js
import { useState } from 'react';

function MyButton({ count, onClick }) { return ( Clicked {count} times ); }

export default function MyApp() {
const \[count, setCount] = useState(0);

function handleClick() { setCount(count + 1); }

return (

#### Counters that update together

); }
```

**Next Steps**

By now, you know the basics of how to write React code!

Head to \[Thinking in React]\(https: //beta.reactjs.org/learn/thinking-in-react) to see how it feels to build a UI with React in practice.

</details>

## Thinking in React

> **Excerpt**
>
> A JavaScript library for building user interfaces

---

React can change how you think about the designs you look at and the apps you build. Where once you might have seen a forest, after working with React, you will appreciate the individual trees. React makes it easier to think in design systems and UI states. In this tutorial, we'll guide you through the thought process of building a searchable product data table with React.

### Start with the mockup

Imagine that you already have a JSON API and a mockup from a designer.

The JSON API returns some data that looks like this:

The mockup looks like this:

!\[]\(https: //beta.reactjs.org/images/docs/s_thinking-in-react_ui.png)

To implement a UI in React, you will usually follow the same five steps.

### Step 1: Break the UI into a component hierarchy

Start by drawing boxes around every component and subcomponent in the mockup and naming them. If you work with a designer, they may have already named these components in their design tool. Check in with them!

Depending on your background, you can think about splitting up a design into components in different ways:

- **Programming**—use the same techniques for deciding if you should create a new function or object. One such technique is the \[single responsibility principle]\(https: //en.wikipedia.org/wiki/Single_responsibility_principle), that is, a component should ideally only do one thing. If it ends up growing, it should be decomposed into smaller subcomponents.
- **CSS**—consider what you would make class selectors for. (However, components are a bit less granular.)
- **Design**—consider how you would organize the design's layers.

If your JSON is well-structured, you'll often find that it naturally maps to the component structure of your UI. That's because UI and data models often have the same information architecture—that is, the same shape. Separate your UI into components, where each component matches one piece of your data model.

There are five components on this screen:

!\[]\(https: //beta.reactjs.org/images/docs/s_thinking-in-react_ui_outline.png)

1. `FilterableProductTable` (grey) contains the entire app.
2. `SearchBar` (blue) receives the user input.
3. `ProductTable` (lavender) displays and filters the list according to the user input.
4. `ProductCategoryRow` (green) displays a heading for each category.
5. `ProductRow` (yellow) displays a row for each product.

If you look at `ProductTable` (lavender), you'll see that the table header (containing the "Name" and "Price" labels) isn't its own component. This is a matter of preference, and you could go either way. For this example, it is a part of `ProductTable` because it appears inside the `ProductTable`'s list. However, if this header grows to be complex (e.g., if you add sorting), it would make sense to make this its own `ProductTableHeader` component.

Now that you've identified the components in the mockup, arrange them into a hierarchy. Components that appear within another component in the mockup should appear as a child in the hierarchy:

- `FilterableProductTable`
  - `SearchBar`
  - `ProductTable`
    - `ProductCategoryRow`
    - `ProductRow`

### Step 2: Build a static version in React

Now that you have your component hierarchy, it's time to implement your app. The most straightforward approach is to build a version that renders the UI from your data model without adding any interactivity… yet! It's often easier to build the static version first and then add interactivity separately. Building a static version requires a lot of typing and no thinking, but adding interactivity requires a lot of thinking and not a lot of typing.

To build a static version of your app that renders your data model, you'll want to build \[components]\(https: //beta.reactjs.org/learn/your-first-component) that reuse other components and pass data using \[props]\(https: //beta.reactjs.org/learn/passing-props-to-a-component). Props are a way of passing data from parent to child. (If you're familiar with the concept of \[state]\(https: //beta.reactjs.org/learn/state-a-components-memory), don't use state at all to build this static version. State is reserved only for interactivity, that is, data that changes over time. Since this is a static version of the app, you don't need it.)

You can either build "top down" by starting with building the components higher up in the hierarchy (like `FilterableProductTable`) or "bottom up" by working from components lower down (like `ProductRow`). In simpler examples, it's usually easier to go top-down, and on larger projects, it's easier to go bottom-up.

```javascript
function ProductCategoryRow({ category }) { return ( {category} ); }
function ProductRow({ product }) { const name = product.stocked ? product.name : <span style={{ color: 'red' }}> {product.name} ;
return ( {name} {product.price} ); }
function ProductTable({ products }) { const rows = []; let lastCategory = null;
products.forEach((product) => { if (product.category !== lastCategory) { rows.push( ); } rows.push( ); lastCategory = product.category; });
return (
{rows}
); }
function SearchBar() { return (
{' '} Only show products in stock); }
function FilterableProductTable({ products }) { return (
); }
const PRODUCTS = [ {category: "Fruits", price: "$1", stocked: true, name: "Apple"}, {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"}, {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"}, {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"}, {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"}, {category: "Vegetables", price: "$1", stocked: true, name: "Peas"} ];
export default function App() { return ; }js
```

(If this code looks intimidating, go through the \[Quick Start]\(https: //beta.reactjs.org/learn) first!)

After building your components, you'll have a library of reusable components that render your data model. Because this is a static app, the components will only return JSX. The component at the top of the hierarchy (`FilterableProductTable`) will take your data model as a prop. This is called _one-way data flow_ because the data flows down from the top-level component to the ones at the bottom of the tree.

#### Pitfall

At this point, you should not be using any state values. That's for the next step!

### Step 3: Find the minimal but complete representation of UI state

To make the UI interactive, you need to let users change your underlying data model. You will use _state_ for this.

Think of state as the minimal set of changing data that your app needs to remember. The most important principle for structuring state is to keep it \[DRY (Don't Repeat Yourself]\(https: //en.wikipedia.org/wiki/Don't_repeat_yourself)). Figure out the absolute minimal representation of the state your application needs and compute everything else on-demand. For example, if you're building a shopping list, you can store the items as an array in state. If you want to also display the number of items in the list, don't store the number of items as another state value—instead, read the length of your array.

Now think of all of the pieces of data in this example application:

1. The original list of products
2. The search text the user has entered
3. The value of the checkbox
4. The filtered list of products

Which of these are state? Identify the ones that are not:

- Does it **remain unchanged** over time? If so, it isn't state.
- Is it **passed in from a parent** via props? If so, it isn't state.
- **Can you compute it** based on existing state or props in your component? If so, it _definitely_ isn't state!

What's left is probably state.

Let's go through them one by one again:

1. The original list of products is **passed in as props, so it's not state**.
2. The search text seems to be state since it changes over time and can't be computed from anything.
3. The value of the checkbox seems to be state since it changes over time and can't be computed from anything.
4. The filtered list of products **isn't state because it can be computed** by taking the original list of products and filtering it according to the search text and value of the checkbox.

This means only the search text and the value of the checkbox are state! Nicely done!

### Step 4: Identify where your state should live

After identifying your app's minimal state data, you need to identify which component is responsible for changing this state, or _owns_ the state. Remember: React uses one-way data flow, passing data down the component hierarchy from parent to child component. It may not be immediately clear which component should own what state. This can be challenging if you're new to this concept, but you can figure it out by following these steps!

For each piece of state in your application:

1. Identify _every_ component that renders something based on that state.
2. Find their closest common parent component—a component above them all in the hierarchy.
3. Decide where the state should live:
   1. Often, you can put the state directly into their common parent.
   2. You can also put the state into some component above their common parent.
   3. If you can't find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common parent component.

In the previous step, you found two pieces of state in this application: the search input text, and the value of the checkbox. In this example, they always appear together, so it is easier to think of them as a single piece of state.

Now let's run through our strategy for this state:

1. **Identify components that use state:**
   - `ProductTable` needs to filter the product list based on that state (search text and checkbox value).
   - `SearchBar` needs to display that state (search text and checkbox value).
2. **Find their common parent:** The first parent component both components share is `FilterableProductTable`.
3. **Decide where the state lives**: We'll keep the filter text and checked state values in `FilterableProductTable`.

So the state values will live in `FilterableProductTable`.

Add state to the component with the \[`useState()` Hook]\(https: //beta.reactjs.org/apis/usestate). Hooks let you "hook into" a component's \[render cycle]\(https: //beta.reactjs.org/learn/render-and-commit). Add two state variables at the top of `FilterableProductTable` and specify the initial state of your application:

```javascript
function FilterableProductTable({ products }) {

const [filterText, setFilterText] = useState('');

const [inStockOnly, setInStockOnly] = useState(false);
```

Then, pass `filterText` and `inStockOnly` to `ProductTable` and `SearchBar` as props:

```jsx
<div>
  <SearchBar filterText={filterText} inStockOnly={inStockOnly} />
  <ProductTable
    products={products}
    filterText={filterText}
    inStockOnly={inStockOnly}
  />
</div>
```

You can start seeing how your application will behave. Edit the `filterText` initial value from `useState('')` to `useState('fruit')` in the sandbox code below. You'll see both the search input text and the table update:

```jsx
import { useState } from 'react';

function FilterableProductTable({ products }) {
const \[filterText, setFilterText] = useState('');
const \[inStockOnly, setInStockOnly] = useState(false);

return (

); }

function ProductCategoryRow({ category }) { return ( {category} ); }

function ProductRow({ product }) {
const name = product.stocked ? product.name : \<span style={{ color: 'red' }}> {product.name} ;

return ( {name} {product.price} ); }

function ProductTable({ products, filterText, inStockOnly }) {
const rows = \[]; let lastCategory = null;

products.forEach((product) => { if ( product.name.toLowerCase().indexOf( filterText.toLowerCase() ) === -1 ) { return; } if (inStockOnly && !product.stocked) { return; } if (product.category !== lastCategory) { rows.push( ); } rows.push( ); lastCategory = product.category; });

return (

{rows}

); }

function SearchBar({ filterText, inStockOnly }) { return (

{' '} Only show products in stock); }


const PRODUCTS = \[ {category: "Fruits", price: "$1", stocked: true, name: "Apple"}, {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"}, {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"}, {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"}, {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"}, {category: "Vegetables", price: "$1", stocked: true, name: "Peas"} ];

export default function App() { return ; }
```

In the sandbox above, `ProductTable` and `SearchBar` read the `filterText` and `inStockOnly` props to render the table, the input, and the checkbox. For example, here is how `SearchBar` populates the input value:

```js
function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."/>
```

Refer to the \[Managing State]\(https: //beta.reactjs.org/learn/managing-state) to dive deeper into how React uses state and how you can organize your app with it.

### Step 5: Add inverse data flow

Currently your app renders correctly with props and state flowing down the hierarchy. But to change the state according to user input, you will need to support data flowing the other way: the form components deep in the hierarchy need to update the state in `FilterableProductTable`.

React makes this data flow explicit, but it requires a little more typing than two-way data binding. If you try to type or check the box in the example above, you'll see that React ignores your input. This is intentional. By writing `<input value={filterText} />`, you've set the `value` prop of the `input` to always be equal to the `filterText` state passed in from `FilterableProductTable`. Since `filterText` state is never set, the input never changes.

You want to make it so whenever the user changes the form inputs, the state updates to reflect those changes. The state is owned by `FilterableProductTable`, so only it can call `setFilterText` and `setInStockOnly`. To let `SearchBar` update the `FilterableProductTable`'s state, you need to pass these functions down to `SearchBar`:

```js
function FilterableProductTable({ products }) {

const [filterText, setFilterText] = useState('');

const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
```

Inside the `SearchBar`, you will add the `onChange` event handlers and set the parent state from them:

```js
<input
  type="text"
  value={filterText}
  placeholder="Search..."
  onChange={(e) => onFilterTextChange(e.target.value)}
/>
```

Now the application fully works!

```js
import { useState } from 'react';

function FilterableProductTable({ products }) {
const \[filterText, setFilterText] = useState('');
const \[inStockOnly, setInStockOnly] = useState(false);

return (

); }

function ProductCategoryRow({ category }) { return ( {category} ); }

function ProductRow({ product }) {
const name = product.stocked ? product.name : \<span style={{ color: 'red' }}> {product.name} ;

return ( {name} {product.price} ); }

function ProductTable({ products, filterText, inStockOnly }) {
const rows = \[]; let lastCategory = null;

products.forEach((product) => { if ( product.name.toLowerCase().indexOf( filterText.toLowerCase() ) === -1 ) { return; } if (inStockOnly && !product.stocked) { return; } if (product.category !== lastCategory) { rows.push( ); } rows.push( ); lastCategory = product.category; });

return (

{rows}

); }

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) { return (

\<input type="text" value={filterText} placeholder="Search..." onChange={(e) => onFilterTextChange(e.target.value)} /> \<input type="checkbox" checked={inStockOnly} onChange={(e) => onInStockOnlyChange(e.target.checked)} /> {' '} Only show products in stock); }


const PRODUCTS = \[ {category: "Fruits", price: "$1", stocked: true, name: "Apple"}, {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"}, {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"}, {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"}, {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"}, {category: "Vegetables", price: "$1", stocked: true, name: "Peas"} ];

export default function App() { return ; }
```
