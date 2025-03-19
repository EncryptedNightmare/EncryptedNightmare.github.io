const randomChar = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return chars[Math.floor(Math.random() * chars.length)];
};

const typingEffect = (element, text, speed = 50) => {
  let currentText = '';
  let currentIndex = 0;

  const type = () => {
    if (currentIndex < text.length) {
      currentText = text.substring(0, currentIndex) + randomChar();
      element.textContent = currentText;
      currentIndex++;
      setTimeout(type, speed);
    } else {
      element.textContent = text;
    }
  };

  type();
};

export default typingEffect;