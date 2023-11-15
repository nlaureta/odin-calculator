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
            
            screenText.textContent = number;
           

        });
        
        
    });
    buttonChoice = [];
   
}

function getOperations() {
    let operationChoice = "";
    const operationButton = document.querySelectorAll('.operations button');
    let screenText = document.querySelector('.screen');
    
    operationButton.forEach((button) => {
        button.addEventListener("mouseup", () => {
            
            operationChoice = button.id;
            operation = operationChoice;
            if(numberStack.length - 1 <= operationStack.length - 1) { 
                numberStack.push(number);
            }
          
            if(numberStack[numberStack.length-1] != 0 && numberStack.length - 1 > operationStack.length - 2){
                operationStack.push(operation);
            }
            console.log(number);
            console.log(operation);
            console.log(operationStack);
            console.log(numberStack);
            buttonChoice = [];
          
            screenText.textContent += operationChoice;
            
            if(operationChoice === '+' || operationChoice === '-' || operationChoice === '*' || operationChoice === '/' || operationChoice === '=') {
                solve();
            }

        })
    });
    
    //return operationButton;
}

function solve() {
    
    let temp = 0;
    
    console.log("Num Stack: " + numberStack);
    console.log("Operation: " + operation);
    //console.log("popped: " + num[num.length - 1]);
    
    if (operationStack[operationStack.length - 1] === '+') {
        console.log("adding");
        // numberStack.forEach(number => {
        //     total += number;
        // })
        total += numberStack[numberStack.length-1];
        
       
    }else if (operationStack[operationStack.length - 1] === '-') {
        console.log("subtracting");
        // numberStack.forEach(number => {
        //     total -= (number);
        // })
        total -= numberStack[numberStack.length-1];
       
    }
   
    console.log("total: " + total);
    
    //return total;
}

getNumbers();

getOperations();


