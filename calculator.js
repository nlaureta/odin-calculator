let number = 0;
let operation = '';
let numberStack = [];
let operationStack = [];
let buttonChoice = [];
let total = 0;
function getNumbers() {
    const numberButton = document.querySelectorAll('.numbers button');
    let screenText = document.querySelector('.screen');
    numberButton.forEach((button) => {
        button.addEventListener("mouseup", () => {
            buttonChoice.push(button.id);

            number = Number(buttonChoice.join(''));
            //console.log(typeof(number));

            //console.log('returned');
            //console.log(int);
            screenText.textContent = number;
            //console.log(buttonChoice);
            //screenText.textContent += buttonChoice;
            //return buttonChoice;

        });


    });
    buttonChoice = [];
    //console.log(number);
    // return number;
}

function getOperations() {
    let operationChoice = "";
    const operationButton = document.querySelectorAll('.operations button');
    let screenText = document.querySelector('.screen');

    operationButton.forEach((button) => {
        button.addEventListener("mouseup", () => {

            operationChoice = button.id;
            operation = operationChoice;
            if (numberStack.length - 1 <= operationStack.length - 1) { // should be -1
                numberStack.push(number);
            }
            //number =0;
            if (numberStack[numberStack.length - 1] != 0 && numberStack.length - 1 > operationStack.length - 2) {
                operationStack.push(operation);
            }
            console.log(number);
            console.log(operation);
            console.log(operationStack);
            console.log(numberStack);
            buttonChoice = [];
            //console.log(buttonChoice);
            screenText.textContent += operationChoice;
            //return buttonChoice;
            //operationChoice = [];
            if (operationChoice === '+' || operationChoice === '-' || operationChoice === '*' || operationChoice === '/' || operationChoice === '=') {
                //solve();
                console.log("numberstack length: " + numberStack.length);
                if (operationChoice === '=' && numberStack.length - 1 > 0) {
                    console.log("from =" + total);
                    //operationStack.pop();
                    solve();
                }
            }

        })
    });

    //return operationButton;
}

function solve() {

    let temp = 0;
    let operationPop = 0;
    let nextNumber = 0;
    console.log("Num Stack: " + numberStack);
    console.log("Operation: " + operation);
    total = numberStack[0];
    //console.log("popped: " + num[num.length - 1]);
    for (let i = 0; i < numberStack.length; i++) {
        nextNumber = numberStack[i + 1];
        console.log("popped operation: " + operationPop);
        if (operationStack[i] === '+') {
            console.log("adding");
            total += nextNumber;
            //console.log("numberstack[i]: "+numberStack[i]);
            //console.log("numberStack[i+1]: "+numberStack[i+1]);
            //console.log("total: "+total);
        } else if (operationStack[i] === '-') {
            console.log("subtracting");
            total -= nextNumber;
        } else if (operationStack[i] === '*') {
            total *= nextNumber;
        } else if (operationStack[i] === '/') {
            total /= nextNumber;
        } else if (operationStack[i] === '=') {
            operationStack.pop();
        }else {
            console.log("Calculator broke. Please refresh");
        }

        
    }

    saveTotal();
    console.log("-------after solve---------");
    console.log(operationStack);
    console.log(numberStack);
    console.log("total: " + total);

    //return total;
}

function saveTotal() {
    numberStack = [total];
    operationStack = [];
}

function clearStacks() {
    numberStack = [];
    operationStack = [];
}

getNumbers();

getOperations();


