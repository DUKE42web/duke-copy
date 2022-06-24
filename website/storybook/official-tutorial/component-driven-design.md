# 🧱 Component Driven Design

## Component Driven User Interfaces

> **Excerpt**
>
> How modularity is transforming design and frontend development

---

[![Component Driven](https:
//www.componentdriven.org/logo-componentdriven.svg)](https:
//www.componentdriven.org)

The development and design practice of building user interfaces with modular components. UIs are built from the "bottom up" starting with basic components then progressively combined to assemble screens.

### Why components?

Modern user interfaces are more complicated than ever. People expect compelling, personalized experiences delivered across devices. That means frontend developers and designers have to embed more logic into the UI.

But UIs become unwieldy as applications grow. Large UIs are brittle, painful to debug, and time consuming to ship. Breaking them down in a modular way makes it easy to build robust yet flexible UIs.

Components enable interchangeability by isolating state from application business logic. That way, you can decompose complex screens into simple components. Each component has a well-defined API and fixed series of states that are mocked. This allows components to be taken apart and recomposed to build different UIs.

History: Software engineer [Tom Coleman](https:
//twitter.com/tmeasday) introduced Component Driven in [2017](https:
//blog.hichroma.com/component-driven-development-ce1109d56c8e) to describe the shift in UI development toward component architectures and processes. The idea of modular UI has many parallels in software movements such as microservices and containerization. Historical precedents also include lean manufacturing and mass manufacturing circa early 20th century.

histogram

#### What are components?

Components are standardized, interchangeable building blocks of UIs. They encapsulate the appearance and function of UI pieces. Think LEGO bricks. LEGOs can be used to build everything from castles to spaceships; components can be taken apart and used to create new features.

### How to be Component Driven

![](https:
//www.componentdriven.org/component.svg)

Line Copy 7

#### Build one component at a time

Build each component in isolation and define its relevant states. Start small.

![](https:
//www.componentdriven.org/composition.svg) ![](https:
//www.componentdriven.org/composition-stack.svg)

Line Copy 7

#### Combine components

Compose small components together to unlock new features while gradually increasing complexity.

![](https:
//www.componentdriven.org/page.svg) ![](https:
//www.componentdriven.org/page-stack.svg)

Line Copy 7

#### Assemble pages

Build pages by combining composite components. Use mock data to simulate pages in hard-to-reach states and edge cases.

Home page

Settings page

Profile page

![](https:
//www.componentdriven.org/integrate.svg) ![](https:
//www.componentdriven.org/integrate-stack.svg)

#### Integrate pages into your project

Add pages to your app by connecting data and hooking up business logic. This is when your UI meets your backend APIs and services.

Web app

Marketing site

Docs site

### Benefits

- **Quality:** Verify that UIs work in different scenarios by building components in isolation and defining their relevant states.
- **Durability:** Pinpoint bugs down to the detail by testing at the component level. It's less work and more precise than testing screens.
- **Speed:** Assemble UIs faster by reusing existing components from a component library or design system.
- **Efficiency:** Parallelize development and design by decomposing UI into discrete components then sharing the load between different team members.

#### What UIs are not Component Driven?

- **Page-based:** Development and design processes that treats a website as a collection of pages. Not much effort is made to reuse common elements across pages.
- **Tools designed for pages:** Tools that focus on displaying documents like Wordpress and Drupal. Backend frameworks such as Rails, Django and PHP that treat UI reuse as an afterthought and discourage widespread component reuse.

#### Complementary trends

**Design systems:** A holistic approach to user interface design that documents all UI patterns in a centralized system that includes assets (Sketch, Figma, etc.), design principles, governance, and a component library.

**JAMStack:** A methodology for building websites that pre-renders static files and serves them directly from a CDN (as opposed to a server). The UIs of JAMStack sites rely on componentized JavaScript frameworks.

**Agile:** A method of software development that promotes short feedback loops and rapid iteration. Components help teams ship faster by reusing readymade building blocks. That allows agile teams to focus more on adapting to user requirements.

#### Learn More

[Component Driven Development](https:
//blog.hichroma.com/component-driven-development-ce1109d56c8e)

A development methodology that anchors the build process around components. It is a process that builds UIs from the "bottom up" by starting at the level of components and ending at the level of pages or screens.

[Atomic Design](https:
//bradfrost.com/blog/post/atomic-web-design/)

Atomic Design is atoms, molecules, organisms, templates, and pages concurrently working together to create effective interface design systems. It is a mental model to help us think of our user interfaces as both a cohesive whole and a collection of parts at the same time.

[Design Systems Handbook](https:
//www.designbetter.co/design-systems-handbook)

This book guides readers through best practices around planning, designing, building, and implementing a design system, with insights and first-hand experiences from experts who have gone through the journey.

---
