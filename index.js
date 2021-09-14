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
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number==='.' && this.currentOperand.includes('.')) { return }
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') { return }
    if (this.previousOperand !== '') { this.compute() }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const previous = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(previous) || isNaN(current)) { return }
    switch (this.operation) {
      case '+': computation = previous + current; break;
      case '-': computation = previous - current; break;
      case '/': computation = previous / current; break;
      case '*': computation = previous * current; break;
      default: return
    }
    this.currentOperand = computation
    this.operation = ''
    this.previousOperand = ''
  }

  getDisplayNumber(number){
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay

    if(isNaN(integerDigits)) { integerDisplay = '' }
    else { integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0}) }

    if (decimalDigits != null) { return `${integerDisplay}.${decimalDigits}` }
    else { return integerDisplay }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) { this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`}
    else { his.previousOperandTextElement.innerText = '' }
  }
}

//Create new calculator instance
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//get calculator items from the web page
const btnNums = document.querySelectorAll('[dataNum]')
const operationButtons = document.querySelectorAll('[dataOp]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


//Handle number buttons from the web page
btnNums.forEach(btn => {
  btn.addEventListener('click', () => {
    calculator.appendNumber(btn.innerText)
    calculator.updateDisplay()
  })
})

//Handle operation buttons from the web page
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

//Handle euqals button from the web page
equalsButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})

//Handle All Clear button from the web page
allClearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

//Handle delete button from the web page
deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})