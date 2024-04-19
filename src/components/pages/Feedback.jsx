import { useAtom } from "jotai";
import { atomName, atomPoints } from "../../store/store";
import "./styles/game.css";

export default function Feedback() {
  const [name] = useAtom(atomName);
  const [points] = useAtom(atomPoints);
  return (
    <>
      <main className="flex flex__adjust items__center">
        <div className="container__half flex__col flex items__center justify__center">
          <img src="/Feedback.png"></img>
          <div className="flex back__orange mini__container justify__between items__center p-2">
            <div className="flex items__center gap-1">
              <img src="/Profile.png"></img>
              <h3>{name}</h3>
            </div>
            <h3>Pontos: {points}</h3>
          </div>
        </div>
        <div className="container__half flex__col flex items__center justify__center">
          <h1>Parabéns: {name}</h1>
          <h3>Você fez {points} pontos</h3>
          <a href="/">
            <button className="mt-2">Jogar novamente</button>
          </a>
        </div>
      </main>
    </>
  );
}
