Let’s take a look at the following code and try to read the initial title from local storage, if available, in an additional useEffect block.

As you can see, we have an infinite loop of effects because every state change with setTitle triggers another effect, which updates the state again.