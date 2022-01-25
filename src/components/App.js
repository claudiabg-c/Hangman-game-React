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
  //Estado palabra a adivinar
  const [word, setWord] = useState("");
  //Estado letras que introduce la jugadora
  const [userLetters, setUserLetters] = useState([]);
  //Estado letras buenas
  const [goodLetters, setGoodLetters] = useState([]);
  //Estado letras fallidas
  const [wrongLetters, setWrongLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    callToApi().then((response) => {
      console.log(response);
      setWord(response);
      setIsLoading(false);
    });
  }, []);

  const handleLastLetter = (ev) => {
    ev.preventDefault();
    const inputValue = ev.currentTarget.value;
    if (inputValue.match("^[a-zA-ZáäéëíïóöúüÁÄÉËÍÏÓÖÚÜñÑ]?$")) {
      if (inputValue !== "") {
        setUserLetters([...userLetters, inputValue]);
        if (word.includes(inputValue)) {
          //Al array de letras buenas
          //Añadir comprobación de si ya existe para que no la ñada de nuevo.
          setGoodLetters([...goodLetters, inputValue]);
        } else {
          //Al array de letras fallidas
          //Añadir comprobación de si ya existe para que no la ñada de nuevo.
          setWrongLetters([...wrongLetters, inputValue]);
        }
      }
    }
  };

  const handleWord = (value) => {
    setWrongLetters([]);
    setGoodLetters([]);
    setWord(value);
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
                <Form handleLastLetter={handleLastLetter} />
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
    </div>
  );
}

export default App;
