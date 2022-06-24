---
description: >-
  Focus is an important component of web accessibility. Knowing more about focus
  allows us to build websites with greater control and customization for all
  users to navigate.
---

# Focus

> Focus is an important component of web accessibility. Knowing more about focus allows us to build websites with greater control and customization for all users to navigate.

## What is Focus? <a href="#4948" id="4948"></a>

When you click into a text field just before typing, and you see a soft blue glow outlining the text box, this is the act of _focusing_. You are telling the website, "Hey text input box, I'm talking to you!".\
\
**Focus** is defined as the control on the computer screen that receives input from the keyboard (typing) and clipboard (when you paste text). When you focus an element, you'll often see special styling outlining the text field box, called the focus ring.

## Why is Focus Important? <a href="#a809" id="a809"></a>

Some users use the keyboard primarily, and do not or can not use the mouse to interact with the computer (e.g., someone with physical motor coordination and control challenges). For this reason, providing options to interact through the keyboard controls alone becomes very important, not only for these users specifically but often for all users. After all, how many of us use keyboard shortcuts for improved efficiency?

## How To Modify Focus <a href="#e74c" id="e74c"></a>

Instead of using only your mouse to click into another text field, you may be familiar with the shortcut of pressing the Tab key to navigate to the next control. Similarly, using Shift + Tab allows you to move through these controls in reverse-order. On a Mac OS X, Chrome allows you to navigate this way but browsers like Safari require you to use Option + Tab to change focus. You can actually customize this in System Preferences → Keyboard → Shortcuts and select ‘All controls' for full keyboard access.

### Tab Order <a href="#356b" id="356b"></a>

You can Tab your way forward and backward through HTML elements on a page, but what determines the order of these elements? How is one element decidedly forward or backward relative to another? Tab-order! Tab order, quite simply, is based on the elements position in the DOM. For example, let's say you have three paragraphs in your HTML like this:

```
<p>I come first!<p><p>I will come second!<p><p>I will come third!<p>
```

Start with your focus on the first paragraph, ("I will come first!"). If you hit Tab you will then focus on the second element ("I will come second!"), and so forth. But there are exceptions to the rule. CSS choices can override the DOM order. For example if you keep the DOM order the same as above, but you change your alignment or floating style of one paragraph, you can actually end up changing the physical position of the element visually, while not changing the DOM order. This will result in confusion for the user and is not recommended.

### Tab Index <a href="#29b7" id="29b7"></a>

However, there are times when you want to modify the naturally-created tab order, such as "turning on" the focus-feature of elements when they become visible, such as in a modal window or scrolling view. This can be done using the tabindex property. We won't go in-depth on tabindex in this article, but you can dive into that topic [over here](https://bitsofco.de/how-and-when-to-use-the-tabindex-attribute/).

## Do I need to make all elements focusable? <a href="#3068" id="3068"></a>

No! If an element doesn't require interaction with the user or require user input, you typically don't need to make it focusable.

## So what elements do I need to make focusable? <a href="#b756" id="b756"></a>

Think **interactive**. Is this something the user will need to interact with? Buttons, tabs, text input fields (form field, search field), links, menu-dropdowns, etc. So what about a main title at the top of a page, like the title of this article? Actually, probably not. Unless you're building an animated header and you want the user to be able to click on the main header for an animated response, you probably won't need to make the header of the page focusable.

This was only an introduction to learning to use and manage focus when building your websites. Hopefully this helped to answer some of your questions while sparking further curiosity about focus in the web accessibility space!

_Resources_\
[_https://www.w3.org/TR/css-grid-1/#order-accessibility_](https://www.w3.org/TR/css-grid-1/#order-accessibility)

[_https://bitsofco.de/how-and-when-to-use-the-tabindex-attribute/_](https://bitsofco.de/how-and-when-to-use-the-tabindex-attribute/)

[_https://developers.google.com/web/fundamentals/accessibility/focus_](https://developers.google.com/web/fundamentals/accessibility/focus)
