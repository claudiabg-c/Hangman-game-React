const Instructions = (props) => {
  return (
    <section className="instructions">
      <p>
        Bienvenido al juego del ahorcado. Tu objetivo es adivinar la palabra oculta antes de que el dibujo del ahorcado se complete.
      </p>
      <p>
        Para jugar, introduce una letra en el campo de entrada. Si la letra está en la palabra, aparecerá en su posición correspondiente. Si la letra no está en la palabra, se añadirá a la lista de errores y se dibujará una parte del ahorcado.
      </p>
      <p>
        El juego termina cuando logras adivinar la palabra o cuando se completa el dibujo del ahorcado. ¡Buena suerte!
      </p>
    </section>
  );
};

export default Instructions;