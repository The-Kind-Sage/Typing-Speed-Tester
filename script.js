const quoteBox = document.getElementById('quote');
const inputBox = document.getElementById('input');
const startBtn = document.getElementById('start');
const results = document.getElementById('results');

const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "Do not watch the clock. Do what it does. Keep going.",
  "Simplicity is the soul of efficiency.",
  "Code is like humor. When you have to explain it, it’s bad."
];

let startTime, endTime;

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

function startTest() {
  const quote = getRandomQuote();
  quoteBox.textContent = quote;
  inputBox.disabled = false;
  inputBox.value = '';
  inputBox.focus();
  startBtn.textContent = "Restart Test";
  results.textContent = '';
  startTime = new Date().getTime();
}

function endTest() {
  endTime = new Date().getTime();
  const totalTime = (endTime - startTime) / 1000;
  const totalWords = inputBox.value.trim().split(/\s+/).length;
  const speed = Math.round((totalWords / totalTime) * 60);

  const quote = quoteBox.textContent.trim();
  const typed = inputBox.value.trim();
  let correctWords = 0;

  quote.split(" ").forEach((word, index) => {
    if (typed.split(" ")[index] === word) correctWords++;
  });

  const accuracy = Math.round((correctWords / quote.split(" ").length) * 100);

  results.innerHTML = `
    <p><strong>Time:</strong> ${totalTime.toFixed(1)} seconds</p>
    <p><strong>Speed:</strong> ${speed} WPM</p>
    <p><strong>Accuracy:</strong> ${accuracy}%</p>
  `;

  inputBox.disabled = true;
}

inputBox.addEventListener("input", () => {
  const currentText = inputBox.value.trim();
  if (currentText === quoteBox.textContent.trim()) {
    endTest();
  }
});

startBtn.addEventListener("click", startTest);