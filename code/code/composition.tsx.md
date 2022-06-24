# Composition.tsx

#### Code:

```typescript
import { Data } from "./data";
import Composition from "src/lib/Composition";
import NewsBanner from "./index";

const { compositionFunction, component } = Composition(NewsBanner)(
  ({ fields, rendering }) => {
    const link = fields?.["CTA URL"];
    return {
      icon: fields?.["Icon Path"]?.value,
      rounded: fields?.Rounded?.value,
      title: fields?.Title,
      body: fields?.Body,
      bgColorClass: fields?.["BG Color"]?.fields?.Value?.value,
      cta: {
        href: fields?.["CTA URL"]?.value?.href,
        target: fields?.["CTA URL"]?.value?.target,
        text: fields?.["CTA URL"]?.value?.text,
      },
    };
  }
);

export { compositionFunction };
export default component;
```

> end of code
