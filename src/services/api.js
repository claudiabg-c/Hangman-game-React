// Fichero src/services/api.js
const callToApi = () => {
  return fetch(`https://palabras-aleatorias-public-api.herokuapp.com/random`)
    .then((response) => response.json())
    .then((response) => {
      const word = response.body.Word;
      return word;
    });
};

export default callToApi;
