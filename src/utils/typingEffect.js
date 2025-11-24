const randomChar = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return chars[Math.floor(Math.random() * chars.length)];
};

const typingEffect = (text, setText, speed = 50) => {
  let currentText = '';
  let currentIndex = 0;

  const type = () => {
    if (currentIndex < text.length) {
      currentText = text.substring(0, currentIndex) + randomChar();
      setText(currentText); 
      currentIndex++;
      setTimeout(type, speed);
    } else {
      setText(text); 
    }
  };

  type();
};

export default typingEffect;
