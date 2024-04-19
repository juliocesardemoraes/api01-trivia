import { useAtom } from "jotai";
import { atomName } from "../../store/store";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useAtom(atomName);
  const navigate = useNavigate();

  return (
    <main className="flex flex__adjust items__center">
      <div className="container__half flex__col flex items__center justify__center">
        <img src="/Login.png"></img>
        <div className="mt-2">
          <h1>Zeus Quiz</h1>
          <h2>Projeto de Quiz</h2>
        </div>
      </div>
      <form
        className="container__half flex__col flex items__center justify__center"
        onSubmit={() => {
          navigate("/game");
        }}
      >
        <div className="login">
          <h2>Fazer Login</h2>
          <label className="mt-2" htmlFor="name">
            Nome
          </label>
          <input
            id="name"
            name="name"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          ></input>
          <button className="mt-2" type="submit">
            Jogar
          </button>
        </div>
      </form>
    </main>
  );
}

export default Login;
