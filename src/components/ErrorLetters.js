import '../styles/layout/Letters.scss';

const ErrorLetters = (props) => {
    const renderWrongLetters = () => {
        return props.wrongLetters.map((letter, index) => {
          if (props.wrongLetters.findIndex((currentLetter) => letter === currentLetter) !== -1) {
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
    <div className="error">
      <h2 className="title">Letras falladas:</h2>
      <ul className="letters">{renderWrongLetters()}</ul>
    </div>
  );
};

export default ErrorLetters;
