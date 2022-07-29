# LogRocket Blog

<https://blog.logrocket.com/guide-to-react-useeffect-hook/>

## Utilizing cleanup functions

The next snippet shows an example to demonstrate a problematic issue.

```javascript
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(function () {
      setCount((prev) => prev + 1);
    }, 1000);
  }, []);
  return <p>and the counter counts {count}</p>;
}
function EffectsDemoUnmount() {
  const [unmount, setUnmount] = useState(false);
  const renderDemo = () => !unmount && <Counter />;
  return (
    <div>
      <button onClick={() => setUnmount(true)}>Unmount child component</button>
      {renderDemo()}
    </div>
  );
}
```

This code implements a React component representing a counter that increases a number every second. The parent component renders the counter and allows you to destroy the counter by clicking on a button. Take a look at the recording to see what happens when a user clicks on that button.

The child component has registered an interval that invokes a function every second. However, the component was destroyed without unregistering the interval. After the component is destroyed, the interval is still active and wants to update the component’s state variable (count), which no longer exists.

```javascript
useEffect(() => {
    const interval = setInterval(function () {
      setCount((prev) => prev + 1);
    }, 1000);
    // return optional function for cleanup
    // in this case acts like componentWillUnmount
    return () => clearInterval(interval);
}, []);
```

I want to emphasize that cleanup functions are not only invoked before destroying the React component. An effect’s cleanup function gets invoked every time, right before the execution of the next scheduled effect.

Let’s take a closer look at our example. We used a trick to have an empty dependency array in the first place, so the cleanup function acts like a `componentWillUnmount()` lifecycle method. If we do not call `setCount` with a callback function that gets the previous value as an argument, we need to come up with the following code, wherein we add count to the dependencies array:

```javascript
useEffect(() => {
    console.log("useEffect")
    const interval = setInterval(function () {
        setCount(count + 1);
    }, 1000);
    // return optional function for cleanup
    // in this case, this cleanup fn is called every time count changes
    return () => {
        console.log("cleanup");
        clearInterval(interval);
    }
}, [count]);
```

In comparison, the former example executes the cleanup function only once — on mount — because we prevented the use of the state variable (count) directly.

```javascript
useEffect(() => {
    console.log("useEffect")
    const interval = setInterval(function () {
        setCount(prev => prev + 1);
    }, 1000);
    // return optional function for cleanup
    // in this case, this cleanup fn is called every time count changes
    return () => {
        console.log("cleanup");
        clearInterval(interval);
    }
}, []);
```

## The cleanup function is only called once on unmount.

In this context, the latter approach is a tiny performance optimization because we reduce the number of cleanup function calls.

I hope these example have convinced you that working with effects is different from lifecycle methods and that it is ultimately not beneficial to try to mimic these methods.

