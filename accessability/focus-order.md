# Focus Order

## Understanding Success Criterion 2.4.3: Focus Order

> #### Excerpt
>
> The intent of this Success Criterion is to ensure that when users navigate sequentially through content, they encounter information in an order that is consistent with the meaning of the content and can be operated from the keyboard. This reduces confusion by letting users form a consistent mental model of the content. There may be different orders that reflect logical relationships in the content. For example, moving through components in a table one row at a time or one column at a time both reflect the logical relationships in the content. Either order may satisfy this Success Criterion.

---

### Intent

The intent of this Success Criterion is to ensure that when users navigate sequentially through content, they encounter information in an order that is consistent with the meaning of the content and can be operated from the keyboard. This reduces confusion by letting users form a consistent mental model of the content. There may be different orders that reflect logical relationships in the content. For example, moving through components in a table one row at a time or one column at a time both reflect the logical relationships in the content. Either order may satisfy this Success Criterion.

The way that sequential navigation order is determined in Web content is defined by the technology of the content. For example, simple HTML defines sequential navigation via the notion of tabbing order. Dynamic HTML may modify the navigation sequence using scripting along with the addition of a tabindex attribute to allow focus to additional elements. If no scripting or tabindex attributes are used, the navigation order is the order that components appear in the content stream. (See HTML 4.01 Specification, section 17.11, "Giving focus to an element").

An example of keyboard navigation that is not the sequential navigation addressed by this Success Criterion is using arrow key navigation to traverse a tree component. The user can use the up and down arrow keys to move from tree node to tree node. Pressing the right arrow key may expand a node, then using the down arrow key, will move into the newly expanded nodes. This navigation sequence follows the expected sequence for a tree control - as additional items get expanded or collapsed, they are added or removed from the navigation sequence.

The focus order may not be identical to the programmatically determined reading order (see Success Criterion 1.3.2) as long as the user can still understand and operate the Web page. Since there may be several possible logical reading orders for the content, the focus order may match any of them. However, when the order of a particular presentation differs from the programmatically determined reading order, users of one of these presentations may find it difficult to understand or operate the Web page. Authors should carefully consider all these users as they design their Web pages.

For example, a screen reader user interacts with the programmatically determined reading order, while a sighted keyboard user interacts with the visual presentation of the Web page. Care should be taken so that the focus order makes sense to both of these sets of users and does not appear to either of them to jump around randomly.

For clarity:

1. Focusable components need to receive focus in an order that preserves meaning and operability only when navigation sequences affect meaning and operability.
2. In those cases where it is required, there may be more than one order that will preserve meaning and operability.
3. If there is more than one order that preserves meaning and operability, only one of them needs to be provided.

### Benefits

These techniques benefit keyboard users who navigate documents sequentially and expect the focus order to be consistent with the sequential reading order.

- People with mobility impairments who must rely on keyboard access for operating a page benefit from a logical, usable focus order.
- People with disabilities that make reading difficult can become disoriented when tabbing takes focus someplace unexpected. They benefit from a logical focus order.
- People with visual impairments can become disoriented when tabbing takes focus someplace unexpected or when they cannot easily find the content surrounding an interactive element.
- Only a small portion of the page may be visible to an individual using a screen magnifier at a high level of magnification. Such a user may interpret a field in the wrong context if the focus order is not logical.

### Examples

1. On a web page that contains a tree of interactive controls, the user can use the up and down arrow keys to move from tree node to tree node. Pressing the right arrow key expands a node, then using the down arrow key moves into the newly expanded nodes.
2. A Web page implements modeless dialogs via scripting. When the trigger button is activated, a dialog opens. The interactive elements in the dialog are inserted in the focus order immediately after the button. When the dialog is open, the focus order goes from the button to the elements of the dialog, then to the interactive element following the button. When the dialog is closed, the focus order goes from the button to the following element.
3. A Web page implements modal dialogs via scripting. When the trigger button is activated, a dialog opens and focus is set to the first interactive element in the dialog. As long as the dialog is open, focus is limited to the elements of the dialog. When the dialog is dismissed, focus returns to the button or the element following the button.
4. An HTML Web page is created with the left hand navigation occurring in the HTML after the main body content, and styled with CSS to appear on the left hand side of the page. This is done to allow focus to move to the main body content first without requiring tabIndex attributes or JavaScript.

   Note

   While this example passes the Success Criterion, it is not necessarily true that all CSS positioning would. More complex positioning examples may or may not preserve meaning and operability

5. The following example **fails to meet the Success Criterion**:

   A company's Web site includes a form that collects marketing data and allows users to subscribe to several newsletters published by the company. The section of the form for collecting marketing data includes fields such as name, street address, city, state or province, and postal code. Another section of the form includes several checkboxes so that users can indicate newsletters they want to receive. However, the tab order for the form skips between fields in different sections of the form, so that focus moves from the name field to a checkbox, then to the street address, then to another checkbox.

### Techniques

Each numbered item in this section represents a technique or combination of techniques that the WCAG Working Group deems sufficient for meeting this Success Criterion. However, it is not necessary to use these particular techniques. For information on using other techniques, see [Understanding Techniques for WCAG Success Criteria](https://www.w3.org/WAI/WCAG21/Understanding/understanding-techniques), particularly the "Other Techniques" section.

#### Sufficient Techniques

1. [G59: Placing the interactive elements in an order that follows sequences and relationships within the content](https://www.w3.org/WAI/WCAG21/Techniques/general/G59)
2. Giving focus to elements in an order that follows sequences and relationships within the content using one of the following techniques:
   - [C27: Making the DOM order match the visual order](https://www.w3.org/WAI/WCAG21/Techniques/css/C27)
   - [PDF3: Ensuring correct tab and reading order in PDF documents](https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF3)
   - [SL34: Using the Silverlight Default Tab Sequence and Altering Tab Sequences With Properties](https://www.w3.org/WAI/WCAG21/Techniques/silverlight/SL34)
3. Changing a Web page dynamically using one of the following techniques:
   - [SCR26: Inserting dynamic content into the Document Object Model immediately following its trigger element](https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/SCR26)
   - [SCR37: Creating Custom Dialogs in a Device Independent Way](https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/SCR37)
   - [SCR27: Reordering page sections using the Document Object Model](https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/SCR27)

#### Failures

The following are common mistakes that are considered failures of this Success Criterion by the WCAG Working Group.

- [F44: Failure of Success Criterion 2.4.3 due to using tabindex to create a tab order that does not preserve meaning and operability](https://www.w3.org/WAI/WCAG21/Techniques/failures/F44)
- [F85: Failure of Success Criterion 2.4.3 due to using dialogs or menus that are not adjacent to their trigger control in the sequential navigation order](https://www.w3.org/WAI/WCAG21/Techniques/failures/F85)

### Key Terms

assistive technology

hardware and/or software that acts as a [user agent](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html#dfn-user-agent), or along with a mainstream user agent, to provide functionality to meet the requirements of users with disabilities that go beyond those offered by mainstream user agents

Note

functionality provided by assistive technology includes alternative presentations (e.g., as synthesized speech or magnified content), alternative input methods (e.g., voice), additional navigation or orientation mechanisms, and content transformations (e.g., to make tables more accessible).

Note

Assistive technologies often communicate data and messages with mainstream user agents by using and monitoring APIs.

Note

The distinction between mainstream user agents and assistive technologies is not absolute. Many mainstream user agents provide some features to assist individuals with disabilities. The basic difference is that mainstream user agents target broad and diverse audiences that usually include people with and without disabilities. Assistive technologies target narrowly defined populations of users with specific disabilities. The assistance provided by an assistive technology is more specific and appropriate to the needs of its target users. The mainstream user agent may provide important functionality to assistive technologies like retrieving Web content from program objects or parsing markup into identifiable bundles.

Assistive technologies that are important in the context of this document include the following:

- screen magnifiers, and other visual reading assistants, which are used by people with visual, perceptual and physical print disabilities to change text font, size, spacing, color, synchronization with speech, etc. in order to improve the visual readability of rendered text and images;
- screen readers, which are used by people who are blind to read textual information through synthesized speech or braille;
- text-to-speech software, which is used by some people with cognitive, language, and learning disabilities to convert text into synthetic speech;
- speech recognition software, which may be used by people who have some physical disabilities;
- alternative keyboards, which are used by people with certain physical disabilities to simulate the keyboard (including alternate keyboards that use head pointers, single switches, sip/puff and other special input devices.);
- alternative pointing devices, which are used by people with certain physical disabilities to simulate mouse pointing and button activations.

keyboard interface

interface used by software to obtain keystroke input

Note

A keyboard interface allows users to provide keystroke input to programs even if the native technology does not contain a keyboard.

A touchscreen PDA has a keyboard interface built into its operating system as well as a connector for external keyboards. Applications on the PDA can use the interface to obtain keyboard input either from an external keyboard or from other applications that provide simulated keyboard output, such as handwriting interpreters or speech-to-text applications with "keyboard emulation" functionality.

Note

Operation of the application (or parts of the application) through a keyboard-operated mouse emulator, such as MouseKeys, does not qualify as operation through a keyboard interface because operation of the program is through its pointing device interface, not through its keyboard interface.

navigated sequentially

navigated in the order defined for advancing focus (from one element to the next) using a [keyboard interface](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html#dfn-keyboard-interface)

user agent

any software that retrieves and presents Web content for users

Web browsers, media players, plug-ins, and other programs — including [assistive technologies](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html#dfn-assistive-technology) — that help in retrieving, rendering, and interacting with Web content.

web page

a non-embedded resource obtained from a single URI using HTTP plus any other resources that are used in the rendering or intended to be rendered together with it by a [user agent](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html#dfn-user-agent)

Note

Although any "other resources" would be rendered together with the primary resource, they would not necessarily be rendered simultaneously with each other.

Note

For the purposes of conformance with these guidelines, a resource must be "non-embedded" within the scope of conformance to be considered a Web page.

A Web resource including all embedded images and media.

A Web mail program built using Asynchronous JavaScript and XML (AJAX). The program lives entirely at http://example.com/mail, but includes an inbox, a contacts area and a calendar. Links or buttons are provided that cause the inbox, contacts, or calendar to display, but do not change the URI of the page as a whole.

A customizable portal site, where users can choose content to display from a set of different content modules.

When you enter "http://shopping.example.com/" in your browser, you enter a movie-like interactive shopping environment where you visually move around in a store dragging products off of the shelves around you and into a visual shopping cart in front of you. Clicking on a product causes it to be demonstrated with a specification sheet floating alongside. This might be a single-page Web site or just one page within a Web site.
