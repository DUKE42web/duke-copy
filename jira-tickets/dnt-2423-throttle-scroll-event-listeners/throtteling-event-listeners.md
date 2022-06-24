# Throtteling Event Listeners

<details>

<summary>Throttle</summary>

#### Using Throttling and Debouncing with React hooks - DEV Community

**Excerpt**

Throttling and debouncing techniques has been in use for past many years in javascript.\
In this post I'd like to share my knowledge on how we can use throttle and debounce functions with help of react hooks.

Consider below example with two routes `/` and `/count` rendering respective components.

```
export default function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/count">Count</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/count">
            <Count />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
```

**Throttling Example with useEffect**

Suppose we need to subscribe a scroll event on `Count` component on its mount and just increment the count on every scroll event.

Code without using throttle or debounce techniques will be like:

```
function Count() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    window.addEventListener('scroll', increaseCount);
    return () => window.removeEventListener('scroll', increaseCount);
  }, []);
  const increaseCount = () => {
    setCount(count => count + 1);
  }
  return <h2 style={{marginBottom: 1200}}>Count {count}</h2>;
}
```

Suppose in practical applications you need to use throttle and wait for every 100ms before we execute `increaseCount`. I have used the lodash throttle function for this example.

```
function Count() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    window.addEventListener('scroll', _.throttle(increaseCount, 100));
    return () => window.removeEventListener('scroll', _.throttle(increaseCount, 100));
  }, []);
  const increaseCount = () => {
    setCount(count => count + 1);
  }
  return <h2 style={{marginBottom: 1200}}>Count {count}</h2>;
}
```

Wait, no need to hurry. It will work if you are at `/count` route. The `increaseCount` function will be throttled and will increase the count after 100ms of intervals.

But as you move to the `/` route to render the `Home` component and unmount the `Count` component, and start scrolling on home page, you will notice a warning in console which warns about memory leak. This is probably because the scroll event was not cleaned properly.\
The reason is `_.throttle(increaseCount, 100)` is called again during unmount and returns another function which does not match that created during the mount stage.\
What if we create a variable and store the throttled instance.

like this

```
const throttledCount = _.throttle(increaseCount, 100);
useEffect(() => {
    window.addEventListener('scroll', throttledCount);
    return () => window.removeEventListener('scroll', throttledCount);
  }, []);
```

But it has problem too. The `throttledCount` is created on every render, which is not at all required. This function should be initiated once which is possible inside the useEffect hook. As it will now be computed only once during mount.

```
useEffect(() => {
    const throttledCount = _.throttle(increaseCount, 100);
    window.addEventListener('scroll', throttledCount);
    return () => window.removeEventListener('scroll', throttledCount);
  }, []);
```

**Debounce Example using useCallback or useRef**

Above example is pretty simple. Let's look at another example where there is an input field and you need to increment the count only after user stops typing for certain time. And there is text which is updated on every keystroke which re renders the component on every input.

Code with debounce:

```
function Count() {
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");
  const increaseCount = () => {
    setCount(count => count + 1);
  }
  const debouncedCount = _.debounce(increaseCount, 1000);
  const handleChange = (e) => {
    setText(e.target.value);
    debouncedCount();
  }
  return <>
    <h2>Count {count}</h2>
    <h3>Text {text}</h3>
    <input type="text" onChange={handleChange}></input>
  </>;
}
```

This will not work. The count will increase for every keystroke. The reason behind is that on every render, a new `debouncedCount` is created.\
We have to store this debounced function such that it is initiated only once like that in useEffect in above example.\
Here comes use of `useCallback`.\
`useCallback` will return a memoized version of the callback that only changes if one of the dependencies has changed - React docs\
Replace

```
const debouncedCount = _.debounce(increaseCount, 1000);
```

with

```
const debouncedCount = useCallback(_.debounce(increaseCount, 1000),[]);
```

and it will work. Because this time the function is evaluated only once at the initial phase.

Or we can also use `useRef`\
by doing this

```
const debouncedCount = useRef(debounce(increaseCount, 1000)).current;
```

One should always keep in mind that every render call of react functional component will lead to expiration of local variables and re-initiation unless you memoize them using hooks.

</details>
