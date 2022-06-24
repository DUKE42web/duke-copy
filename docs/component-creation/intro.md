# Intro

## Component Creation - Intro

---

Table of Contents:

1. Intro
2. Technical Overview
3. Practical Overview
4. Definition of Done
5. Sitecore

---

## Introduction

To understand how a component is displayed within our application, it helps to understand the process by which it is rendered within our React app.

This is a somewhat complex process, but the simplified overview is this:

- When a user navigates to a route, the React app receives a big bundle of data from Sitecore, including a list of components, and the relevant data for those components.
- That list represents the building blocks of the page that the user has navigated to.
- Those "building blocks" are checked against the component list of our application, and when a match is found, a React component is returned, along with the data that Sitecore sent along with the component that it needs to render properly.
- If a match is not found, a "placeholder component" is rendered instead. Within the React app, this is exactly what it sounds like: a big, ugly "placeholder" to remind you that this component has not yet been created for the app:

Oops! 🙀 we dont have Global Alerts yet!\

Let's dive in and get a little more insight.

Next >

Intro | Technical Overview | Practical Overview | Typescript | Sitecore | Definition of Done | Analytics
