import "./App.css";

function App() {
  return (
    <main className="flex flex__adjust items__center">
      <div className="container__half flex__col flex items__center justify__center">
        <img src="/Login.png"></img>
        <div className="mt-2">
          <h1>Zeus Quiz</h1>
          <h2>Projeto de Quiz</h2>
        </div>
      </div>
      <div className="container__half flex__col flex items__center justify__center">
        <div className="login">
          <h2>Fazer Login</h2>
          <label className="mt-2" htmlFor="name">
            Nome
          </label>
          <input id="name" name="name" placeholder="Seu nome"></input>
          <button className="mt-2">Jogar</button>
        </div>
      </div>
    </main>
  );
}

export default App;
