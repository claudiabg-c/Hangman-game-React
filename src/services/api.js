// Fichero src/services/api.js
const callToApi = () => {
  return fetch(`https://random-word-api.herokuapp.com/word?lang=es`)
    .then((response) => response.json())
    .then((response) => {      
      const word = response[0]
      return word;
    });
};

export default callToApi;