import '../styles/layout/Letters.scss';

const SolutionLetters = (props) => {
    const renderSolutionLetters = () => {
        const wordLetters = props.word.split('');
        return wordLetters.map((letter, index) => {
          if (props.goodLetters.findIndex((currentLetter) => letter === currentLetter) !== -1) {
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
    <div className="solution">
      <h2 className="title">Solución:</h2>
      <ul className="letters">{renderSolutionLetters()}</ul>
    </div>
  );
};

export default SolutionLetters;
