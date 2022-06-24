---
description: Navigate my docs
cover: .gitbook/assets/duke.jpeg
coverY: 222.9864253393665
---

# 🗺 Site Navigation

[![Gitbook Action Build](https://github.com/bgoonz/DUKE/actions/workflows/gitbook-action.yml/badge.svg)](https://github.com/bgoonz/DUKE/actions/workflows/gitbook-action.yml)

# 📖 Storybook

Storybook is an open source tool for developing UI components in isolation. It essentially gives us a sandbox to showcase and test the components we'll use throughout our app.

It allows us to develop more efficiently (we can develop our components in isolation within Storybook, rather than developing on the page of the app), and also allows the design and UI teams to interact with our components as we build them. They can also change the values of the component's props to see how the component will react as it receives different data.

To get it up and running navigate to the app repo and, from the command line, enter:

```bash
npm run storybook
```

Let's first discuss some of the core principles of Storybook (we'll use examples from our own app where possible), before then diving into the anatomy of a typical story.

## Stories

A story, much like a React component, is a function that describes how to render a component.

You can have multiple stories per component, meaning Storybook gives us the power to describe multiple rendered states.

For a very simple example using the PushDownPanel component from our own app, we might first describe the component with it's default state, but then add a story that describes a different rendered state.

So here's how the initial default PushDownPanel might look:

```js
export const NoIcons = Template.bind();
NoIcons.args = {
  items: itemsOptions["3"],
};
```

And then we can add variations based on different states, for example a version that uses icons:

```js
export const Icons = Template.bind({});
Icons.args = {
  items: itemsOptions["5"],
};
```

And the new stories will show up in the sidebar navigation, like so:

## Args

Story definitions can be further improved to take advantage of Storybook's "args" concept.

A story is a component with a set of arguments (props), and these arguments can be altered and composed dynamically. This gives Storybook its power (they even refer to this as a _superpower_ in their docs!), allowing us essentially to live edit our components.

Most of the time the type of arg will be [inferred automatically](https:
//storybook.js.org/docs/react/api/argtypes#automatic-argtype-inference), however we can use ArgTypes to further configure the behavior of our args,
constraining the values they can take and generating relevant UI controls.

```js
export default {
  title: "Components/Accordion",
  component: AccordionComponent,
  argTypes: {
    theme: {
      name: "Theme",
    },
    closeOthers: {
      name: "One Panel Open At A Time",
    },
  },
};

const Template = (args) => <AccordionComponent {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  ...props,
};
```

## Controls

Controls allow designers and developers to explore component behavior by mucking about with its arguments.

Storybook feeds the given args property into the story during render. Each of the args from the story function will now be live editable using Storybook's Controls panel, so we can dynamically change components in Storybook to see how they look with different settings and data:

This essentially evolves Storybook into an interactive documentation tool, allowing developers and stakeholders to stress test components, for example by adding huge strings of text that might help expose UI problems.

Controls can be configured to use UI elements that we deem most appropriate according to the data that we're trying to manipulate; some examples from our own components include a radio button for manipulating background color:

```js
argTypes: {
  backgroundColor: {
    control: {
      type: 'radio',
      options: ['white', 'gray'],
    },
    defaultValue: 'white',
  },
},
```

A select menu to control the number of items that render:

```js
argTypes: {
  items: {
    name: 'How many items?',
    control: {
      type: 'select',
      options: {
        ...itemsPrimary,
      },
    },
  },
},
```

And for our Hero component, a mixture of text inputs, boolean switch and radio group (screen shot of how these controls render follows the code):

```js
argTypes: {
  title: {
    control: {
      type: 'text',
    },
  },
  subtitle: {
    control: {
      type: 'text',
    },
  },
  link: {
    control: 'boolean',
  },
  ctaType: {
    control: {
      type: 'inline-radio',
      options: ['ImageSlide', 'VideoSlide'],
    },
  },
},
```

## A11y and Other Addons

Addons are plugins that extend Storybook's core functionality, packaged as NPM modules. Once [installed and registered](https:
//storybook.js.org/docs/react/addons/install-addons) they will appear in the addons panel, a reserved place in the Storybook UI below the main component.

One such addon we use is the Accessibility addon, which helps to make our UI components more accessible. Simply select the Accessibility tab from the aforementioned addons panel, and there you will see any Violations, Passes and Incomplete requirements pertaining to accessibility.

We also use the Viewport [toolbar](https:
//storybook.js.org/docs/react/get-started/browse-stories#toolbar) item, which allows us to adjust the dimensions of the iframe our stories are rendered in, making it nice to test responsive UIs.

## Anatomy of a Story

Stories exist alongside the other component files as `stories.js`.

Here's an example of how a typical story might take shape:

```js
import React from "react";
import MyComponent from "./index";
import { Data } from "./data";
import { MyComponent as MyComponentComposition } from "../../lib/composition";

const props = MyComponentComposition({ fields: Data });

export default {
  title: "Components/MyComponent",
  component: MyComponent,
  argTypes: {
    backgroundColor: {
      control: {
        type: "radio",
        options: ["white", "gray"],
      },
      defaultValue: "white",
    },
  },
};

const Template = (args) => <MyComponent {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  ...props,
};
```

Let's break this down line by line:

```js
import React from 'react';
import MyComponent from './index';
import { Data } from './data';

...
```

**Component Setup:** So we start off with your normal component setup, standard stuff: importing React, importing your component and (if your component gets data from Sitecore) importing any data that might be required.

```js
...

import { MyComponent as MyComponentComposition } from '../../lib/composition';


const props = MyComponentComposition({ fields: Data });

...
```

**Data Composition:** After the component setup, we next move on to the process of essentially distilling the data recieved from Sitecore into only the parts we need - you can read more about this process in not only one spot of our docs, but two! Here and here.

```js
...

export default {
  title: 'Components/MyComponent',
  component: MyComponent,
  argTypes: {
    backgroundColor: {
      control: {
        type: 'radio',
        options: ['white', 'gray'],
      },
      defaultValue: 'white',
    },
  },
};

...
```

**Exporting Stories:** After composing the data, we move on to one of the key ingredients of a story: the _default export_ that describes the component. It's a function that returns a component's state given a set of arguments; it describes how to render a component.

It's a story! Behold. Don't get them wet, don't expose them to bright light, and most importantly _don't feed them after midnight!_

Were we to add any other stories beyond the default, we would then add _named exports_ that would describe the additional stories.

We can also add ArgTypes here if we need to configure our args beyond Storybook's automatically-generated UI controls.

In the example above, we're setting `backgroundColor` as a radio button so the user can choose between different background colors, and setting the default as white.

```js
...


const Template = args => <MyComponent {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  ...props,
};
```

**Template Definition:** Now that our stories are exported, we move on to defining a master template (`Template`) for our component's stories, and passing in our args.

We can then reuse this template across stories. `Template.bind({})` makes a copy of the function, reducing code duplication. This is a [standard JavaScript technique](https:
//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) for making a copy of a function, and allows each exported story to set its own properties.

And finally we spread in our component's props (`...props`), making data available to our component as it would be in the regular app.

## storybookCustomArgs

The way in which Storybook automatically infers a set of argTypes based on each component's props can often lead to a lot of unnecessary UI controls rendering.

We have a function for that! In the `lib/helpers/index.ts` file you can find a very cool function called storybookCustomArgs, which allows us to configure which props we would like to render controls for in the Storybook Controls panel.

## createStoryOptions

Oftentimes our component data will come through to us a single array, but in order for Storybook to render the controls in our desired way, we need that data to be a multi-dimenstional array.

Again we have a nifty function for that! Here's an example of both `storybookCustomArgs` and `createStoryOptions` Storybook helper functions at work:

```js
...

import { storybookCustomArgs, createStoryOptions } from 'src/lib/helpers';


const props = BulletedOverviewComposition(Data);

const itemsToShow = createStoryOptions(props.items);

export default {
  title: 'Components/Bulleted Overview',
  component: BulletedOverview,
  argTypes: {
    ...storybookCustomArgs(props, BulletedOverview, [], false),
    items: {
      name: 'How many items?',
      control: {
        type: 'select',
        options: {
          ...itemsToShow,
        },
      },
    },
  },
};

...
```

## Resources

- [Learn Storybook](https:
  //www.learnstorybook.com) - a guided tutorial through building a simple application with Storybook
- [Component Driven User Interfaces](https:
  //www.componentdriven.org) - learn more about the component-driven approach that Storybook enables
- [Storybook Addons](https:
  //storybook.js.org/addons) - supercharge Storybook with advanced features and new workflows
- [Component Story Format](https:
  //storybook.js.org/blog/component-story-format/) - read more about the Component Story Format (CSF), a new way to author stories based on ES6 modules

_<mark style="color:red;background-color:green;">**Self Link**</mark>_

[https: //duke-2.gitbook.io/duke](./#website)

[https://duke-3.gitbook.io/duke/](https://duke-3.gitbook.io/duke/)

{% embed url="https://app.abstract.com/projects/7d33aa49-f1f0-47eb-971d-893d6457bcbc" %}

### Duke Training:

{% embed url="https://dewap.duke-energy.com/EHSTrain/HS1010_WS/index_lms.html?aicc_sid=AICChwSV3HVHAqqYgW73-UGijiVHXrT-ZrNFx8YJQvzf5jI&aicc_url=https%3A%2F%2Fduke-energy.csod.com%2FLMS%2Fscorm%2Faicc.aspx" %}

| query   | searches | hits | pageHits | sectionHits |
| ------- | -------- | ---- | -------- | ----------- |
| nav     | 1        | 155  | 2        | 153         |
| stepper | 1        | 4    | 0        | 4           |
| typesc  | 1        | 381  | 20       | 361         |
| test    | 1        | 262  | 14       | 248         |

\
Website Navigation

---

### Table of contents

{% content-ref url="jira-tasks/jira-tickets/" %}
[jira-tickets](jira-tasks/jira-tickets/)
{% endcontent-ref %}

{% content-ref url="jira-tickets/dnt-2658 (1).md" %}
[dnt-2658 (1).md](<jira-tickets/dnt-2658 (1).md>)
{% endcontent-ref %}

{% content-ref url="jira-tickets/dnt-2659.md" %}
[dnt-2659.md](jira-tickets/dnt-2659.md)
{% endcontent-ref %}

{% content-ref url="jira-tickets/dnt-2658-1.md" %}
[dnt-2658-1.md](jira-tickets/dnt-2658-1.md)
{% endcontent-ref %}

{% content-ref url="jira-tasks/jira-tickets/dnt-2724-accordion-testing.md" %}
[dnt-2724-accordion-testing.md](jira-tasks/jira-tickets/dnt-2724-accordion-testing.md)
{% endcontent-ref %}

{% content-ref url="jira-tasks/jira-tickets/2654-a11y-audit-form-errors.md" %}
[2654-a11y-audit-form-errors.md](jira-tasks/jira-tickets/2654-a11y-audit-form-errors.md)
{% endcontent-ref %}

{% content-ref url="personal.md" %}
[personal.md](personal.md)
{% endcontent-ref %}

{% content-ref url="docs/" %}
[docs](docs/)
{% endcontent-ref %}

{% content-ref url="docs/component-creation/" %}
[component-creation](docs/component-creation/)
{% endcontent-ref %}

{% content-ref url="docs/component-creation/analytics.md" %}
[analytics.md](docs/component-creation/analytics.md)
{% endcontent-ref %}

{% content-ref url="docs/component-creation/definitionofdone.md" %}
[definitionofdone.md](docs/component-creation/definitionofdone.md)
{% endcontent-ref %}

{% content-ref url="docs/component-creation/technicaloverview.md" %}
[technicaloverview.md](docs/component-creation/technicaloverview.md)
{% endcontent-ref %}

{% content-ref url="docs/component-creation/practicaloverview.md" %}
[practicaloverview.md](docs/component-creation/practicaloverview.md)
{% endcontent-ref %}

{% content-ref url="docs/component-creation/sitecore.md" %}
[sitecore.md](docs/component-creation/sitecore.md)
{% endcontent-ref %}

{% content-ref url="docs/component-creation/intro.md" %}
[intro.md](docs/component-creation/intro.md)
{% endcontent-ref %}

{% content-ref url="docs/setup.md" %}
[setup.md](docs/setup.md)
{% endcontent-ref %}

{% content-ref url="docs/" %}
[docs](docs/)
{% endcontent-ref %}

{% content-ref url="docs/forms.md" %}
[forms.md](docs/forms.md)
{% endcontent-ref %}

{% content-ref url="docs/react.md" %}
[react.md](docs/react.md)
{% endcontent-ref %}

{% content-ref url="docs/tailwind-css.md" %}
[tailwind-css.md](docs/tailwind-css.md)
{% endcontent-ref %}

{% content-ref url="docs/storybook.md" %}
[storybook.md](docs/storybook.md)
{% endcontent-ref %}

{% content-ref url="docs/typescript/typescript.md" %}
[typescript.md](docs/typescript/typescript.md)
{% endcontent-ref %}

{% content-ref url="ideas.md" %}
[ideas.md](ideas.md)
{% endcontent-ref %}

{% content-ref url="broken-reference/" %}
[broken-reference](broken-reference/)
{% endcontent-ref %}

{% content-ref url="accessibility/" %}
[accessibility](accessibility/)
{% endcontent-ref %}

{% content-ref url="accessibility/aria.md" %}
[aria.md](accessibility/aria.md)
{% endcontent-ref %}

{% content-ref url="ke-energy.md" %}
[ke-energy.md](ke-energy.md)
{% endcontent-ref %}

{% content-ref url="./" %}
[.](./)
{% endcontent-ref %}

{% content-ref url="jira-tasks/jira-tickets/" %}
[jira-tickets](jira-tasks/jira-tickets/)
{% endcontent-ref %}

{% content-ref url="jira-tickets/dnt-2658.md" %}
[dnt-2658.md](jira-tickets/dnt-2658.md)
{% endcontent-ref %}

{% content-ref url="jira-tickets/dnt-2659.md" %}
[dnt-2659.md](jira-tickets/dnt-2659.md)
{% endcontent-ref %}

{% content-ref url="jira-tasks/jira-tickets/dnt-2724-accordion-testing.md" %}
[dnt-2724-accordion-testing.md](jira-tasks/jira-tickets/dnt-2724-accordion-testing.md)
{% endcontent-ref %}

{% content-ref url="jira-tasks/jira-tickets/2654-a11y-audit-form-errors.md" %}
[2654-a11y-audit-form-errors.md](jira-tasks/jira-tickets/2654-a11y-audit-form-errors.md)
{% endcontent-ref %}

{% content-ref url="personal.md" %}
[personal.md](personal.md)
{% endcontent-ref %}

{% content-ref url="docs/" %}
[docs](docs/)
{% endcontent-ref %}

{% content-ref url="docs/component-creation/" %}
[component-creation](docs/component-creation/)
{% endcontent-ref %}

{% content-ref url="docs/component-creation/analytics.md" %}
[analytics.md](docs/component-creation/analytics.md)
{% endcontent-ref %}

{% content-ref url="docs/component-creation/definitionofdone.md" %}
[definitionofdone.md](docs/component-creation/definitionofdone.md)
{% endcontent-ref %}

{% content-ref url="docs/component-creation/technicaloverview.md" %}
[technicaloverview.md](docs/component-creation/technicaloverview.md)
{% endcontent-ref %}

{% content-ref url="docs/component-creation/practicaloverview.md" %}
[practicaloverview.md](docs/component-creation/practicaloverview.md)
{% endcontent-ref %}

{% content-ref url="docs/component-creation/sitecore.md" %}
[sitecore.md](docs/component-creation/sitecore.md)
{% endcontent-ref %}

{% content-ref url="docs/component-creation/intro.md" %}
[intro.md](docs/component-creation/intro.md)
{% endcontent-ref %}

{% content-ref url="docs/setup.md" %}
[setup.md](docs/setup.md)
{% endcontent-ref %}

{% content-ref url="docs/" %}
[docs](docs/)
{% endcontent-ref %}

{% content-ref url="docs/forms.md" %}
[forms.md](docs/forms.md)
{% endcontent-ref %}

{% content-ref url="docs/react.md" %}
[react.md](docs/react.md)
{% endcontent-ref %}

{% content-ref url="docs/tailwind-css.md" %}
[tailwind-css.md](docs/tailwind-css.md)
{% endcontent-ref %}

{% content-ref url="docs/storybook.md" %}
[storybook.md](docs/storybook.md)
{% endcontent-ref %}

{% content-ref url="docs/typescript/typescript.md" %}
[typescript.md](docs/typescript/typescript.md)
{% endcontent-ref %}

{% content-ref url="ideas.md" %}
[ideas.md](ideas.md)
{% endcontent-ref %}

{% content-ref url="broken-reference/" %}
[broken-reference](broken-reference/)
{% endcontent-ref %}

{% content-ref url="accessibility/" %}
[accessibility](accessibility/)
{% endcontent-ref %}

{% content-ref url="accessibility/aria.md" %}
[aria.md](accessibility/aria.md)
{% endcontent-ref %}

{% content-ref url="docs/typescript/" %}
[typescript](docs/typescript/)
{% endcontent-ref %}

{% content-ref url="docs/typescript/typescript-types.md" %}
[typescript-types.md](docs/typescript/typescript-types.md)
{% endcontent-ref %}

{% content-ref url="docs/typescript/types-vs-interfaces.md" %}
[types-vs-interfaces.md](docs/typescript/types-vs-interfaces.md)
{% endcontent-ref %}

{% content-ref url="docs/typescript/typescript-interfaces.md" %}
[typescript-interfaces.md](docs/typescript/typescript-interfaces.md)
{% endcontent-ref %}

{% content-ref url="docs/typescript/enums.md" %}
[enums.md](docs/typescript/enums.md)
{% endcontent-ref %}

{% content-ref url="docs/typescript/types-vs-interfaces-1.md" %}
[types-vs-interfaces-1.md](docs/typescript/types-vs-interfaces-1.md)
{% endcontent-ref %}

{% content-ref url="docs/typescript/typescript-rules/" %}
[typescript-rules](docs/typescript/typescript-rules/)
{% endcontent-ref %}

{% content-ref url="accessability/" %}
[accessability](accessability/)
{% endcontent-ref %}

{% content-ref url="accessability/focus-order.md" %}
[focus-order.md](accessability/focus-order.md)
{% endcontent-ref %}

{% content-ref url="accessability/aria-accessibility.md" %}
[aria-accessibility.md](accessability/aria-accessibility.md)
{% endcontent-ref %}

{% content-ref url="testing/" %}
[testing](testing/)
{% endcontent-ref %}

{% content-ref url="testing/testing-input.md" %}
[testing-input.md](testing/testing-input.md)
{% endcontent-ref %}

{% content-ref url="react-testing-library/" %}
[react-testing-library](react-testing-library/)
{% endcontent-ref %}

{% content-ref url="most-useful/" %}
[most-useful](most-useful/)
{% endcontent-ref %}

{% content-ref url="most-useful/tailwind-classes/" %}
[tailwind-classes](most-useful/tailwind-classes/)
{% endcontent-ref %}

{% content-ref url="most-useful/bookmarks.md" %}
[bookmarks.md](most-useful/bookmarks.md)
{% endcontent-ref %}

{% content-ref url="website/website/" %}
[website](website/website/)
{% endcontent-ref %}

{% content-ref url="website/website/overview/" %}
[overview](website/website/overview/)
{% endcontent-ref %}

{% content-ref url="website/website/overview/duke-energy-manual-audit_report.md" %}
[duke-energy-manual-audit_report.md](website/website/overview/duke-energy-manual-audit_report.md)
{% endcontent-ref %}

{% content-ref url="website/live-deploy.md" %}
[live-deploy.md](website/live-deploy.md)
{% endcontent-ref %}

{% content-ref url="personal-assignments/Website/creating-components/" %}
[creating-components](personal-assignments/Website/creating-components/)
{% endcontent-ref %}

{% content-ref url="personal-assignments/Website/creating-components/intro.md" %}
[intro.md](personal-assignments/Website/creating-components/intro.md)
{% endcontent-ref %}

{% content-ref url="personal-assignments/Website/creating-components/technicaloverview.md" %}
[technicaloverview.md](personal-assignments/Website/creating-components/technicaloverview.md)
{% endcontent-ref %}

{% content-ref url="personal-assignments/Website/creating-components/practicaloverview.md" %}
[practicaloverview.md](personal-assignments/Website/creating-components/practicaloverview.md)
{% endcontent-ref %}

{% content-ref url="personal-assignments/Website/creating-components/analytics.md" %}
[analytics.md](personal-assignments/Website/creating-components/analytics.md)
{% endcontent-ref %}

{% content-ref url="website/creating-components/sitecore/" %}
[sitecore](website/creating-components/sitecore/)
{% endcontent-ref %}

{% content-ref url="website/creating-components/sitecore/sitecore-docs.md" %}
[sitecore-docs.md](website/creating-components/sitecore/sitecore-docs.md)
{% endcontent-ref %}

{% content-ref url="personal-assignments/Website/creating-components/definitionofdone.md" %}
[definitionofdone.md](personal-assignments/Website/creating-components/definitionofdone.md)
{% endcontent-ref %}

{% content-ref url="website/setup.md" %}
[setup.md](website/setup.md)
{% endcontent-ref %}

{% content-ref url="website/testing.md" %}
[testing.md](website/testing.md)
{% endcontent-ref %}

{% content-ref url="personal-assignments/Website/forms.md" %}
[forms.md](personal-assignments/Website/forms.md)
{% endcontent-ref %}

{% content-ref url="personal-assignments/Website/react.md" %}
[react.md](personal-assignments/Website/react.md)
{% endcontent-ref %}

{% content-ref url="website/storybook/" %}
[storybook](website/storybook/)
{% endcontent-ref %}

{% content-ref url="website/storybook/official-tutorial/" %}
[official-tutorial](website/storybook/official-tutorial/)
{% endcontent-ref %}

{% content-ref url="website/storybook/official-tutorial/component-driven-design.md" %}
[component-driven-design.md](website/storybook/official-tutorial/component-driven-design.md)
{% endcontent-ref %}

{% content-ref url="personal-assignments/Website/code-splitting.md" %}
[code-splitting.md](personal-assignments/Website/code-splitting.md)
{% endcontent-ref %}

{% content-ref url="personal-assignments/Website/svgloader.md" %}
[svgloader.md](personal-assignments/Website/svgloader.md)
{% endcontent-ref %}

{% content-ref url="personal-assignments/Website/tailwind-css.md" %}
[tailwind-css.md](personal-assignments/Website/tailwind-css.md)
{% endcontent-ref %}

{% content-ref url="personal-assignments/Website/unit-tests.md" %}
[unit-tests.md](personal-assignments/Website/unit-tests.md)
{% endcontent-ref %}

## General Info

{% content-ref url="general-info/general-info/" %}
[general-info](general-info/general-info/)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/react-notes/" %}
[react-notes](general-info/general-info/react-notes/)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/react-notes/hooks-api-reference-react.md" %}
[hooks-api-reference-react.md](general-info/general-info/react-notes/hooks-api-reference-react.md)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/react-notes/using-the-effect-hook-react.md" %}
[using-the-effect-hook-react.md](general-info/general-info/react-notes/using-the-effect-hook-react.md)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/react-notes/getting-started-with-react.md" %}
[getting-started-with-react.md](general-info/general-info/react-notes/getting-started-with-react.md)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/react-notes/react-todolist.md" %}
[react-todolist.md](general-info/general-info/react-notes/react-todolist.md)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/react-notes/componentizing-our-react-app.md" %}
[componentizing-our-react-app.md](general-info/general-info/react-notes/componentizing-our-react-app.md)
{% endcontent-ref %}

{% content-ref url="react-interactivity-events-and-state.md" %}
[react-interactivity-events-and-state.md](react-interactivity-events-and-state.md)
{% endcontent-ref %}

{% content-ref url="react-interactivity-editing-filtering-conditional-rendering.md" %}
[react-interactivity-editing-filtering-conditional-rendering.md](react-interactivity-editing-filtering-conditional-rendering.md)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/react-notes/create-react-app.md" %}
[create-react-app.md](general-info/general-info/react-notes/create-react-app.md)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/react-notes/react-components.md" %}
[react-components.md](general-info/general-info/react-notes/react-components.md)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/react-notes/handling-events.md" %}
[handling-events.md](general-info/general-info/react-notes/handling-events.md)
{% endcontent-ref %}

{% content-ref url="personal-assignments/testing-assignment/react-testing-recipes.md" %}
[react-testing-recipes.md](personal-assignments/testing-assignment/react-testing-recipes.md)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/webpack.md" %}
[webpack.md](general-info/general-info/webpack.md)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/curry-vs-functional-composition/" %}
[curry-vs-functional-composition](general-info/general-info/curry-vs-functional-composition/)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/curry-vs-functional-composition/argv.md" %}
[argv.md](general-info/general-info/curry-vs-functional-composition/argv.md)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/bubbling-and-capturing.md" %}
[bubbling-and-capturing.md](general-info/general-info/bubbling-and-capturing.md)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/modules.md" %}
[modules.md](general-info/general-info/modules.md)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/private-npm-packages.md" %}
[private-npm-packages.md](general-info/general-info/private-npm-packages.md)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/aria-labelledby-accessibility.md" %}
[aria-labelledby-accessibility.md](general-info/general-info/aria-labelledby-accessibility.md)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/focus.md" %}
[focus.md](general-info/general-info/focus.md)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/optional-chaning.md" %}
[optional-chaning.md](general-info/general-info/optional-chaning.md)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/promises.md" %}
[promises.md](general-info/general-info/promises.md)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/enums-in-javascript.md" %}
[enums-in-javascript.md](general-info/general-info/enums-in-javascript.md)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/jira.md" %}
[jira.md](general-info/general-info/jira.md)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/airbnb-javascript-style-guide.md" %}
[airbnb-javascript-style-guide.md](general-info/general-info/airbnb-javascript-style-guide.md)
{% endcontent-ref %}

{% content-ref url="general-info/general-info/performance.md" %}
[performance.md](general-info/general-info/performance.md)
{% endcontent-ref %}

## Sitecore

{% content-ref url="sitecore/sitecore/" %}
[sitecore](sitecore/sitecore/)
{% endcontent-ref %}

{% content-ref url="sitecore/sitecore/dxt-solution.md" %}
[dxt-solution.md](sitecore/sitecore/dxt-solution.md)
{% endcontent-ref %}

{% content-ref url="code/code/" %}
[code](code/code/)
{% endcontent-ref %}

{% content-ref url="code/code/index.tsx.md" %}
[index.tsx.md](code/code/index.tsx.md)
{% endcontent-ref %}

{% content-ref url="code/code/composition.tsx.md" %}
[composition.tsx.md](code/code/composition.tsx.md)
{% endcontent-ref %}

{% content-ref url="code/code/data.js.md" %}
[data.js.md](code/code/data.js.md)
{% endcontent-ref %}

{% content-ref url="code/code/types.ts.md" %}
[types.ts.md](code/code/types.ts.md)
{% endcontent-ref %}

{% content-ref url="code/code/stories.js.md" %}
[stories.js.md](code/code/stories.js.md)
{% endcontent-ref %}

{% content-ref url="code/code/test.tsx.md" %}
[test.tsx.md](code/code/test.tsx.md)
{% endcontent-ref %}

{% content-ref url="personal-assignments/testing-assignment.md" %}
[testing-assignment.md](personal-assignments/testing-assignment.md)
{% endcontent-ref %}

{% content-ref url="meetings/week-1/week-2/" %}
[week-2](meetings/week-1/week-2/)
{% endcontent-ref %}

{% content-ref url="meetings/week-1/" %}
[week-1](meetings/week-1/)
{% endcontent-ref %}

{% content-ref url="meetings/week-1/week-2/day-4.md" %}
[day-4.md](meetings/week-1/week-2/day-4.md)
{% endcontent-ref %}

{% content-ref url="meetings/week-1/week-2/day-2.md" %}
[day-2.md](meetings/week-1/week-2/day-2.md)
{% endcontent-ref %}

{% content-ref url="meetings/week-1/week-2/day-3.md" %}
[day-3.md](meetings/week-1/week-2/day-3.md)
{% endcontent-ref %}

{% content-ref url="meetings/week-3.md" %}
[week-3.md](meetings/week-3.md)
{% endcontent-ref %}

{% content-ref url="meetings/week-4.md" %}
[week-4.md](meetings/week-4.md)
{% endcontent-ref %}

{% content-ref url="meetings/week-1/week-4/day-1.md" %}
[day-1.md](meetings/week-1/week-4/day-1.md)
{% endcontent-ref %}

{% content-ref url="meetings/week-1/week-4/day-5.md" %}
[day-5.md](meetings/week-1/week-4/day-5.md)
{% endcontent-ref %}

{% content-ref url="meetings/week-1/week-4/day-4.md" %}
[day-4.md](meetings/week-1/week-4/day-4.md)
{% endcontent-ref %}

{% content-ref url="meetings/week-1/week-4/day-2.md" %}
[day-2.md](meetings/week-1/week-4/day-2.md)
{% endcontent-ref %}

{% content-ref url="meetings/week-1/week-4/day-3.md" %}
[day-3.md](meetings/week-1/week-4/day-3.md)
{% endcontent-ref %}

{% content-ref url="meetings/week-5.md" %}
[week-5.md](meetings/week-5.md)
{% endcontent-ref %}

{% content-ref url="meetings/week-6.md" %}
[week-6.md](meetings/week-6.md)
{% endcontent-ref %}
