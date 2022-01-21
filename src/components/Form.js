function Form(props) {
  const handleLetter = (ev) => {
    props.handleLastLetter(ev);
  };
  return (
    <form className="form">
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
        //value={lastLetter}
        onChange={handleLetter}
      />
    </form>
  );
}

export default Form;
