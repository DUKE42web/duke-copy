# 💯 Unit Tests

<details>

<summary>React Testing Library Cheat Sheet</summary>

**Queries**[**​**](https:
//testing-library.com/docs/dom-testing-library/cheatsheet#queries)

See [Which query should I use?](https:
//testing-library.com/docs/queries/about#priority)

- **ByLabelText** find by label or aria-label text content
  - getByLabelText
  - queryByLabelText
  - getAllByLabelText
  - queryAllByLabelText
  - findByLabelText
  - findAllByLabelText
- **ByPlaceholderText** find by input placeholder value
  - getByPlaceholderText
  - queryByPlaceholderText
  - getAllByPlaceholderText
  - queryAllByPlaceholderText
  - findByPlaceholderText
  - findAllByPlaceholderText
- **ByText** find by element text content
  - getByText
  - queryByText
  - getAllByText
  - queryAllByText
  - findByText
  - findAllByText
- **ByDisplayValue** find by form element current value
  - getByDisplayValue
  - queryByDisplayValue
  - getAllByDisplayValue
  - queryAllByDisplayValue
  - findByDisplayValue
  - findAllByDisplayValue
- **ByAltText** find by img alt attribute
  - getByAltText
  - queryByAltText
  - getAllByAltText
  - queryAllByAltText
  - findByAltText
  - findAllByAltText
- **ByTitle** find by title attribute or svg title tag
  - getByTitle
  - queryByTitle
  - getAllByTitle
  - queryAllByTitle
  - findByTitle
  - findAllByTitle
- **ByRole** find by aria role
  - getByRole
  - queryByRole
  - getAllByRole
  - queryAllByRole
  - findByRole
  - findAllByRole
- **ByTestId** find by data-testid attribute
  - getByTestId
  - queryByTestId
  - getAllByTestId
  - queryAllByTestId
  - findByTestId
  - findAllByTestId

**Async**[**​**](https:
//testing-library.com/docs/dom-testing-library/cheatsheet#async)

See [Async API](https:
//testing-library.com/docs/dom-testing-library/api-async). Remember to `await` or `.then()` the result of async functions in your tests!

- **waitFor** (Promise) retry the function within until it stops throwing or times out
- **waitForElementToBeRemoved** (Promise) retry the function until it no longer returns a DOM node

**Deprecated since v7.0.0:**

- **wait** (Promise) retry the function within until it stops throwing or times
- **waitForElement** (Promise) retry the function until it returns an element or an array of elements. The `findBy` and `findAllBy` queries are async and retry until the query returns successfully, or when the query times out; they wrap `waitForElement`
- **waitForDomChange** (Promise) retry the function each time the DOM is changed

**Events**[**​**](https:
//testing-library.com/docs/dom-testing-library/cheatsheet#events)

See [Considerations for fireEvent](https:
//testing-library.com/docs/guide-events), [Events API](https:
//testing-library.com/docs/dom-testing-library/api-events)

- **fireEvent** trigger DOM event: `fireEvent(node, event)`
- **fireEvent.\*** helpers for default event types
  - **click** `fireEvent.click(node)`
  - [See all supported events](https:
    //github.com/testing-library/dom-testing-library/blob/master/src/event-map.js)

**Other**[**​**](https:
//testing-library.com/docs/dom-testing-library/cheatsheet#other)

See [Querying Within Elements](https:
//testing-library.com/docs/dom-testing-library/api-within), [Config API](https:
//testing-library.com/docs/dom-testing-library/api-configuration)

- **within** take a node and return an object with all the queries bound to the node (used to return the queries from `React Testing Library`'s render method): `within(node).getByText("hello")`
- **configure** change global options: `configure({testIdAttribute: 'my-data-test-id'})`

**Text Match Options**[**​**](https:
//testing-library.com/docs/dom-testing-library/cheatsheet#text-match-options)

Given the following HTML:

```
<div>Hello World</div>
```

Copy

_**Will**_\*\* find the div:\*\*

```typescript
// Matching a string:getByText(container, 'Hello World')
// full string matchgetByText(container, 'llo Worl', {exact: false})
// substring matchgetByText(container, 'hello world', {exact: false})
// ignore case
// Matching a regex:getByText(container, /World/)
// substring matchgetByText(container, /world/i)
// substring match, ignore casegetByText(container, /^hello world$/i)
// full string match, ignore casegetByText(container, /Hello W?oRlD/i)
// advanced regex
// Matching with a custom function:getByText(container, (content, element) => content.startsWith('Hello'))
```

Copy

Given a button that updates the page after some time:

```
test('loads items eventually', async () => {
// Click button  fireEvent.click(getByText(node, 'Load'))
// Wait for page to update with query text
const items = await findByText(node, /Item #[0-9]: /)  expect(items).toHaveLength(10)})
```

</details>

<details>

<summary>React Testing Library</summary>

**React Testing Library**

[`React Testing Library` ](https:
//github.com/testing-library/react-testing-library)builds on top of `DOM Testing Library` by adding APIs for working with React components.

Projects created with [`Create React App` ](https:
//create-react-app.dev)have out of the box support for **React Testing Library**. If that is not the case, you can add it via `npm` like so:

```
npm install --save-dev @testing-library/react
```

Copy

- [React Testing Library on GitHub](https:
  //github.com/testing-library/react-testing-library)

**The problem**[**​**](https:
//testing-library.com/docs/react-testing-library/intro/#the-problem)

You want to write maintainable tests for your React components. As a part of this goal, you want your tests to avoid including implementation details of your components and rather focus on making your tests give you the confidence for which they are intended. As part of this, you want your testbase to be maintainable in the long run so refactors of your components (changes to implementation but not functionality) don't break your tests and slow you and your team down.

**This solution**[**​**](https:
//testing-library.com/docs/react-testing-library/intro/#this-solution)

The `React Testing Library` is a very light-weight solution for testing React components. It provides light utility functions on top of `react-dom` and `react-dom/test-utils` , in a way that encourages better testing practices. Its primary guiding principle is:

[The more your tests resemble the way your software is used, the more confidence they can give you.](https:
//testing-library.com/docs/guiding-principles)

So rather than dealing with instances of rendered React components, your tests will work with actual DOM nodes. The utilities this library provides facilitate querying the DOM in the same way the user would. Finding form elements by their label text (just like a user would), finding links and buttons from their text (like a user would). It also exposes a recommended way to find elements by a `data-testid` as an "escape hatch" for elements where the text content and label do not make sense or is not practical.

This library encourages your applications to be more accessible and allows you to get your tests closer to using your components the way a user will, which allows your tests to give you more confidence that your application will work when a real user uses it.

This library is a replacement for [Enzyme](http:
//airbnb.io/enzyme/). While you _can_ follow these guidelines using Enzyme itself, enforcing this is harder because of all the extra utilities that Enzyme provides (utilities which facilitate testing implementation details). Read more about this in [the FAQ](https:
//testing-library.com/docs/react-testing-library/faq).

**What this library is not**:

1. A test runner or framework
2. Specific to a testing framework (though we recommend Jest as our preference, the library works with any framework. See [Using Without Jest](https:
   //testing-library.com/docs/react-testing-library/setup#using-without-jest))

NOTE: This library is built on top of [`DOM Testing Library` ](https:
//testing-library.com/docs/dom-testing-library/intro)which is where most of the logic behind the queries is.

\\

</details>

Creating Unit Tests for the DXT Application

Our unit testing utilizes the [Jest Testing Framework](https:
//jestjs.io) and [Enzyme](https:
//enzymejs.github.io/enzyme/).

This document is not intended to tell you how to use these technologies, but instead how we use them in our environment.

## Testing Methodology

Unit testing involves taking a single component and testing its behavior independently of the rest of the system. We want to break the application down into the smallest testable "units" that we can and verify they function correctly.

This means exporting the components in your `index.tsx` and importing them into your test file, and then testing each of them in as many different configurations as there are.

## Creating the Unit Tests

First begin by creating a . `/test.tsx` file next to your `index.tsx` file. This file will hold your unit tests.

A basic outline of that file would be:

```tsx
import React from "react";
import { mount } from "enzyme";
import { Data } from "./data";
import ComponentName, { ComponentParts } from "./index";

describe("ComponentName Tests", () => {
  it("Verify ComponentName will render", () => {
    const wrapper = mount(<ComponentName data={Data} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
```

### Unit Test Data

It is ideal to use your component-specific data from your `./data.js` file to populate your component for unit testing. Many times this will give you a start of base data, that you will need to expand on to ensure you are fully testing your components.

`lib/composition/index.js` contains the composition functions for the different components. These functions are run to munge the data before it is passed to the components. You will want to import the composition function for your component, and use it to manipulate your data, this will help test both your composition function and your component.

### Tests to Write

Deciding what to write tests for can be a challenge, some things to test include:

- Edge Cases
- Bad Input/Good Input
- Logic Branches - Is there a positive and negative path? Perhaps things are hidden or shown.
- Individual Methods - Especially when they contain specific logic

Practical examples: If your function takes numbers, what happens if you pass it strings? Do both the positive and negative path tests of your function produce the correct output? What happens if you pass in zero, negative numbers, undefined, or null?

In addition, any time a bug is fixed, if it is possible, a test should be added for that specific case. This helps prevent regression.

### Testing to Avoid

Unit tests should be testing the behavior of the component, not its implementation. Meaning, we want to test that our logic is correct, not that the framework or library we are using works correctly.

For example this would not be a good test, as all you are testing is if React is showing/hiding the div properly:

```tsx

const ComponentName(showDiv: boolean) {
  return (showDiv && <div class="js-test">Some Text</div>);
}

...

it('Test div Exists', () => {

const wrapper = shallow(<ComponentName showDiv={true} />);
	expect(wrapper.find('.js-test').exists()).toBeTruthy();
}
```

Where as this would be a good test, as you are testing the logic in the isVisible, and not the React framework:

:white_check_mark: Good

```tsx

const isVisible(someData: MyType) {
  let visible = true;

// Some logic here using someData

// That changes the value of visible
  return visible;
}


const ComponentName({someData}: MyType) {

const shouldShow = isVisible(someData);
  return (shouldShow && <div>Some Text</div>);
}

...

it('Test div Exists', () => {

const wrapper = shallow(<ComponentName someData={...} />);
	expect(wrapper.find('.js-test').exists()).toBeTruthy();
}
```

## Test Classes

In some situations you will need to add test classes to your elements to be able to locate them in your unit tests. When you are adding a class that is only to be used during testing, that class should be prefixed with `js-` many times simply using `js-class` is sufficient.

## Running Tests

The full test suite can be run from the command line with:

```
npm run test
```

or

```
jest
```

An individual test file can be run using:

```
npm run test components/MyComponent
```

### Test Before

You should always run the entire suite of unit tests when you first create a new branch - this ensures that you are starting from a known-working state.

### Test After

You should also run all of the tests, including the new tests you wrote for your component, before you push your code. When doing this you should verify all old tests, as well as your new tests all pass.

## Mocks

See: [Jest Mocks](https:
//jestjs.io/docs/en/jest-object#mock-modules)

Mocks can be used in situations where we have methods that are required for the component we are testing to function. Because we are writing unit tests, and not integration tests, these methods should be mocked with their expected results.

There are also some existing mocks that enable us to test components that would otherwise be troublesome.

### useMediaQuery & useIntersection

if useMediaQuery or useIntersection are used in your component, you will need to mock them in you tests using the following:

```tsx
jest.mock("@/lib/useIntersection");
jest.mock("@/lib/useMediaQuery");
```

### Router

The router can be mocked as follows:

```tsx
jest.mock("react-router-dom", () => ({
  useRouter: jest.fn(() => ({ asPath: "/home" })),
  useRouter: jest.fn(() => ({ query: { tab: mockTabQuery } })),
}));
```

This will set the path, and allow you to see the tab.

### Creating Mocks for Components

Creating your own mocks is also a rather straight-forward process. First go to the directory with your component, and create a new subdirectory called `__mocks__` and create a new file in that directory that has the same file name as the component you want to mock\`

And put the following in the file:

```tsx
const ComponentName = () => <div>COMPONENTNAME MOCK</div>;

export default ComponentName;
```

**NOTE: This will create a basic working mock for your component, but you should add markup to simulate what the component will actually output for more accurate testing.**

Then simply import the mock into your `test.tsx` like so:

```jsx
jest.mock("@/components/ComponentName");
```

## Tips and Tricks

### Too Good to be True!

Usually if everything seems too good to be true, it is! For instance if all your tests magically pass the first time, this usually means you are testing the wrong thing. Try inverting your test and see if it still passes, many times you will find it passes both ways meaning your test is broken, and not that your code works!

### Shallow Mounting

When mounting your components in your unit tests, Enzyme will allow you to mount it regularly, or to shallow mount it.

#### Regular

```tsx
import { mount } from 'enzyme';
...

const wrapper = mount(<ComponenetName data={Data}/>);
```

This will mount the component regularly with all its subcomponents.

#### Shallow

```tsx
import { shallow } from 'enzyme';
...

const wrapper = shallow(<ComponenetName data={Data}/>);
```

This will mount the component alone, without any of its subcomponents, allowing for more siloed tests. Results with shallow mounting are varied, and they should be used with extreme caution as they have been known to cause problems, such as always returning true when checking if an element exists. If you are to use them, be sure to check both the positive and negative test case to verify that you aren't just always getting a positive result.

### Getting Wrapper Info

When running the tests getting the contents of the wrapper can be helpful, this can be done with:

```js
console.log(wrapper.debug());
```

### Running Tests with Chrome Debugger

Your unit tests can be run inside of the Chrome debugger, giving you the benefits you normally get from that experience, such as stepping through your code and viewing variables.

To run your code in the Chrome debugger, drop a `debugger;` statement in your tests, then open this URL in Chrome `chrome: //inspect/#devices` and click the link labeled _Open dedicated DevTools for Node_.

This will bring up a debug window.

Then simply start your tests, from the root of the project directory with:

```
node --inspect node_modules/.bin/jest --runInBand
```

The tests should run as normal, stopping when they hit your `debugger;` statement.

### Getting Data

Sometimes getting the data you need and building your test data objects can be frustrating. It can be helpful to use:

```js
console.log(JSON.stringify(data));
```

At the top of the methods you are testing while using it, to get a starting data input for your tests.

### Types

You will want to import and use the same types used in your component to create object that are passed to your components for your tests.

## Resources

- [React Testing](https:
  //reactjs.org/docs/testing.html)
- [React Testing Recipes](https:
  //reactjs.org/docs/testing-recipes.html)
- [Jest Testing Framework](https:
  //jestjs.io)
- [Jest Mocks](https:
  //jestjs.io/docs/en/jest-object#mock-modules)
- [Jest Testing React](https:
  //jestjs.io/docs/en/tutorial-react)
- [Enzyme](https:
  //enzymejs.github.io/enzyme/)

React | Typescript | Tailwind | Forms | Unit Tests
