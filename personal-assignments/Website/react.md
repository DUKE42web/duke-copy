# ⚛ React

## React

### Folder and File Structure

Each component should have its own folder nested inside the `/components` folder. The name of this folder should match the name of the component itself. Inside this folder you should have the following files:

1. data.js
2. index.ts
3. stories.js
4. styles.ts(x) (optional)
5. test.tsx
6. types.ts

- data.js
  - contains a copy of the JSS `fields` object for this component. This will get imported in unit tests and Storybook stories. If the component doesn't get called from Sitecore and doesn't have JSS fields, then this file isn't needed.
- index.tsx
  - main React component
- stories.js
  - Storybook stories
- styles.ts(x) (optional)
  - if you use Styled Components for the component, they will live here
- test.tsx
  - Jest unit tests
- types.ts
  - Typescript types and interfaces the component

\
\\

---

\\

### Composition File

Before working on the React component itself we first need to compose simpler props for it instead of parsing through the JSS fields object directly. The goal is to turn something like this:

```tsx
<Component title={fields.PodItemLink?.value?.text} />
```

into this:

```tsx
<Component title={title} />
```

The composition file is located at `lib/composition/index.js` and contains an exported function for each of the React components. The JSS fields object (and sometimes placeholder object) from Sitecore is passed in and destructured. Using the `ComponentTypes` global Typescript type both as a reference and consistent naming convention amongst all of the components, you will use these as keys to build your return object which will be passed in as the final props object to your component.

In the following example, the QuickLinks component will get a single `items` prop returned to it, which will consist of an array of objects

```tsx
// composition/index.js

const QuickLinks = ({ fields }) => {
  const items = fields?.QuickLinkItems?.reduce(
    (acc, curr) => [
      ...acc,
      {
        image: { ...curr.Icon?.value },
        link: curr.Link?.value?.href,
        title: curr.Title?.value,
        id: curr.Id,
      },
    ],
    []
  );
  return { items };
};
```

```tsx
// components/QuickLinks/index.tsx

const QuickLinks = ({ items }: { items: Array<ComponentTypes> }) => (
  <QuickLinksWrapper>
    {items?.map(({ id, ...rest }, index) => (
      <QuickLinksItem index={index} length={items.length} key={id} {...rest} />
    ))}
  </QuickLinksWrapper>
);
```

#### Optional Chaining

An important thing to note and best practice is to use optional chaining when reaching into an object. The `(?.)` operator allows you to reach as far down into a nested object without first having to validate that the previous step in the chain is valid and exists first.

[MDN - Optional Chaining](https:
//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

\
\\

---

\\

### Function Components

We should always use function components with hooks over class components. Function components are 'stateless' and simple as they don't track state or have lifecycle and render methods like class components do. If you need to track state in your component, import the `useState` hook.

```tsx
import React, { useState } from "react";

const Button = () => {
  const [count, setCount] = useState(0);
  return <button onClick={setCount(count + 1)}>clicked {count} times!</button>;
};
```

#### Use Short Syntax Over React Fragments

If your return content doesn't have a wrapping div you will need to create a fragment by using a short syntax element `<>` rather than a React `<Fragment>` . The only exception is if you need to use a `key` when using a `map` . In these instances you will need to use a `<Fragment>` [React Short Syntax](https:
//reactjs.org/docs/fragments.html#short-syntax)

:no_entry_sign: Bad

```tsx
const ChildComponent = () => {
  return (
    <Fragment>
      <div>Title</div>
      <div>SubTitle</div>
    </Fragment>
  );
};
```

:white_check_mark: Good

```tsx
const ChildComponent = () => {
  return (
    <>
      <div>Title</div>
      <div>SubTitle</div>
    </>
  );
};
```

:white_check_mark: Good

```tsx
const Component = ({ items }: { items: Array<ComponentTypes> }) =>
  items?.map(({ id, ...rest }, index) => (
    <Fragment key={id}>
      <div>The title</div>
      <InnerComponent index={id} length={items.length} {...rest} />
    </Fragment>
  ));
```

#### Use Implicit Returns

With ES6 and arrow functions you can omit the curly braces and the `return` keyword if your component is immediately returning something.

:no_entry_sign: Bad

```tsx
const ChildComponent = () => {
  return <div>The Child</div>;
};
```

:no_entry_sign: Bad

```tsx
const ChildComponent = () => {
  return (
    <div>
      <Component />
      <Component />
      <Component />
    </div>
  );
};
```

:white_check_mark: Good

```tsx
const ChildComponent = () => <div>The Child</div>;
```

:white_check_mark: Good

```tsx
const ChildComponent = () => (
  <div>
    <Component />
    <Component />
    <Component />
  </div>
);
```

#### Use PascalCase and Export At The End Of The File

Component names should always be PascalCased and exported at the bottom of the file. If there is more than one component to export you need to declare which one is the default export:

```tsx
const ChildComponent = () => <div>The child</div>;

const ParentComponent = () => (
  <>
    <h1>The Title</h1>
    <ChildComponent />
  </>
);

export { ChildComponent };
export default ParentComponent;
```

\
\\

---

\\

### Spread and Destructure

Where possible always destructure props and other objects/arrays where used. This will help in typing and keeping things clear and not hidden behind a root object. If you don't need to destructure out all of the properties of an object, use the `...rest` keyword and pass that in instead like so:

:no_entry_sign: Bad

```tsx
const QuickLinks = ({ items }: { items: Array<ComponentTypes> }) => (
  <QuickLinksWrapper>
    {items?.map(({ image, link, title, id }, index) => (
      <QuickLinksItem
        image={image}
        index={index}
        length={items.length}
        link={link}
        title={title}
        key={id}
      />
    ))}
  </QuickLinksWrapper>
);
```

:white_check_mark: Good

```tsx
const QuickLinks = ({ items }: { items: Array<ComponentTypes> }) => (
  <QuickLinksWrapper>
    {items?.map(({ id, ...rest }, index) => (
      <QuickLinksItem index={index} length={items.length} key={id} {...rest} />
    ))}
  </QuickLinksWrapper>
);
```

If you're not transforming the props names from the parent to the child, then you can omit setting them directly on the child and instead just spread them in with the `{...rest}` property.

\
\\

---

\\

### Small, Focused and DRY

Our components should be broken down into small, reusable functions instead of one gigantic component.

:no_entry_sign: Bad

```tsx
const DataReport = ({ items }: { items: Array<string> }) => (
  <table>
    <tr className="bg-teal-dark text-lg text-white">
      <td className="cell-class">NAME</td>
      <td className="cell-class">HOURS</td>
    </tr>
    {items.map(({ hours, name }, index) => (
      <tr className="bg-transparent text-lg text-teal-dark" key={index}>
        <td className="cell-class">{name}</td>
        <td className="cell-class">{hours}</td>
      </tr>
    ))}
  </table>
);
```

:white_check_mark: Good

```tsx

const TableCell = ({ children }) => (
  <td className="cell-class">{children}</td>
);


const TableRow = ({ children, isHeader }) => {

const class = isHeader ? 'bg-teal-dark text-white' : 'bg-transparent text-teal-dark'
  return <tr className={`${class} text-lg`}>{children}</td>
};


const DataReport = ({ items }: { items: Array<string> }) => (
  <table>
    <TableRow isHeader={true}>
      <TableCell>NAME</TableCell>
      <TableCell>HOURS</TableCell>
    </TableRow>
    {items.map(({ hours, name }, index) => (
      <TableRow key={index}>
        <TableCell>{name}</TableCell>
        <TableCell>{hours}</TableCell>
      </TableRow>
    ))}
  </table>
);
```

Each component should do only one thing and only be responsible for the logic for that one thing. If your function is growing in size, it's probably time to refactor it into smaller, more focused components. This will also help in making our components more reusable, consistent and TESTABLE.

React | Typescript | Tailwind | Forms | Unit Tests
