import "../styles/layout/Form.scss";

function Form(props) {
  const handleKeyDown = (ev) => {
    // Validar si es una letra antes de limpiar el input
    if (ev.key.match("^[a-zA-ZáäéëíïóöúüÁÄÉËÍÏÓÖÚÜñÑ]$")) {
      props.setInputLetter(""); // Borra la letra anterior cuando se presiona otra letra
    }
  };

  const handleChange = (ev) => {
    const inputValue = ev.target.value;
    if (inputValue.match("^[a-zA-ZáäéëíïóöúüÁÄÉËÍÏÓÖÚÜñÑ]?$")) {
      props.setInputLetter(inputValue); // Guarda la nueva letra en el input
      props.handleLastLetter(ev); // Procesa la letra en el juego
    }
  };

  return (
    <form className="form" onSubmit={(ev) => ev.preventDefault()}>
      <label className="title" htmlFor="last-letter">
        Escribe una letra:
      </label>
      <input
        autoComplete="off"
        className="form__input"
        maxLength="1"
        type="text"
        name="last-letter"
        id="last-letter"
        value={props.inputLetter}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
}

export default Form;