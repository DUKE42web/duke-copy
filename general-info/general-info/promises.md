# 💍 Promises

### Promises

Promises are a pattern that helps with one particular kind of asynchronous programming: functions (or methods) that return their results asynchronously. To implement such a function, you return a _promise_, an object that is a placeholder for the result. The caller of the function registers callbacks with the promise to be notified once the result has been computed. The function sends the result via the promise.

The de-facto standard for JavaScript promises is called Promises/A+ [\[1\]](https:
//2ality.com/2014/10/es6-promises-api.html#fn1). The ECMAScript 6 promise API follows that standard.

### A first example

Let's look at a first example, to give you a taste of what working with promises is like.

With Node.js-style callbacks, reading a file asynchronously looks like this:

```js
fs.readFile("config.json", function (error, text) {
  if (error) {
    console.error("Error while reading config file");
  } else {
    try {
      var obj = JSON.parse(text);
      console.log(JSON.stringify(obj, null, 4));
    } catch (e) {
      console.error("Invalid JSON in file");
    }
  }
});
```

With promises, the same functionality is implemented like this:

```js
readFilePromisified("config.json")
  .then(function (text) {
    // (A)
    var obj = JSON.parse(text);
    console.log(JSON.stringify(obj, null, 4));
  })
  .catch(function (reason) {
    // (B)

    // File read error or JSON SyntaxError
    console.error("An error occurred", reason);
  });
```

There are still callbacks, but they are provided via methods that are invoked on the result (`then()` and `catch()`). The error callback in line (B) is convenient in two ways: First, it's a single style of handling errors. Second, you can handle the errors of both `readFilePromisified()` and the callback from line (A).

### Creating and using promises

Let's look at how promises are operated from the producer and the consumer side.

#### Producing a promise

As a producer, you create a promise and send a result via it:

```js
var promise = new Promise(
    function (resolve, reject) {
// (A)
        ...
        if (...) {
            resolve(value);
// success
        } else {
            reject(reason);
// failure
        }
    });
```

A promise is always in either one of three (mutually exclusive) states:

- Pending: the result hasn't been computed, yet
- Fulfilled: the result was computed successfully
- Rejected: a failure occurred during computation

A promise is _settled_ (the computation it represents has finished) if it is either fulfilled or rejected. A promise can only be settled once and then stays settled. Subsequent attempts to settle it have no effect.

![](https:
//2ality.com/2014/10/es6-promises-api/promise_states_simple.jpg)

The parameter of `new Promise()` (starting in line (A)) is called an _executor_:

- If the computation went well, the executor sends the result via `resolve()`. That usually fulfills the promise (it may not, if you resolve with a promise, as explained later).
- If an error happened, the executor notifies the promise consumer via `reject()`. That always rejects the promise.

#### Consuming a promise

As a consumer of `promise`, you are notified of a fulfillment or a rejection via _reactions_ - callbacks that you register with the method `then()`:

```js
promise.then(
  function (value) {
    /* fulfillment */
  },
  function (reason) {
    /* rejection */
  }
);
```

What makes promises so useful for asynchronous functions (with one-off results) is that once a promise is settled, it doesn't change anymore. Furthermore, there are never any race conditions, because it doesn't matter whether you invoke `then()` before or after a promise is settled:

- In the former case, the appropriate reaction is called as soon as the promise is settled.
- In the latter case, the promise result (fulfillment value or rejection value) is cached and handed to the appropriate reaction "immediately" (queued as a task).

#### Only handling fulfillments or rejections

If you are only interested in fulfillments, you can omit the second parameter of `then()`:

```js
promise.then(function (value) {
  /* fulfillment */
});
```

If you are only interested in rejections, you can omit the first parameter. The method `catch()` is a more compact way of doing the same thing.

```js
promise.then(null, function (reason) {
  /* rejection */
});

// Equivalent:
promise.catch(function (reason) {
  /* rejection */
});
```

It is recommended to use `then()` exclusively for fulfillments and `catch()` for errors, because it nicely labels callbacks and because you can handle the rejections of multiple promises at the same time (how is explained later).

### Examples

Let's use these basic building blocks in a few examples.

#### Example: promisifying XMLHttpRequest

The following is a promise-based function that performs an HTTP GET via the event-based [XMLHttpRequest](https:
//xhr.spec.whatwg.org) API:

```js
function httpGet(url) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.status === 200) {
        // Success
        resolve(this.response);
      } else {
        // Something went wrong (404 etc.)
        reject(new Error(this.statusText));
      }
    };
    request.onerror = function () {
      reject(new Error("XMLHttpRequest Error: " + this.statusText));
    };
    request.open("GET", url);
    request.send();
  });
}
```

This is how you use `httpGet()`:

```js
httpGet("http:
//example.com/file.txt").then(
  function (value) {
    console.log("Contents: " + value);
  },
  function (reason) {
    console.error("Something went wrong", reason);
  }
);
```

#### Example: delaying an activity

Let's implement `setTimeout()` as the promise-based function `delay()` (similar to [`Q.delay()`](https:
//github.com/kriskowal/q/wiki/API-Reference#qdelayms)).

```js
function delay(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ms);
    // (A)
  });
}

// Using delay():
delay(5000).then(function () {
  // (B)
  console.log("5 seconds have passed!");
});
```

Note that in line (A), we are calling `resolve` with zero parameters, which is the same as calling `resolve(undefined)`. We don't need the fulfillment value in line (B), either and simply ignore it. Just being notified is enough here.

#### Example: timing out a promise

```js
function timeout(ms, promise) {
  return new Promise(function (resolve, reject) {
    promise.then(resolve);
    setTimeout(function () {
      reject(new Error("Timeout after " + ms + " ms"));
      // (A)
    }, ms);
  });
}
```

Note that the rejection after the timeout (in line (A)) does not cancel the request, but it does prevent the promise being fulfilled with its result.

Using `timeout()` looks like this:

```js
timeout(5000, httpGet("http:
//example.com/file.txt"))
  .then(function (value) {
    console.log("Contents: " + value);
  })
  .catch(function (reason) {
    console.error("Error or timeout", reason);
  });
```

### Chaining `then()`

The result of a method call

```js
P.then(onFulfilled, onRejected);
```

is a new promise Q. That means that you can keep the promised-based control flow going by invoking `then()` on Q:

- Q is resolved with what is returned by either `onFulfilled` or `onRejected`.
- Q is rejected if either `onFulfilled` or `onRejected` throw an exception.

#### Resolving with normal values

If you resolve the promise Q returned by `then()` with a normal value, you can pick up that value via a subsequent `then()`:

```js
asyncFunc()
  .then(function (value1) {
    return 123;
  })
  .then(function (value2) {
    console.log(value2);
    // 123
  });
```

#### Resolving with thenables

You can also resolve the promise Q returned by `then()` with a _thenable_ R. A thenable is any object that has a promise-style method `then()`. Thus, promises are thenable. Resolving with R (e.g. by returning it from `onFulfilled`) means that it is inserted "after" Q: R's settlement is forwarded to Q's `onFulfilled` and `onRejected` callbacks. In a way, Q becomes R.

![](https:
//2ality.com/2014/10/es6-promises-api/resolve_with_thenable.jpg)

The main use for this mechanism is to flatten nested `then()` calls, like in the following example:

```js
asyncFunc1()
.then(function (value1) {
    asyncFunc2()
    .then(function (value2) {
        ...
    });
})
```

The flat version looks like this:

```js
asyncFunc1()
.then(function (value1) {
    return asyncFunc2();
})
.then(function (value2) {
    ...
})
```

### Error handling

As mentioned previously, whatever you return in an error handler becomes a fulfillment value (not rejection value!). That allows you to specify default values that are used in case of failure:

```js
retrieveFileName()
.catch(function () {

// Something went wrong, use a default value
    return 'Untitled.txt';
})
.then(function (fileName) {
    ...
});
```

#### Catching exceptions

Exceptions in the executor are passed on to the next error handler.

```js
new Promise(function (resolve, reject) {
  throw new Error();
}).catch(function (err) {
  // Handle error here
});
```

As are exceptions that are thrown in either one of `then`'s parameters:

```js
asyncFunc()
  .then(function (value) {
    throw new Error();
  })
  .catch(function (reason) {
    // Handle error here
  });
```

#### Chaining errors

There can be one or more `then()` method calls that don't provide an error handler. Then the error is passed on until there is an error handler.

```js
asyncFunc1()
  .then(asyncFunc2)
  .then(asyncFunc3)
  .catch(function (reason) {
    // Something went wrong above
  });
```

### Composition

This section describes how you can compose existing promises to create new ones. We have already encountered one way of composing promises: sequential chaining via `then()`. `Promise.all()` and `Promise.race()` provide additional ways of composing.

#### `map()` via `Promise.all()`

One nice thing about promises is that many synchronous tools still work, because promise-based functions return results. For example, you can use the array method `map()`:

```js
var fileUrls = ["http:
//example.com/file1.txt", "http:
//example.com/file2.txt"];
var promisedTexts = fileUrls.map(httpGet);
```

`promisedTexts` is an array of promises. `Promise.all()` takes an array of promises (thenables and other values are converted to promises via `Promise.resolve()`) and, once all of them are fulfilled, it fulfills with an array of their values:

```js
Promise.all(promisedTexts)
  .then(function (texts) {
    texts.forEach(function (text) {
      console.log(text);
    });
  })
  .catch(function (reason) {
    // Receives first rejection among the promises
  });
```

#### Timing out via `Promise.race()`

`Promise.race()` takes an array of promises (thenables and other values are converted to promises via `Promise.resolve()`) and returns a promise P. The first of the input promises that is settled passes its settlement on to the output promise.

As an example, let's use `Promise.race()` to implement a timeout:

```js
Promise.race([
    httpGet('http:
//example.com/file.txt'),
    delay(5000).then(function () {
        throw new Error('Timed out')
    });
])
.then(function (text) { ... })
.catch(function (reason) { ... });
```

### Promises are always async

A promise library has complete control over whether results are delivered to promise reactions synchronously (right away) or asynchronously (after the current continuation, the current piece of code, is finished). However, the Promises/A+ specification demands that the latter mode of execution be always used. It states so via the following [requirement](http:
//promisesaplus.com/#point-34) (2.2.4) for the `then()` method:

> `onFulfilled` or `onRejected` must not be called until the execution context stack contains only platform code.

That means that you code can rely on run-to-completion semantics (as explained in part 1) and that chaining promises won't starve other tasks of processing time.

### Cheat sheet: the ECMAScript 6 promise API

This section gives an overview of the ECMAScript 6 promise API, as described in the [specification](https:
//people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects).

#### Glossary

The promise API is about delivering results asynchronously. A _promise object_ (short: promise) is a stand-in for the result, which is delivered via that object.

States:

- A promise is always in either one of three mutually exclusive states:
  - Before the result is ready, the promise is _pending_.
  - If a result is available, the promise is _fulfilled_.
  - If an error happened, the promise is _rejected_.
- A promise is _settled_ if "things are done" (if it is either fulfilled or rejected).
- A promise is settled exactly once and then remains unchanged.

Reacting to state changes:

- _Promise reactions_ are callbacks that you register with the promise method `then()`, to be notified of a fulfillment or a rejection.
- A _thenable_ is an object that has a promise-style `then()` method. Whenever the API is only interested in being notified of settlements, it only demands thenables.

Changing states: There are two operations for changing the state of a promise. After you have invoked either one of them once, further invocations have no effect.

- _Rejecting_ a promise means that the promise becomes rejected.
- _Resolving_ a promise has different effects, depending on what value you are resolving with:
  - Resolving with a normal (non-thenable) value fulfills the promise.
  - Resolving a promise P with a thenable T means that P can't be resolved anymore and will now follow T's state, including its fulfillment or rejection value. The appropriate P reactions will get called once T settles (or are called if T is already settled).

####

constructor

The
constructor for promises has the following signature:

```js
var p = new Promise(executor(resolve, reject));
```

It creates a promise whose behavior is determined by the callback `executor`. It can use its parameters to resolve or reject `p`:

- `resolve(x)` resolves `p` with `x`:
  - If `x` is thenable, its settlement is forwarded to `p` (which includes triggering reactions registered via `then()`).
  - Otherwise, `p` is fulfilled with `x`.
- `reject(e)` rejects `p` with the value `e` (often an instance of [`Error`](http:
  //speakingjs.com/es5/ch14.html#error\_
  constructors)).

#### Static methods

All static methods of `Promise` support subclassing: they create new instances via their receiver (think: `new this(...)`) and also access other static methods via it (`this.resolve(...)` versus `Promise.resolve(...)`).

**Creating promises**

The following two methods create new instances of their receiver (their `this`).

- `Promise.resolve(x)`:
  - If `x` is thenable, it is converted to a promise (an instance of the receiver).
  - If `x` is a promise, it is returned unchanged.
  - Otherwise, return a new instance of the receiver that is fulfilled with `x`.
- `Promise.reject(reason)`: creates a new promise that is rejected with the value `reason`.

**Composing promises**

Intuitively, the static methods `Promise.all()` and `Promise.race()` compose iterables of promises to a single promise. That is:

- They take an iterable. The elements of the iterable are converted to promises via `this.resolve()`.
- They return a new promise. That promise is a fresh instance of the receiver.

The methods are:

- `Promise.all(iterable)`: returns a promise that…
  - is fulfilled if all elements in `iterable` are fulfilled.\
    Fulfillment value: array with fulfillment values.
  - is rejected if any of the elements are rejected.\
    Rejection value: first rejection value.
- `Promise.race(iterable)`: the first element of `iterable` that is settled is used to settle the returned promise.

#### Instance prototype methods

`Promise.prototype.then(onFulfilled, onRejected)`:

- The callbacks `onFulfilled` and `onRejected` are called _reactions_.
- `onFulfilled` is called immediately if the promise is already fulfilled or as soon as it becomes fulfilled. Similarly, `onRejected` is informed of rejections.
- `then()` returns a new promise Q (created via the
  constructor of the receiver):
  - If either of the reactions returns a value, Q is resolved with it.
  - If either of the reactions throws an exception, Q is rejected with it.
- Omitted reactions:
  - If `onFulfilled` has been omitted, a fulfillment of the receiver is forwarded to the result of `then()`.
  - If `onRejected` has been omitted, a rejection of the receiver is forwarded to the result of `then()`.

Default values for omitted reactions could be implemented like this:

```js
function defaultOnFulfilled(x) {
  return x;
}
function defaultOnRejected(e) {
  throw e;
}
```

`Promise.prototype.catch(onRejected)`:

- Same as `then(null, onRejected)`.

### Pros and cons of promises

#### The pros

**Unifying asynchronous APIs**

One important advantage of promises is that they will increasingly be used by asnychronous browser APIs and unify currently diverse and incompatible patterns and conventions. Let's look at two upcoming promise-based APIs.

The fetch API is a promise-based alternative to XMLHttpRequest:

```js
fetch(url)
.then(request => request.text())
.then(str => ...)
```

`fetch()` returns a promise for the actual request, `text()` returns a promise for the content as a string.

The [ECMAScript 6 API](https:
//2ality.com/2014/09/es6-modules-final.html#the_ecmascript_6_module_loader_api) for programmatically importing modules is based on promises, too:

```js
 System.import('some_module.js')
.then(some_module => {
    ...
})
```

**Promises versus events**

Compared to events, promises are better for handling one-off results. It doesn't matter whether you register for a result before or after it has been computed, you will get it. This advantage of promises is fundamental in nature. On the flip side, you can't use them for handling recurring events. Chaining is another advantage of promises, but one that could be added to event handling.

**Promises versus callbacks**

Compared to callbacks, promises have cleaner function (or method) signatures. With callbacks, parameters are used for input and output:

```js
fs.readFile(name, opts?, function (err, data))
```

With promises, all parameters are used for input:

```js
readFilePromisified(name, opts?)
    .then(dataHandler, errorHandler)
```

Additional promise advantages include better error handling (which integrates exceptions) and easier composition (because you can reuse some synchronous tools such as `Array.prototype.map()`).

#### The cons

Promises work well for for single asynchronous results. They are not suited for:

- Recurring events: If you are interested in those, take a look at [reactive programming](http:
  //reactive-extensions.github.io/RxJS/), which add a clever way of chaining to normal event handling.
- Streams of data: A [standard](https:
  //streams.spec.whatwg.org) for supporting those is currently in development.

ECMAScript 6 promises lack two features that are sometimes useful:

- You can't cancel them.
- You can't query them for how far along they are (e.g. to display a progress bar in a client-side user interface).

The Q promise library has [support](https:
//github.com/kriskowal/q#progress-notification) for the latter and there are [plans](https:
//github.com/promises-aplus) to add both capabilities to Promises/A+.

### Promises and generators

With the help of a utility function such as `Q.spawn()`, you can use promise-based functions inside shallow coroutines, implemented via generators. This has the important advantage that the code looks synchronous and that you can use synchronous mechanisms such a `try-catch`:

```js
Q.spawn(function* () {
  try {
    let [foo, bar] = yield Promise.all([
      // (A)
      httpGet("foo.json"),
      httpGet("bar.json"),
    ]);
    render(foo);
    render(bar);
  } catch (e) {
    console.log("Read failed: " + e);
  }
});
```

The parameter of `Q.spawn()` is a generator function [\[2\]](https:
//2ality.com/2014/10/es6-promises-api.html#fn2). If the `yield` operator is used, the following things happen:

1. Execution of the function is paused.
2. The operand of `yield` is "returned" by the function. (It's not exactly a "return", but ignore that for now.)
3. Later, the function can be resumed with a value or an exception. In the former case, execution continues where it was previously paused and `yield` returns the value. In the latter case, an exception is thrown inside the function, as if it were thrown "inside" `yield`'s operand.

Thus, it's clear what `Q.spawn()` has to do: When the generator function yields a promise, `spawn` registers reactions and waits for a settlement. If the promise is fulfilled, the generator is resumed with the result. If the promise is rejected, an exception is thrown inside the generator.

There is [a proposal](https:
//github.com/lukehoban/ecmascript-asyncawait) to add support for spawning to JavaScript, via the new syntactic
construct "async functions". The previous example as an async function looks as follows. Under the hood, there is not much of a difference - async functions are based on generators.

```js
async function () {
    try {
        let [foo, bar] = await Promise.all([
            httpGet('foo.json'),
            httpGet('bar.json')
        ]);
        render(foo);
        render(bar);
    } catch (e) {
        console.log('Read failed: ' + e);
    }
}
```

### Debugging promises

The main challenge with debugging asynchronous code is that it contains asynchronous function and method calls. Asynchronous calls originate in one task and are carried out in a new task. If something goes wrong in the new task, a stack trace will only cover that task and not contain information about previous tasks. Thus, you have to make do with much less debugging information in asynchronous programming.

Google Chrome recently got the ability to debug asynchronous code [\[3\]](https:
//2ality.com/2014/10/es6-promises-api.html#fn3). It doesn't completely support promises, yet, but it's impressive how well it handles normal asynchronous calls. For example, in the following code, `first` asynchronously calls `second` which in turn calls `third`.

```js
function first() {
  setTimeout(function () {
    second("a");
  }, 0);
  // (A)
}
function second(x) {
  setTimeout(function () {
    third("b");
  }, 0);
  // (B)
}
function third(x) {
  debugger;
}
first();
```

As you can see in the screen shot, the debugger shows a stack trace that contains all three functions. It even includes the anonymous functions in line (A) and (B).

![](https:
//2ality.com/2014/10/es6-promises-api/debugging_callbacks.png)

### The internals of promises

In this section, we will approach promises from a different angle: Instead of learning how to use the API, we will look at a simple implementation of it. This different angle helped me greatly with making sense of promises.

The promise implementation is called DemoPromise and available [on GitHub](https:
//github.com/rauschma/demo_promise). In order to be easier to understand, it doesn't completely match the API. But it is close enough to still give you much insight into the challenges that actual implementations are facing.

`DemoPromise` is a
constructor with three instance prototype methods:

- `DemoPromise.prototype.resolve(value)`
- `DemoPromise.prototype.reject(reason)`
- `DemoPromise.prototype.then(onFulfilled, onRejected)`

That is, `resolve` and `reject` are methods (versus functions handed to a callback parameter of the
constructor).

#### A stand-alone promise

Our first implementation is a stand-alone promise with minimal functionality:

- You can create a promise.
- You can resolve or reject a promise and you can only do it once.
- You can register _reactions_ (callbacks) via `then()`. The method does not support chaining, yet - it does not return anything. It must work independently of whether the promise has already been settled or not.

This is how this first implementation is used:

```js
var dp = new DemoPromise();
dp.resolve("abc");
dp.then(function (value) {
  console.log(value);
  // abc
});
```

The following diagram illustrates how our first `DemoPromise` works:

![](https:
//2ality.com/2014/10/es6-promises-api/promise1_simple.jpg)

Let's examine `then()` first. It has to handle two cases:

- If the promise is still pending, it queues invocations of `onFulfilled` and `onRejected`, to be used when the promise is settled.
- If the promise is already fulfilled or rejected, `onFulfilled` or `onRejected` can be invoked right away.

```js
DemoPromise.prototype.then = function (onFulfilled, onRejected) {
  var self = this;
  var fulfilledTask = function () {
    onFulfilled(self.promiseResult);
  };
  var rejectedTask = function () {
    onRejected(self.promiseResult);
  };
  switch (this.promiseState) {
    case "pending":
      this.fulfillReactions.push(fulfilledTask);
      this.rejectReactions.push(rejectedTask);
      break;
    case "fulfilled":
      addToTaskQueue(fulfilledTask);
      break;
    case "rejected":
      addToTaskQueue(rejectedTask);
      break;
  }
};
function addToTaskQueue(task) {
  setTimeout(task, 0);
}
```

`resolve()` works as follows: If the promise is already settled, it does nothing (ensuring that a promise can only be settled once). Otherwise, the state of the promise changes to `'fulfilled'` and the result is cached in `this.promiseResult`. All fulfillment reactions that have been enqueued so far must be triggered now.

```js
Promise.prototype.resolve = function (value) {
  if (this.promiseState !== "pending") return;
  this.promiseState = "fulfilled";
  this.promiseResult = value;
  this._clearAndEnqueueReactions(this.fulfillReactions);
  return this;
  // enable chaining
};
Promise.prototype._clearAndEnqueueReactions = function (reactions) {
  this.fulfillReactions = undefined;
  this.rejectReactions = undefined;
  reactions.map(addToTaskQueue);
};
```

`reject()` is similar to `resolve()`.

#### Chaining

The next feature we implement is chaining:

- `then()` returns a promise that is resolved with what either `onFulfilled` or `onRejected` return.
- If `onFulfilled` or `onRejected` are missing, whatever they would have received is passed on to the promise returned by `then()`.

![](https:
//2ality.com/2014/10/es6-promises-api/promise2_chaining.jpg)

Obviously, only `then()` changes:

```javascript
DemoPromise.prototype.then = function (onFulfilled, onRejected) {
    var returnValue = new DemoPromise();
// (A)
    var self = this;

    var fulfilledTask;
    if (typeof onFulfilled === 'function') {
        fulfilledTask = function () {
            var r = onFulfilled(self.promiseResult);
            returnValue.resolve(r);
// (B)
        };
    } else {
        fulfilledTask = function () {
            returnValue.resolve(self.promiseResult);
// (C)
        };
    }

    var rejectedTask;
    if (typeof onRejected === 'function') {
        rejectedTask = function () {
            var r = onRejected(self.promiseResult);
            returnValue.resolve(r);
// (D)
        };
    } else {
        rejectedTask = function () {

// Important: we must reject here!

// Normally, result of `onRejected` is used to resolve
            returnValue.reject(self.promiseResult);
// (E)
        };
    }
    ...
    return returnValue;
// (F)
};
```

`then()` creates and returns a new promise (lines (A) and (F)). Additionally, `fulfilledTask` and `rejectedTask` are set up differently: After a settlement...

- The result of `onFulfilled` is used to resolve `returnValue` (line (B).
  - If `onFulfilled` is missing, we use the fulfillment value to resolve `returnValue` (line (C)).
- The result of `onRejected` is used to resolve (not reject!) `returnValue` (line (D)).
  - If `onRejected` is missing, we use the rejection value to reject `returnValue` (line (E)).

#### Flattening

Flattening is mostly about making chaining more convenient: Normally, returning a value from a reaction passes it on to the next `then()`. If we return a promise, it would be nice if it could be "unwrapped" for us, like in the following example:

```js
asyncFunc1()
  .then(function (value1) {
    return asyncFunc2();
    // (A)
  })
  .then(function (value2) {
    // value2 is fulfillment value of asyncFunc2() promise
    console.log(value2);
  });
```

We returned a promise in line (A) and didn't have to nest a call to `then()` inside the current method, we could invoke `then()` on the method's result. Thus: no nested `then()`, everything remains flat.

We implement this by letting the `resolve()` method do the flattening:

- Resolving a promise P with a promise Q means that Q's settlement is forwarded to P's reactions.
- P becomes "locked in" on Q: it can't be resolved (incl. rejected), anymore. And its state and result are always the same as Q's.

We can make flattening more generic if we allow Q to be a thenable (instead of only a promise).

![](https:
//2ality.com/2014/10/es6-promises-api/promise3_flattening.jpg)

To implement locking-in, we introduce a new boolean flag `this.alreadyResolved`. Once it is true, `this` is locked and can't be resolved anymore. Note that `this` may still be pending, because its state is now the same as the promise it is locked in on.

```js
DemoPromise.prototype.resolve = function (value) {
  if (this.alreadyResolved) return;
  this.alreadyResolved = true;
  this._doResolve(value);
  return this;
  // enable chaining
};
```

The actual resolution now happens in the private method `_doResolve()`:

```js
DemoPromise.prototype._doResolve = function (value) {
  var self = this;

  // Is `value` a thenable?
  if (value !== null && typeof value === "object" && "then" in value) {
    addToTaskQueue(function () {
      // (A)
      value.then(
        function onFulfilled(value) {
          self._doResolve(value);
        },
        function onRejected(reason) {
          self._doReject(reason);
        }
      );
    });
  } else {
    this.promiseState = "fulfilled";
    this.promiseResult = value;
    this._clearAndEnqueueReactions(this.fulfillReactions);
  }
};
```

The flattening is performed in line (A): If `value` is fulfilled, we want `self` to be fulfilled and if `value` is rejected, we want `self` to be rejected. The forwarding happens via the private methods `_doResolve` and `_doReject`, to get around the protection via `alreadyResolved`.

#### Promise states in more detail

With chaining, the states of promises become more complex (as covered by [Sect. 25.4](https:
//people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects) of the ECMAScript 6 specification):

![](https:
//2ality.com/2014/10/es6-promises-api/promise_states_all.jpg)

If you are only _using_ promises, you can normally adopt a simplified worldview and ignore locking-in. The most important state-related concept remains "settledness": a promise is settled if it is either fulfilled or rejected. After a promise is settled, it doesn't change, anymore (state and fulfillment or rejection value).

If you want to _implement_ promises then "resolving" matters, too and is now harder to understand:

- Intuitively, "resolved" means "can't be (directly) resolved anymore". A promise is resolved if it is either settled or locked in. Quoting the spec: "An unresolved promise is always in the pending state. A resolved promise may be pending, fulfilled or rejected."
- Resolving does not necessarily lead to settling: you can resolve a promise with another one that is always pending.
- Resolving now includes rejecting (i.e., it is more general): you can reject a promise by resolving it with a rejected promise.

#### Exceptions

As our final feature, we'd like our promises to handle exceptions in user code as rejections. For now, "user code" means the two callback parameters of `then()`.

![](https:
//2ality.com/2014/10/es6-promises-api/promise4_exceptions.jpg)

The following excerpt shows how we turn exceptions inside `onFulfilled` into rejections - by wrapping a `try-catch` around its invocation in line (A).

```js
var fulfilledTask;
if (typeof onFulfilled === "function") {
  fulfilledTask = function () {
    try {
      var r = onFulfilled(self.promiseResult);
      // (A)
      returnValue.resolve(r);
    } catch (e) {
      returnValue.reject(e);
    }
  };
} else {
  fulfilledTask = function () {
    returnValue.resolve(self.promiseResult);
  };
}
```

#### Revealing

constructor pattern

If we wanted to turn `DemoPromise` into an actual promise implementation, we'd still need to implement the revealing
constructor pattern [\[4\]](https:
//2ality.com/2014/10/es6-promises-api.html#fn4): ES6 promises are not resolved and rejected via methods, but via functions that are handed to the _executor_, the callback parameter of the
constructor.

![](https:
//2ality.com/2014/10/es6-promises-api/promise5_everything.jpg)

If the executor throws an exception then "its" promise must be rejected.

### Two useful additional promise methods

This section describes two useful methods that are easy to add to ES6 promises. Many of the more comprehensive promise libraries have them.

#### `done()`

When you chain several promise method calls, you risk silently discarding errors. For example:

```js
function doSomething() {
  asyncFunc().then(f1).catch(r1).then(f2);
  // (A)
}
```

If `then()` in line (A) produces a rejection, it will never be handled anywhere. The promise library Q provides a method `done()`, to be used as the last element in a chain of method calls. It either replaces the last `then()` (and has one to two arguments):

```js
function doSomething() {
  asyncFunc().then(f1).catch(r1).done(f2);
}
```

Or it is inserted after the last `then()` (and has zero arguments):

```js
function doSomething() {
  asyncFunc().then(f1).catch(r1).then(f2).done();
}
```

Quoting the [Q documentation](https:
//github.com/kriskowal/q/wiki/API-Reference#promisedoneonfulfilled-onrejected-onprogress):

> The Golden Rule of `done` vs. `then` usage is: either return your promise to someone else, or if the chain ends with you, call `done` to terminate it. Terminating with `catch` is not sufficient because the catch handler may itself throw an error.

This is how you would implement `done()` in ECMAScript 6:

```js
Promise.prototype.done = function (onFulfilled, onRejected) {
  this.then(onFulfilled, onRejected).catch(function (reason) {
    setTimeout(() => {
      throw reason;
    }, 0);
  });
};
```

While `done`'s functionality is clearly useful, it has not been added to ECMAScript 6, because this kind of check can be performed automatically by debuggers in the future (a [thread](http:
//esdiscuss.org/topic/where-d-promise-done-go) on es-discuss provides further background).

#### `finally()`

Sometimes you want to perform an action independently of whether an error happened or not. For example, to clean up after you are done with a resource. That's what the promise method `finally()` is for, which works much like the `finally` clause in exception handling. Its callback receives no arguments, but is notified of either a resolution or a rejection.

```js
createResource(...)
.then(function (value1) {

// Use resource
})
.then(function (value2) {

// Use resource
})
.finally(function () {

// Clean up
});
```

This is how `Domenic Denicola` [proposes](https:
//github.com/domenic/promises-unwrapping/issues/18) to implement `finally()`:

```js
Promise.prototype.finally = function (callback) {
  let p = this.constructor;

  // We don't invoke the callback in here,

  // because we want then() to handle its exceptions
  return this.then(
    // Callback fulfills: pass on predecessor settlement

    // Callback rejects: pass on rejection (=omit 2nd arg.)
    (value) => p.resolve(callback()).then(() => value),
    (reason) =>
      p.resolve(callback()).then(() => {
        throw reason;
      })
  );
};
```

The callback determines how the settlement of the receiver (`this`) is handled:

- If the callback throws an exception or returns a rejected promise then that becomes/contributes the rejection value.
- Otherwise, the settlement of the receiver becomes the settlement of the promise returned by `finally()`. In a way, we take `finally()` out of the chain of methods.

**Example 1** (by [Jake Archibald](https:
//gist.github.com/jakearchibald/785f79b0dea5bfe0c448)): using `finally()` to hide a spinner. Simplified version:

```js
showSpinner();
fetchGalleryData()
  .then((data) => updateGallery(data))
  .catch(showNoDataError)
  .finally(hideSpinner);
```

**Example 2** (by [Kris Kowal](https:
//github.com/domenic/promises-unwrapping/issues/18#issuecomment-27707922)): using `finally()` to tear down a test.

```js
var HTTP = require("q-io/http");
var server = HTTP.Server(app);
return server
  .listen(0)
  .then(function () {
    // run test
  })
  .finally(server.stop);
```

### ES6-compatible promise libraries

There are many promise libraries out there. The following ones conform to the ECMAScript 6 API, which means that you can use them now and easily migrate to native ES6 later.

- "[RSVP.js](https:
  //github.com/tildeio/rsvp.js/)" by Stefan Penner is a superset of the ES6 promise API .
  - "[ES6-Promises](https:
    //github.com/jakearchibald/es6-promise)" by Jake Archibald extracts just the ES6 API out of RSVP.js.
- "[Native Promise Only (NPO)](https:
  //github.com/getify/native-promise-only)" by Kyle Simpson is "a polyfill for native ES6 promises, as close as possible (no extensions) to the strict spec definitions".
- "[Lie](https:
  //github.com/calvinmetcalf/lie)" by Calvin Metcalf is "a small, performant, promise library implementing the Promises/A+ spec".
- [`Q.Promise`](https:
  //github.com/kriskowal/q#using-qpromise) by Kris Kowal implements the ES6 API.
- Lastly, the "[ES6 Shim](https:
  //github.com/paulmillr/es6-shim)" by Paul Millr includes `Promise`.

### Interfacing with legacy asynchronous code

When you are using a promise library, you sometimes need to use non-promise-based asynchronous code. This section explains how to do that for Node.js-style asynchronous functions and jQuery deferreds.

#### Interfacing with Node.js

The promise library Q has [several tool functions](https:
//github.com/kriskowal/q/wiki/API-Reference#interfacing-with-nodejs-callbacks) for converting functions that use Node.js-style `(err,result)` callbacks to ones that return a promise (there are even functions that do the opposite - convert promise-based functions to ones that accept callbacks). For example:

```js
var readFile = Q.denodeify(FS.readFile);

readFile('foo.txt', 'utf-8')
.then(function (text) {
    ...
});
```

[denodify](https:
//github.com/matthew-andrews/denodeify/) is a micro-library that only provides the "nodification" functionality and complies with the ECMAScript 6 promise API.

#### Interfacing with jQuery

jQuery has [deferreds](http:
//api.jquery.com/category/deferred-object/) which are similar to promises, but have [several differences](https:
//github.com/kriskowal/q/wiki/Coming-from-jQuery) that prevent compatibility. Their method `then()` is almost like that of ES6 promises (main difference: it doesn't catch errors in reactions). Thus, we can convert a jQuery deferred to an ES6 promise via `Promise.resolve()`:

```js
Promise.resolve(
  jQuery.ajax({
    url: "somefile.html",
    type: "GET",
  })
)
  .then(function (data) {
    console.log(data);
  })
  .catch(function (reason) {
    console.error(reason);
  });
```

\\
