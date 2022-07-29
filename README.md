# Taken from Webpage on LogRocket <https://blog.logrocket.com/guide-to-react-useeffect-hook/>

Let’s take a look at the following code and try to read the initial title from local storage, if available, in an additional useEffect block.

As you can see, we have an infinite loop of effects because every state change with setTitle triggers another effect, which updates the state again.

# The importance of the dependency array

Let’s go back to our previous example with two states (title and dark mode). Why do we have the problem of unnecessary effects?

Again, if you do not provide a dependency array, every scheduled useEffect is executed. This means that after every render cycle, every effect defined in the corresponding component is executed one after the other based on the positioning in the source code.

So the order of your effect definitions matter. In our case, our single useEffect statement is executed whenever one of the state variables change.

You have the ability to opt out from this behavior. This is managed with dependencies you provide as array entries. In these cases, React only executes the useEffect statement if at least one of the provided dependencies has changed since the previous run. In other words, with the dependency array, you make the execution dependent on certain conditions.

More often than not, this is what we want; we usually want to execute side effects after specific conditions, e.g., data has changed, a prop changed, or the user first sees our component. Another strategy to skip unnecessary effects is to prevent unnecessary re-renders in the first place with, e.g., React.memo, as we’ll see later.

Back to our example where we want to skip unnecessary effects after an intended re-render, we just have to add an array with title as a dependency. With that, the effect is only executed when the values between render cycles differ.

`useEffect(() => {
    console.log("useEffect");
    document.title = title;
  }, [title]);`

# Here’s the complete code snippet:

`function EffectsDemoTwoStatesWithDependeny() {
  const [title, setTitle] = useState("default title");
  const titleRef = useRef();
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    console.log("useEffect");
    document.title = title;
  }, [title]);
  console.log("render");
  const handleClick = () => setTitle(titleRef.current.value);
  const handleCheckboxChange = () => setDarkMode((prev) => !prev);
  return (
    <div className={darkMode ? "view dark-mode" : "view"}>
      <label htmlFor="darkMode">dark mode</label>
      <input
        name="darkMode"
        type="checkbox"
        checked={darkMode}
        onChange={handleCheckboxChange}
      />
      <input ref={titleRef} />
      <button onClick={handleClick}>change title</button>
    </div>
  );
}`

... effects are only invoked as expected on pressing the button.

It is also possible to add an empty dependency array. In this case, effects are only executed once; it is similar to the componentDidMount() lifecycle method. To demonstrate this, let’s take a look at the previous example with the infinite loop of effects.

`function EffectsDemoEffectOnce() {
  const [title, setTitle] = useState("default title");
  const titleRef = useRef();
  useEffect(() => {
    console.log("useEffect title");
    document.title = title;
  });
  useEffect(() => {
    console.log("useEffect local storage");
    const persistedTitle = localStorage.getItem("title");
    setTitle(persistedTitle || []);
  }, []);
  console.log("render");
  const handleClick = () => setTitle(titleRef.current.value);
  return (
    <div>
      <input ref={titleRef} />
      <button onClick={handleClick}>change title</button>
    </div>
  );
}`

We just added an empty array as our second argument. Because of this, the effect is only executed once after the first render and skipped for the following render cycles.

If you think about it, this behavior makes sense. In principle, the dependency array says, “Execute the effect provided by the first argument after the next render cycle whenever one of the arguments changes.” However, we don’t have any argument, so dependencies will never change in the future.

That’s why using an empty dependency array makes React invoke an effect only once — after the first render. The second render along with the second useEffect title is due to the state change invoked by setTitle() after we read the value from local storage.

***

# What are legitimate dependency array items?

This brings us to an important question: What items should be included in the dependency array? According to the React Docs, you have to include all values from the component scope that change their values between re-renders.

What does this mean, exactly? All external values referenced inside of the useEffect callback function, such as props, state variables, or context variables, are dependencies of the effect. Ref containers (i.e., what you directly get from useRef() and not the current property) are also valid dependencies. Even local variables, which are derived from the aforementioned values, have to be listed in the dependency array.

It is essential to understand the conceptual thinking of effects; the React team wants you to treat every value used inside of the effect as dynamic. So even if you use a non-function value inside the effect, and you are pretty sure this value is unlikely to change, you should include the value in the dependency array.

That’s because — however unlikely it may be — there is still a chance the value will change. Who knows whether the component will get refactored? Suddenly, the value is no longer constant in every case, and you might have introduced a potential stale prop/state/context bug.

Therefore, make sure to add every value from the component scope to the list of dependencies because you should treat every value as mutable. Remember that if at least one of the dependencies in the array is different from the previous render, the effect will be rerun.
