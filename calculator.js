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
            //buttonChoice.push(button.id);
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
            number = Number(buttonChoice.join(''));
            //console.log(typeof(number));

            //console.log('returned');
            //console.log(int);
            screenText.textContent = buttonChoice.join('');
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

                if (numberStack.length - 1 > operationStack.length - 2) {
                    operationStack.push(operation);
                }
                console.log(number);
                console.log(operation);
                console.log(operationStack);
                console.log(numberStack);
                //console.log(numberStack.length);
                buttonChoice = [];
                //console.log(buttonChoice);
                screenText.textContent = operationChoice;

                if (operationChoice === '+' || operationChoice === '-' || operationChoice === '*' || operationChoice === '/' || operationChoice === '=') {
                    solve(); //solve after operation chosen
                    console.log("numberstack length: " + numberStack.length);
                    console.log("operationstack length: " + operationStack.length);
                    isNewOperation = false;
                    if (operationChoice === '=' && numberStack.length - 1 > 0) { //solve after = pressed
                        isNewOperation = true;
                        console.log("from =" + total);
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

function deleteOrAC(buttonID) {
    let screenTotal = document.querySelector('.screen-box .screenTotal');
    let screenText = document.querySelector('.screen-box .screenInput');

    if (buttonID === "clearAll") {
        clearStacks();
        total = 0;
        number = 0;
        screenText.textContent = 0;
        screenTotal.textContent = 0;
        console.log("cleared all");
    } else if (buttonID === "delete") {
        buttonChoice.pop();
        number = Number(buttonChoice.join(''));
        //buttonChoice = [];
        screenText.textContent = number;
        console.log("deleted num")
    }
    // console.log("------------after AC or delete-------");
    // console.log(number);
    // console.log(operation);
    // console.log(operationStack);
    // console.log(numberStack);

}

function solve() {
    let nextNumber = 0;
    let screenTotal = document.querySelector('.screen-box .screenTotal');
    console.log("Num Stack: " + numberStack);
    console.log("Operation: " + operation);
    total = numberStack[0];
    //console.log("popped: " + num[num.length - 1]);
    // if(operationStack.includes("=")){ 
    //     operationStack.pop();
    // }
    if (numberStack.length - 1 < 1) {
        return;
    }
    for (let i = 0; i < numberStack.length - 1; i++) {
        nextNumber = numberStack[i + 1];
        if (nextNumber !== undefined) {
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
                operationStack.pop()
            }  //else {
            //console.log("Calculator broke. Please refresh");
            // }
        }


    }
    screenTotal.textContent = total;

    console.log("-------after solve---------");
    console.log(operationStack);
    console.log(numberStack);
    console.log("total: " + total);

    //saveTotal();

    //return total;
}

// function sortOperations(a, b) {
//     if (a === '*') {
//         if (b === '/') {
//             return 1;
//         } else
//             return -1;

//     } else if (a === '/') {
//         if (b === '*') {
//             return 1;
//         } else
//             return -1;
//     } else if (a === '+' || b === '+') {
//         return 1;
//     } else if (a === '-' || b === '-') {
//         return 1;
//     } else if (a === '=' || b === '=') {
//         return 0;
//     } else {
//         return 0;
//     }
//     //return a-b;
// }

function saveTotal() {
    numberStack = [total];
    operationStack = [];
    buttonChoice = [];
}

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

//deleteOrAC();

