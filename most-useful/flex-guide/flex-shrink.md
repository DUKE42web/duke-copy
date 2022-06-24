# Flex-Shrink

## flex-shrink - CSS: Cascading Style Sheets | MDN

> #### Excerpt
>
> The flex-shrink CSS property sets the flex shrink factor of a flex item. If the size of all flex items is larger than the flex container, items shrink to fit according to flex-shrink.

---

The **`flex-shrink`** [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) property sets the flex shrink factor of a flex item. If the size of all flex items is larger than the flex container, items shrink to fit according to `flex-shrink`.

In use, `flex-shrink` is used alongside the other flex properties [`flex-grow`](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow) and [`flex-basis`](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis), and normally defined using the [`flex`](https://developer.mozilla.org/en-US/docs/Web/CSS/flex) shorthand.

### [Syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink#syntax)

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

#### [Values](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink#values)

`<number>`

See [`<number>`](https://developer.mozilla.org/en-US/docs/Web/CSS/number). Negative values are invalid. Defaults to 1.

### [Formal definition](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink#formal_definition)

### [Formal syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink#formal_syntax)

### [Examples](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink#examples)

#### [Setting flex item shrink factor](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink#setting_flex_item_shrink_factor)

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

### [Specifications](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink#specifications)

| Specification                                                                        |
| ------------------------------------------------------------------------------------ |
| \[CSS Flexible Box Layout Module Level 1                                             |
| # flex-shrink-property]\(https://drafts.csswg.org/css-flexbox/#flex-shrink-property) |

### [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink#browser_compatibility)

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?body=%3C%21--+Tips%3A+where+applicable%2C+specify+browser+name%2C+browser+version%2C+and+mobile+operating+system+version+--%3E%0A%0A%23%23%23%23+What+information+was+incorrect%2C+unhelpful%2C+or+incomplete%3F%0A%0A%23%23%23%23+What+did+you+expect+to+see%3F%0A%0A%23%23%23%23+Did+you+test+this%3F+If+so%2C+how%3F%0A%0A%0A%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60css.properties.flex-shrink%60%0A*+MDN+URL%3A+https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Fflex-shrink%0A*+Report+started%3A+2022-03-14T16%3A39%3A43.855Z%0A%0A%3C%2Fdetails%3E&title=css.properties.flex-shrink+-+%3CPUT+TITLE+HERE%3E)

#### Legend

Full support

Full support

See implementation notes.

Requires a vendor prefix or different name for use.

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out [https://github.com/mdn/browser-compat-data](https://github.com/mdn/browser-compat-data) and send us a pull request.

### [See also](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink#see_also)

- CSS Flexbox Guide: [_Basic Concepts of Flexbox_](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)
- CSS Flexbox Guide: [_Controlling Ratios of flex items along the main axis_](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Controlling_Ratios_of_Flex_Items_Along_the_Main_Ax)
