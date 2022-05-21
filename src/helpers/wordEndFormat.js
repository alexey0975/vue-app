export default function wordEndFormat(word, number) {
  if (number % 100 >= 11 && number % 100 <= 20) {
    return `${word}ов`;
  }

  if (number % 10 === 1) {
    return word;
  }

  if (number % 10 >= 2 && number % 10 <= 4) {
    return `${word}a`;
  }

  return `${word}ов`;
}
