import words from './words.json';

const callToApi = () => {
  return new Promise((resolve) => {
    const randomIndex = Math.floor(Math.random() * words.words.length);
    const word = words.words[randomIndex]; 
    resolve(word);
  });
};

export default callToApi;
