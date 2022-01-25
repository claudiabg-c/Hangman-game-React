const Options = (props) => {
  const handleChangeWord = (ev) => {
    props.handleWord(ev.currentTarget.value);
  };

  return (
    <form>
      <label className="title" htmlFor="word">
        Escribe aquí la palabra que hay que adivinar:
      </label>
      <input
        autoFocus
        autoComplete="off"
        className="form__input"
        maxLength="15"
        type="text"
        id="word"
        name="word"
        onChange={handleChangeWord}
      />
    </form>
  );
};

export default Options;
