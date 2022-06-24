# Scripting

## Scripting Documentation

### Index

- Tooling
- General ES6
- Naming
- Spacing and Syntax
- Third party JS libraries
- Typescript
- Scoping and Initialization
- Conditionals
- Miscellaneous Code Smells
- Resources

### Tooling

Tools to help your team comply with Electron coding standards.

#### EditorConfig

Add the `.editorconfig` file to the root of your project. [Download and install](https://editorconfig.org/#download) the EditorConfig plugin on your text editor (if it does not natively support it).

[More information about EditorConfig](https://editorconfig.org/#download)

#### ESLint

To run ESLint manually, you will have to refer to the local version of ESLint in your project. You can do this one of two ways:

1.  Use the npm script provided in the package

    ```
    npm run lint file-name.js
    ```

    **Note:** This will run but it will output an NPM error. This is due to ESLint returning a non-zero exit code.

2.  Reference the local ESLint file directly.

    ```
    ./node_modules/.bin/eslint file-name.js
    ```

In addition to being able to lint manually, linting can also be run automatically via the use of git hooks. To use git hooks, either clone the template project (TBD) or:

1. Copy the package.json file
2. Run `npm install` to install husky, Prettier, and lint-staged
3. Run `git add` after making changes
4. Run `git commit -m "Message"`. Prettier will automatically format the files and the linter will run, preventing commits if there are errors.

Also see the [Prettier documentation](https://prettier.io/docs/en/precommit.html) for more information on formatting and linting with git hooks.

### General ES6

**Do** use ES6 functionality when possible.

- **Why?** This keeps our codebase consistent, cleaner, more concise, and more readable.

**Do** use an eslint or tslint file for your code.

**Do** use the .editorconfig file provided \[link here].

**Do** use the ES6 array methods, such as .forEach, .map, .filter in lieu of a regular JS for loop with conditionals.

- **ESLint:** [no-iterator](https://eslint.org/docs/rules/no-iterator), [no-restricted-syntax](https://eslint.org/docs/rules/no-restricted-syntax#disallow-specified-syntax-no-restricted-syntax)
- **Why?** This allows us to scan and understand intent
- **Why?** It keeps our codebase more concise and more readable
- **Why?** Array methods allow us to return a new array and keep the original one from being mutated.
- **Code Examples:**

  Do this:

  ```
  array.filter(item => item.checked);
  ```

  Not this:

  ```
  let filteredItems = [];
  for (let i = 0; i < array.length; i++) {
      if (array[i].checked) {
          filteredItems.push(array[i]);
      }
  }
  ```

**Do** use implicit returns whenever working with a single statement returning an expression (especially with array methods).

- **ESLint:** [arrow-parens](https://eslint.org/docs/rules/arrow-parens#require-parens-in-arrow-function-arguments-arrow-parens), [arrow-body-style](https://eslint.org/docs/rules/arrow-body-style#require-braces-in-arrow-function-body-arrow-body-style)
- **Why?** This makes it easier to read, especially for chained functions.
- **Code Examples**:

  Do this:

  ```
  array.filter(item => item.checked);
  ```

  Not this:

  ```
  array.filter((item) => {
     if (item.checked) {
         return item;
     }
  });
  ```

**Do** import from a path in one place (I.e, all imports from @angular/core in one line versus two).

- **ESLint:** [no-duplicate-imports](https://eslint.org/docs/rules/no-duplicate-imports#disallow-duplicate-imports-no-duplicate-imports)
- **Why?** Easier to find an import since they’re grouped.
- \*\* Code Examples:\*\*

  Do this:

  ```
  import { Http, RequestOptions, Headers } from '@angular/http';
  import { Router } from '@angular/router';
  ```

  Not this:

  ```
  import { Http } from '@angular/http';
  import { Router } from '@angular/router';
  import { RequestOptions, Headers } from '@angular/http';
  ```

**Do** use single quotes for strings.

- **ESLint:** [quotes](https://eslint.org/docs/rules/quotes#enforce-the-consistent-use-of-either-backticks-double-or-single-quotes-quotes)

**Do** use template strings instead of concatenation.

- **ESLint:** [prefer-template](https://eslint.org/docs/rules/prefer-template#suggest-using-template-literals-instead-of-string-concatenation-prefer-template), [template-curly-spacing](https://eslint.org/docs/rules/template-curly-spacing#enforce-usage-of-spacing-in-template-strings-template-curly-spacing)

**Do** use the spread operator instead of Object.assign for shallow copies.

- **ESLint:** [prefer-object-spread](https://eslint.org/docs/rules/prefer-object-spread#prefer-use-of-an-object-spread-over-objectassign-prefer-object-spread)
- **Why?** This prevents us from mutating the original object.
- **Code Examples:**

  Do this:

  ```
  let objectA = {};
  const objectB = { name: 'test', value: 'test' };
  objectA = {...objectA, ...objectB};
  ```

  Not this:

  ```
  let objectB = {};
  const objectA = { name: 'test', value: 'test' };
  objectA = Object.assign({}, objectA, objectB);
  ```

**Do** use dot notation for properties of objects.

- **ESLint:** [dot-notation](https://eslint.org/docs/rules/dot-notation#require-dot-notation-dot-notation)

**Don’t** use quotes around keys in a JSON object unless it’s a reserved keyword or contains a hyphen.

- **ESLint:** [quote-props](https://eslint.org/docs/rules/quote-props#require-quotes-around-object-literal-property-names-quote-props)
- **Code Examples:**

  Do this:

  ```
  const jsonObject = {
    name: 'Name',
    value: 'Value'
    'kebab-case': 'Kebab Case'
  };
  ```

  Not this:

  ```
  const jsonObject = {
    'name': 'Name',
    'value': 'Value',
    'kebab-case': 'Kebab Case'
  };
  ```

**Don’t** use bracket notation to get properties of objects unless it's a reserved keyword, includes improper syntax (I.e., a hyphen), or is a variable.

- **Code Examples:**

  Do this:

  ```
  const name = object.name;

  function getValueFromObject(key) {
      return object[key];
  }
  ```

  Not this:

  ```
  const name = object['name'];
  ```

**Don’t** set the value of a parameter in a function call; assign it to a variable and then pass it as a parameter. (Example: multiplyNumbers(10, x \_ 2) should contain a variable called secondNumber where secondNumber = x \_ 2).

- **Why?** It makes it less readable.
- **Why?** It makes it harder to debug.
- **Code Examples:**

  Do this:

  ```
  const x = 10;
  const secondNumber = x * 2;
  const product = multiplyNumbers(10, secondNumber);
  ```

  Not this:

  ```
  const x = 10;
  const product = multiplyNumbers(10, x * 2);
  ```

### Naming

**Do** use intuitive names for variables and functions to describe the intent (what it does) or what data it holds.

- **Code Examples:**

  Do this:

  ```
  const displayErrors = form.errors.length;
  ```

  Not this:

  ```
  const exists = form.errors.length;
  ```

**Do** use lowerCamelCase for variables and UpperCamelCase for classes.

- **ESLint:** [camelcase](https://eslint.org/docs/rules/camelcase#require-camelcase-camelcase), [new-cap](https://eslint.org/docs/rules/new-cap#require-constructor-names-to-begin-with-a-capital-letter-new-cap)
- **Code Examples:**

  Do this:

  ```
  export class HomeComponent {
      let dataLoading = true;
      let filters = [];
      let sortOptions = {};
  };
  ```

  Not this:

  ```
  export class homeComponent {
      let DataLoading = true;
      let Filters = [];
      let sortoptions = {};
  };
  ```

**Don’t** name variables a single letter.

- **ESLint:** [id-length](https://eslint.org/docs/rules/id-length#enforce-minimum-and-maximum-identifier-lengths-id-length)
- **Code Examples:**

  Do this:

  ```
  const xAxisCoordinate = 45;
  ```

  Not this:

  ```
  const x = 45;
  ```

### Spacing and Syntax

**Do** put a space between parameters.

- **Code Example:**

  Do this:

  ```
  multiplyNumbers(1, 2, 3);
  ```

  Not this:

  ```
  multiplyNumbers(1,2,3);
  ```

**Do** put a space between a keyword and parenthesis, but don’t put a space before the parenthesis in functions.

- **ESLint:** [space-before-function-paren](https://eslint.org/docs/rules/space-before-function-paren#require-or-disallow-a-space-before-function-parenthesis-space-before-function-paren), [space-before-blocks](https://eslint.org/docs/rules/space-before-blocks#require-or-disallow-space-before-blocks-space-before-blocks), [keyword-spacing](https://eslint.org/docs/rules/keyword-spacing#enforce-consistent-spacing-before-and-after-keywords-keyword-spacing), [func-call-spacing](https://eslint.org/docs/rules/func-call-spacing#require-or-disallow-spacing-between-function-identifiers-and-their-invocations-func-call-spacing)
- **Code Examples:**

  Do this:

  ```
  if (var) {
      // code here
  }

  for (x = 0; x < array.length; x++ ) {
      // code here
  }

  function myFunction() {
      // code here
  }
  ```

  Not this:

  ```
  if(var){
      // code here
  }

  for(x = 0; x < array.length; x++ ){
      // code here
  }

  function myFunction () {
      // code here
  }
  ```

**Do** put a space between parenthesis and curly braces in a function or code block.

- **ESLint:** [space-before-function-paren](https://eslint.org/docs/rules/space-before-function-paren#require-or-disallow-a-space-before-function-parenthesis-space-before-function-paren), [space-before-blocks](https://eslint.org/docs/rules/space-before-blocks#require-or-disallow-space-before-blocks-space-before-blocks)

**Do** use two spaces for tabs / indents.

- **ESLint:** [indent](https://eslint.org/docs/rules/indent#enforce-consistent-indentation-indent)

**Do** place proper spacing when declaring variables.

- **ESLint:** [space-infix-ops](https://eslint.org/docs/rules/space-infix-ops#require-spacing-around-infix-operators-space-infix-ops)
- **Code Examples:**

  Do this:

  ```
  const x = 0;
  ```

  Not this:

  ```
  const x=0;
  ```

**Do** terminate all lines with semicolons except code blocks (conditionals, iterators) and functions.

- **ESLint:** [semi](https://eslint.org/docs/rules/semi#require-or-disallow-semicolons-instead-of-asi-semi)

**Do** use curly braces around code blocks, including switch / case statements.

- **ESLint:** [no-case-declarations](https://eslint.org/docs/rules/no-case-declarations#disallow-lexical-declarations-in-casedefault-clauses-no-case-declarations), [nonblock-statement-body-position](https://eslint.org/docs/rules/nonblock-statement-body-position#enforce-the-location-of-single-line-statements-nonblock-statement-body-position)
- **Why?** This improves readability.
- **Why?** This ensures the scope is correctly encapsulated.

**Do** put comments on their own lines.

- **Code Examples:**

  Do this:

  ```
  // this shows the error messages under fields
  let displayErrors = true;
  ```

  Not this:

  ```
  let displayErrors = true; // this shows the error messages under fields
  ```

**Do** put a space between the // and the comment content.

- **Code Examples:**

  Do this:

  ```
  // comment
  ```

  Not this:

  ```
  //comment
  ```

**Do** indent chained methods on a new line.

**Do** use trailing commas.

- **ESLint:** [comma-dangle](https://eslint.org/docs/rules/comma-dangle#require-or-disallow-trailing-commas-comma-dangle)
- **Why?** It allows for more accurate git diffs.
- **Code Examples:**

  Do this:

  ```
  constructor(
      private router: Router,
      private formService: FormService,
    ) {}
  ```

  Not this:

  ```
  constructor(
      private router: Router,
      private formService: FormService
    ) {}
  ```

**Don’t** add multiple consecutive blank lines inside of code blocks except for one blank line to set apart nested code blocks.

- **ESLint:** [padded-blocks](https://eslint.org/docs/rules/padded-blocks#require-or-disallow-padding-within-blocks-padded-blocks), [no-multiple-empty-lines](https://eslint.org/docs/rules/no-multiple-empty-lines#disallow-multiple-empty-lines-no-multiple-empty-lines)
- **Code Examples:**

  Do this:

  ```
  function myFunction(form) {
      let displayErrors = !!form.errors.length;

      if (displayErrors) {
          return;
      }
  }
  ```

  Not this:

  ```
  function myFunction(form) {
      let displayErrors = !!form.errors.length;
  ```

  ```
    if (displayErrors) {

        return;
    }
  ```

  }

  ```

  ```

### Third party JS libraries

**Do** examine the reasons why you want to introduce another JavaScript library.

**Do** research ways to write the functionality without using a third party library.

**Do** install third party libraries using NPM and save them in the package.json file.

**Do** check the approved third party libraries list before installing it.

- **TSLint:** [import-blacklist](https://palantir.github.io/tslint/rules/import-blacklist/) could do: bootstrap, jQuery (only for Angular projects)

**Do** add polyfills or uncomment the polyfills in the polyfills.ts file to ensure cross-browser functionality.

**Do** use vanilla ES6 over lodash when possible.

- **Why?** Using ES6 ensures we’re all on the same page and consistent.
- **Why?** Installing lodash without utilizing the more customized functions adds bloat and dependencies to the codebase.

**Consider** using another third party library if it contains multiple pieces of functionality you need for the application versus one method.

**Don’t** mix jQuery in with Angular.

- **TLint:** [import-blacklist](https://palantir.github.io/tslint/rules/import-blacklist/) could do: bootstrap, jQuery (only for Angular projects)
- **Why?** jQuery is a heavy library and adds a lot of bloat to the codebase.
- **Why?** Angular has much of the same functionality baked in (i.e., animations, Ajax calls).
- **Why?** Many of the reasons for integrating jQuery is for one method (i.e., the .toggle() ) which could easily be replicated with vanilla JavaScript or Angular Animations.
- **Why?** jQuery and Angular event handling tends to clash with each other.

**Don’t** use JavaScript if you can use CSS to provide the same interaction (I.e., transitions).

### Typescript

**Do** use Typescript extensions for Angular and Sharepoint projects.

**Consider** creating models and interfaces to assign to variables instead of defaulting to a type of any.

- **Why?** Creating models and interfaces allows us to prototype and extend classes.
- **Why?** Creating models and interfaces acts as living documentation for the app so new developers know what properties belong on an object and how to use it.

**Don’t** use optional parameters in callbacks unless you mean it.

- **Why?** It makes it difficult to tell what data is needed and what will be returned.
- **Why?** You can pass in less arguments instead.

**Don’t** use types of String, Boolean, Number, and Object; instead use: string, boolean, number, object.

- **TSLint:** [no-construct](https://palantir.github.io/tslint/rules/no-construct/)
- **Why?** The uppercase types refer to non-primitive objects.

### Scoping and Initialization

**Do** use const for declaring most complex typed (I.e., objects, arrays, functions) variables that shouldn’t be reassigned.

- **ESLint:** [prefer-const](https://eslint.org/docs/rules/prefer-const#suggest-using-const-prefer-const), [no-const-assign](https://eslint.org/docs/rules/no-const-assign#disallow-modifying-variables-that-are-declared-using-const-no-const-assign)
- **Why?** Preventing reassignment helps prevent bugs caused by reusing a variable.
- **Why?** It keeps all declarations in one place so we know what kind of value to expect.
- **Why?** Declaring variables with const adds intention to that variable and makes it more readable for the next developer.
- **Why?** Declaring variables with const allows you to utilize block scoping.

**Do** use let for declaring primitive typed variables and variables that should be reassigned.

- **ESLint:** [no-var](https://eslint.org/docs/rules/no-var#require-let-or-const-instead-of-var-no-var)
- **Why?** Declaring variables with let adds intention to that variable and makes it more readable for the next developer.
- **Why?** Declaring variables with let allows you to utilize lexical scoping.

**Do** use arrow functions for maintaining block scoping, especially for anonymous and callback functions.

- **ESLint:** [prefer-arrow-callback](https://eslint.org/docs/rules/prefer-arrow-callback#require-using-arrow-functions-for-callbacks-prefer-arrow-callback), [arrow-spacing](https://eslint.org/docs/rules/arrow-spacing#require-space-beforeafter-arrow-functions-arrow-arrow-spacing)
- **Why?** When writing loops, we don’t have to use an IIFE / closure to maintain the current scope of the variables.
- **Why?** It doesn’t change the scope that the this keyword exists in.

**Do** use the literal syntax (I.e., const obj = {} ) for declaring complex typed variables.

- **ESLint:** [no-new-object](https://eslint.org/docs/rules/no-new-object#disallow-object-constructors-no-new-object), [no-array-constructor](https://eslint.org/docs/rules/no-array-constructor#disallow-array-constructors-no-array-constructor), [no-new-func](https://eslint.org/docs/rules/no-new-func#disallow-function-constructor-no-new-func)
- **Code Examples:**

  Do this:

  ```
  const obj = {};
  ```

  Not this:

  ```
  const obj = new Object();
  ```

**Do** remove unused variables and imports.

- **Why?** Leaving unused variables and imports in reduces readability.
- **Why?** Leaving unused variables and imports in makes it hard to debug or determine which variable is used for a result in the program.

**Don’t** chain variable assignments.

- **Why?** This creates global variables.
- **Code Examples:**

  Do this:

  ```
  const b = c;
  const a = b;
  ```

  Not this:

  ```
  const a = b = c;
  ```

### Conditionals

**Do** group conditionals when nesting without an else statement.

- **Code Examples:**

  Do this:

  ```
  if (displayErrors && errors.length) {
      return;
  }
  ```

  Not this:

  ```
  if (displayErrors) {
      if (errors.length) {
          return;
      }
  }
  ```

**Do** use guard clauses.

- **Code Example**

  Do this:

  ```
  function saveUser(user) {
      if (user.errors) return;
      http.post(user).then(displaySuccessMessage);
  }
  ```

  Not this:

  ```
  function saveUser(user) {
      if (user.errors) {
          return;
      } else {
          http.post(user).then(displaySuccessMessage);
      }
  }
  ```

**Do** use strict equality over loose equality.

- **ESLint:** [eqeqeq](https://eslint.org/docs/rules/eqeqeq#require--and--eqeqeq)
- **Why?** It checks for the value as well as the type.
- **Code Examples:**

  Do this:

  ```
  if (errors.length === 0) {
    // code here
  }
  ```

  Not this:

  ```
  if (errors.length == 0) {
    // code here
  }
  ```

**Do** shortcut Booleans (I.e., if (var) instead of if (var === true) or if (!var) instead of if (var === null) )

**Do** use parenthesis to separate complex conditional statements with multiple operators.

- **ESLint:** [no-mixed-operators](https://eslint.org/docs/rules/no-mixed-operators#disallow-mixes-of-different-operators-no-mixed-operators)
- **Why?** Improves readability.
- **Why?** Ensures the conditional is executed as intended.
- **Code Examples:**

  Do this:

  ```
  if ((displayErrors && errors.length) || (notSubmitted && profileIncomplete)) {
      // code here
  }
  ```

  Not this:

  ```
  if (displayErrors && errors.length || notSubmitted && profileIncomplete) {
      // code here
  }
  ```

**Don’t** use ternary statements for nested conditionals if you can help it (you might need to for Sharepoint).

- **Why?** This is difficult to read and maintain.
- **Code Examples:**

  Do this:

  ```
  if (!conditionA) {
      return valueC;
  } else if (conditionB) {
      return valueA;
  } else {
      return valueB;
  }
  ```

  Not this:

  ```
  return (!conditionA)
      ? valueC
      : (conditionB)
      ? valueA
      : valueB
  ```

**Don’t** use ternary statements for assigning a Boolean value

- **Code Examples:**

  Do this:

  ```
  const a = true;
  const exists = const a;
  ```

  Not this:

  ```
  const a = true;
  const exists = a ? true : false;
  ```

**Don’t** use an else statement when an if statement returns.

- **ESLint:** [no-else-return](https://eslint.org/docs/rules/no-else-return#disallow-return-before-else-no-else-return)
- **Why?** It is unnecessary lines of code since a return exits the current code block and if the statement is not true, then the code will continue executing.
- **Code Examples:**

  Do this:

  ```
  if (errors.length) {
      return;
  }

  this.saveUser();
  ```

  Not this:

  ```
  if (errors.length) {
      return;
  } else {
      this.saveUser();
  }
  ```

**Do** keep conditionals as flat as possible (don’t nest multiple conditionals if possible).

- **Why?** Nested conditional statements and code blocks introduce cyclomatic complexity, making it difficult to read, understand, and maintain.
- **Code Examples:**

  Do this:

  ```
  const loggedIn = true;
  const role = 'admin';
  const currentPage = 'adminDashboard';
  const notAuthorized = loggedIn && role !== 'admin' && currentPage === 'adminDashboard';

  if (!loggedIn || notAuthorized) return;
  if (role === 'admin' && currentPage !== 'adminDashboard') {
      // let the user see the admin sidebar
  } else {
      // let the user access the page
  }
  ```

  Not this:

  ```
  const loggedIn = true;
  const role = 'admin';
  const currentPage = 'adminDashboard';

  if (loggedIn == true) {
      if (role == 'admin') {
          if (currentPage == 'adminDashboard') {
              // let the user access the page
          } else {
              // let the user see the admin sidebar
          }
      } else {
          if (currentPage == 'adminDashboard') {
              // kick them back
          } else {
              // let them access the page
          }
      }
  } else {
      // kick them back
  }
  ```

### Miscellaneous Code Smells

**Do** try to avoid coercing a variable from one type to another.

**Do** avoid coercing a variable to another type and then back to the original type.

**Do** keep functions and classes small and simple – they should perform one action.

- **Why?** This follows the single responsibility principle (SRP).
- **Why?** It makes code readable and maintainable.
- **Why?** It makes code reusable.
- **Why?** It makes code testable.

**Do** use a debouncer and subscription on API calls on key events.

- **Why?** It keeps the program from being too chatty.
- **Why?** Using a subscription means we can cancel the previous subscription when we call the API again.

**Do** refactor similar code structures to utilize a reusable function.

- **Code Examples:**

  Do this:

  ```
  emitEvent(event, value) {
      event.emit(value);
  }
  ```

  Not this:

  ```
  emitClick(value) {
      click.emit(value);
  }

  emitMouseover(value) {
      mouseover.emit(value);
  }
  ```

**Do** refactor code if you find yourself adding too many comments about what it does.

- **Why?** Explaining what a piece of code does via comments indicates the code is too complex to be readable or understandable.
- **Why?** Self documenting code is more valuable than lines of comments.

**Don’t** leave empty code blocks.

- **ESLint:** [no-empty](https://eslint.org/docs/rules/no-empty#disallow-empty-block-statements-no-empty)
- **Why?** Adds code bloat and clouds intention.
- **Code Examples:**

  Do this:

  ```
  if (checked) {
      // code here
  }
  ```

  Not this:

  ```
  function testFunction {
  }

  if (checked) {
      // code here
  } else {
  }
  ```

**Don’t** duplicate / copy & paste a code block and change a few characters in order to reuse it.

- **Why?** Violates DRY (Don’t Repeat Yourself) and makes it so you can’t easily maintain your codebase (with changes and bug fixes).
- **Why?** We can refactor to create a more generic function and turn the changes into parameters; this makes it easier to test.

**Don’t** use anonymous functions (except for some callbacks in arrow functions).

- **Why?** It makes debugging / tracing more difficult when using anonymous functions.
- **Code Examples:**

  Do this:

  ```
  document.addEventListener("click", handleClick);
  function handleClick() {
      document.getElementById("demo").innerHTML = "Hello World";
  }
  ```

  Not this:

  ```
  document.addEventListener("click", () => {
      document.getElementById("demo").innerHTML = "Hello World";
  });
  ```

**Don’t** use long parameter lists in functions.

- **ESLint:** [max-params](https://eslint.org/docs/rules/max-params#enforce-a-maximum-number-of-parameters-in-function-definitions-max-params)
- **Why?** It’s difficult to understand.
- **Why?** It’s easy to omit a parameter or create inconsistencies.
- **Why?** Long parameter lists are an indication the function is too complex / doing more than one thing.
- **Code Examples:**

  Do this:

  ```
  function setValues(object) {
      this.secondObject = {...secondObject, ...object};
  }
  ```

  Not this:

  ```
  function setValues(name, value, status, date, time, createdBy, description) {
      this.secondObject.name = name;
      this.secondObject.value = value;
      this.secondObject.status = status;
  }
  ```

**Don’t** pass a value directly into a function call; assign it to a variable and pass the variable.

- **ESLint:** [no-magic-numbers](https://eslint.org/docs/rules/no-magic-numbers#disallow-magic-numbers-no-magic-numbers)
- **Why?** Assigning a variable describes intent and makes the code more readable.
- **Code Examples:**

  Do this:

  ```
  const buttonClicked = true;
  this.emitClick(buttonClicked);
  ```

  Not this:

  ```
  this.emitClick(true);
  ```

### Resources:

- [AirBnB JavaScript Styleguide](https://github.com/airbnb/javascript)
- [Typescript Dos and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Code Smell Cheat Sheet](http://www.sihui.io/code-smell-cheat-sheet/)
- [JavaScript Smells by Elijah Manor](https://elijahmanor.com/talks/js-smells/#/1)
