# 🤖 TechnicalOverview

## Component Creation - Technical Overview

---

Table of Contents:

1. Intro
2. Technical Overview
3. Practical Overview
4. Definition of Done
5. Sitecore

---

## A Technical Overview

---

### Generate Component Factory

The Generate Component Factory (`scripts/generate-component-factory.js`) generates the `/src/temp/componentFactory.js` file which maps React components to JSS components.

The component factory is a mapping between a string name and a React component instance. When the Sitecore Layout service returns a layout definition, it returns named components. This mapping is used to construct the component hierarchy for the layout.

The default convention uses the parent folder name as the component name, but it is customizable in generateComponentFactory().

Sometimes Sitecore references a component in a way that is different from what we want the component to be called within the application. In this case, we can provide an alias to map the Sitecore name to our component upon import:

```ts
const componentAlias = {
  HeroCarousel: "Hero",
  HeroCarouselNocache: "Hero",
  JssAccordion: "Accordion",

  // ...
};
```

In this case, we are telling our app that if it receives a string called `HeroCarousel` or `HeroCarouselNocache`, use the `'Hero'` component. Likewise, if a string of `JssAccordion` is encountered, use the `'Accordion'` component, and so on.

If the name of your component and its Sitecore counterpart are the same, there is no need to include an alias.

### Passing Down Data Via Composition

At its simplest, the goal of the composition file is to **transform the data being passed to your component** from accessing deeply nested properties like this:

```jsx
<Component title={fields.PodItemLink?.value?.text} />
```

into this:

```jsx
<Component title={title} />
```

_What does that entail exactly?_

The composition file also exists in the your component directory. Sitecore sends a wealth of information down to the page related to each component. Not all of this information is needed or even useful. So the purpose of each of these functions is to strip away the unneeded data, giving our component only what it needs to render properly.

To illustrate this, in the following example, the QuickLinks component will get a single `items` prop returned to it, which will consist of an array of objects:

```javascript
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

As a developer, you will be responsible for writing the composition function for your component. Since the data from Sitecore comes in all sizes and shapes, there is no "one-size-fits-all" solution, but most likely you can take a cue from the composition functions that have been written before to get a feel for how to approach a new one.

### Adding files for your component

Now that you know how components are implemented within our app, how is a component actually created within the app?

Generally, each component you create will consist of at least one of the following items:

- an [`index.tsx` file](broken-reference/) - your React file.
- a [`composition.tsx`](broken-reference/) file for transforming incoming data into more concise props
- a [`test.tsx` file](broken-reference/) - a file for your unit tests.
- a [`types.ts` file](broken-reference/) - for Typescript definitions and interfaces
- a [`stories.js` file](broken-reference/) - for Storybook..
- a [`data.js` file](broken-reference/) - for mock Sitecore data.
- a [📁 containing each of these files](broken-reference/) - It's a folder.

Read on for more detail.

#### `Index.tsx`

The index file will be your main component React file, using Typescript. _At a minimum_, your component will require this file. Since our project uses `Tailwind`, your styles will mainly exist here as well. [See the styles section](broken-reference/) for more info.

#### `Test.tsx`

The test file is where your unit tests live. Tests are written in React with `Typescript`, using \[Jest]\(https: //jestjs.io/en/) and \[Enzyme]\(https: //enzymejs.github.io/enzyme/).

Jest is a popular testing library and Enzyme adds some sugar on top to make writing the tests a little easier.

You should be testing the basic functionality of your component. This may be as simple as validating that your component is rendering to mocking data and checking to make sure your component is outputting it correctly.

In all likelihood, you will need a test for every component you write, even if it is a very small test to confirm that the component is properly mounted.

#### `Types.ts`

This file is for type definitions and interfaces for \[Typescript]\(https: //www.typescriptlang.org). You can store your component-specific definitions in this file and export them to your index file.

For more information on writing Typescript within our app, please check out our Typescript Style Guide.

#### `Stories.js`

The `stories.js` file creates a [Storybook](broken-reference/) component. To be honest, the paradigm of writing in Storybook can be a little bit tricky to grasp at first if you don't have experience with it. And to be frank, their docs could use some work. So you are encouraged to [check out our documentation for Storybook.](broken-reference/).

In essence, however, consider your Storybook file something like an environment for your React component that enables you to run it in isolation from the rest of the app. This makes it easy to preview the functionality and, as a result, developers and designers can easily access the React component without having to navigate to a route to interact with it. This also enables you to view and manipulate it in ways that would be difficult in the context of an entire app.

If your component is extremely simple and self-contained, a Storybook file may not be necessary, or perhaps even possible. But in general, all components should have a Storybook file.

Unlike most of our other component files, we are not using Typescript in Storybook, so it is not necessary to provide types within your story file.

#### `Data.js`

The `data.js` file is meant to provide mock data to your unit tests and Storybook files. It is ignored by Webpack, so don't include any objects or functions your component needs in order to render properly.

The data file does not use Typescript since it is generally only used to provide mock JSON data.

Perhaps the most frequent use case for this file is that you can copy/paste the data exactly as it comes from Sitecore. Since Storybook files and unit tests exist in isolation, they won't receive Sitecore data. But your React component will be relying on data to render correctly. So the dummy data placed within the data file ensures your React component will still have similar data in the same shape as the Sitecore data it would have in real-world conditions. Thus, even in isolation, you can ensure your component looks and behaves in a consistent and predictable manner.

On occasion, you may encounter a situation where you have a hard-coded object or map that is used for reference within your app. While these can be useful, sometimes they may clutter up your main `index.tsx` file. In this case, you may be tempted to house those values in the `data.js` file and import them into your React component from there. But as was mentioned above, these files are ignored by Webpack, so any necessary additional data you would want to exist in a file should be added to a file named something other than `data.js`.

Depending on the complexity of your component, this file may not be necessary. For example, if your React component doesn't get called from Sitecore, doesn't have JSS fields, or it doesn't require any extra hard-coded data, then you will not need a data file.

#### The folder

Of course, all of these files must live somewhere, and that place is in a folder. This folder should of course be named after your component and added to the `/components` directory. Resist the temptaion to take creative liberties with the name of the folder, as this will be the folder that will be imported into the Component Factory (see `/src/temp/componentFactory.js`) and importing a folder named `TheGreatestComponentYouHaveEverFeastedYourMiserableEyeballsOn` for the Modal component won't make a lot of sense out of context, no matter how fitting it seemed in the moment.

< Previous Next >

Intro | Technical Overview | Practical Overview | Typescript | Sitecore | Definition of Done | Analytics
