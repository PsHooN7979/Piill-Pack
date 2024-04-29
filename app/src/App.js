import AppRouter from "./(route)/Router";

function App() {
  console.log(M.navigator.os());
  return (
    <>
      test
      <AppRouter />
    </>
  );
}

export default App;
