# 💍 Promises

### Asynchronous JavaScript

What would be the output of the below code?

![](https://miro.medium.com/max/630/1*Ivn_aeuBSGq5CQHm2uBzdg.png)

1 2 3 or something else?\
setTimeout with 0-millisecond delay is invoked, there won’t be any delay. So 2 should be printed next right?

The actual output is 1 3 2.

Why?

That’s how Asynchronous JS Works. When the JavaScript Engine encounters a function that is to be executed not right away, but at some point in the future, instead of waiting/blocking the thread at that point, it will queue that function. And when it is time to execute the function, JS Engine will take it out of the queue and execute it.\
So, setTimeout will be queued irrespective of its delay and the rest of the code will be executed. And once the wait time is over, the function inside setTimeout will be taken up from the queue and executed.

I’m not going to go into details. That is a topic for another day. But I hope the basic idea is clear. Now, what has this got to do anything with promises you may ask. This is the basis of Asynchronous JS and you have to understand it in order to understand the next topic

### Callbacks and Callback Hell

A callback function is a function passed into another function as an argument and will be executed inside it.

The arrow function with a simple `console.log` that was passed into the `setTimeout` function in our previous example is in fact a callback. After a specified amount of wait time, the callback (arrow function) was executed.

So what is callback hell?

Suppose we have a function that loads a script from the server.

`_loadScript_(fileName, callBack);`

`fileName` is the name of the file to be loaded. And `callBack` is the function that will be executed (called back) once the file is loaded or if an error occurs.

After the 1st file is loaded, if there is no error, we need to load the second script file. The code would look like this

![](https://miro.medium.com/max/630/1*8MXmdrBssdGJ4z8EonV5ng.png)

You would feel some unease seeing this. If not, suppose we have to load 10 or 15 files, the functions will be nested and nested and it would resemble what is called a “pyramid of doom”. And the code that is to be executed after all those files will be under all that nested code and it is not only hard to maintain but also very difficult to understand/read the code. This is termed “Callback Hell”.

From these examples, it can be understood that a better approach is required to handle asynchronous codes.

Enter Promises

Now that we have understood the “Why”, let’s learn the “How”. Click [here](https://abdu-manaz.medium.com/javascript-promises-part-2-fundamentals-e51e36c42fac) to go to the next part, which explains that.

If you have found this article helpful, make sure to clap and share it with your friends. Make sure to follow me for more simplified explanations.

\---

So what is a promise?

Imagine one morning at work, your colleague calls you up and asks you to do a favor. He needs you to go to the office parking lot and check whether there is an open spot. Since the parking space is limited, if no space is available he need not waste time and could park somewhere else.

You **PROMISE** you would do that.

You go to the parking lot to check for an open spot.

What are the different scenarios that could play out?

There is either an open spot or not. You call your colleague and let him know.

In any case, your promise has been **fulfilled**.

Is there another scenario? Imagine the lift is broken when you are on your way to the parking lot. And your office is on the topmost floor of the building. If you are like me, then you have no problem going down the stairs, but coming back up… that's a whole another thing. So you call back your colleague and let him know that you couldn’t actually check for an open parking spot since the lift was broken.

In this case, your promise to your colleague has **failed**.

Although very crude, this is what promises are in a nutshell.

Now let's get into the technical side of things using the above example.

As per MDN:

> The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

We have already touched upon Asynchronous functions. And you know that an asynchronous function will be queued and eventually executed(completed). Once your asynchronous function is completed it will return with a result, if any. This is what a promise object represents.

What does it mean in the context of our example?

Here, the _Promise_ object refers to the actual promise that you have made to your colleague to check for an open parking space.

The task of you going to the parking lot, checking for an open space, calling back your colleague letting him know about the spot availability can be considered an Asynchronous operation. The resulting value can be either true/false based on the availability of the space.

How would it look like in code? Let's take a look

![](https://miro.medium.com/max/1400/1*qnKTkLuq3xWrB3huaOur3w.png)

Let's break it down

You can create a `Promise` object using the `new` keyword.

The function passed to the constructor is called **executor**.\
When a new Promise is created, the executor runs automatically. It contains the code which should eventually produce the result. In our case, going to the parking lot and checking for an open space.

We have wrapped the **executor** inside a `setTimout` function so that it is executed asynchronously.

**Executor** has 2 parameters **resolve** and **reject** respectively. They are callbacks and will be executed once our executor function has a result. As per our example: once you understand that whether a spot is available/not.

Based on the availability of the parking space, you call `resolve(true)` or `resolve(false)`. This means, you have gone to the parking lot and returned with a result. You have **fulfilled** your promise.

But as we have discussed, there is a 3rd option where your promise might have failed. Let's take a look at the code for that

![](https://miro.medium.com/max/1400/1*xsuS0RsfWycwSdzdS2LnYQ.png)

In this case, you are not returning with a result. Instead, you are throwing an error. So, your promise is **rejected.**

The `promise` object returned by calling the `new Promise` constructor has 2 internal properties:

1. **state:** Initially the state is **pending**. Based on which callback is invoked, either **resolve**/**reject**, the state will change to **fulfilled/rejected** respectively.
2. **result**: The value that is passed on to the callback. In our case, true/false.

> It’s important to note that a promise can only resolve or reject
>
> Also any state change is final and all further calls of resolve and reject are ignored.

This means, If we omit the return statement in the above example, the executor will execute until the last statement, (i.e. either resolve(true) or resolve(false)). But irrespective of that, the **state** of the promise will still be **rejected** and **result** will be the **Error object** created.

Alright, we have learned to create a promise. We know that the promise object represents the value returned by the eventual completion of our asynchronous operation (copy-pasted from above ;) ). But how can that value be consumed?

In our example, the consumer is our colleague, who asked us to perform this whole task. How will he be able to consume the promise once it is **fulfilled**/**rejected**?

To create a consumer, we use the `then/catch/finally` methods.

The syntax of `then`is as follows:

![](https://miro.medium.com/max/1400/1*I07t786W23VTIF7XId1IhA.png)

`then` method has 2 arguments. Both are functions.

The first function runs when the promise is resolved.\
The second function runs when the promise is rejected.\
`result/error` will be the value returned from the promise.

`catch` method has only 1 argument, which will be executed if the promise is rejected.

Confusing? Let’s take a look at how our consumer function will be written.

![](https://miro.medium.com/max/1400/1*PUkB7doz4PsBb_VNPqJFeQ.png)

As we can see, we have applied methods `then` and `catch` to the `promise` object (previous example).

Once the **executor** finishes and **resolves**/**rejects** with a value, based on the callback invoked, either `then` or `catch` will be executed.

If we could check for the parking spot, **promise** will be **resolved** with either true/false. In that case, the first function in **then** method will be executed.

If the lift was broken, **promise** will be **rejected** and an error object returned. In that case, the function in **catch** method will be executed.

You could also completely omit the catch block and handle both cases using **then** method itself. Which would look like this

![](https://miro.medium.com/max/1400/1*aTwME1Jj3qwy46SkgfSjvw.png)

Whether to use a `catch` block, or handle the error in `then` block, depends on our requirements and whether the promises are chained together. We will be diving into Promise chaining in the next section. For now, just remember that it is possible to handle the error in `then` block itself.

Now, let’s finish with a Practical Example

![](https://miro.medium.com/max/1400/1*7734P9L90nZw71oy0HkwMw.png)

**fetch API** allows us to make network requests. The response from **fetch()** will be a **promise** with **value** being the response sent from the server.

If we get a valid response from the server, function in **then** method will be executed and if the server responds with an error, the function in **catch** method will be executed.

Promise is a powerful API and I hope you got a basic understanding of it.There is much to be covered, like **Promise chaining** and different methods like **Promise.all()**, **Promise.any()** which we will see in the upcoming parts.

[Click here](https://medium.com/nerd-for-tech/javascript-promises-part-3-promise-chaining-707ab6f1bbfc) to go to the next part where we understand **Promise chaining.**

If you have found this article helpful, make sure to clap and share it with your friends. Make sure to follow me as I **Promise** to provide more simplified explanations ;)

This is an important concept to understand, one which is at the base of further asynchronous JS concepts like **async/await**.

Up until this point, we have only talked about a single asynchronous task being carried out. But what if, we have to do multiple asynchronous tasks in succession, each after the previous one finishes?

To understand that, we have to be absolutely clear about one thing

> Any value returned from a promise’s handlers will be wrapped as a promise

This means, if we return a value from a promise handler like — `then`, `catch` or `finally`, it will be wrapped as a promise.

Let's try an example. Try writing the below code excerpt in the console.

![](https://miro.medium.com/max/1400/1*EmjORF5r66aYPr-4VcW1Eg.png)

Try logging the variable `secondObject`in the console, to check its type. You will get the below output

![](https://miro.medium.com/max/1400/1*Bsz-hnOyciYio6I-B284gg.png)

From this example, it is clear, that the `secondObject` is not a number and is in fact a promise, reiterating our earlier point:

> Any value returned from a promise’s handlers will be wrapped as a promise

Then, how do we consume the promise returned from the handler? Simple. Like we consume any other promises — with the `then/catch/finally` handlers.

So, if we want to get the value 2 from the previous example, apply another `then` handler to the promise `secondObject` or better yet, simply add the new `then` handler to the previous `then` handler like below

![](https://miro.medium.com/max/1400/1*ZHH3J43ZhqZStvOqFXF7ww.png)

Now 2 will be printed.

This process of chaining multiple promises together is termed as **Promise Chaining.**

Using **Promise Chaining**, we can handle multiple successive asynchronous operations as each handler will only be executed once its immediate predecessor completes.

Let's look at a real-world example.

Consider you are building a social media application where users can create posts, add comments to it. Kind of like Facebook. But not toxic :D. As an admin user, you want to see all the users in the system and all the posts by the first user in your dashboard.

You have to do 2 things in succession:

1. Fetch all the users
2. Fetch all the posts associated with the first user

We will use the `fetch` API to make the HTTP Requests and we will use \`[https://jsonplaceholder.typicode.com/](https://jsonplaceholder.typicode.com/)\` as the API provider for this example.

To fetch all the users we can use the code below

Pretty normal stuff. We pass the URL to retrieve a list of users to the `fetch` method. `fetch` makes the network call and returns a promise, which we access using the `then` handler.

But notice how we use promise chaining here itself.\
This is because, the response from `fetch` API will be of type [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response).\
To extract the JSON body content from the response, we use the `[.json()](https://developer.mozilla.org/en-US/docs/Web/API/Body/json)` method which returns a promise, wrapping the JSON body. So our `users` Array will be available in the 2nd `then` handler.

Now let's take a look at the code to access the different posts by a user

Similar to the previous code. The only difference being the use of implicit return in arrow functions.

Now we have two separate promise chains that do 2 different asynchronous operations. We need to combine them together to achieve our goal. How do you do that?

In our second then handler we are returning the fetch operation to fetch posts by the user(line no 6). By using this simple step, we are chaining and executing multiple asynchronous operations in succession.

### Error Handling

What if something goes wrong? How do you handle errors in Promise chaining?

Remember in the [2nd part of this series](https://medium.com/nerd-for-tech/javascript-promises-part-2-fundamentals-e51e36c42fac), we have touched upon it. Go check it out if you haven’t already.

> Whether to use a `catch` block, or handle the error in `then` block, depends on our requirements and whether the promises are chained together. We will be diving into Promise chaining in the next section. For now, just remember that it is possible to handle the error in `then` block itself.

In a promise chain, if an error occurs in a `then` block, it can be handled in the failure handler of a **following** `then` block or in a following `catch` block. But which should you choose? It depends on the answer to the question

> Should the error break the entire promise chain ?

If the error shouldn't break the chain, handle the error in one of the following `then` blocks.\
If the error should break the chain, don’t add a failure handler in the `then` block and instead provide a `catch` block.

Lets see both in action

First, let’s produce an error. Replace the URL in our previous promise chain with a non-existent URL. So that the initial fetch itself fails. Execute the code. You will get the following error.

![](https://miro.medium.com/max/1400/1*Zh2Er6oi-kHBLm7YDwzELQ.png)

We haven’t handled the error, so after the error occurs, no `then` handlers are executed.

Now let’s handle the error.

### Handle Error by NOT Breaking the Promise Chain

If an error occurs while fetching the users, then instead of fetching the posts by the first user, you want to fetch all the posts in the system. In other words, we want the promise chain to resume from a certain point if an error occurs prior to that. How do you do that?

We add a function (line no 7) to handle the error case to the 2nd `then` (line no 3) in the chain.

If you observe, the error is not handled in the immediate `then` block. Meaning, If an error occurs in a promise chain (while fetching the users in our case), the error will be propagated through the chain until it reaches the error handling function (if any), which then gets executed and normal chain execution resumes.

Execute the code and you will see normal chain execution resumed.

![](https://miro.medium.com/max/1400/1*sSGfjxKyHYcAEtreyCrM9A.png)

### Handle Error by Breaking the Promise Chain

But what if we don't want any block to be executed once an error occurs?\
To do that, add a catch block to the end of the chain which will act as a global error handler for the promise chain.

Here, we are using a catch block at the end of the chain to handle any error in the promise chain.

Execute the code and you will see the chain broke once the error occurred.

![](https://miro.medium.com/max/1400/1*EPEUcSFftqUTvgpSe6k0Xg.png)

In this article, we learned what Promise chaining is, how to chain promises together, and the different error handling methods in promise chaining.

If you have found this article helpful, make sure to clap and share it with your friends. If you have any suggestions/comments let me know. Make sure to follow me as we will be building on this by understanding the different promise methods **Promise.any()** , **Promise.all()** as well as **async/await**.

### Promise.all

The `**Promise.all()**` method takes an iterable of promises as the input, and returns a single `Promise`

This returned promise will only resolve when all of the input promises have resolved and its value will be an array of the results of the input promises.

If any of the input promises reject or throws an error, the returned promise will immediately reject with that error/message.

![](https://miro.medium.com/max/630/1*tX1o27A53ilrj7zldWKRDw.png)

In the above example, we have 3 variables passed into the `Promise.all` method.

1. Promise that will resolve immediately with value 3
2. This is not a promise. which means we can also pass non-promise values into the `Promise.all` method.
3. Promise that will resolve after 1 second with the value `foo` .

If you execute the above code, you will get a response — `_[3, 42, "foo"]_` after 1 second.

Why 1 second?

Because `Promise.all` will only resolve once all the input promises resolve. Here, the 3rd promise (using `setTimeout`) takes 1 second to resolve. And it is the last resolved promise. So `Promise.all` resolves after 1s.

As you can understand from the example, the response is an array of the results of the input promises.

> **Promise.all** is used when you have multiple asynchronous operations that needs to be run in parallel, and once **ALL** of those operations are finished, you want to perform some operations.

### Promise.any

**Promise.any** can be considered the functional opposite of **Promise.all** .

This too takes an iterable of promises as the input, and returns a single `Promise`

The returned promise will resolve as soon as one of the input promises fulfills (resolves).

The returned promise **WILL NOT REJECT** if any of the input promises reject.

However, if none of the input promises resolves, the returned promise will reject with an `[AggregateError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError)`

![](https://miro.medium.com/max/630/1*q8AGeW3EcV30LKQY9vhmjw.png)

In the example, we have 3 promises

1. Promise that will reject immediately with value 3
2. Promise that will resolve after 2 seconds with value ‘`resolved second`’
3. Promise that will resolve after 1 second with value ‘`resolved first`’

When you execute the above code, you will get the output ‘`resolved first`’ after 1 second (the first resolved promise), even though the first input promise rejects immediately.

> **Promise.any** is used when you have multiple asynchronous operations that needs to be run in parallel, and you have to perform some operation once **ANY** of the input promises resolve, irrespective of the status of other input promises.

**Promise.race**

**Promise.race** is similar to **Promise.any.**

Unlike Promise.any which waits for any of the input promises to resolve, this method `resolves/rejects` as soon as one of the input promise resolves/rejects.

A race of promises if you will, where the first to either resolve/reject is the winner.

![](https://miro.medium.com/max/630/1*qpQJKo_judjK-58VSxzfkw.png)

As you can understand from the example, the output will be — `second Promise`, since it resolves faster than the first promise.

Change the `resolve` to `reject` in the second promise, and the `catch` block will be executing.

> **Promise.race** is used when you have multiple asynchronous operations that needs to be run in parallel, and you need to perform operations as soon as any one of the inputs resolves/rejects.

Summary

![](https://miro.medium.com/max/630/1*khRHoOHGCxXuTydnKUUYPA.png)

In this article, we learned about the different promise APIs available. Specifically, **Promise.all**, **Promise.any** and **Promise.race**.

To read the final article of the series, regarding **async/await**, click [here](https://medium.com/nerd-for-tech/javascript-promises-final-part-async-await-5500fbf4d336).

If you have found this article helpful, make sure to clap and share it with your friends. If you have any suggestions/comments let me know. Make sure to follow me so you don’t miss any articles.
