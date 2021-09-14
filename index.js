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
    //console.log('b:',number);
    if (number==='.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
    // console.log('c:',this.currentOperand);
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const previous = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(previous) || isNaN(current)) return
    switch (this.operation) {
      case '+': 
        computation = previous + current
        break
      case '-':
        computation = previous - current
        break
      case '/':
        computation = previous / current
        break
      case '*':
        computation = previous * current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = ''
    this.previousOperand = ''
  }

  getDisplayNumber(number){
    // v1 of formattng the number with commas
    // has issues with decimal places.
    const floatNumber = parseFloat(number)
    if (isNaN(floatNumber)) return ''
    return floatNumber.toLocaleString('en')
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    }
  }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
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


equalsButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})