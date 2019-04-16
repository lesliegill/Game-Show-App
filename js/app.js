//*****VARIABLES*****//

const qwerty = document.getElementById('qwerty'); 
const phrase = document.getElementById('phrase'); 
let missed = 0;
const overlay = document.getElementById('overlay'); 
const startButton = document.querySelector('.btn__reset');
const tries = document.getElementsByClassName('tries');
const phrases = [
    'if the shoe fits', 
    'let sleeping dogs lie',
    'a diamond in the rough',
    'two peas in a pod',
    'back to the drawing board',
    'burning the midnight oil',
    'the customer is always right'];

const phraseUL = phrase.querySelector('ul'); 
let letterFound = null; 
const letters = document.getElementsByClassName('letter');
const show = document.getElementsByClassName('show');

/*********************************************************/





/*****START OF GAME*****/

startButton.addEventListener('click', (e) => { 
  overlay.style.display = "none";
  missed = 0; 
  for (i = 0; i < tries.length; i ++) { 
  tries[i].firstChild.src = 'images/liveHeart.png';
  }



  const buttons = qwerty.getElementsByTagName('button');
  for (i = 0; i < buttons.length; i ++) {
    buttons[i].className = ''; 
    buttons[i].disabled = false;
  }
  

  phraseUL.innerHTML = '';
  addPhraseToDisplay(getRandomPhraseAsArray(phrases));
});



qwerty.addEventListener('click', (e) => { 
    if (e.target.tagName === 'BUTTON') { 
      const button = e.target; 
      const pressButton = button.textContent; 
      button.className = 'chosen'; 
      button.disabled = true; 
      checkLetter(pressButton); 
      if (letterFound === null) { 
        missed += 1; 
        tries[tries.length - missed].firstChild.src = 'images/lostHeart.png';
      }
      checkWin(); 
    }
  });





  /*****FUNCTIONS*****/


function getRandomPhraseAsArray(arr) {
    const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
    return randomPhrase.split('');
    
  }



function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i ++) {
      let letter = arr[i];
      const li = document.createElement('li');
      li.textContent = letter;
    if (letter === ' ') {
        li.style.width = '20px';
        li.className = '';    
    } else {
        li.className = 'letter';
      }
      phraseUL.appendChild(li);
    }
  }
  


function contains(src, search) {
  return src.indexOf(search) !== -1;
}



function checkLetter(pressButton) {
    const array = Array.from(letters); 
    const eachLetter = array.map(a => a.textContent); 
    for (let i = 0; i < eachLetter.length; i ++) { 
      if (eachLetter[i] === pressButton) { 
        array[i].classList.add('show'); 
        letterFound = eachLetter[i]; 
        array[i].style.transition = "1s";
      } else if (contains(eachLetter, pressButton) === false) { 
        letterFound = null; 
      }
    }
    return letterFound; 
  }





function checkWin() {
    function outcome (winLose, banner) { 
      overlay.querySelector('h2').textContent = banner; 
      overlay.className = winLose; 
      overlay.style.display = 'flex'; 
      startButton.textContent = 'Play Again' 
    }

    if (show.length === letters.length) { 
        outcome ('win', 'congratulations, you won!');
    } else if (missed === 5) {
      outcome ('lose', 'sorry, you lose!');
    }
  }

