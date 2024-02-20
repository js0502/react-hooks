// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  // const [name, setName] = React.useState(window.localStorage.getItem('name') ?? initialName)
 
  

   console.log("Component rerender");
  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  const useLocalStorageState = (key, initialValue='', {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  } = {}) => {
    const valInLocalStorage = window.localStorage.getItem(key);
    const [variable, setVariable] = React.useState(()=> (valInLocalStorage?deserialize(valInLocalStorage):(typeof initialValue === 'function'?initialValue():initialValue)));
     
    const prevKeyRef = React.useRef(key);

    React.useEffect(()=>{
      const prevKey = prevKeyRef.current;
      if(prevKey !== key) window.localStorage.removeItem(prevKey);
      
      prevKeyRef.current = key;

    window.localStorage.setItem(key, serialize(variable));
  }, [key, serialize, variable]);
  return [variable, setVariable];
}

  const [name, setName] = useLocalStorageState('name', initialName);

  function handleChange(event) {
    setName(event.target.value)
  }

  // const [name2, setName2] = React.useState(initialName);
  // function handleChange2(event) {
  //   setName2(event.target.value)
  // }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
        {/* <label htmlFor="name2">Name2: </label>
        <input value={name2} onChange={handleChange2} id="name2" /> */}
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName={15}/>
}

export default App
