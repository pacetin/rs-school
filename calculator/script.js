'use strict';

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.readyToReset = false;
    this.clear();
  };

  clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
  };

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  };

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();      
  };

 /* getRoundOff(stringNumber) {      
    let decimalDigits = stringNumber.split('.')[1];    
    if (decimalDigits == null || decimalDigits == '') return stringNumber;
    else {
      let decimalLength = decimalDigits.length;
      return stringNumber = parseFloat(stringNumber).toFixed(decimalLength).toString();                
    }    
  };*/

  chooseOperation(operation) {
    if (this.currentOperand === '' || this.currentOperand === 'Введены неверные данные') return;
    if (this.previousOperand !== '') {
      this.compute();
    } 
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  };

  compute() {
    let computation
    const current = parseFloat(this.currentOperand);
    const previous = parseFloat(this.previousOperand);
    if ( isNaN(current) || isNaN(previous) ) return;
    switch (this.operation) {
      case '+':
        computation = previous + current;
        break
      case '-':
        computation = previous - current;
        break
      case '×':
        computation = previous * current;
        break
      case '÷':
        computation = previous / current;
        break
      case '^':
        computation = Math.pow(previous, current);
        break
      default:
        return;
    }
    this.readyToReset = true;    
    this.currentOperand = (+computation.toFixed(10)).toString();
    this.operation = undefined;
    this.previousOperand = '';
  };

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    if (stringNumber === 'Введены неверные данные') return stringNumber;
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    }
    else {
      integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    }
    else 
      return integerDisplay;
  };

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);    
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    }
    else {
      this.previousOperandTextElement.innerText = '';
    }
  };

  /*power(exponent) {
    if (this.currentOperand === '' || this.currentOperand === 'Введены неверные данные') return;
    else {
      this.previousOperand = `${this.getDisplayNumber(this.currentOperand)}×${this.getDisplayNumber(this.currentOperand)}`;
      this.currentOperand = `${Math.pow(this.currentOperand, exponent)}`;
      this.readyToReset = true;      
      this.operation = undefined;      
    }
  };*/

  sqrt() {
    if (this.currentOperand === '' || this.currentOperand === 'Введены неверные данные') return;
    else if (this.currentOperand < 0) {
      this.previousOperand = `√(${this.getDisplayNumber(this.currentOperand)})`;
      this.currentOperand = 'Введены неверные данные';    
    }
    else {
      this.previousOperand = `√(${this.getDisplayNumber(this.currentOperand)})`;
      this.currentOperand = `${Math.sqrt(this.currentOperand)}`;         
    }
    this.readyToReset = true;      
    this.operation = undefined;
  };

  plusMinus() {
    if (this.currentOperand === '' || this.currentOperand === 'Введены неверные данные') return;
    else {
      this.currentOperand = -this.currentOperand;
    }  
  };

  updateDisplayPowSqrt() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);    
    this.previousOperandTextElement.innerText = this.previousOperand;
    this.previousOperand = '';  
  };
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const powButton= document.querySelector('[data-pow]');
const sqrtButton= document.querySelector('[data-sqrt]');
const negativeButton= document.querySelector('[data-minus]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator  = new Calculator (previousOperandTextElement, currentOperandTextElement);


numberButtons.forEach(button => {
  button.addEventListener( 'click', () => {
    if(calculator.readyToReset) {
        calculator.currentOperand = '';
        calculator.readyToReset = false;
      }
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay();
  } )
} )

operationButtons.forEach( button => {
  button.addEventListener( 'click', () => {
    calculator.chooseOperation(button.innerText);    
    calculator.updateDisplay();
  } )
} )

equalsButton.addEventListener( 'click', button => {
  calculator.compute();
  calculator.updateDisplay();
} )

allClearButton.addEventListener( 'click', button => {
  calculator.clear();
  calculator.updateDisplay();
} )

deleteButton.addEventListener( 'click', button => {
  calculator.delete();
  calculator.updateDisplay();
} )

powButton.addEventListener( 'click', button => {
  calculator.chooseOperation('^');    
  calculator.updateDisplay();
} )

sqrtButton.addEventListener( 'click', button => {
  calculator.sqrt();
  calculator.updateDisplayPowSqrt();
} )

negativeButton.addEventListener( 'click', button => {
  calculator.plusMinus();
  calculator.updateDisplay();
} )
