let number = 0;
let operation = '';
let numberStack = [];
let operationStack = [];
let buttonChoice = [0];
let total = 0;

function getNumbers() {
    const numberButton = document.querySelectorAll('.numbers button');
    let screenText = document.querySelector('.screen-box .screenInput');
    numberButton.forEach((button) => {
        button.addEventListener("mouseup", () => {
            if (buttonChoice.length <= 0) {
                if (button.id === '.') {
                    buttonChoice.push('0', '.');
                } else {
                    buttonChoice.push(button.id);
                }
            } else {
                if (button.id === '.' && !buttonChoice.includes('.')) {
                    buttonChoice.push(button.id);
                } else if (button.id !== '.') {
                    buttonChoice.push(button.id);
                }
            }

            if(button.id === '?') {
                buttonChoice.pop();
                // number = ['-'].concat(buttonChoice.toString().split(''));
            }

            number = Number(buttonChoice.join(''));
    
            screenText.textContent = buttonChoice.join('');
            

        });


    });
    buttonChoice = [];
}

function getOperations() {
    let operationChoice = "";
    let isNewOperation = true;
    const operationButton = document.querySelectorAll('.operations button');
    let screenText = document.querySelector('.screen-box .screenInput');

    operationButton.forEach((button) => {
        button.addEventListener("mouseup", () => {

            operationChoice = button.id;
            if (isNewOperation) {
                operation = operationChoice;
                if (numberStack.length - 1 <= operationStack.length - 1) {
                    numberStack.push(number);
                }

                if (numberStack.length - 1 > operationStack.length - 2 ) {
                    operationStack.push(operation);
                }
              
                buttonChoice = [];
                screenText.textContent = operationChoice;

                if (operationChoice === '+' || operationChoice === '-' || operationChoice === '*' || operationChoice === '/' || operationChoice === '=') {
                    solve(); //solve after operation chosen
                    isNewOperation = false;
                    if (operationChoice === '=' && numberStack.length - 1 > 0) { //solve after = pressed
                        isNewOperation = true;
                        operationStack.pop();
                        solve();
                    }
                }
            }
        });
    });
    document.querySelectorAll('.numbers button').forEach((button) => {
        button.addEventListener("mouseup", () => {
            isNewOperation = true;
        });
    });
}

//for the delete or clear all button
function deleteOrAC(buttonID) {
    let screenTotal = document.querySelector('.screen-box .screenTotal');
    let screenText = document.querySelector('.screen-box .screenInput');

    if (buttonID === "clearAll") {
        clearStacks();
        total = 0;
        number = 0;
        screenText.textContent = 0;
        screenTotal.textContent = 0;
    } else if (buttonID === "delete") {
        buttonChoice.pop();
        number = Number(buttonChoice.join(''));
        screenText.textContent = number;
    }
}

//solves for operations chosen
function solve() {
    let nextNumber = 0;
    let screenTotal = document.querySelector('.screen-box .screenTotal');
    total = numberStack[0];
   
    if (numberStack.length - 1 < 1) {
        return;
    }
    for (let i = 0; i < numberStack.length - 1; i++) {
        nextNumber = numberStack[i + 1];
        if (nextNumber !== undefined) {
            if (operationStack[i] === '+') {
                total += nextNumber;
            } else if (operationStack[i] === '-') {
                total -= nextNumber;
            } else if (operationStack[i] === '*') {
                total *= nextNumber;
            } else if (operationStack[i] === '/') {
                total /= nextNumber;
            } else if (operationStack[i] === '=') {
                operationStack.pop()
            } 
        }


    }
    screenTotal.textContent = total;
}

//helper function that saves total
function saveTotal() {
    numberStack = [total];
    operationStack = [];
    buttonChoice = [];
}

//helper function to clear all stacks
function clearStacks() {
    numberStack = [];
    operationStack = [];
    buttonChoice = []
}


function runCalculator() {
    getNumbers();
    getOperations();
}

runCalculator();


