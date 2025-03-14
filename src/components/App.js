import "../styles/App.scss";
import { useState, useEffect } from "react";
import callToApi from "../services/api.js";
import Header from "./Header";
import Dummy from "./Dummy";
import ErrorLetters from "./ErrorLetters";
import SolutionLetters from "./SolutionLetters";
import Form from "./Form";
import Footer from "./Footer";
import Instructions from "./Instructions";
import Options from "./Options";
import Loading from "./Loading";
import { Route, Switch } from "react-router-dom";

function App() {
  // Estado palabra a adivinar
  const [word, setWord] = useState("");
  // Estado letras buenas
  const [goodLetters, setGoodLetters] = useState([]);
  // Estado letras fallidas
  const [wrongLetters, setWrongLetters] = useState([]);
  // Loader mientras la api busca una palabra
  const [isLoading, setIsLoading] = useState(false);
  // Estado para mostrar el popup al perder
  const [isGameOver, setIsGameOver] = useState(false);
  // Estado para mostrar el popup de victoria
  const [isWinner, setIsWinner] = useState(false);
  // Estado para la letra en el input
  const [inputLetter, setInputLetter] = useState("");

  useEffect(() => {
    setIsLoading(true);
    callToApi().then((response) => {
      console.log(response);
      setWord(response.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\./g, "")
      );
      setIsLoading(false);
    });
  }, []);

  const handleLastLetter = (ev) => {
    ev.preventDefault();
    const inputValue = ev.currentTarget.value;

    if (inputValue.match("^[a-zA-ZáäéëíïóöúüÁÄÉËÍÏÓÖÚÜñÑ]?$")) {
      if (inputValue !== "") {
        if (word.includes(inputValue)) {
          setGoodLetters((prev) => {
            const newGoodLetters = [...prev, inputValue];

            // Verificar si todas las letras de la palabra han sido adivinadas
            const uniqueWordLetters = [...new Set(word.split(""))]; // Letras únicas de la palabra
            const uniqueGoodLetters = [...new Set(newGoodLetters)]; // Letras únicas acertadas

            if (uniqueGoodLetters.length === uniqueWordLetters.length) {
              setIsWinner(true); // Activar el popup de victoria
            }

            return newGoodLetters;
          });
        } else if (!wrongLetters.includes(inputValue)) {
          if (wrongLetters.length < 12) {
            setWrongLetters((prev) => [...prev, inputValue]);
          } else {
            setIsGameOver(true); // Activar el popup al llegar a 13 fallos
          }
        }
      }
    }
  };

  const handleWord = (value) => {
    setWrongLetters([]);
    setGoodLetters([]);
    setWord(value);
  };

  // Función para reiniciar el juego
  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div>
      <div className="page">
        <Header title="Juego del ahorcado" />
        <main className="main">
          <Loading isLoading={isLoading} />
          <Switch>
            <Route path="/" exact>
              <section>
                <SolutionLetters word={word} goodLetters={goodLetters} />
                <ErrorLetters wrongLetters={wrongLetters} />
                <Form
                  handleLastLetter={handleLastLetter}
                  inputLetter={inputLetter}
                  setInputLetter={setInputLetter}
                />
              </section>
            </Route>
            <Route path="/instructions">
              <Instructions />
            </Route>

            <Route path="/options">
              <Options handleWord={handleWord} />
            </Route>
          </Switch>
          <Dummy length={wrongLetters.length} />
        </main>
        <Footer />
      </div>

      {/* POPUP DE DERROTA */}
      {isGameOver && (
        <div className="modal">
          <div className="modal-content">
            <h2>¡Has perdido! 😢</h2>
            <p>La palabra era: <strong>{word}</strong></p>
            <button onClick={handleReset}>Volver a jugar</button>
          </div>
        </div>
      )}

      {/* POPUP DE VICTORIA */}
      {isWinner && (
        <div className="modal">
          <div className="modal-content">
            <h2>¡Felicidades! 🎉</h2>
            <p>Has adivinado la palabra: <strong>{word}</strong></p>
            <button onClick={handleReset}>Jugar de nuevo</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
