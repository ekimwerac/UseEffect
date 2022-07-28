The importance of the dependency array
Let’s go back to our previous example with two states (title and dark mode). Why do we have the problem of unnecessary effects?

Again, if you do not provide a dependency array, every scheduled useEffect is executed. This means that after every render cycle, every effect defined in the corresponding component is executed one after the other based on the positioning in the source code.

So the order of your effect definitions matter. In our case, our single useEffect statement is executed whenever one of the state variables change.

You have the ability to opt out from this behavior. This is managed with dependencies you provide as array entries. In these cases, React only executes the useEffect statement if at least one of the provided dependencies has changed since the previous run. In other words, with the dependency array, you make the execution dependent on certain conditions.

More often than not, this is what we want; we usually want to execute side effects after specific conditions, e.g., data has changed, a prop changed, or the user first sees our component. Another strategy to skip unnecessary effects is to prevent unnecessary re-renders in the first place with, e.g., React.memo, as we’ll see later.

Back to our example where we want to skip unnecessary effects after an intended re-render, we just have to add an array with title as a dependency. With that, the effect is only executed when the values between render cycles differ.

