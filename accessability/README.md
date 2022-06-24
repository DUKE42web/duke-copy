# 🦽 Accessability

## Understanding Techniques for WCAG Success Criteria

> #### Excerpt
>
> WCAG 2.1 guidelines and success criteria are designed to be broadly applicable to current and future web technologies, including dynamic applications, mobile, digital television, etc. They are stable and do not change.

---

WCAG 2.1 guidelines and success criteria are designed to be broadly applicable to current and future web technologies, including dynamic applications, mobile, digital television, etc. They are stable and do not change.

Specific guidance for authors and evaluators on meeting the WCAG success criteria is provided in techniques, which include code examples, resources, and tests. W3C's [Techniques for WCAG 2.1](https://www.w3.org/WAI/WCAG21/Techniques/) document is updated periodically, about twice per year, to cover more current best practices and changes in technologies and tools.

The three types of guidance in [Techniques for WCAG 2.1](https://www.w3.org/WAI/WCAG21/Techniques/) are explained below:

- Sufficient techniques
- Advisory techniques
- Failures

Also explained below:

- General and technology-specific techniques - which can be sufficient or advisory
- Other techniques - beyond what is in W3C's published document
- Technique tests
- User agent and assistive technology support
- Using the techniques - with important considerations

[Understanding Conformance](https://www.w3.org/WAI/WCAG21/Understanding/conformance) provides related information, including on [understanding accessibility support](https://www.w3.org/WAI/WCAG21/Understanding/conformance#accessibility-support).

### Techniques are Informative

_Techniques are informative—that means they are not required. The basis for determining conformance to WCAG 2.1 is the success criteria from the WCAG 2.1 standard—not the techniques._

_Note 1:_ W3C cautions against requiring W3C's sufficient techniques. The only thing that should be required is meeting the WCAG 2.1 success criteria. To learn more, see:

- [What would be the negative consequences of allowing _only_ W3C's published techniques to be used for conformance to WCAG 2.1?](https://www.w3.org/WAI/WCAG20/wcag2faq.html#techsnot) in the WCAG 2 FAQ

_Note 2:_ [Techniques for WCAG 2.1](https://www.w3.org/WAI/WCAG21/Techniques/) uses the words "must" and "should" only to clarify guidance within the techniques, not to convey requirements for WCAG.

### Sufficient Techniques

_Sufficient techniques_ are reliable ways to meet the success criteria.

- From an author's perspective: If you use the sufficient techniques for a given criterion correctly and it is [accessibility-supported](https://www.w3.org/WAI/WCAG21/Understanding/conformance#accessibility-support) for your users, you can be confident that you met the success criterion.
- From an evaluator's perspective: If web content implements the sufficient techniques for a given criterion correctly and it is [accessibility-supported](https://www.w3.org/WAI/WCAG21/Understanding/conformance#accessibility-support) for the content's users, it conforms to that success criterion. (The converse is not true; if content does not implement these sufficient techniques, it does not necessarily fail the success criteria, as explained in [Testing Techniques](https://www.w3.org/WAI/WCAG21/Understanding/understanding-techniques#understanding-techniques-tests) below.)

There may be other ways to meet success criteria besides the sufficient techniques in W3C's [Techniques for WCAG 2.1](https://www.w3.org/WAI/WCAG21/Techniques/) document, as explained in [Other Techniques](https://www.w3.org/WAI/WCAG21/Understanding/understanding-techniques#understanding-techniques-othertechs) below. _(See also_ [_Techniques are Informative_](https://www.w3.org/WAI/WCAG21/Understanding/understanding-techniques#understanding-techniques-informative) _above.)_

#### Numbered Lists, "AND"

The W3C-documented sufficient techniques are provided in a numbered list where each list item provides a technique or combination of techniques that can be used to meet the success criterion. Where there are multiple techniques on a numbered list item connected by "AND" then all of the techniques must be used to be sufficient. For example, [Sufficient Techniques for 1.3.1](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships#techniques) has: "G115: Using semantic elements to mark up structure AND H49: Using semantic markup to mark emphasized or special text (HTML)".

### Advisory Techniques

_Advisory techniques_ are suggested ways to improve accessibility. They are often very helpful to some users, and may be the only way that some users can access some types of content.

Advisory techniques are not designated as sufficient techniques for various reasons such as:

- they may not be sufficient to meet the full requirements of the success criteria;
- they may be based on technology that is not yet stable;
- they may not be [accessibility supported](https://www.w3.org/WAI/WCAG21/Understanding/conformance#accessibility-support) in many cases (for example, assistive technologies do not work with them yet);
- they may not be testable;
- in some circumstances they may not be applicable or practical, and may even decrease accessibility for some users while increasing it for others;
- they may not address the success criterion itself, and instead provide related accessibility benefits.

Authors are encouraged to apply all of the techniques where appropriate to best address the widest range of users' needs.

### Failures

_Failures_ are things that cause accessibility barriers and fail specific success criteria. The documented _failures_ are useful for:

- Authors to know what to avoid,
- Evaluators to use for checking if content does not meet WCAG success criteria.

Content that has a _failure_ does not meet WCAG success criteria, unless an alternate version is provided without the failure.

If anyone identifies a situation where a documented failure is not correct, please [report the situation as a WCAG comment](https://www.w3.org/WAI/WCAG21/comments/) so that it can be corrected or deleted as appropriate.

### General and Technology-specific Techniques

_General techniques_ describe basic practices that apply to all technologies. _Technology-specific techniques_ apply to a specific technology.

Some success criteria do not have technology-specific techniques and are covered only with general techniques. Therefore, both the general techniques and the relevant technology-specific techniques should be considered.

Publication of techniques for a specific technology does not imply that the technology can be used in all situations to create content that meets WCAG 2.1 success criteria and conformance requirements. Developers need to be aware of the limitations of specific technologies and provide content in a way that is accessible to people with disabilities.

### Other Techniques

In addition to the techniques in W3C's [Techniques for WCAG 2.1](https://www.w3.org/WAI/WCAG21/Techniques/) document, _there are other ways to meet WCAG success criteria_. W3C's techniques are not comprehensive and may not cover newer technologies and situations.

_Web content does not have to use W3C's published techniques in order to conform to WCAG 2.1.\_\_(See also_ [_Techniques are Informative_](https://www.w3.org/WAI/WCAG21/Understanding/understanding-techniques-informative) _above.)_

Content authors can develop different techniques. For example, an author could develop a technique for HTML5, [WAI-ARIA](https://www.w3.org/WAI/intro/aria), or other new technology. Other organizations may develop sets of techniques to meet WCAG 2.1 success criteria.

Any techniques can be sufficient if:

- they satisfy the success criterion, and
- all of the [WCAG 2.1 conformance requirements](https://www.w3.org/WAI/WCAG21/Understanding/conformance) are met.

#### Submitting Techniques

The WCAG Working Group encourages people to submit new techniques so that they can be considered for inclusion in updates of the [Techniques for WCAG 2.1](https://www.w3.org/WAI/WCAG21/Techniques/) document. Please submit techniques for consideration using the [Techniques Submission Form](https://www.w3.org/WAI/GL/WCAG20/TECHS-SUBMIT/).

### Testing Techniques

Each technique has tests that help:

- authors verify that they implemented the technique properly, and
- evaluators determine if web content meets the technique.

The tests are only for a technique, they are not tests for conformance to WCAG success criteria.

- Failing a technique test does not necessarily mean failing WCAG, because the techniques are discrete (that is, they address one specific point) and they are not required.
- Content can meet WCAG success criteria in different ways other than W3C's published sufficient techniques.
- Content that passes the sufficient techniques for a specific technology does not necessarily meet all WCAG success criteria. Some success criteria have only general techniques, not technology-specific techniques.
- The content must be [accessibility supported](https://www.w3.org/WAI/WCAG21/Understanding/conformance#accessibility-support) for the content's users. Some sufficient techniques require browser, assistive technology, or other support that some users might not have.

Thus while the techniques are useful for evaluating content, evaluations must go beyond just checking the sufficient technique tests in order to evaluate how content conforms to WCAG success criteria.

_Failures_ are particularly useful for evaluations because they do indicate non-conformance (unless an alternate version is provided without the failure).

### User Agent and Assistive Technology Support Notes

Some techniques require that web content users have specific browsers or assistive technologies in order for the technique to be [accessibility-supported](https://www.w3.org/WAI/WCAG21/Understanding/conformance#accessibility-support). The _User Agent and Assistive Technology Support Notes_ sections of individual techniques include some information to help determine accessibility support.

#### Support Notes Change Over Time

As time passes, the versions of user agents (browsers, etc.) or assistive technologies listed may not be the current versions. The Working Group may not update most of these notes as new versions are released. Authors should test techniques with the user agents and assistive technologies currently available to their users. See also [Understanding Accessibility Support](https://www.w3.org/WAI/WCAG21/Understanding/conformance#accessibility-support).

### Using the Techniques

[Techniques for WCAG 2.1](https://www.w3.org/WAI/WCAG21/Techniques/) is not intended to be used as a stand-alone document. Instead, it is expected that content authors will usually use [How to Meet WCAG 2.1: A customizable quick reference](https://www.w3.org/WAI/WCAG21/quickref/) to read the WCAG success criteria, and follow links from there to specific topics in Understanding WCAG 2.1 and to specific techniques.

#### Alternatives must meet success criteria

Some techniques describe how to provide alternate ways for users to get content. For example, [G73: Providing a long description in another location with a link to it that is immediately adjacent to the non-text content](https://www.w3.org/WAI/WCAG21/Techniques/general/G73) mentions a transcript as an alternative for an audio file. Some alternatives must also conform to WCAG. For example, the transcript itself must meet all relevant success criteria.

#### Example Code

The code examples in the techniques are intended to demonstrate only the specific point discussed in the technique. They might not demonstrate best practice for other aspects of accessibility, usability, or coding not related to the technique. They are not intended to be copied and used as the basis for developing web content.

Many techniques point to "working examples" that are more robust and may be appropriate for copying and integrating into web content.

##
