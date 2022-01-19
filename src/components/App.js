import '../styles/App.scss';
import { useState, useEffect } from 'react';
import callToApi from '../services/api.js';
import Header from './Header';
import Dummy from './Dummy';

function App() {
  //Estado palabra a adivinar
  const [word, setWord] = useState('');
  //Estado letras que introduce la jugadora
  const [userLetters, setUserLetters] = useState([]);
  //Estado la última letra introducida por la jugadora
  const [lastLetter, setlastLetter] = useState('');
  //Estado letras buenas
  const [goodLetters, setGoodLetters] = useState([]);
  //Estado letras fallidas
  const [wrongLetters, setWrongLetters] = useState([]);

  useEffect(() => {
    callToApi().then((response) => {
      console.log(response);
      setWord(response);
    });
  }, []);

  const handleLastLetter = (ev) => {
    ev.preventDefault();
    const inputValue = ev.currentTarget.value;
    if (inputValue.match('^[a-zA-ZáäéëíïóöúüÁÄÉËÍÏÓÖÚÜñÑ]?$')) {
      setlastLetter(inputValue);
      if (inputValue !== '') {
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

  const renderWrongLetters = () => {
    return wrongLetters.map((letter, index) => {
      if (wrongLetters.findIndex((currentLetter) => letter === currentLetter) !== -1) {
        return (
          <li key={index} className='letter'>
            {letter}
          </li>
        );
      } else {
        return <li key={index} className='letter'></li>;
      }
    });
  };

  const renderSolutionLetters = () => {
    const wordLetters = word.split('');
    return wordLetters.map((letter, index) => {
      if (goodLetters.findIndex((currentLetter) => letter === currentLetter) !== -1) {
        return (
          <li key={index} className='letter'>
            {letter}
          </li>
        );
      } else {
        return <li key={index} className='letter'></li>;
      }
    });
  };

  return (
    <div>
      <div className='page'>
        <Header title='Juego del ahorcado' />
        <main className='main'>
          <section>
            <div className='solution'>
              <h2 className='title'>Solución:</h2>
              <ul className='letters'>{renderSolutionLetters()}</ul>
            </div>
            <div className='error'>
              <h2 className='title'>Letras falladas:</h2>
              <ul className='letters'>{renderWrongLetters()}</ul>
            </div>
            <form className='form'>
              <label className='title' htmlFor='last-letter'>
                Escribe una letra:
              </label>
              <input
                autoComplete='off'
                className='form__input'
                maxLength='1'
                type='text'
                name='last-letter'
                id='last-letter'
                //value={lastLetter}
                onChange={handleLastLetter}
              />
            </form>
          </section>
          <Dummy length={wrongLetters.length} />
        </main>
      </div>
    </div>
  );
}

export default App;
