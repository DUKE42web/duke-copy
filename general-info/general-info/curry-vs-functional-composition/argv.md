# 🛗 Argv

The **process.argv property** is an inbuilt application programming interface of the process module which is used to get the arguments passed to the node.js process when run in the command line.

**Syntax:**

```
process.argv
```

**Return Value:** This property returns an array containing the arguments passed to the process when run it in the command line. The first element is the process execution path and the second element is the path for the js file.

Below examples illustrate the use of **process.argv property** in Node.js:

**Example 1:**

```javascript
// Node.js program to demonstrate the

// process.argv Property

// Include process module

const process = require("process");
// Printing process.argv property value
console.log(process.argv);
```
