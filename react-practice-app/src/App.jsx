import React from "react";

export const CounterComp = () => {
  //New World w. React.useState()
  const [counter, setCounter] = React.useState(0);
  const increment = () => {
    setCounter(counter + 1);
    console.log(counter)
  }
  //Old World
  // let counter = 1;
  // const increment = () => {
  //   counter = counter + 1;
  //   console.log(counter)

  return (
    <div>
      {counter}

      <button onClick={increment}>Increment</button>
    </div>
  );
}

export const InputBoxComp = () => {
  const [inputText, setInputText] = React.useState('Jerome');
  let onChange = (event) => {
    const newText = event.target.value;
    setInputText(newText);
    console.log(inputText);
  }
  return (
    <div><input type="text" placeholder="type here..." onChange={onChange} />{inputText}</div>
  )
}




export default function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontWeight: "bold", gap: "10px" }}>
      <CounterComp />
      <InputBoxComp />
    </div>
  )
}
