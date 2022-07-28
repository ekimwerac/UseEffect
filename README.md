https://blog.logrocket.com/guide-to-react-useeffect-hook/

The useEffect statement is only defined with a single, mandatory argument to implement the actual effect to execute. In our case, we use the state variable representing the title and assign its value to document.title.

Because we skipped the second argument, this useEffect is called after every render. Because we implemented an uncontrolled input field with the help of the useRef Hook, handleClick is only invoked after the user clicks on the button. This causes a re-render because setTitle performs a state change.

After every render cycle, useEffect is executed again. To demonstrate this, I added two console.log statements.
