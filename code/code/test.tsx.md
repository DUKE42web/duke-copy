# Test.tsx

#### Code:

```typescript
/*
This is a full-width component.
It includes a visual, a title, a description, a CTA button and a background.
A title is required
Text that exceeds the available content space will be truncated.
The visual is required. An icon or image may be used as the supporting visual.
The height for the banner should be determined by the height of the content plus the top and bottom spacing. Therefore, banners including icons and images will vary in height.
On desktop, the max height of the banner with an icon is 140px. The max height of the banner with an image is 170px on desktop.
On mobile, the max height of the banner with an icon is 296px. The max height of the banner with an image is 324px on mobile.
The description and CTA button are optional.
The content area should be centered horizontally when when the CTA is not displayed.
There are predefined background options.
Explanation for the correlating marker
*/

import { render, screen } from "@testing-library/react";
import { renderWithContext } from "src/lib/testWrappers";
import NewsBanner from "./index";
import { compositionFunction } from "./composition";
import { Data } from "./data";
import "@testing-library/jest-dom";
jest.mock("src/lib/useIntersection");

const props = compositionFunction(Data);

//## Describe: Newsbar Component

// #### it:

// #### it:      should render a cta button if the data CTA URL filed exists else: do not render cta

// #### it:      should render the body text if the field exists in the data file. else: do not render text

//------------------------------
describe("News Banner", () => {
  const props = compositionFunction(Data);

  it("should render NewsBanner component with Title & Image", () => {
    //look up memory router...
    renderWithContext(<NewsBanner {...props} />);
    screen.logTestingPlaygroundURL();
    // to launch browser based playground... needs to gafter a render has been called.

    const title = screen.getByRole("heading", {
      name: /here to help during this difficult time\./i,
    });

    const img = screen.getByRole("img", {
      name: /image alt text/i,
    });
    expect(title).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  });
  it("renders body text if the data exists on the object", () => {
    const { rerender } = renderWithContext(<NewsBanner {...props} />);

    const body = screen.getByText(
      /customers who need additional time to pay any outstanding balance may qualify for financial assistance\. learn how we are taking action to help in response to covid\-19\./i
    );
    expect(body).toBeInTheDocument();
    rerender(<NewsBanner {...props} body={undefined} />);

    //querry by text will not throw an error if it does not find the element it is looking for.

    const noBodyText = screen.queryByText(
      /customers who need additional time to pay any outstanding balance may qualify for financial assistance\. learn how we are taking action to help in response to covid\-19\./i
    );
    expect(noBodyText).not.toBeInTheDocument();
  });

  it("renders a cta button if the data is present on the object, and does not render a button otherwise.", () => {
    const { rerender } = renderWithContext(<NewsBanner {...props} />);
    //in each it block scope

    const ctaButton = screen.getByRole("link", {
      name: /view resources/i,
    });

    expect(ctaButton).toBeInTheDocument();
    rerender(<NewsBanner {...props} cta={undefined} />);

    const noCTAButton = screen.queryByRole("link", {
      name: /view resources/i,
    });
    expect(noCTAButton).not.toBeInTheDocument();
  });
});
```

> end of code
