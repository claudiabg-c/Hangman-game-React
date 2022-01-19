import '../styles/App.scss';
import { useState, useEffect } from 'react';
import callToApi from '../services/api.js'

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

    callToApi().then(response => {
      console.log(response)
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
          setGoodLetters([...goodLetters, inputValue]);
        } else {
          //Al array de letras fallidas
          setWrongLetters([...wrongLetters, inputValue]);
        }
      }
    }
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
        <header>
          <h1 className='header__title'>Juego del ahorcado</h1>
        </header>
        <main className='main'>
          <section>
            <div className='solution'>
              <h2 className='title'>Solución:</h2>
              <ul className='letters'>{renderSolutionLetters()}</ul>
            </div>
            <div className='error'>
              <h2 className='title'>Letras falladas:</h2>
              <ul className='letters'>
                <li className='letter'>f</li>
                <li className='letter'>q</li>
                <li className='letter'>h</li>
                <li className='letter'>p</li>
                <li className='letter'>x</li>
              </ul>
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
          <section className={`dummy error-${wrongLetters.length}`}>
            <span className='error-13 eye'></span>
            <span className='error-12 eye'></span>
            <span className='error-11 line'></span>
            <span className='error-10 line'></span>
            <span className='error-9 line'></span>
            <span className='error-8 line'></span>
            <span className='error-7 line'></span>
            <span className='error-6 head'></span>
            <span className='error-5 line'></span>
            <span className='error-4 line'></span>
            <span className='error-3 line'></span>
            <span className='error-2 line'></span>
            <span className='error-1 line'></span>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
