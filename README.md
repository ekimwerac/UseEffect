However, this example leads to unnecessary effects when you toggle the darkMode state variable.

Of course, it’s not a huge deal in this example, but you can imagine more problematic use cases that cause bugs or at least performance issues. Let’s take a look at the following code and try to read the initial title from local storage, if available, in an additional useEffect block.

