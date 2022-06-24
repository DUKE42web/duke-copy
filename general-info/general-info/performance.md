# Performance

<details>

<summary>Code Splitting</summary>

#### Reduce JavaScript payloads with code splitting

**Excerpt**

Sending large JavaScript payloads impacts the speed of your site significantly. Instead of shipping all the JavaScript to your user as soon as the first page of your application is loaded, split your bundle into multiple pieces and only send what's necessary at the very beginning.

---

Nov 5, 2018

Nobody likes waiting. [**Over 50% of users abandon a website if it takes longer than 3 seconds to load**](https:
//www.thinkwithgoogle.com/intl/en-154/insights-inspiration/research-data/need-mobile-speed-how-mobile-latency-impacts-publisher-revenue/).

Sending large JavaScript payloads impacts the speed of your site significantly. Instead of shipping all the JavaScript to your user as soon as the first page of your application is loaded, split your bundle into multiple pieces and only send what's necessary at the very beginning.

**Measure** [**#**](https:
//web.dev/reduce-javascript-payloads-with-code-splitting/#measure)

Lighthouse displays a failed audit when a significant amount of time is taken to execute all the JavaScript on a page.

![A failing Lighthouse audit showing scripts taking too long to execute.](https:
//web-dev.imgix.net/image/admin/p0Ahh3pzXog3jPdDp6La.png?auto=format)

Split the JavaScript bundle to only send the code needed for the initial route when the user loads an application. This minimizes the amount of script that needs to be parsed and compiled, which results in faster page load times.

Popular module bundlers like [webpack](https:
//webpack.js.org/guides/code-splitting/), [Parcel](https:
//parceljs.org/code_splitting.html), and [Rollup](https:
//rollupjs.org/guide/en#dynamic-import) allow you to split your bundles using [dynamic imports](https:
//developers.google.com/web/updates/2017/11/dynamic-import). For example, consider the following code snippet that shows an example of a `someFunction` method that gets fired when a form is submitted.

```typescript
import moduleA from "library";form.addEventListener("submit", e => {  e.preventDefault();  someFunction();});
const someFunction = () => {
// uses moduleA}
```

In here, `someFunction` uses a module imported from a particular library. If this module is not being used elsewhere, the code block can be modified to use a dynamic import to fetch it only when the form is submitted by the user.

```
form.addEventListener("submit", e => {  e.preventDefault();  import('library.moduleA')    .then(module => module.default)
// using the default export    .then(someFunction())    .catch(handleError());});
const someFunction = () => {
// uses moduleA}
```

The code that makes up the module does not get included into the initial bundle and is now **lazy loaded**, or provided to the user only when it is needed after the form submission. To further improve page performance, [preload critical chunks to prioritize and fetch them sooner](https:
//web.dev/preload-critical-assets).

Although the previous code snippet is a simple example, lazy loading third party dependencies is not a common pattern in larger applications. Usually, third party dependencies are split into a separate vendor bundle that can be cached since they don't update as often. You can read more about how the [**SplitChunksPlugin**](https:
//webpack.js.org/plugins/split-chunks-plugin/) can help you do this.

Splitting on the route or component level when using a client-side framework is a simpler approach to lazy loading different parts of your application. Many popular frameworks that use webpack provide abstractions to make lazy loading easier than diving into the configurations yourself.

Last updated: Nov 5, 2018 — [Improve article](https:
//github.com/GoogleChrome/web.dev/blob/main/src/site/content/en/fast/reduce-javascript-payloads-with-code-splitting/index.md)

</details>

## Time to Interactive (TTI)

> **Excerpt**
>
> This post introduces the Time to Interactive (TTI) metric and explains how to measure it

---

Nov 7, 2019 — Updated Jun 15, 2020

### What is TTI? [#](https:

//web.dev/tti/#what-is-tti)

The TTI metric measures the time from when the page starts loading to when its main sub-resources have loaded and it is capable of reliably responding to user input quickly.

To calculate TTI based on a [performance trace](https:
//developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference) of a web page, follow these steps:

1. Start at [First Contentful Paint (FCP)](https:
   //web.dev/fcp/).
2. Search forward in time for a quiet window of at least five seconds, where _quiet window_ is defined as: no [long tasks](https:
   //web.dev/custom-metrics/#long-tasks-api) and no more than two in-flight network GET requests.
3. Search backwards for the last long task before the quiet window, stopping at FCP if no long tasks are found.
4. TTI is the end time of the last long task before the quiet window (or the same value as FCP if no long tasks are found).

The following diagram should help visualize the steps above:

[![A page load timeline showing how to compute TTI](https:
//web-dev.imgix.net/image/admin/WZM0n4aXah67lEyZugOT.svg)](https:
//web-dev.imgix.net/image/admin/WZM0n4aXah67lEyZugOT.svg)

Historically, developers have optimized pages for fast render times, sometimes at the expense of TTI.

Techniques like server-side rendering (SSR) can lead to scenarios where a page _looks_ interactive (that is, links and buttons are visible on the screen), but it's not _actually_ interactive because the main thread is blocked or because the JavaScript code controlling those elements hasn't loaded.

When users try to interact with a page that looks interactive but actually isn't, they'll likely respond in one of two ways:

- In the best-case scenario, they'll be annoyed that the page is slow to respond.
- In the worst-case scenario, they'll assume the page is broken and likely leave. They may even lose confidence or trust in the value of your brand.

To avoid this problem, make every effort to minimize the difference between FCP and TTI. And in cases were a noticeable difference does exist, make it clear through visual indicators that the components on your page are not yet interactive.

### How to measure TTI [#](https:

//web.dev/tti/#how-to-measure-tti)

TTI is a metric that's best measured [in the lab](https:
//web.dev/user-centric-performance-metrics/#in-the-lab). The best way to measure TTI is to run a Lighthouse performance audit on your site. See the [Lighthouse documentation on TTI](https:
//web.dev/tti/) for usage details.

#### Lab tools [#](https:

//web.dev/tti/#lab-tools)

- [Lighthouse](https:
  //developers.google.com/web/tools/lighthouse/)
- [WebPageTest](https:
  //www.webpagetest.org)

### What is a good TTI score? [#](https:

//web.dev/tti/#what-is-a-good-tti-score)

To provide a good user experience, sites should strive to have a Time to Interactive of less than **5 seconds** when tested on **average mobile hardware**.

For details on how your page's TTI affects your Lighthouse performance score, see [How Lighthouse determines your TTI score](https:
//web.dev/interactive/#how-lighthouse-determines-your-tti-score).

### How to improve TTI [#](https:

//web.dev/tti/#how-to-improve-tti)

To learn how to improve TTI for a specific site, you can run a Lighthouse performance audit and pay attention to any specific [opportunities](https:
//web.dev/lighthouse-performance/#opportunities) the audit suggests.

To learn how to improve TTI in general (for any site), refer to the following performance guides:

- [Minify JavaScript](https:
  //web.dev/unminified-javascript/)
- [Preconnect to required origins](https:
  //web.dev/uses-rel-preconnect/)
- [Preload key requests](https:
  //web.dev/uses-rel-preload/)
- [Reduce the impact of third-party code](https:
  //web.dev/third-party-summary/)
- [Minimize critical request depth](https:
  //web.dev/critical-request-chains/)
- [Reduce JavaScript execution time](https:
  //web.dev/bootup-time/)
- [Minimize main thread work](https:
  //web.dev/mainthread-work-breakdown/)
- [Keep request counts low and transfer sizes small](https:
  //web.dev/resource-summary/)
