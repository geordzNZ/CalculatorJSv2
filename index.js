class Calculator {
  constructor (txtPrevOp, txtCurrOp) {
    this.txtPrevOp = txtPrevOp
    this.txtCurrOp = txtCurrOp
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
    console.log('b:', number);
    if (number==='.' && this.currentOperand.includes('.')) { return }
    this.currentOperand = this.currentOperand.toString() + number.toString()
    console.log('c:', this.currentOperand);
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
      case '÷': computation = previous / current; break;
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
    console.log('e:', `${stringNumber} / ${integerDigits} / ${decimalDigits}`);
    if(isNaN(integerDigits)) { integerDisplay = '' }
    else { integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0}) }

    if (decimalDigits != null) { return `${integerDisplay}.${decimalDigits}` }
    else { return integerDisplay }
  }

  updateDisplay() {
    console.log('d:', this.currentOperand);
    this.txtCurrOp.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) { this.txtPrevOp.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`}
    else { this.txtPrevOp.innerText = '' }
  }
}


//get calculator items from the web page
const btnNums = document.querySelectorAll('[dataNum]')
const btnOps = document.querySelectorAll('[dataOp]')
const btnEq = document.querySelector('[dataEq]')
const btnDel = document.querySelector('[dataDel]')
const btnAC = document.querySelector('[dataAC]')
const txtPrevOp = document.querySelector('[dataScreenPrev]')
const txtCurrOp = document.querySelector('[dataScreenCurr]')

//Create new calculator instance
const calculator = new Calculator(txtPrevOp, txtCurrOp)

//Handle number buttons from the web page
btnNums.forEach(btn => {
  btn.addEventListener('click', () => {
    console.log('a:', btn.innerText);
    calculator.appendNumber(btn.innerText)
    calculator.updateDisplay()
  })
})

//Handle operation buttons from the web page
btnOps.forEach(btn => {
  btn.addEventListener('click', () => {
    calculator.chooseOperation(btn.innerText)
    calculator.updateDisplay()
  })
})

//Handle euqals button from the web page
btnEq.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})

//Handle All Clear button from the web page
btnAC.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

//Handle delete button from the web page
btnDel.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})