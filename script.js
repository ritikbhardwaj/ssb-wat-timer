const buzzer = document.getElementById('buzzer');
const Img_fullScreen = document.getElementById('full_screen');

/* Word */
const _Text_WAT_Word = document.getElementById('word');

/** Counters */
const Input_currentWordCounter = document.querySelector('#counter input');
let Text_totalWordCounter = document.querySelector('#counter p');

/** Misc elements */
const UI_errorElement = document.getElementById('error');

/* Buttons */
const Button_play = document.getElementById('play');
const Button_pause = document.getElementById('pause');
const Button_reset = document.getElementById('reset');

const Button_prev = document.getElementById('prev');
const Button_next = document.getElementById('next');

const State = {
  PLAY: 1,
  PAUSE: 0
};

let appState = null;

// const flag = {
//   pause: false,
//   showError: false,
// }

const buttonValid = {
  play: true,
  pause: true,
  reset: true
}

const introWord = 'Word Association Test';
const outroWord = 'Test has ended.'

const actualWords = ['India', 'Murder', 'Adventure', 'Penalty', 'Love', 'Yoga', 'Cooperation', 'Loafer', 'Destiny', 'Death'];

const words = [
  introWord, ...actualWords, outroWord
]

let _currentWordIndex = 0;
let interval = null;

/** Inint Application */
(function init() {
  Text_totalWordCounter.innerText = words.length;
  setWordText(introWord);
  _currentWordIndex = 0;
  setCurrentWordCounter(_currentWordIndex+1);
  setState('pause');
})();

// function toggleError(flag, message) {
//   if(flag) {
//     flag.showError = true;
//     error.style.display = 'block';
//     error.innerText = message;
//   } else {
//     flag.showError = false;
//     error.style.display = 'none';
//   }
// }

/** Set word text */
function setWordText(s) {

  if(typeof s !== 'string') {
    throw new Error('String expected.');
  }

  if(_currentWordIndex !== 0 && _currentWordIndex !== words.length - 1) {
    _Text_WAT_Word.innerText = s.toUpperCase();
  } else {
    _Text_WAT_Word.innerText = s;
  }

}

function setCurrentWordCounter(value) {
  Input_currentWordCounter.value = value;
}

Input_currentWordCounter.addEventListener('change', Input_currentWordCounterChange);
function Input_currentWordCounterChange(event) {
  if(Input_currentWordCounter.value <= 0) {
    setCurrentWordCounter(1);
    _currentWordIndex = 0;
    setWordText(words[_currentWordIndex]);
    return;
  }

  if(Input_currentWordCounter.value > words.length) {
    setCurrentWordCounter(words.length);
    _currentWordIndex = words.length - 1;
    setWordText(words[_currentWordIndex]);
    return;
  }

  _currentWordIndex = Input_currentWordCounter.value;
  setWordText(words[_currentWordIndex]);
}

/** Prev handler */
Button_prev.addEventListener('click', ()=> {

  if(_currentWordIndex === 0) {
    prev
    return;
  }

  clearInterval(interval);
  setState('pause');

  _currentWordIndex -= 1;
  setWordText(words[_currentWordIndex]);
  setCurrentWordCounter(_currentWordIndex + 1);
});

Button_next.addEventListener('click', ()=> {

  if(_currentWordIndex === words.length - 1) {
    return;
  }

  clearInterval(interval);
  setState('pause');

  _currentWordIndex += 1;
  setWordText(words[_currentWordIndex]);
  setCurrentWordCounter((_currentWordIndex + 1));
});

/** Pause play events */
play.addEventListener('click', ()=> {

  /* If the state is already play */
  if(appState === State.PLAY) {
    return;
  }

  /** Else set state to play */
  setState('play');

  interval = setInterval(() => {

    if(_currentWordIndex === words.length-1) {
      clearInterval(interval);
      setState('pause');
      return;
    }

    if(appState === State.PAUSE) {
      return;
    }

    _currentWordIndex += 1;
    setWordText(words[_currentWordIndex]);
    setCurrentWordCounter(_currentWordIndex+1);
    buzzer.play();
  }, 1000);
});

function setState(state) {
  if(state !== 'pause' && state !== 'play') {
    throw new Error('Invalid state.');
  }

  if(state === 'pause') {
    Button_pause.style.backgroundColor = 'blue';
    Button_play.style.backgroundColor = 'white';
    appState = State.PAUSE;
  }

  if(state === 'play') {
    Button_pause.style.backgroundColor = 'white';
    Button_play.style.backgroundColor = 'blue';
    appState = State.PLAY;
  }
}

pause.addEventListener('click', ()=> {
  clearInterval(interval);
  setState('pause');
});

/** Reset handler */
reset.addEventListener('click', ()=> {
  clearInterval(interval);
  _currentWordIndex = 0;
  setState('pause');
  setWordText('<WAT>');
  setCurrentWordCounter(_currentWordIndex+1);
});
