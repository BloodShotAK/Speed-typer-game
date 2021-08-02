const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
  'hello' , 'word' , 'keep' , 'going' , 'still' , 'doing' ,
    'more' , 'less' , 'feel' , 'love' , 'smile' , 'money' , 'save' ,
    'strong' , 'hide' , 'funny' , 'dry' , 'play' , 'game' , 'some' ,
    'short' , 'long' , 'music' , 'movies' , 'art' , 'everyday' ,
    'same' , 'level' , 'over' , 'overtime' , 'someday' , 'google' ,
    'full' , 'time' , 'children' , 'parent' , 'nodejs' , 'angular' ,
    'reactjs' , 'mongodb' , 'facebook' , 'twitter' , 'redis' ,
    'javascript' , 'java' , 'coffee' , 'fun' , 'trip' , 'sea' ,
    'find' , 'seek' , 'read' , 'book' , 'internet' , 'routine' ,
    'lazy' , 'man' , 'woman' , 'cat' , 'dog' , 'animals' , 'road' ,
    'street' , 'hotel' , 'phone' , 'laptop' , 'kitchen' , 'cook' ,
    'cake' , 'tasty' , 'football' , 'tennis' , 'plane' , 'chair' ,
    'number' , 'letter' , 'count' , 'bank' , 'office' , 'job' , 
    'sometimes' , 'easy' , 'lesson' , 'course', 'video' , 'audio' ,
    'player' , 'maybe' , 'cool' , 'loop' , 'board' , 'mountain' ,
    'slow' , 'fastest' , 'medium' , 'lovely' , 'goodbye' , 'space' ,
    'earth' , 'journal' , 'news' , 'famous' , 'compositor' , 'restaurant' ,
    'manager' , 'further' , 'furthermore' , 'beside' , 'addition' , 
    'synonymes' , 'moreover' , 'include' , 'glass' , 'cup' , 'world cup' ,
    'what' , 'impatient' , 'patient' , 'dance' , 'mistakes' , 'nobody' ,
    'sing' , 'control' , 'school' , 'university' , 'best'
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficulty to value in ls or medium
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

function startGame() {
  
  resetValues();
  
  // clear old and start a new timer
  clearInterval(time);
  timeInterval = setInterval(updateTime, 1000);
}

function resetValues() {
  time = 10;  
  score = 0;
  randomWord
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

// Game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Nice Try but Time is Up</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Restart</button>
  `;

  endgameEl.style.display = 'flex';
}

addWordToDOM();

// Event listeners

// Typing
text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 4;
    } else {
      time += 6;
    }

    updateTime();
  }
});

// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
