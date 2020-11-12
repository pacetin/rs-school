'use strict';
import Gem from './Gem.js';

export default class PuzzleField {
  constructor(fieldSize) {
    this.fieldSize = fieldSize;
    this.gameStart = null;
    this.time = '00 : 00';
    this.timer = null;   
    this.moves = 0;
    this.gems = [];
    this.field = null;
    this.animation = false;

    this.gem = {width:100, height:100, speed:0.2};
    this.lw = 20; //толщина рамки поля
  }

  generate() {
    this._generateGemsArray();        

    this.field = document.querySelector('#CANVAS');    
    //this.field.width = this.fieldSize*this.gem.width;
    //this.field.height = this.fieldSize*this.gem.height;
    this.field.addEventListener('click', (e) => {      
      const gem = this._defineGem(e.offsetX, e.offsetY);      
      if (gem) {        
        let hole = this._checkEmptyPlace(gem);        
        if (hole && !this.animation) {
          this._startAnimation(gem, hole);
        }
      }
    });    
    
    this._renderField();    

    const movesLabel = document.createElement('div');
    movesLabel.classList.add('moves');
    movesLabel.textContent = `Moves: ${this.moves}`;
    document.body.prepend(movesLabel);
    
    const timeLabel = document.createElement('div');
    timeLabel.classList.add('time');    
    document.body.prepend(timeLabel);
    timeLabel.textContent = `Time: ${this.time}`;

    this.gameStart = new Date().getTime();
    this.timer = setInterval(this._updateTime.bind(this), 1000);
    
  }

  _updateTime() {
    const now = new Date().getTime();
    const distance = now - this.gameStart;        
    const min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const sec = Math.floor((distance % (1000 * 60)) / 1000);  
    
    document.querySelector('.time').textContent = `Time: ${addZero(min)} : ${addZero(sec)}`;

    function addZero(n) {
      return (parseInt(n, 10) < 10 ? '0' : '') + n;
    }
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
      //если ни один не доступен, тогда по таймеру
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
        console.log(gem.x, hole.x);
      } else {
        this.animation = !this.animation;
        hole.x = gemX;
        gem.x = holeX;
        this.moves++;
        this._updateMoves();      
      }
    }

    function moveLeft() {
      let newX = gem.x - this.gem.speed;           
      if (newX.toFixed(10) >=  hole.x) {         
        gem.x = newX;              
        this._renderField();      
        RAF(moveLeft.bind(this));
        console.log(gem.x, hole.x);
      } else {
        this.animation = !this.animation;
        hole.x = gemX;
        gem.x = holeX;
        this.moves++;
        this._updateMoves();      
      }
    }

    function moveDown() {
      let newY = gem.y + this.gem.speed;           
      if (newY.toFixed(10) <=  hole.y) {         
        gem.y = newY;              
        this._renderField();      
        RAF(moveDown.bind(this));
        console.log(gem.y, hole.y);
      } else {
        this.animation = !this.animation;
        hole.y = gemY;
        gem.y = holeY;
        this.moves++;
        this._updateMoves();      
      }
    }

    function moveUp() {
      let newY = gem.y - this.gem.speed;           
      if (newY.toFixed(10) >=  hole.y) {         
        gem.y = newY;              
        this._renderField();      
        RAF(moveUp.bind(this));
        console.log(gem.y, hole.y);
      } else {
        this.animation = !this.animation;
        hole.y = gemY;
        gem.y = holeY;
        this.moves++;
        this._updateMoves();      
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
        
        this.gems.push(new Gem (i, j, randomNumber));
        used[randomNumber]  = true;       
      }
    }    
  }

  _renderField() {
    const ctx = this.field.getContext('2d');        

    let gradient1 = ctx.createLinearGradient(0, 0, 500, 500);
    gradient1.addColorStop('0', 'black');    
    gradient1.addColorStop('1', 'blue');    

    ctx.fillStyle = '#e2e0e9';          
    ctx.strokeStyle = gradient1;
    ctx.lineWidth = this.lw;
    ctx.strokeRect(this.lw/2, this.lw/2, this.fieldSize*this.gem.width+this.lw, this.fieldSize*this.gem.height+this.lw);
    ctx.fillRect(this.lw, this.lw, this.fieldSize*this.gem.width, this.fieldSize*this.gem.height);

    this.gems.forEach(elem => {
      if (elem.number !== 0) { //Gem с номером 0, будет пустым местом
        const sw = 2;
        const r = 37;
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
        ctx.font = 'bold 42px serif';
        ctx.textAlign = 'center';
        ctx.fillText(elem.number, (elem.x + 0.5)*this.gem.width+this.lw+sw/2, (elem.y + 0.5)*this.gem.height+this.lw+sw/2);      
      }   
    });     
  }

  

};

