# 🌬 Tailwind CSS

<details>

<summary>Flex-shrink</summary>

#### flex-shrink - CSS: Cascading Style Sheets | MDN

**Excerpt**

The flex-shrink CSS property sets the flex shrink factor of a flex item. If the size of all flex items is larger than the flex container, items shrink to fit according to flex-shrink.

---

The **`flex-shrink`** [CSS](https:
//developer.mozilla.org/en-US/docs/Web/CSS) property sets the flex shrink factor of a flex item. If the size of all flex items is larger than the flex container, items shrink to fit according to `flex-shrink`.

In use, `flex-shrink` is used alongside the other flex properties [`flex-grow`](https:
//developer.mozilla.org/en-US/docs/Web/CSS/flex-grow) and [`flex-basis`](https:
//developer.mozilla.org/en-US/docs/Web/CSS/flex-basis), and normally defined using the [`flex`](https:
//developer.mozilla.org/en-US/docs/Web/CSS/flex) shorthand.

[**Syntax**](https:
//developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink#syntax)

```
/* <number> values */
flex-shrink: 2;
flex-shrink: 0.6;

/* Global values */
flex-shrink: inherit;
flex-shrink: initial;
flex-shrink: revert;
flex-shrink: unset;
```

The `flex-shrink` property is specified as a single `<number>`.

[**Values**](https:
//developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink#values)

`<number>`

See [`<number>`](https:
//developer.mozilla.org/en-US/docs/Web/CSS/number). Negative values are invalid. Defaults to 1.

[**Formal definition**](https:
//developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink#formal_definition)

[**Formal syntax**](https:
//developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink#formal_syntax)

[**Examples**](https:
//developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink#examples)

[**Setting flex item shrink factor**](https:
//developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink#setting_flex_item_shrink_factor)

**HTML**

```
<p>The width of content is 500px; the flex-basis of the flex items is 120px.</p>
<p>A, B, C have flex-shrink:1 set. D and E have flex-shrink:2 set</p>
<p>The width of D and E is less than the others.</p>
<div id="content">
  <div class="box" style="background-color:red;">A</div>
  <div class="box" style="background-color:lightblue;">B</div>
  <div class="box" style="background-color:yellow;">C</div>
  <div class="box1" style="background-color:brown;">D</div>
  <div class="box1" style="background-color:lightgreen;">E</div>
</div>
```

**CSS**

```
#content {
  display: flex;
  width: 500px;
}

#content div {
  flex-basis: 120px;
  border: 3px solid rgba(0,0,0,.2);
}

.box {
  flex-shrink: 1;
}

.box1 {
  flex-shrink: 2;
}
```

**Result**

[**Specifications**](https:
//developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink#specifications)

[**Browser compatibility**](https:
//developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink#browser_compatibility)

[Report problems with this compatibility data on GitHub](https:
//github.com/mdn/browser-compat-data/issues/new?body=%3C%21--+Tips%3A+where+applicable%2C+specify+browser+name%2C+browser+version%2C+and+mobile+operating+system+version+--%3E%0A%0A%23%23%23%23+What+information+was+incorrect%2C+unhelpful%2C+or+incomplete%3F%0A%0A%23%23%23%23+What+did+you+expect+to+see%3F%0A%0A%23%23%23%23+Did+you+test+this%3F+If+so%2C+how%3F%0A%0A%0A%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60css.properties.flex-shrink%60%0A*+MDN+URL%3A+https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Fflex-shrink%0A\*+Report+started%3A+2022-02-21T17%3A35%3A58.014Z%0A%0A%3C%2Fdetails%3E&title=css.properties.flex-shrink+-+%3CPUT+TITLE+HERE%3E)

\| ChromeFull support29 | EdgeFull support12 | FirefoxFull support20

footnote

\| Internet ExplorerFull support10

footnote

\| OperaFull support12.1 | SafariFull support9 | WebView AndroidFull support4.4 | Chrome AndroidFull support29 | Firefox for AndroidFull support20

footnote

\| Opera AndroidFull support12.1 | Safari on iOSFull support9 | Samsung InternetFull support2.0 |

**Legend**

Full support

Full support

See implementation notes.

Requires a vendor prefix or different name for use.

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out [https:
//github.com/mdn/browser-compat-data](https:
//github.com/mdn/browser-compat-data) and send us a pull request.

[**See also**](https:
//developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink#see_also)

- CSS Flexbox Guide: [_Basic Concepts of Flexbox_](https:
  //developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)
- CSS Flexbox Guide: [_Controlling Ratios of flex items along the main axis_](https:
  //developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Controlling_Ratios_of_Flex_Items_Along_the_Main_Ax)

</details>

Tailwind CSS is a utility-based styling library. In order to streamline and standardize things like colors and spacing within our application, an Electron theme has been created to extend Tailwind's functionality, thus making it easy for us to access some standard Duke colors, fonts, etc. As a result, you will get most of the magic of Tailwind, but with most of the colors, text, and sizing options overwritten to reflect Duke's design system.

We won't talk too much about the decisions behind why we are using this implementation here, but Chris Greufe has already done an incredible job documenting the ins-and-outs of it [here](https:
//electron.duke-energy.com/foundation/utilities/utility-first). If you want to know more of the granular aspects and philosophy to our approach, you are encouraged to give it a read.

Instead, this doc will mostly focus on how the dev team actually uses this implementation and a bit about our approach, as well as a proposed style guide.

## Philosophy and Approach

Tailwind CSS is our primary way of styling within the DXT-JSS-Public React App. A lot of effort and resources have been put into making Tailwind and Electron do as much of the heavy lifting for us as possible, so for maintainability's sake, every effort should be made to find a solution to style your work with Tailwind. If you're hitting a wall trying to figure out an approach that works within Tailwind, don't hesitate to reach out to a teammate. If you find yourself in the rare situation where you encounter something that simply cannot be resolved using Tailwind, we use [Styled Components](https:
//styled-components.com) as our fallback. If you find that you are creating a styled component often to deal with an edge case, it's probably worth documenting [here](https:
//confluence.duke-energy.com/display/DEPW/Tailwind+requests).

## Tooling

There's not a lot of tooling required for Tailwind but [the Tailwind CSS Intellisense VSCode plugin](https:
//marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) can be pretty helpful. Once installed, it gives suggestions for Tailwind classes as well as Electron-specific ones. It also shows a preview of the CSS rules that the utility class utilizes.

## Enabling Tailwind Properties

Although Tailwind provides the flexibility to apply a wide range of modifiers (called `variants` in Tailwind) to a variety of CSS rules, you may occasionally find that a Tailwind class is not behaving the way you expect in a responsive context, or upon hover. This may mean that you will need to edit the Tailwind config. [You can find more info about that here.](https:
//tailwindcss.com/docs/configuring-variants) Please be careful to [extend the values](https:
//v1.tailwindcss.com/docs/configuring-variants), rather than simply adding them to the variant object, which will overwrite all the defaults.

## Key Differences

The main difference you'll find between Tailwind's approach and Electron's is that Duke doesn't need an extensive color library. As a result, you'll find that something like text-blue-800 or bg-yellow-200 does not behave as you'd expect. Most likely you will be looking for something like text-blue-dark or bg-yellow. So the color palette will be limited, and rather than a number to modify the color, there will either be no modifier, or a modifier of -light, -lighter, -dark, or -darker.

## Style Guide

Because almost all of our styles exist within utility classes, there is often no need for traditional CSS classes to style a block. It's fairly unusual to need to add a class like wrapper or large BEM classes. Occasionally, you may need to add a class to make it easier for unit tests to search for a selector. In such a case, we suggest that you use a js- prefix, and that you place it at the beginning of your utility classes.

example:

```jsx
<div className="js-form text-blue-dark..." />
```

Often, the amount of classes you need to style a complex element can be rather long. In this case, it is suggested that you group your classes conceptually. Since Tailwind is a mobile-first framework, it makes sense to start with "base" styles that will be present across all sizes of the component, immediately followed by the responsive counterparts, in ascending order ( `md` , `lg` , `xl` , etc).

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

- [Styled Components](https:
  //styled-components.com) - documentation in case you need to step outside the Tailwind garden
- [Tailwind Requests](https:
  //confluence.duke-energy.com/display/DEPW/Tailwind+requests) - add to the Tailwind/Electron wishlist!
- [Electron Docs](https:
  //electron.duke-energy.com/foundation/utilities/utility-first)
- [Tailwind VSCode Intellisense Plugin](https:
  //marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Nerdcave CheatSheet](https:
  //nerdcave.com/tailwind-cheat-sheet) - some random guy made a really handy cheatsheet for Tailwind CSS. Obviously, our rules won't be on it, but it's a nice quick reference for a lot of the classes.
- [Tailwind CSS Docs](https:
  //tailwindcss.com/docs) - their official docs are better than most
- [Configuring Variants](https:
  //v1.tailwindcss.com/docs/configuring-variants) - case in point

React | Typescript | Tailwind | Forms | Unit Tests
