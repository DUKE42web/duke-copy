# ByPlaceholderText

import Tabs from '@theme/Tabs' import TabItem from '@theme/TabItem'

> getByPlaceholderText, queryByPlaceholderText, getAllByPlaceholderText, queryAllByPlaceholderText, findByPlaceholderText, findAllByPlaceholderText

### API

```typescript
getByPlaceholderText(
  // If you're using `screen`, then skip the container argument:
  container: HTMLElement,
  text: TextMatch,
  options?: {
    exact?: boolean = true,
    normalizer?: NormalizerFn,
  }): HTMLElement
```

This will search for all elements with a placeholder attribute and find one that matches the given `TextMatch`.

```html
<input placeholder="Username" />
```

\<Tabs defaultValue="native" values={\[ { label: 'Native', value: 'native', }, { label: 'React', value: 'react', }, { label: 'Cypress', value: 'cypress', }, ] }>

```js
import { screen } from "@testing-library/dom";

const inputNode = screen.getByPlaceholderText("Username");
```

```jsx
import { render, screen } from "@testing-library/react";

render(<MyComponent />);
const inputNode = screen.getByPlaceholderText("Username");
```

```js
cy.findByPlaceholderText("Username").should("exist");
```

> **Note**
>
> A placeholder is not a good substitute for a label so you should generally use `getByLabelText` instead.

### Options

TextMatch options
