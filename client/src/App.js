const App = () => {

  function handleClick() {
    fetch("/api")
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  return(
    <button onClick={handleClick}>Click me!</button>
  );
}

export default App;