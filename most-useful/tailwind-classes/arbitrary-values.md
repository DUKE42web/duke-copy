# Arbitrary Values

## Adding Custom Styles - Tailwind CSS

> #### Excerpt
>
> Best practices for adding your own custom styles to Tailwind.

---

Often the biggest challenge when working with a framework is figuring out what you’re supposed to do when there’s something you need that the framework doesn’t handle for you.

Tailwind has been designed from the ground up to be extensible and customizable, so that no matter what you’re building you never feel like you’re fighting the framework.

This guide covers topics like customizing your design tokens, how to break out of those constraints when necessary, adding your own custom CSS, and extending the framework with plugins.

### Customizing your theme

If you want to change things like your color palette, spacing scale, typography scale, or breakpoints, add your customizations to the `theme` section of your `tailwind.config.js` file:

Learn more about customizing your theme in the [Theme Configuration](https://tailwindcss.com/docs/theme) documentation.

---

### Using arbitrary values

While you can usually build the bulk of a well-crafted design using a constrained set of design tokens, once in a while you need to break out of those constraints to get things pixel-perfect.

When you find yourself really needing something like `top: 117px` to get a background image in just the right spot, use Tailwind’s square bracket notation to generate a class on the fly with any arbitrary value:

```
<div class="top-[117px]">
  <!-- ... -->
</div>
```

This is basically like inline styles, with the major benefit that you can combine it with interactive modifiers like `hover` and responsive modifiers like `lg`:

```
<div class="top-[117px] lg:top-[344px]">
  <!-- ... -->
</div>
```

This works for everything in the framework, including things like background colors, font sizes, pseudo-element content, and more:

```
<div class="bg-[#bada55] text-[22px] before:content-['Festivus']">
  <!-- ... -->
</div>
```

#### Arbitrary properties

If you ever need to use a CSS property that Tailwind doesn’t include a utility for out of the box, you can also use square bracket notation to write completely arbitrary CSS:

```
<div class="[mask-type:luminance]">
  <!-- ... -->
</div>
```

This is _really_ like inline styles, but again with the benefit that you can use modifiers:

```
<div class="[mask-type:luminance] hover:[mask-type:alpha]">
  <!-- ... -->
</div>
```

This can be useful for things like CSS variables as well, especially when they need to change under different conditions:

```
<div class="[--scroll-offset:56px] lg:[--scroll-offset:44px]">
  <!-- ... -->
</div>
```

#### Handling whitespace

When an arbitrary value needs to contain a space, use an underscore (`_`) instead and Tailwind will automatically convert it to a space at build-time:

```
<div class="grid grid-cols-[1fr_500px_2fr]">
  <!-- ... -->
</div>
```

In situations where underscores are common but spaces are invalid, Tailwind will preserve the underscore instead of converting it to a space, for example in URLs:

```
<div class="bg-[url('/what_a_rush.png')]">
  <!-- ... -->
</div>
```

In the rare case that you actually need to use an underscore but it’s ambiguous because a space is valid as well, escape the underscore with a backslash and Tailwind won’t convert it to a space:

```
<div class="before:content-['hello\_world']">
  <!-- ... -->
</div>
```

#### Resolving ambiguities

Many utilities in Tailwind share a common namespace but map to different CSS properties. For example `text-lg` and `text-black` both share the `text-` namespace, but one is for `font-size` and the other is for `color`.

When using arbitrary values, Tailwind can generally handle this ambiguity automatically based on the value you pass in:

```
<!-- Will generate a font-size utility -->
<div class="text-[22px]">...</div>

<!-- Will generate a color utility -->
<div class="text-[#bada55]">...</div>
```

Sometimes it really is ambiguous though, for example when using CSS variables:

```
<div class="text-[var(--my-var)]">...</div>
```

In these situations, you can “hint” the underlying type to Tailwind by adding a [CSS data type](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Types) before the value:

```
<!-- Will generate a font-size utility -->
<div class="text-[length:var(--my-var)]">...</div>

<!-- Will generate a color utility -->
<div class="text-[color:var(--my-var)]">...</div>
```

---

### Using CSS and @layer

When you need to add truly custom CSS rules to a Tailwind project, the easiest approach is to just add the custom CSS to your stylesheet:

For more power, you can also use the `@layer` directive to add styles to Tailwind’s `base`, `components`, and `utilities` layers:

Why does Tailwind group styles into "layers"?

In CSS, the order of the rules in your stylesheet decides which declaration wins when two selectors have the same specificity:

```
.btn {
  background: blue;
  /* ... */
}

.bg-black {
  background: black;
}
```

Here, both buttons will be black since `.bg-black` comes after `.btn` in the CSS:

```
<button class="btn bg-black">...</button>
<button class="bg-black btn">...</button>
```

To manage this, Tailwind organizes the styles it generates into three different “layers” — a concept popularized by [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/#what-is-itcss).

- The `base` layer is for things like reset rules or default styles applied to plain HTML elements.
- The `components` layer is for class-based styles that you want to be able to override with utilities.
- The `utilities` layer is for small, single-purpose classes that should always take precedence over any other styles.

Being explicit about this makes it easier to understand how your styles will interact with each other, and using the `@layer` directive lets you control the final declaration order while still organizing your actual code in whatever way you like.

The `@layer` directive helps you control declaration order by automatically relocating your styles to the corresponding `@tailwind` directive, and also enables features like [modifiers](https://tailwindcss.com/docs/adding-custom-styles#using-modifiers-with-custom-css) and [tree-shaking](https://tailwindcss.com/docs/adding-custom-styles#removing-unused-custom-css) for your own custom CSS.

#### Adding base styles

If you just want to set some defaults for the page (like the text color, background color, or font family), the easiest option is just adding some classes to the `html` or `body` elements:

```
<!doctype html>
<html lang="en" class="text-gray-900 bg-gray-100 font-serif">
  <!-- ... -->
</html>
```

This keeps your base styling decisions in your markup alongside all of your other styles, instead of hiding them in a separate file.

If you want to add your own default base styles for specific HTML elements, use the `@layer` directive to add those styles to Tailwind’s `base` layer:

Use the [`theme`](https://tailwindcss.com/docs/functions-and-directives#theme) function or [`@apply`](https://tailwindcss.com/docs/functions-and-directives#apply) directive when adding custom base styles if you want to refer to any of the values defined in your [theme](https://tailwindcss.com/docs/theme).

#### Adding component classes

Use the `components` layer for any more complicated classes you want to add to your project that you’d still like to be able to override with utility classes.

Traditionally these would be classes like `card`, `btn`, `badge` — that kind of thing.

By defining component classes in the `components` layer, you can still use utility classes to override them when necessary:

```
<!-- Will look like a card, but with square corners -->
<div class="card rounded-none">
  <!-- ... -->
</div>
```

Using Tailwind you probably don’t need these types of classes as often as you think. Read our guide on [Reusing Styles](https://tailwindcss.com/docs/reusing-styles) for our recommendations.

The `components` layer is also a good place to put custom styles for any third-party components you’re using:

Use the [`theme`](https://tailwindcss.com/docs/functions-and-directives#theme) function or [`@apply`](https://tailwindcss.com/docs/functions-and-directives#apply) directive when adding custom component styles if you want to refer to any of the values defined in your [theme](https://tailwindcss.com/docs/theme).

#### Adding custom utilities

Add any of your own custom utility classes to Tailwind’s `utilities` layer:

This can be useful when there’s a CSS feature you’d like to use in your project that Tailwind doesn’t include utilities for out of the box.

#### Using modifiers with custom CSS

Any custom styles you add to Tailwind with `@layer` will automatically support Tailwind’s modifier syntax for handling things like hover states, responsive breakpoints, dark mode, and more.

Learn more about how these modifiers work in the [Hover, Focus, and Other States](https://tailwindcss.com/docs/hover-focus-and-other-states) documentation.

#### Removing unused custom CSS

Any custom styles you add to the `base`, `components`, or `utilities` layers will only be included in your compiled CSS if those styles are actually used in your HTML.

If you want to add some custom CSS that should always be included, add it to your stylesheet without using the `@layer` directive:

Make sure to put your custom styles where they need to go to get the precedence behavior you want. In the example above, we’ve added the `.card` class before `@tailwind utilities` to make sure utilities can still override it.

#### Using multiple CSS files

If you are writing a lot of CSS and organizing it into multiple files, make sure those files are combined into a single stylesheet before processing them with Tailwind, or you’ll see errors about using `@layer` without the corresponding `@tailwind` directive.

The easiest way to do this is using the [postcss-import](https://github.com/postcss/postcss-import) plugin:

Learn more in our [build-time imports](https://tailwindcss.com/docs/using-with-preprocessors#build-time-imports) documentation.

#### Layers and per-component CSS

Component frameworks like Vue and Svelte support adding per-component styles within a `<style>` block that lives in each component file.

While you can use features like `@apply` and `theme` inside component styles like this, the `@layer` directive will not work and you’ll see an error about `@layer` being used without a matching `@tailwind` directive:

Don't use \`@layer\` in component styles

This is because under-the-hood, frameworks like Vue and Svelte are processing every single `<style>` block independently, and running your PostCSS plugin chain against each one in isolation.

That means if you have 10 components that each have a `<style>` block, Tailwind is being run 10 separate times, and each run has zero knowledge about the other runs. Because of this, Tailwind can’t take the styles you define in a `@layer` and move them to the corresponding `@tailwind` directive, because as far as Tailwind can tell there is no `@tailwind` directive to move it to.

One solution to this is to simply _not_ use `@layer` inside your component styles:

Add your styles without using \`@layer\`

You lose the ability to control the precedence of your styles, but unfortunately that’s totally out of our control because of how these tools work.

Our recommendation is that you just don’t use component styles like this at all and instead use Tailwind the way it’s intended to be used — as a single global stylesheet where you use the classes directly in your HTML:

Use Tailwind's utilities instead of component styles

---

### Writing plugins

You can also add custom styles to your project using Tailwind’s plugin system instead of using a CSS file:

Learn more about writing your own plugins in the [Plugins](https://tailwindcss.com/docs/plugins) documentation.
