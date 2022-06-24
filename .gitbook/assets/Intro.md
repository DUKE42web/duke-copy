# Component Creation - Intro

---

Table of Contents:

1. [Intro](./Intro.md)
2. [Technical Overview](./TechnicalOverview.md)
3. [Practical Overview](./PracticalOverview.md)
4. [Definition of Done](./DefinitionOfDone.md)
5. [Sitecore](./Sitecore.md)

---

# Introduction

To understand how a component is displayed within our application, it helps to understand the process by which it is rendered within our React app.

This is a somewhat complex process, but the simplified overview is this:

- When a user navigates to a route, the React app receives a big bundle of data from Sitecore, including a list of components, and the relevant data for those components.
- That list represents the building blocks of the page that the user has navigated to.
- Those "building blocks" are checked against the component list of our application, and when a match is found, a React component is returned, along with the data that Sitecore sent along with the component that it needs to render properly.
- If a match is not found, a "placeholder component" is rendered instead. Within the React app, this is exactly what it sounds like: a big, ugly "placeholder" to remind you that this component has not yet been created for the app:

<span class="bg-orange" style="display: block; background: orange; color: black;">
  Oops! 🙀 we dont have Global Alerts yet!
</span>
<br />

Let's dive in and get a little more insight.

[Next >](./TechnicalOverview.md)

[Intro](./Intro.md) | [Technical Overview](./TechnicalOverview.md) | [Practical Overview](./PracticalOverview.md) | [Typescript](./Typescript.md) | [Sitecore](./Sitecore.md) | [Definition of Done](./DefinitionOfDone.md) | [Analytics](./Analytics.md)
