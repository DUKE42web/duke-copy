---
description: meeting with james
---

# Day 1

\{% embed url="https: //dukeenergy-my.sharepoint.com/:v:/g/personal/bryan_guner_duke-energy_com/EZ64SoMwF5xIq_Yufn9Fb9ABpgBdoRH8Sh3wiFOw8nFy_Q?email=Russell.Parkhouse%40duke-energy.com" %\}

Use .not. to test for false positives

\{% embed url="https: //codesandbox.io/s/github/kentcdodds/react-testing-library-examples/tree/main" %\}

<details>

<summary>Debug</summary>

**API**

`React Testing Library` re-exports everything from `DOM Testing Library` as well as these methods:

- \[`render`]\(https: //testing-library.com/docs/react-testing-library/api/#render)
- \[`render` Options]\(https: //testing-library.com/docs/react-testing-library/api/#render-options)
  - \[`container`]\(https: //testing-library.com/docs/react-testing-library/api/#container)
  - \[`baseElement`]\(https: //testing-library.com/docs/react-testing-library/api/#baseelement)
  - \[`hydrate`]\(https: //testing-library.com/docs/react-testing-library/api/#hydrate)
  - \[`wrapper`]\(https: //testing-library.com/docs/react-testing-library/api/#wrapper)
  - \[`queries`]\(https: //testing-library.com/docs/react-testing-library/api/#queries)
- \[`render` Result]\(https: //testing-library.com/docs/react-testing-library/api/#render-result)
  - \[`...queries`]\(https: //testing-library.com/docs/react-testing-library/api/#queries-1)
  - \[`container`]\(https: //testing-library.com/docs/react-testing-library/api/#container-1)
  - \[`baseElement`]\(https: //testing-library.com/docs/react-testing-library/api/#baseelement-1)
  - \[`debug`]\(https: //testing-library.com/docs/react-testing-library/api/#debug)
  - \[`rerender`]\(https: //testing-library.com/docs/react-testing-library/api/#rerender)
  - \[`unmount`]\(https: //testing-library.com/docs/react-testing-library/api/#unmount)
  - \[`asFragment`]\(https: //testing-library.com/docs/react-testing-library/api/#asfragment)
- \[`cleanup`]\(https: //testing-library.com/docs/react-testing-library/api/#cleanup)
- \[`act`]\(https: //testing-library.com/docs/react-testing-library/api/#act)

---

**`render`\[​]\(https:**

//testing-library.com/docs/react-testing-library/api/#render)

```
function render(  ui: React.ReactElement<any>,  options?: {    /* You won't often use this, expand below for docs on options */  },): RenderResult
```

Copy

Render into a container which is appended to `document.body`.

```typescript
import {render} from '@testing-library/react'render(<div />)
```

Copy

```typescript
import {render} from '@testing-library/react'import '@testing-library/jest-dom'test('renders a message', () => {
const {container, getByText} = render(<Greeting />)  expect(getByText('Hello, world!')).toBeInTheDocument()  expect(container.firstChild).toMatchInlineSnapshot(`    <h1>Hello, World!</h1>  `)})
```

Copy

**`render` Options\[​]\(https:**

//testing-library.com/docs/react-testing-library/api/#render-options)

You won't often need to specify options, but if you ever do, here are the available options which you could provide as a second argument to `render`.

**`container`\[​]\(https:**

//testing-library.com/docs/react-testing-library/api/#container)

By default, `React Testing Library` will create a `div` and append that `div` to the `document.body` and this is where your React component will be rendered. If you provide your own HTMLElement `container` via this option, it will not be appended to the `document.body` automatically.

For example: If you are unit testing a `tablebody` element, it cannot be a child of a `div`. In this case, you can specify a `table` as the render `container`.

```typescript
const table = document.createElement("table");
const { container } = render(<TableBody {...props} />, {
  container: document.body.appendChild(table),
});
```

Copy

**`baseElement`\[​]\(https:**

//testing-library.com/docs/react-testing-library/api/#baseelement)

If the `container` is specified, then this defaults to that, otherwise this defaults to `document.body`. This is used as the base element for the queries as well as what is printed when you use `debug()`.

**`hydrate`\[​]\(https:**

//testing-library.com/docs/react-testing-library/api/#hydrate)

If hydrate is set to true, then it will render with \[ReactDOM.hydrate]\(https: //reactjs.org/docs/react-dom.html#hydrate). This may be useful if you are using server-side rendering and use ReactDOM.hydrate to mount your components.

**`wrapper`\[​]\(https:**

//testing-library.com/docs/react-testing-library/api/#wrapper)

Pass a React Component as the `wrapper` option to have it rendered around the inner element. This is most useful for creating reusable custom render functions for common data providers. See \[setup]\(https: //testing-library.com/docs/react-testing-library/setup#custom-render) for examples.

**`queries`\[​]\(https:**

//testing-library.com/docs/react-testing-library/api/#queries)

Queries to bind. Overrides the default set from `DOM Testing Library` unless merged.

```typescript
// Example, a function to traverse table contentsimport * as tableQueries from 'my-table-query-library'import {queries} from '@testing-library/react'
const { getByRowColumn, getByText } = render(<MyTable />, {
  queries: { ...queries, ...tableQueries },
});
```

Copy

See \[helpers]\(https: //testing-library.com/docs/dom-testing-library/api-custom-queries) for guidance on using utility functions to create custom queries.

Custom queries can also be added globally by following the \[custom render guide]\(https: //testing-library.com/docs/react-testing-library/setup#custom-render).

**`render` Result\[​]\(https:**

//testing-library.com/docs/react-testing-library/api/#render-result)

The `render` method returns an object that has a few properties:

**`...queries`\[​]\(https:**

//testing-library.com/docs/react-testing-library/api/#queries-1)

The most important feature of `render` is that the queries from \[DOM Testing Library]\(https: //testing-library.com/docs/queries/about) are automatically returned with their first argument bound to the \[baseElement]\(https: //testing-library.com/docs/react-testing-library/api/#baseelement), which defaults to `document.body`.

See \[Queries]\(https: //testing-library.com/docs/queries/about) for a complete list.

Example

```typescript
const { getByLabelText, queryAllByTestId } = render(<Component />);
```

Copy

**`container`\[​]\(https:**

//testing-library.com/docs/react-testing-library/api/#container-1)

The containing DOM node of your rendered React Element (rendered using `ReactDOM.render`). It's a `div`. This is a regular DOM node, so you can call `container.querySelector` etc. to inspect the children.

Tip: To get the root element of your rendered element, use `container.firstChild`.

NOTE: When that root element is a \[React Fragment]\(https: //reactjs.org/docs/fragments.html), `container.firstChild` will only get the first child of that Fragment, not the Fragment itself.

🚨 If you find yourself using `container` to query for rendered elements then you should reconsider! The other queries are designed to be more resilient to changes that will be made to the component you're testing. Avoid using `container` to query for elements!

**`baseElement`\[​]\(https:**

//testing-library.com/docs/react-testing-library/api/#baseelement-1)

The containing DOM node where your React Element is rendered in the container. If you don't specify the `baseElement` in the options of `render`, it will default to `document.body`.

This is useful when the component you want to test renders something outside the container div, e.g. when you want to snapshot test your portal component which renders its HTML directly in the body.

Note: the queries returned by the `render` looks into baseElement, so you can use queries to test your portal component without the baseElement.

**`debug`\[​]\(https:**

//testing-library.com/docs/react-testing-library/api/#debug)

NOTE: It's recommended to use \[`screen.debug`]\(https: //testing-library.com/docs/queries/about#screendebug) instead.

This method is a shortcut for `console.log(prettyDOM(baseElement))`.

```typescript
import React from 'react'import {render} from '@testing-library/react'
const HelloWorld = () => <h1>Hello World</h1>
const {debug} = render(<HelloWorld />)debug()
// <div>
//   <h1>Hello World</h1>
// </div>
// you can also pass an element: debug(getByTestId('messages'))
// and you can pass all the same arguments to debug as you can
// to prettyDOM:
//
const maxLengthToPrint = 10000
// debug(getByTestId('messages'), maxLengthToPrint, {highlight: false})
```

Copy

This is a simple wrapper around `prettyDOM` which is also exposed and comes from \[`DOM Testing Library`]\(https: //testing-library.com/docs/dom-testing-library/api-debugging#prettydom).

**`rerender`\[​]\(https:**

//testing-library.com/docs/react-testing-library/api/#rerender)

It'd probably be better if you test the component that's doing the prop updating to ensure that the props are being updated correctly (see \[the Guiding Principles section]\(https: //testing-library.com/docs/guiding-principles)). That said, if you'd prefer to update the props of a rendered component in your test, this function can be used to update props of the rendered component.

```typescript
import { render } from "@testing-library/react";
const { rerender } = render(<NumberDisplay number={1} />);
// re-render the same component with different propsrerender(<NumberDisplay number={2} />)
```

Copy

\[See the examples page]\(https: //testing-library.com/docs/example-update-props)

**`unmount`\[​]\(https:**

//testing-library.com/docs/react-testing-library/api/#unmount)

This will cause the rendered component to be unmounted. This is useful for testing what happens when your component is removed from the page (like testing that you don't leave event handlers hanging around causing memory leaks).

This method is a pretty small abstraction over `ReactDOM.unmountComponentAtNode`

```typescript
import {render} from '@testing-library/react'
const {container, unmount} = render(<Login />)unmount()
// your component has been unmounted and now: container.innerHTML === ''
```

Copy

**`asFragment`\[​]\(https:**

//testing-library.com/docs/react-testing-library/api/#asfragment)

Returns a `DocumentFragment` of your rendered component. This can be useful if you need to avoid live bindings and see how your component reacts to events.

```typescript
import React, {useState} from 'react'import {render, fireEvent} from '@testing-library/react'
const TestComponent = () => {
const [count, setCounter] = useState(0)  return (    <button onClick={() => setCounter(count => count + 1)}>      Click to increase: {count}    </button>  )}
const {getByText, asFragment} = render(<TestComponent />)
const firstRender = asFragment()fireEvent.click(getByText(/Click to increase/))
// This will snapshot only the difference between the first render, and the
// state of the DOM after the click event.
// See https:
//github.com/jest-community/snapshot-diffexpect(firstRender).toMatchDiffSnapshot(asFragment())
```

Copy

---

**`cleanup`\[​]\(https:**

//testing-library.com/docs/react-testing-library/api/#cleanup)

Unmounts React trees that were mounted with \[render]\(https: //testing-library.com/docs/react-testing-library/api/#render).

Please note that this is done automatically if the testing framework you're using supports the `afterEach` global and it is injected to your testing environment (like mocha, Jest, and Jasmine). If not, you will need to do manual cleanups after each test.

For example, if you're using the \[ava]\(https: //github.com/avajs/ava) testing framework, then you would need to use the `test.afterEach` hook like so:

```typescript
import {cleanup, render} from '@testing-library/react'import test from 'ava'test.afterEach(cleanup)test('renders into document', () => {  render(<div />)
// ...})
// ... more tests ...
```

Copy

Failing to call `cleanup` when you've called `render` could result in a memory leak and tests which are not "idempotent" (which can lead to difficult to debug errors in your tests).

---

**`act`\[​]\(https:**

//testing-library.com/docs/react-testing-library/api/#act)

This is a light wrapper around the \[`react-dom/test-utils` `act` function]\(https: //reactjs.org/docs/test-utils.html#act). All it does is forward all arguments to the act function if your version of react supports `act`. It is recommended to use the import from `@testing-library/react` over `react-dom/test-utils` for consistency reasons.

</details>

```
jest.mock('src/lib/useIntersection');
```

it.skip('lets you skip the test for now')

If you are about to write an 'and' in the it block... create another it block

```
renderWithCTX(<Accordion {...props} />);
    screen.logTestingPlaygroundURL();
```

playground needs to be under first render

screen.debug(numitems)

<details>

<summary>cheatsheet</summary>

**Cheatsheet**

\[Get the printable cheat sheet]\(https: //github.com/testing-library/react-testing-library/raw/main/other/cheat-sheet.pdf)

A short guide to all the exported functions in `React Testing Library`

- render `const {/* */} = render(Component)` returns:
  - `unmount` function to unmount the component
  - `container` reference to the DOM node where the component is mounted
  - all the queries from `DOM Testing Library`, bound to the document so there is no need to pass a node as the first argument (usually, you can use the `screen` import instead)

```typescript
import {render, fireEvent, screen} from '@testing-library/react'test('loads items eventually', async () => {  render(<Page />)
// Click button  fireEvent.click(screen.getByText('Load'))
// Wait for page to update with query text
const items = await screen.findAllByText(/Item #[0-9]: /)  expect(items).toHaveLength(10)})
```

</details>

```typescript
import { screen, fireEvent } from "@testing-library/react";
import { renderWithCTX } from "src/lib/testWrappers";
import { compositionFunction } from "./composition";
import data from "./data";
import Accordion from "./index";
import "@testing-library/jest-dom";

jest.mock("src/lib/useIntersection");

describe("Accordion", () => {
  const props = compositionFunction(data);
  it("render the correct items", () => {
    renderWithCTX(<Accordion {...props} />);
    screen.logTestingPlaygroundURL();

    const text = screen.getByText();

    for (let i = 0; i < props.items.length - 1; i++)
      //
      const accordionItemsText = screen.getAllByRole("listitem");

    //
    // expect(numItems.length).toBe(data.fields.items.length);

    // expect(accordionItemsText[0]).toHaveTextContent(props?.items[0]?.text?.value as string);

    // typescript needs the value passed in to be a string
  });

  it("should render Accordion Component with image", () => {
    // look up memory router...
    renderWithCTX(<Accordion {...props} />);

    const img = screen.getByRole("img", { name: /facebook/i });
    expect(img).toBeInTheDocument();
  });

  it("fires the click handler on click", () => {
    renderWithCTX(<Accordion {...props} />);

    const buttons = screen.getAllByRole("button");

    for (let i = 0; i < buttons.length - 1; i++) {
      const curButton = buttons[i];
      fireEvent.click(curButton);
    }
  });

  it("changes the background color if theme prop is changed", () => {
    renderWithCTX(<Accordion {...props} />);

    const list = screen.getByRole("list");
    expect(list).toHaveClass(themeMap.footer.button);
  });
});
```

Memory router (from react router dom)

\{% embed url="https: //v5.reactrouter.com/web/api/MemoryRouter" %\}

useLocation (also from react router)

error cannot read property location of undefined
