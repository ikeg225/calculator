let curr_input = "";
let nums = {
    number: "empty",
    operator: "empty"
};

function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    return num1 / num2
}

function operate(operator, num1, num2) {
    if (operator == 'add') {
        return add(num1, num2)
    } else if (operator == 'subtract') {
        return subtract(num1, num2)
    } else if (operator == 'multiply') {
        return multiply(num1, num2)
    } else {
        return divide(num1, num2)
    }
}

function selected(id) {
    const op = document.getElementById(id);
    op.style.filter = "brightness(0.85)";
}

function unselected(id) {
    const op = document.getElementById(id);
    op.style.filter = "brightness(1)";
}

const input = document.querySelector('input');
const buttons = document.querySelectorAll('.num.gray');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (input.value == "0") {
            curr_input = button.textContent;
            input.value = curr_input;
        } else {
            curr_input += button.textContent;
            input.value = curr_input;
        }
        unselected(nums['operator']);
    });
});

const zero = document.getElementById('0');
zero.addEventListener('click', () => {
    if (curr_input != "0" && input.value != "0") {
        curr_input += "0";
        input.value = curr_input;
        unselected(nums['operator']);
    }
})

const clear = document.getElementById('clear');
clear.addEventListener('click', () => {
    nums['number'] = "empty";
    nums['operator'] = "empty";
    curr_input = "";
    input.value = "0";
});

const back = document.getElementById('backspace');
back.addEventListener('click', () => {
    if (curr_input.length == 1) {
        curr_input = 0;
        input.value = curr_input;
    }
    if (curr_input != "") {
        curr_input = curr_input.substring(0, curr_input.length - 1);
        input.value = curr_input;
    }
});

const plusOrMinus = document.getElementById('plusOrMinus');
plusOrMinus.addEventListener('click', () => {
    if (!curr_input) {
        curr_input = input.value;
    }
    if (curr_input[0] == '-') {
        curr_input = curr_input.substring(1, curr_input.length);
    } else {
        curr_input = '-' + curr_input;
    }
    input.value = curr_input;
});

const dec = document.getElementById('decimal');
dec.addEventListener('click', () => {
    if (!curr_input) {
        curr_input += "0.";
        input.value = curr_input;
        unselected(nums['operator']);
    }
    if (!input.value.includes('.')) {
        curr_input += ".";
        input.value = curr_input;
    }
});

const op = document.querySelectorAll('.op.orange');
op.forEach((operation) => {
    operation.addEventListener('click', () => {
        if (nums['number'] == 'empty') {
            nums['number'] = input.value;
            nums['operator'] = operation.id;
            curr_input = "";
            selected(operation.id);
        } else if (curr_input) {
            nums['number'] = operate(nums['operator'], parseFloat(nums['number']), parseFloat(curr_input));
            nums['operator'] = operation.id;
            input.value = nums['number'];
            curr_input = "";
        }
    });
});

const equal = document.getElementById('equal');
equal.addEventListener('click', () => {
    if (nums['operator'] != 'empty' && nums['number'] != "empty" && curr_input) {
        input.value = operate(nums['operator'], parseFloat(nums['number']), parseFloat(curr_input));
        nums['number'] = "empty";
        curr_input = "";
    }
});

window.addEventListener('keydown', key => {
    if (key.key == "+") {
        document.getElementById("add").click();
    } else if (key.key == "-") {
        document.getElementById("subtract").click();
    } else if (key.key == "/") {
        document.getElementById("divide").click();
    } else if (key.key == "*") {
        document.getElementById("multiply").click();
    } else if (key.key == "=" || key.key == "Enter") {
        document.getElementById("equal").click();
    } else if (key.key == ".") {
        document.getElementById("decimal").click();
    } else if (key.key == "Backspace") {
        document.getElementById("backspace").click();
    } else if (key.key == "Escape") {
        document.getElementById("clear").click();
    } else {
        document.getElementById(key.key).click();
    }
})