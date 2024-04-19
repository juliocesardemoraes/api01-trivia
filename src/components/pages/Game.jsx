import { useEffect, useState } from "react";
import "./styles/game.css";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { atomName, atomPoints } from "../../store/store";

export default function Game() {
  const MAX_QUESTIONS = 5;
  const TIMER = 30;
  const [name] = useAtom(atomName);
  const [points, setPoints] = useAtom(atomPoints);
  const [answers, setAnswers] = useState(null);
  const [question, setQuestion] = useState(null);
  const [rightAnswer, setRightAnswer] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [dataFromApi, setDataFromApi] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [timer, setTimer] = useState(TIMER);

  let isIntervalRunning = false;
  const navigate = useNavigate();

  const checkAnswers = () => {
    // RESPOSTA ESCOLHIDA É IGUAL A RESPOSTA CORRETA
    if (selectedAnswer === rightAnswer) {
      setPoints((prev) => {
        return prev + 10;
      });
    }
    if (selectedIndex === MAX_QUESTIONS - 1) {
      return navigate("/feedback");
    }

    setTimer(TIMER);

    setSelectedIndex((prev) => {
      return prev + 1;
    });
  };

  const renderQuestion = (data = null, index = null) => {
    let dataLet = data !== null ? data : dataFromApi;
    let indexLet = index !== null ? index : selectedIndex;

    if (!dataLet) return;

    const questionData = dataLet.results[indexLet].question;
    let arrayQuestions = [
      dataLet.results[indexLet].correct_answer,
      ...dataLet.results[indexLet].incorrect_answers,
    ];
    arrayQuestions = arrayQuestions.sort();
    setQuestion(questionData);
    setAnswers(arrayQuestions);
    setRightAnswer(dataLet.results[indexLet].correct_answer);
  };

  useEffect(() => {
    if (timer <= 0) {
      checkAnswers();
    }
  }, [timer]);

  useEffect(() => {
    renderQuestion();
  }, [selectedIndex]);

  useEffect(() => {
    let intervalFunction = null;
    // EXECUTA UM BLOCO DE CÓDIGO
    if (!isIntervalRunning) {
      setInterval(() => {
        setTimer((prev) => {
          return prev - 1;
        });
      }, 1000);
      isIntervalRunning = true;
    }

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const getInfo = async () => {
      const res = await fetch(
        `https://tryvia.ptr.red/api.php?amount=${MAX_QUESTIONS}`,
        requestOptions
      );
      const data = await res.json();
      setDataFromApi(data);
      renderQuestion(data, 0);
    };

    getInfo();

    return () => {
      clearInterval(intervalFunction);
    };
  }, []);

  return (
    <main className="flex flex__adjust items__center">
      <div className="container__half flex__col flex items__center justify__center back__orange">
        <img src="/Timer.png"></img>
        <div className="mt-2">
          <h1>{timer}</h1>
        </div>
      </div>
      <div className="container__half flex__col flex items__center pt-2">
        <div className="flex back__orange mini__container justify__between items__center p-2">
          <div className="flex items__center gap-1">
            <img src="/Profile.png"></img>
            <h3>{name}</h3>
          </div>
          <h3>Pontos: {points}</h3>
        </div>
        <div className="flex flex__col w-75 justify__between items__center mt-4 gap-1">
          <div className="back__orange mini__container__full p-2">
            <h3>{question}</h3>
          </div>
          {Array.isArray(answers) &&
            answers.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`flex back__orange mini__container__full justify__between items__center p-2 ${
                    item === selectedAnswer && "selected__color"
                  }`}
                  onClick={() => setSelectedAnswer(item)}
                >
                  <h3>{item}</h3>
                </div>
              );
            })}
          <div
            className="back__orange w-50 p-1 next"
            onClick={() => {
              checkAnswers();
            }}
          >
            Próximo
          </div>
        </div>
      </div>
    </main>
  );
}
