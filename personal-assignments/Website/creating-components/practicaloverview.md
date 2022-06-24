# 👨🔬 👨🔬 👨🔬 👨🔬 👨🔬 👨🔬 👨🔬 👨🔬 👨🔬 👨🔬 👨🔬 👨🔬 PracticalOverview

## Component Creation - Practical Overview

---

Table of Contents:

1. Intro
2. Technical Overview
3. Practical Overview
4. Definition of Done
5. Sitecore

---

If you'd prefer to get right to the point and skip the overview, [there's a handy checklist here](../../../Website/creating-components/broken-reference/). Otherwise, read on for an in-depth explanation of how one could approach a workflow via Storybook.

## Workflow - A Practical Overview

As a developer, you may find it convenient to develop your React component in isolation within Storybook, rather than developing on the page. This can give you the opportunity to preview it and get a feel for the data you will need. Once the component looks and behaves in the intended manner, it should be relatively simple to incorporate it into the broader application.

Where before we have focused on a logical overview of how components work and are used within the context of our Sitecore JSS setup and our custom React application, _this section will focus on a practical suggested workflow for developing your component._

### The Approach

Whether or not you elect to decide to develop your React component with Storybook, **you will need two things to get started: an `index.tsx` and the data to render with it (if your component gets data from Sitecore).**

It will be challenging to know in advance the shape of the data that comes to your React component from Sitecore, so you may find it helpful to set up your component in a very basic way that simply accepts props and renders or logs them out. Then, you can set up a composition function that does the same.

```tsx
// MyComponent/composition.tsx

const MyComponent = (sitecoreData) => {
  return sitecoreData;
};
```

```tsx
// MyComponent/index.tsx

/** technically, you would want to provide types in a Typescript file,
 * but we're just trying to get some data here.
 */

const MyComponent = (scData) => {
  console.log(scData);
  return <div>{JSON.stringify(scData)}</div>;
};

// Now you can copy the payload from your browser and paste it into your brand new data file!
```

Once your component is rendering, you can **capture the data from Sitecore that is logged or displayed onscreen** to create your data file. Then you can begin working on your composition function to ensure you are sending _only_ the data your component needs in the simplest, flattest form possible.

As you consider the data your component will need, it might be a good time to **think about how your component is supposed to behave and consider writing out some assertions to test against in your `test.ts` file.**

After that, **you can work in Storybook by importing your component's composition function into your `story.js` file and process your dummy data with it**. At this point, you will have dummy data that looks just like what is coming from Sitecore and you can develop your component in Storybook, just as you would a regular website.

An example of that might look something like this:

```js
// story.js
import React from "react";
import MyComponent from "./index";
import { MyComponent as MyComponentComposition } from "../../lib/composition";
import Data from "./data";

/**
 * create a variable with data that is in the shape that your component will be
 * expecting, as it would be from your composition file.
 * Again, this is necessary since the composition function is not called by Storybook.
 */

const props = MyComponentComposition(Data);

const Template = (args) => <MyComponent {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  /* here you can spread those props into your Storybook file, making data
   * available to your component as it would be on the actual live page.
   */
  ...props,
};
```

Finally, once your component is close to completion, you can finish writing your unit tests to ensure your component functions as expected.

The following section summarizes things into a concise checklist.

### Checklist

- [ ] Ensure your component exists within Sitecore. If not, create it.
- [ ] Create a folder in the `/components` directory and within it, an `index.ts` file for your React component.
- [ ] Add a composition function to the index file of the `/compostion` directory.
- [ ] Create a `test.ts` file and add some unit test assertions to it.
- [ ] Add a `data.js` file populated with dummy data (if necessary).
- [ ] Develop your component with the data from the composition file.
- [ ] Finish your unit tests.
- [ ] Submit a PR.
- [ ] Stretch. It's not part of the component, it's just good for your body.

< Previous Next >

Intro | Technical Overview | Practical Overview | Typescript | Sitecore | Definition of Done | Analytics
