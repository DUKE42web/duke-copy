# SvgLoader

## Overview

SvgLoader is a component that will render an inlined svg element. By using an inlined svg you are able to change the color, size and other properties easily. By comparison, importing the svg directly and using it within an image would lose this ability.

## Usage

To use the SvgLoader you would simply use it like this:

```typescript
<SvgLoader name="Arrow" />
```

It requires only one prop, name. This is a string that represents the svg component. The other props are:

- animate: this will add a transform timing and easing to the style
- className: class that you would like to inject
- color: the tailwind color that you would like the svg to be
- rotate: a number that will rotate the svg in degrees
- size: the width and height
- style: css style object of any other properties you wish to pass in

```typescript
<SvgLoader
  animate={true}
  className="some class"
  color="white"
  name="Arrow"
  rotate={90}
  size={32}
  style={{ margin: "auto" }}
/>
```

## How It Works

All of our svgs reside in the `src/assets/svgs` folder. In order to easily import them and use them as React components we first need to convert them from raw svgs into components. This process will (thankfully) happen automatically before the bootstrap script runs. So all we need to worry about is placing any new svgs into the `src/assets/svgs` folder.

The `@svgr/cli` runner will look into the svgs folder and convert all of them to React components and save them to the `src/components/Svgs` folder. Doing it this way eliminates the nightmare of webpack, configs and wrangling all of that mess.

The first thing the component will look for is if the name prop is falsy. If it is, SvgLoader will just return null

```typescript
if (!name) return null;
```

After that we will use React's lazy import to be able to import with a dynamic name like this:

```typescript
const SvgComponent = React.lazy(() => import(`src/components/Svgs/${name}`));
```

In order to use this lazy loaded component we need to wrap it in a `<Suspense>` . This wrapper serves as something to render while its loading the component. This also gives us the built-in benefit as to no longer needing a mock for this component in all of our tests as the fallback will be a blank svg with the props passed in.

```typescript
<Suspense fallback={<svg {...props}></svg>}>
  <SvgComponent {...{ "data-testid": "svg", ...props }} />
</Suspense>
```

So while its loading the actual svg, this placeholder svg will be displayed that has all of the properties such as width, height, color, etc... The only real difference is that the `<SvgComponent>` gets one extra prop. The is a dataSet prop called `testid` with the value `svg` . This makes it easier to search for in the tests

## Testing

If your component uses the SvgLoader then you are good to go. You no longer need a mock as the `<Suspense>` will return a svg with the same properties that you are expecting.

For the tests on the SvgLoader we need to account for the React lazy loading and `@testing-library/react` makes this pretty simple.

First we do the imports:

```typescript
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SvgLoader from "./index";
```

and then the test..

```typescript
it("should change the text color class if given a color prop", async () => {
  render(<SvgLoader color="gray" name="Arrow" />);
  const mounted = await waitFor(() => expect(screen.getByTestId("svg")));
  mounted &&
    expect(screen.getByTestId("svg")).toHaveAttribute("class", "text-gray");
});
```

How this works is that we first render the component, then we wait for the `data-testid` with the value `svg` to be in the DOM, then once that mounts we can do the assertions as to what the results are. This is why it was key to pass that `data-testid` prop to the imported svg and not the `<Suspense>` fallback svg. This way the test will ignore the fallback until the real svg has mounted.

## Adding A New Svg

To add a new svg all you need to do is to add the svg to the `src/assets/svgs` folder. Make sure that the fill inside the svg is set to `currentColor` so we will be able to change the color of the svg once we start using it. Next you'll want to run the following command in your terminal: `npm run start:svgs` . This will start the automatic conversion from the raw svg to the svg component and it will then be ready for use by `<SvgLoader />`
