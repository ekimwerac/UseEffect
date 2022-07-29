import React, {useEffect, useState} from "react";
// import Counter from "./Counter";

function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("useEffect")
    const interval = setInterval(function () {
      setCount((prev) => prev + 1);
    }, 1000);
    // return optional function for cleanup
    // in this case acts like componentWillUnmount
    return () => {
      console.log("cleanup");
      clearInterval(interval);
    }
  }, [count]);
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
  export default EffectsDemoUnmount;
