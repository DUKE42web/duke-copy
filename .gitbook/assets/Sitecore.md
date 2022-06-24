# Component Creation - Sitecore

---

Table of Contents:

1. [Intro](./Intro.md)
2. [Technical Overview](./TechnicalOverview.md)
3. [Practical Overview](./PracticalOverview.md)
4. [Definition of Done](./DefinitionOfDone.md)
5. [Sitecore](./Sitecore.md)

---

# Sitecore and You

In the context of our application, we treat Sitecore like a CMS for our React front end. We use it to tell our application where components should be and provide data and assets.

But Sitecore is not for the faint of heart. Many devs like to get their hands dirty by just "getting in there" and poking around. However, due to its terrible UI and grinding sluggishness, working within Sitecore can be maddening. To top it all off, as is so often the case, the documentation for Sitecore is substandard. God willing, you won't need to venture into Sitecore very often. But if you have exhausted all other options and you still find you need to work within it, it's better to go in with a clear gameplan of what you want to accomplish and how to accomplish it. This section aims to help you with that.

## Sitecore Component Creation Overview

Once upon a time, new components were built by the front end team and then handed off to the Sitecore developers for integration into the application. These days, components built by the front end team stay within the front end application, making the workflow much more efficient. New components can then be integrated into the CMS for use by the content team, with editable fields intact.

While many components are already available for our application in Sitecore, if you find that you need to add a component to be edited within Sitecore, this document contains an overview to the process you will need to follow.

Before delving into that, it is helpful to understand at a high level how Sitecore is being used in our implementation.

A "page" such as `/Home` or `/Billing` consists of a collection of _Renderings_ within Sitecore. A rendering could be viewed as a representation of a React component within Sitecore. These renderings are associated with data relevant to the component and placeholder info. A _Placeholder_ is a way for content authors and marketing folks to specify where upon a page a component should be injected. In order for a rendering to be displayed upon a page, it will need to be assigned a placeholder.

When a page exists within Sitecore, it is made available to our application via something called the _Layout Service_, which exposes an endpoint that can be requested. This endpoint returns a serialized JSON payload of the rendering info from Sitecore. While a traditional Sitecore implementation would involve C# and Razor templates, this implementation makes it possible for us to use React on the front end.

## Basic Instructions for Creating a Component

1. Navigate to [Sitecore](http:
   //scdev25.duke-energy.com/sitecore) and login. From there, expand "sitecore > Layout > Renderings > Custom > Common" and you can see the available renderings. If you need a rendering to map to your component that isn't already available here, you can create one.

2. Create a Rendering. Within the appropriate folder under `/sitecore/layout/renderings`, create a new `Json Rendering`. This will most likely be within the Custom/Common folder, and can be done either by right-clicking the folder and selecting Insert > Json Rendering or selecting the folder you want to create a rendering in and then pressing the `Json Rendering` button from the options.

3. You will be prompted by a modal to choose a name for your item. In the input labelled "Enter a name for the new item", provide the name of the React component that will be used for the rendering.

4. You can now add your newly-created Json Rendering to a page. If appropriate, you will also need to specify a datasource item for the rendering. <!-- Include a brief explanation for a datasource --> The datasource item will need to be created from a data template in Sitecore. <!-- Include a brief explanation of how that would work -->

5. When Layout Service is rendering, the fields from the datasource item will be serialized and added to the Layout Service output and should now be available to our application.

<!-- What does a placeholder look like? - `layoutJSSFooter`  -->
<!-- What does it reference? -->
<!-- What is a Datasource?  -->
<!-- What does it look like? - `{982931FC-255B-4A74-A6CA-836CAD7B9F1F}` -->
<!-- What does it reference? -->

[< Previous](./DefinitionOfDone.md)

[Intro](./Intro.md) | [Technical Overview](./TechnicalOverview.md) | [Practical Overview](./PracticalOverview.md) | [Typescript](./Typescript.md) | [Sitecore](./Sitecore.md) | [Definition of Done](./DefinitionOfDone.md) | [Analytics](./Analytics.md)
