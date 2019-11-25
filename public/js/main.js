//seta Dom elements, que serão manipulados.
const divResultado = document.getElementById('result');
const checkBoxTamanho = document.getElementById('length');
const checkBoxMaiusculas = document.getElementById('uppercase');
const checkBoxMinusculas = document.getElementById('lowercase');
const checkBoxNumeros = document.getElementById('numbers');
const checkBoxSimbolos = document.getElementById('symbols');
const btnGerar = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

//menu de funções que serão usadas
const menuDeFuncoes = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}
//copiar senha.
clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = divResultado.innerText;
    //evita copiar , quando não gerado um password
    if (!password) {
        return;
    }

    //copiar para área de transferência.
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Senha copiada com sucesso.');
});

const generatePassword = (lower, upper, number, symbol, length) => {
    let password = '';
    const quantidadeSelecionada = lower + upper + number + symbol;
    const checkBoxSelecionados = [{
        lower
    }, {
        upper
    }, {
        number
    }, {
        symbol
    }].filter(checkBoxItem => Object.values(checkBoxItem)[0] == true);
    //não gera senha se não for informado um checkbox ao menos 
    if (quantidadeSelecionada === 0) {
        return '';
    }
    // geração  da senha
    for (let i = 0; i < length; i++) {
        checkBoxSelecionados.forEach(tipoSelecionado => {
            const funcaoSelecionada = Object.keys(tipoSelecionado)[0];
            password += menuDeFuncoes[funcaoSelecionada]();
        });
    }

    const passwordFinal = password.slice(0, length);

    return passwordFinal;
}


//geração da senha
btnGerar.addEventListener('click', () => {
    const length = +checkBoxTamanho.value;
    const hasLower = checkBoxMinusculas.checked;
    const hasUpper = checkBoxMaiusculas.checked;
    const hasNumber = checkBoxNumeros.checked;
    const hasSymbol = checkBoxSimbolos.checked;

    divResultado.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});


function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const simbolosHabilitados = '!@#$%^&*(){}[]=<>/,._-+=?'
    return simbolosHabilitados[Math.floor(Math.random() * simbolosHabilitados.length)];
}