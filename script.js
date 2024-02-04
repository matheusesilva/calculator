let currentlyNumber = '',
    previusNumber = '',
    operation = '',
    result = '';

const screenText = document.getElementById('screen-text');

const buttons = document.querySelectorAll('button');
buttons.forEach(function(button){
    button.addEventListener('click',function(event){
        switch(event.target.id){
            case 'number':
                currentlyNumber += event.target.textContent;
                result = previusNumber+operation+currentlyNumber;
                show();
                break;
            case 'reset':
                clean();
                result = '0';
                show();
                break;
            case 'operation':
                if (previusNumber != '' && currentlyNumber != ''){
                    result = operate[operation](+previusNumber,+currentlyNumber);
                    previusNumber = result;
                    result = round(result,8);
                } else if (currentlyNumber != ''){
                    previusNumber = currentlyNumber; 
                }
                currentlyNumber = '';
                operation = event.target.textContent;
                result = previusNumber+operation;
                show();
                break;
            case 'equals':
                if (previusNumber != '' && currentlyNumber != ''){
                    result = operate[operation](+previusNumber,+currentlyNumber);
                    clean();
                    currentlyNumber = result;
                    result = round(result,8);
                    show();
                }
                break;
            case 'dot':
                if (!currentlyNumber.includes('.')){
                    currentlyNumber += event.target.textContent;
                    result = previusNumber+operation+currentlyNumber;
                    show();
                }
                break;
            case 'clear':
                if (currentlyNumber.length == 1 && previusNumber != ''){
                    currentlyNumber = '';
                    result = previusNumber+operation;
                    show();
                } else if (currentlyNumber.length == 1 && previusNumber == '') {
                    currentlyNumber = '';
                    result = '0';
                    show();
                }else if (currentlyNumber != ''){
                    currentlyNumber = currentlyNumber.slice(0,-1);
                    result = previusNumber+operation+currentlyNumber;
                    show();
                }
                break;
            default:
                break;
        }
    });
});

const operate = {
    '+': (a,b) => a+b,
    '-':(a,b) => a-b,
    '×': (a,b) => a*b,
    '÷': function(a,b){
        return b<1 ? 'Error': a/b;
    }
}


function clean (){
    previusNumber = '';
    currentlyNumber = '';
    operation = '';
}

function round (number,length){
    let rounded = number.toString();
    let dotIndex = rounded.indexOf('.');
    if (rounded.length > length+1) {
        if (Number.isInteger(number) || dotIndex >= length) {
            dotIndex = number.toString().length - length;
            rounded = '≅'+Math.round(number/10**dotIndex);
        } else {
            dotIndex = length - number.toString().indexOf('.');
            rounded = '≅'+Number.parseFloat(rounded).toFixed(dotIndex);
        }
    }
    return rounded.toString()
}

function show (){
    if (result.length > 10){
        screenText.textContent = '←'+result.slice(-9);
    } else {
        screenText.textContent = result.slice(-10);
    }
}