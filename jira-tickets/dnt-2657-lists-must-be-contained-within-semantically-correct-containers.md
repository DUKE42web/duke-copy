---
description: src/components/MultiStepForm/components/ConfirmationStep/index.tsx
---

# 🎟 DNT-2657 Lists must be contained within semantically correct containers

**Description**

Notes:

The information about call-time preference is visually displayed as a description list. In this case, it's a question and then an answer. This content is not marked up as a list.

When content is presented as a list, or a clearly related collection of items, marking it up using semantic list HTML elements helps assistive technology users to navigate and orient themselves within a page of content. Screen reader users can navigate to (or over) lists when they are correctly marked up. Also, when reading content in a list, assistive technology provides rich information about how long the list is and where the user is in the list. For example: "List, 9 items, Home, 1 of 9, About, 2 of 9".

This particular list is confusing because it is displayed even when there is no time indicated, like when a user chooses email as the preferred method of communication.

**Recommendation**

Remove the list entirely and write this information as a sentence. "We will reach out to you by phone during business hours," for example. If the user indicates that they prefer email, either write a new sentence indicating that preference, "One of our representatives will email you shortly," or remove the sentence altogether.

If you choose to keep the question and answer structure, use a description list (\<dl>)for this data.

Code example (simplified)

```
<dl>
    <dt>If contact by phone is your preference, what time of day is best?</dt>
    <dd>Daytime</dd>
</dl>
```

**Resources**

[Using description lists](https://www.w3.org/WAI/WCAG21/Techniques/html/H40)

<details>

<summary>Description Lists</summary>

#### Using description lists

**Important Information about Techniques**

See [Understanding Techniques for WCAG Success Criteria](https://www.w3.org/WAI/WCAG21/Understanding/understanding-techniques) for important information about the usage of these informative techniques and how they relate to the normative WCAG 2.1 success criteria. The Applicability section explains the scope of the technique, and the presence of techniques for a specific technology does not imply that the technology can be used in all situations to create content that meets WCAG 2.1.

**Applicability**

HTML and XHTML

This technique relates to [Success Criterion 3.1.3: Unusual Words](https://www.w3.org/WAI/WCAG21/Understanding/unusual-words) (Sufficient when used with [G55: Linking to definitions](https://www.w3.org/WAI/WCAG21/Techniques/general/G55)).

**Description**

The objective of this technique is to provide the description of names or terms by presenting them in a description list. The list is marked up using the `dl` element. Within the list, each term is put in a separate `dt` element, and its description goes in the `dd` element directly following it. Multiple terms can be associated with a single description, as can a single term with multiple descriptions, provided that semantic sequence is maintained. The `title` attribute can be used to provide additional information about the description list. Usage of description lists ensures that terms and their descriptions are semantically related even as presentation format changes, as well as ensuring that these terms and descriptions are semantically grouped as a unit.

Description lists are easiest to use when the descriptions are ordered alphabetically. A common use for description lists is a glossary of terms.

NOTE

In HTML5 the name "Description list" was introduced. In previous versions these lists were referred to as "Definition lists".

**Examples**

**Example 1**

A list of descriptions of nautical terms used on a Website about sailing.

```
<dl title="Nautical terms">
  <dt>Knot</dt>
  <dd>
    <p>A <em>knot</em> is a unit of speed equaling 1
      nautical mile per hour (1.15 miles per hour or 1.852
      kilometers per hour).</p>
  </dd>
  <dt>Port</dt>
  <dd>
    <p><em>Port</em> is the nautical term (used on
      boats and ships) that refers to the left side
      of a ship, as perceived by a person facing towards
      the bow (the front of the vessel).</p>
  </dd>
  <dt>Starboard</dt>
  <dd>
    <p><em>Starboard</em> is the nautical term (used
      on boats and ships) that refers to the right
      side of a vessel, as perceived by a person
      facing towards the bow (the front of the vessel).</p>
  </dd>
</dl>
```

**Resources**

Resources are for information purposes only, no endorsement implied.

- [HTML5 Description lists](https://www.w3.org/TR/html5/grouping-content.html#the-dl-element)
- [HTML 4 Definition lists: the DL, DT, and DD elements](https://www.w3.org/TR/REC-html40/struct/lists.html#edef-DL)

**Related Techniques**

- [G62: Providing a glossary](https://www.w3.org/WAI/WCAG21/Techniques/general/G62)

**Tests**

**Procedure**

For any set of terms and their associated descriptions:

1. Check that the list is contained within a `dl` element.
2. Check that each term in the list being described is contained within a `dt` element.
3. Check that when there is more than one term that shares the same decription that the `dt` elements immediately follow each other.
4. Check that the description for each term is contained in one or more `dd` elements.
5. Check that the one or more `dd` elements immediately follow the one or more `dt` elements containing the term being described.

**Expected Results**

- All checks above are true.

</details>
