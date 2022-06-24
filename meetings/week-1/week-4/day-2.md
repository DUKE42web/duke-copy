# Day 2

{% embed url="https:
//react-spectrum.adobe.com/react-aria" %}

---

**Description**

Notes:

Invalid form controls are visually indicated as invalid, but this state is not communicated programmatically. Assistive technology users may have difficulty determining which controls are invalid.

**Recommendation**

Set `aria-invalid="true"` on form fields that contain invalid data. This will ensure that the field is exposed to assistive technologies as an invalid field, and screen readers will announce this, for example, by announcing "invalid entry" as part of the field description. Once the field is valid, remove the `aria-invalid` attribute or set it to `false`.

Setting aria-invalid

`<label for="address">Address</label>`\
`<input id="address" type="text" aria-invalid="true">`

When an inline error message communicates specific information (e.g., beyond the fact that the field was left blank), use `aria-describedby` to associate the error message with the form field. Once the field is valid, remove the error message.

Setting `aria-describedby` to point to an error message

Email \<input id="email" type="email" aria-invalid="true" aria-describedby="email_error"> \<p id="email_error">Please enter a valid email address in the format name@example.com

\[11:25 AM] Guest, James

[https:
//accessible360.com/accessible360-blog/use-aria-label-screen-reader-text/](https:
//accessible360.com/accessible360-blog/use-aria-label-screen-reader-text/)

Should I use an aria-label or screen-reader only text?

Every now and then a developer needs to include special content that should be seen by screen reader users, but not by anyone else. But what is the best way to convey this information? In some case...

\

\[11:28 AM]

11:28 AM Meeting ended: 1h 1m 17s

\

\[11:29 AM] Greufe, Chris

Guest, James [https:
//v2.tailwindcss.com/docs/screen-readers#class-reference](https:
//v2.tailwindcss.com/docs/screen-readers#class-reference)

Screen Readers - Tailwind CSS

Utilities for improving accessibility with screen readers.

\

\[11:30 AM] Greufe, Chris

It has all the goodies in the `sr-only` class, minus the prefix stuff from the article you posted. The prefixes are not needed in 2022 ... thank goodness.

\

![](<../../../.gitbook/assets/image (1).png>)

![](../../../.gitbook/assets/E15F807D-C137-45F5-8C32-FCC94B77A110.png)

Checkbox, Text Area, Select, RadioGroup&#x20;
