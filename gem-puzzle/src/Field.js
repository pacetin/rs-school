import Gem from './Gem';
import * as storage from './storage';

export default class PuzzleField {
  constructor() {
    this.fieldSize = null;
    this.gameStart = null;
    this.gameTime = 0;
    this.moves = 0;
    this.gems = [];

    this.timer = null;
    this.field = null;

    this.gem = {};
    this.lw = 20; // толщина рамки поля
    this.canvas = { width: 0, height: 0 };

    this.sounds = {
      chip: new Audio('./assets/sounds/chip.mp3'),
      over: new Audio('./assets/sounds/level_completed.mp3'),
    };
    this.isSound = true;

    this.animation = false;

    this.grabbedGem = null;
  }

  generate() {
    this._setCanvasSize();

    this.applySettings(4);
    this._generateGemsArray();
    // this._generateFakeArray();

    this.field.addEventListener('click', (e) => {
      const gem = this._defineGem(e.offsetX, e.offsetY);
      if (gem) {
        const hole = this._checkEmptyPlace(gem);
        if (hole && !this.animation) {
          this._startAnimation(gem, hole);
          if (this.isSound) this._soundPlay(this.sounds.chip);
        }
      }
    });

    /* this.field.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.grabbedGem = this._defineGem(e.offsetX, e.offsetY);
      this.field.addEventListener('mousemove', this._mouseMoveHandler.bind(this));
      console.log('mousedown')
    });

    this.field.addEventListener('mouseup', (e) => {
      e.preventDefault();
      this.grabbedGem = null;
      this.field.removeEventListener('mousemove', this._mouseMoveHandler.bind(this));
      console.log('mouseup')
    }); */

    this._renderField();

    const buttonCont = document.createElement('div'); // button-container
    buttonCont.classList.add('button-container');
    const exitButton = document.createElement('button');
    exitButton.classList.add('exit');
    exitButton.textContent = 'EXIT';
    exitButton.disabled = true;
    buttonCont.append(exitButton);

    const soundButton = document.createElement('button');
    soundButton.classList.add('sound');
    soundButton.innerHTML = '<i class="material-icons">music_note</i>';
    buttonCont.append(soundButton);

    soundButton.addEventListener('click', () => {
      this._toggleSound();
      soundButton.innerHTML = this.isSound ? '<i class="material-icons">music_note</i>' : '<i class="material-icons">music_off</i>';
    });

    exitButton.addEventListener('click', () => {
      this._stopTime();
      this.saveGame();
      document.querySelector('.menu').classList.remove('menu_hidden');
      document.querySelector('.exit').disabled = true;
    });

    document.body.prepend(buttonCont);

    const cont = document.createElement('div'); // time-container
    cont.classList.add('time-container');
    const movesLabel = document.createElement('div');
    movesLabel.classList.add('moves');
    movesLabel.textContent = `Moves: ${this.moves}`;
    cont.append(movesLabel);

    const timeLabel = document.createElement('div');
    timeLabel.classList.add('time');
    cont.append(timeLabel);
    timeLabel.textContent = 'Time: 00 : 00';

    document.body.prepend(cont);
  }

  _mouseMoveHandler(e) {    
    if (this.grabbedGem) {
      let hole = this._defineGem(e.offsetX, e.offsetY);
    }
  }

  resize() {
    this._setCanvasSize();
    this._setGemProperties();
    this._renderField();
  }

  _setCanvasSize() {
    this.field = document.querySelector('#CANVAS');    
    if (document.documentElement.clientWidth > 450) {
      this.field.width = '440';
      this.field.height = '440';
      this.canvas.width = 440;
      this.canvas.height = 440;
      this.lw = 20;
    } else {
      this.field.width = '320';
      this.field.height = '320';
      this.lw = 10;
      this.canvas.width = 320;
      this.canvas.height = 320;    
    }
  }

  _setGemProperties() {
    this.gem.width = (this.canvas.width - 2*this.lw)/this.fieldSize;
    this.gem.height = (this.canvas.height - 2*this.lw)/this.fieldSize;
    this.gem.speed = 0.2;
  }

  applySettings(size = 4) {
    this.fieldSize = size;
    this._setGemProperties();
  }

  startNewGame() {
    this._resetGame();
    this._setTime(0);
    this._updateMoves();

    this.gameStart = new Date().getTime();
    this.timer = setInterval(this._updateTime.bind(this), 1000);

    this._generateGemsArray();
    // this._generateFakeArray();

    this._renderField();

    storage.del('Fifteenth');
    document.querySelector('.exit').disabled = false;
  }

  resumeGame() {
    const savedGame = storage.get('Fifteenth');
    this.fieldSize = savedGame.fieldSize;
    this.moves = savedGame.moves;
    this.gems = savedGame.gems;

    this._setTime(savedGame.time);
    this._updateMoves();

    this.gameStart = new Date().getTime() - savedGame.time;
    this.timer = setInterval(this._updateTime.bind(this), 1000);

    this._renderField();

    storage.del('Fifteenth');
    document.querySelector('.exit').disabled = false;
  }

  saveGame() {
    const savedModel = {
      fieldSize: this.fieldSize,
      time: this.gameTime,
      moves: this.moves,
      gems: this.gems,
    };
    storage.set('Fifteenth', savedModel);
  }

  _stopTime() {
    let now = new Date().getTime();
    this.gameTime = now - this.gameStart;
    clearInterval(this.timer);
  }

  _resetGame() {
    this.gameStart = null;
    this.gameTime = 0;
    this.moves = 0;
    this.gems = [];
    this.timer = null;
    this.animation = false;
  }

  _updateTime() {
    const now = new Date().getTime();
    const interval = now - this.gameStart;
    const [min, sec] = this._getMinSec(interval);
    document.querySelector('.time').textContent = `Time: ${this._addZero(min)} : ${this._addZero(sec)}`;
  }

  _setTime(interval) {
    const [min, sec] = this._getMinSec(interval);
    document.querySelector('.time').textContent = `Time: ${this._addZero(min)} : ${this._addZero(sec)}`;
  }

  _getMinSec(interval) {
    let array = [0,0];
    array[0] = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60));
    array[1] = Math.floor((interval % (1000 * 60)) / 1000);
    return array
  }

  _addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
  }

  _updateMoves() {
    document.querySelector('.moves').textContent = `Moves: ${this.moves}`;
  }

  _startAnimation(gem, hole) {
    this.animation = !this.animation;

    let RAF =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      // если ни один не доступен, тогда по таймеру
      function(callback)
        { window.setTimeout(callback, 1000 / 60); }
    ;

    const gemX = gem.x;
    const gemY = gem.y;
    const holeX = hole.x;
    const holeY = hole.y;
    const directionX = hole.x-gem.x;
    const directionY = hole.y-gem.y;

    if (directionX > 0) {
      RAF(moveRight.bind(this));

    } else if (directionX < 0) {
      RAF(moveLeft.bind(this));

    } else if (directionY > 0) {
      RAF(moveDown.bind(this));

    } else if (directionY < 0) {
      RAF(moveUp.bind(this));
    }

    function moveRight() {
      let newX = gem.x + this.gem.speed;
      if (newX.toFixed(10) <=  hole.x) {
        gem.x = newX;
        this._renderField();
        RAF(moveRight.bind(this));
      } else {
        this.animation = !this.animation;
        hole.x = gemX;
        gem.x = holeX;
        this.moves++;
        this._updateMoves();
        if (this._isGameOver()) {
          this._showGameOver();
        };
      }
    }

    function moveLeft() {
      let newX = gem.x - this.gem.speed;
      if (newX.toFixed(10) >=  hole.x) {
        gem.x = newX;
        this._renderField();
        RAF(moveLeft.bind(this));
      } else {
        this.animation = !this.animation;
        hole.x = gemX;
        gem.x = holeX;
        this.moves++;
        this._updateMoves();
        if (this._isGameOver()) {
          this._showGameOver();
        };
      }
    }

    function moveDown() {
      let newY = gem.y + this.gem.speed;
      if (newY.toFixed(10) <=  hole.y) {
        gem.y = newY;
        this._renderField();
        RAF(moveDown.bind(this));
      } else {
        this.animation = !this.animation;
        hole.y = gemY;
        gem.y = holeY;
        this.moves++;
        this._updateMoves();
        if (this._isGameOver()) {
          this._showGameOver();
        };
      }
    }

    function moveUp() {
      let newY = gem.y - this.gem.speed;           
      if (newY.toFixed(10) >=  hole.y) {         
        gem.y = newY;              
        this._renderField();      
        RAF(moveUp.bind(this));        
      } else {
        this.animation = !this.animation;
        hole.y = gemY;
        gem.y = holeY;
        this.moves++;
        this._updateMoves();
        if (this._isGameOver()) {
          this._showGameOver();
        };        
      }
    }

  }

  _checkEmptyPlace(gem) {
    let empty = this.gems.find( item => item.x === gem.x+1 && item.y === gem.y && item.number === 0
      || item.x === gem.x-1 && item.y === gem.y && item.number === 0
      || item.x === gem.x && item.y === gem.y+1 && item.number === 0 
      || item.x === gem.x && item.y === gem.y-1 && item.number === 0);
    return empty;
  }

  _showGameOver() {
    this._stopTime();
    this._soundPlay(this.sounds.over);
    const [min, sec] = this._getMinSec(this.gameTime);    
    document.querySelector('#congratulation').textContent = `You could solve this complicated puzzle for 
      ${this._addZero(min)} : ${this._addZero(sec)} and made just ${this.moves} moves!`;
    document.querySelector('.congrats-page').classList.remove('congrats-page_hidden');
    document.querySelector('.exit').disabled = true;
    this._saveInScore();
    this._resetGame();
    storage.del('Fifteenth');
  }

  _saveInScore() {
    let score = storage.get('Рекорд');
    const [min, sec] = this._getMinSec(this.gameTime);
    if (!score) {
      score = [];
    }

    if (score.length < 10) {              
      score.push({time: `${this._addZero(min)}:${this._addZero(sec)}`, moves: this.moves});
      score.sort( (a,b) => a.moves-b.moves);
    } else if (score.length >= 10 && this.moves < score[score.length-1].moves) {
      score.pop();            
      score.push({time: `${this._addZero(min)}:${this._addZero(sec)}`, moves: this.moves});
      score.sort( (a,b) => a.moves-b.moves);
    }
    storage.set('Рекорд', score);    
  }

  _defineGem(clickX, clickY) {    
    let x = Math.floor((clickX-this.lw)/this.gem.width);
    let y = Math.floor((clickY-this.lw)/this.gem.width);    
    return this.gems.find(item => item.x === x && item.y === y);
  }

  _generateGemsArray() {
    let used = {};    
    for (let i=0; i<this.fieldSize; i++) {      
      for (let j=0; j<this.fieldSize; j++) {        
        let randomNumber;
        do {
          randomNumber = Math.floor(Math.random()*(Math.pow(this.fieldSize, 2)));          
        }
        while (randomNumber in used);
        
        this.gems.push(new Gem (j, i, randomNumber));
        used[randomNumber]  = true;       
      }
    }
    if (!this._isSolvable()) {      
      this._switchTwoGems();     
    }   
  }

  _generateFakeArray() {       //for test
    const fake = [1,2,3,4,5,6,7,0,8];
    let k=0;
    for (let i=0; i<this.fieldSize; i++) {      
      for (let j=0; j<this.fieldSize; j++) {        
        this.gems.push(new Gem (j, i, fake[k]));        
        k++;       
      }
    }
  }

  _isSolvable() {    
    let sum = this.gems.find( item => item.number === 0).y + 1;    
    for (let i=0; i<this.gems.length; i++) {
      if (this.gems[i].number === 0) continue;
      for (let j=i+1; j<this.gems.length; j++) {
        if (this.gems[j].number === 0) continue;
        if (this.gems[i].number > this.gems[j].number) {
          sum++;
        }
      }
    }
    
    if (this.gems.length%2 === 0 && sum%2 === 0) {
      return true
    } else if (this.gems.length%2 === 1 && sum%2 === 1) {
      return true
    } else return false;
  }
  
  _switchTwoGems() {
    [this.gems[0].number, this.gems[1].number] = [this.gems[1].number, this.gems[0].number];
  }

  _renderField() {
    const ctx = this.field.getContext('2d');        

    let gradient1 = ctx.createLinearGradient(0, 0, 500, 500);
    gradient1.addColorStop('0', '#f37055');    
    gradient1.addColorStop('0.25', '#ef4e7b');    
    gradient1.addColorStop('0.5', '#5073b8');    
    gradient1.addColorStop('0.75', '#1098ad');    
    gradient1.addColorStop('1', '#6fba82');    

    ctx.fillStyle = '#e2e0e9';          
    ctx.strokeStyle = gradient1;
    ctx.lineWidth = this.lw;
    ctx.strokeRect(this.lw/2, this.lw/2, this.fieldSize*this.gem.width+this.lw, this.fieldSize*this.gem.height+this.lw);
    ctx.fillRect(this.lw, this.lw, this.fieldSize*this.gem.width, this.fieldSize*this.gem.height);

    this.gems.forEach(elem => {
      if (elem.number !== 0) { //Gem с номером 0, будет пустым местом
        const sw = 2;
        const r = 0.37*this.gem.width;
        ctx.fillStyle = '#9a8ceb';          
        ctx.strokeStyle = '#c0b3ec';
        ctx.lineWidth = sw;      
        ctx.strokeRect(elem.x*this.gem.width+this.lw+sw/2, elem.y*this.gem.height+this.lw+sw/2, this.gem.width-sw, this.gem.height-sw);
        ctx.fillRect(elem.x*this.gem.width+this.lw+sw, elem.y*this.gem.height+this.lw+sw, this.gem.width-sw*2, this.gem.height-sw*2);

        ctx.fillStyle = "#c0b3ec";
        ctx.beginPath();
        ctx.arc((elem.x + 0.5)*this.gem.width+this.lw+sw/2, (elem.y + 0.5)*this.gem.height+this.lw+sw/2, r, 0, Math.PI*2, false);
        ctx.fill();

        ctx.fillStyle = '#4e4d53';
        ctx.textBaseline = 'middle';
        ctx.font = `bold ${0.42*this.gem.width}px serif`;
        ctx.textAlign = 'center';
        ctx.fillText(elem.number, (elem.x + 0.5)*this.gem.width+this.lw+sw/2, (elem.y + 0.5)*this.gem.height+this.lw+sw/2);      
      }   
    });     
  }

  _soundPlay(sound) {
    sound.currentTime=0;
    sound.play();
  };

  _toggleSound() {
    this.isSound = !this.isSound;
  };

  _isGameOver() {    
    const array = this.gems.slice(0);
    array.sort(function (a,b) {
      return 1 * (a.x > b.x ? 1 : a.x < b.x ? -1 : 0) + 2 * (a.y > b.y ? 1 : a.y < b.y ? -1 : 0)      
    });    
    if (array[array.length-1].number !== 0 ) return false;
    for (let i=0; i<array.length-2; i++) {
      if (array[i].number > array[i+1].number) return false; 
    }        
    return true;    
  }    

};

