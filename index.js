class Calculator {
  constructor (previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {

  }

  appendNumber(number) {
    //console.log('b:',number);
    if (number==='.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
    // console.log('c:',this.currentOperand);
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {

  }

  updateDisplay() {
    // console.log('e:',this.currentOperand);
    this.currentOperandTextElement.innerText = this.currentOperand
    this.previousOperandTextElement.innerText = this.previousOperand
    // console.log('f:');
  }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    // console.log('a:',button.innerText);
    calculator.appendNumber(button.innerText)
    // console.log('d:');
    calculator.updateDisplay()
    // console.log('g:');
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    // console.log('a:',button.innerText);
    calculator.chooseOperation(button.innerText)
    // console.log('d:');
    calculator.updateDisplay()
    // console.log('g:');
  })
})