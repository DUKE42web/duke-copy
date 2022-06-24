# Tailwind CSS

Tailwind CSS is a utility-based styling library. In order to streamline and standardize things like colors and spacing within our application, an Electron theme has been created to extend Tailwind's functionality, thus making it easy for us to access some standard Duke colors, fonts, etc. As a result, you will get most of the magic of Tailwind, but with most of the colors, text, and sizing options overwritten to reflect Duke's design system.

We won't talk too much about the decisions behind why we are using this implementation here, but Chris Greufe has already done an incredible job documenting the ins-and-outs of it [here](https://electron.duke-energy.com/foundation/utilities/utility-first). If you want to know more of the granular aspects and philosophy to our approach, you are encouraged to give it a read.

Instead, this doc will mostly focus on how the dev team actually uses this implementation and a bit about our approach, as well as a proposed style guide.

## Philosophy and Approach

Tailwind CSS is our primary way of styling within the DXT-JSS-Public React App. A lot of effort and resources have been put into making Tailwind and Electron do as much of the heavy lifting for us as possible, so for maintainability's sake, every effort should be made to find a solution to style your work with Tailwind. If you're hitting a wall trying to figure out an approach that works within Tailwind, don't hesitate to reach out to a teammate. If you find yourself in the rare situation where you encounter something that simply cannot be resolved using Tailwind, we use [Styled Components](https://styled-components.com/) as our fallback. If you find that you are creating a styled component often to deal with an edge case, it's probably worth documenting [here](https://confluence.duke-energy.com/display/DEPW/Tailwind+requests).

## Tooling

There's not a lot of tooling required for Tailwind but [the Tailwind CSS Intellisense VSCode plugin](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) can be pretty helpful. Once installed, it gives suggestions for Tailwind classes as well as Electron-specific ones. It also shows a preview of the CSS rules that the utility class utilizes.

## Enabling Tailwind Properties

Although Tailwind provides the flexibility to apply a wide range of modifiers (called `variants` in Tailwind) to a variety of CSS rules, you may occasionally find that a Tailwind class is not behaving the way you expect in a responsive context, or upon hover. This may mean that you will need to edit the Tailwind config. [You can find more info about that here.](https://tailwindcss.com/docs/configuring-variants) Please be careful to [extend the values](https://v1.tailwindcss.com/docs/configuring-variants), rather than simply adding them to the variant object, which will overwrite all the defaults.

## Key Differences

The main difference you'll find between Tailwind's approach and Electron's is that Duke doesn't need an extensive color library. As a result, you'll find that something like text-blue-800 or bg-yellow-200 does not behave as you'd expect. Most likely you will be looking for something like text-blue-dark or bg-yellow. So the color palette will be limited, and rather than a number to modify the color, there will either be no modifier, or a modifier of -light, -lighter, -dark, or -darker.

## Style Guide

Because almost all of our styles exist within utility classes, there is often no need for traditional CSS classes to style a block. It's fairly unusual to need to add a class like wrapper or large BEM classes. Occasionally, you may need to add a class to make it easier for unit tests to search for a selector. In such a case, we suggest that you use a js- prefix, and that you place it at the beginning of your utility classes.

example:

```jsx
<div className="js-form text-blue-dark..." />
```

Often, the amount of classes you need to style a complex element can be rather long. In this case, it is suggested that you group your classes conceptually. Since Tailwind is a mobile-first framework, it makes sense to start with "base" styles that will be present across all sizes of the component, immediately followed by the responsive counterparts, in ascending order (`md`, `lg`, `xl`, etc).

Of the base styles, start with sizing (height, width, padding, margin) and other fiddly rules so that they are easily accessible to you and anyone who may need to maintain your code in the future. Utility classes that represent rules that are easily identifiable at a glance, such as text color or background color, should come secondary.

That was a lot of words, so let's look at an example.

:no_entry_sign: Bad

```jsx
<div className="text-blue transition-all md:px-32 mt-12 flex bg-black w-20 duration-500 md:block px-24 lg:w-16 lg:px-48" />
```

:white_check_mark: Good

```jsx
<div className="w-20 lg:w-16 mt-12 px-24 md:px-32 lg:px-48 flex md:block text-blue bg-black transition-all duration-500 />
```

That may seem a lot to unpack, so let's examine that for a second. Note that the classes start with the width property and then are immediately followed by the responsive variant. This pattern follows as we move through the margin and into the padding, which is then followed by the display types, and onto more obvious styles like font and background colors, which don't require a check of the code in order to verify the values. Finally, the rules end with the transition and duration properties, which are often "set and forget" rules.

## Resources

- [Styled Components](https://styled-components.com/) - documentation in case you need to step outside the Tailwind garden
- [Tailwind Requests](https://confluence.duke-energy.com/display/DEPW/Tailwind+requests) - add to the Tailwind/Electron wishlist!
- [Electron Docs](https://electron.duke-energy.com/foundation/utilities/utility-first)
- [Tailwind VSCode Intellisense Plugin](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Nerdcave CheatSheet](https://nerdcave.com/tailwind-cheat-sheet) - some random guy made a really handy cheatsheet for Tailwind CSS. Obviously, our rules won't be on it, but it's a nice quick reference for a lot of the classes.
- [Tailwind CSS Docs](https://tailwindcss.com/docs) - their official docs are better than most
- [Configuring Variants](https://v1.tailwindcss.com/docs/configuring-variants) - case in point

[React](./React.md) | [Typescript](./Typescript.md) | [Tailwind](./Tailwind.md) | [Forms](./Forms.md) | [Unit Tests](./UnitTests.md)
