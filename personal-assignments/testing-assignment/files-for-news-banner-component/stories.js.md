# Copy of Stories.js

#### Code:

```typescript
import React from "react";
import { Data } from "./data";
import { compositionFunction } from "./composition";
import NewsBanner from "./index";

const props = compositionFunction(Data);
// props has desired shape of data as storybook substitute for composition function.

export default {
  title: "components/NewsBanner",
  component: NewsBanner,
};

const Template = (args) => {
  return <NewsBanner {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  ...props,
};
```

> end of code
