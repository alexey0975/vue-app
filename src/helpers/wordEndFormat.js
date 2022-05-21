export default function wordEndFormat(word, number) {
  const numToStr = String(number);
  const lastDigit = Number(numToStr[numToStr.length - 1]);
  const secondDigit = Number(numToStr[numToStr.length - 2]);

  if (secondDigit >= 11 && secondDigit <= 20) {
    return `${word}ов`;
  }

  if (lastDigit === 1) {
    return word;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${word}a`;
  }

  return `${word}ов`;
}
