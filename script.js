const dropdowns = document.querySelectorAll('.dropdown');
const tensaoDiv = document.querySelector('.selecioneTensao');
const potenciaDiv = document.querySelector('.selecionePotencia');
const estacaoDiv = document.querySelector('.selecioneEstacao');

// Tabela de potências para cada tensão e estação
const potencias127V = {
    '4400W': { 'Verão': 1400, 'Outono': 3000, 'Inverno': 4400 },
    '5500W': { 'Verão': 2210, 'Outono': 3789, 'Inverno': 5500 }
};

const potencias220V = {
    '4400W': { 'Verão': 1400, 'Outono': 3000, 'Inverno': 4400 },
    '5500W': { 'Verão': 2400, 'Outono': 3050, 'Inverno': 5500 },
    '6400W': { 'Verão': 2400, 'Outono': 4700, 'Inverno': 6400 },
    '6800W': { 'Verão': 2240, 'Outono': 4300, 'Inverno': 6800 },
    '7500W': { 'Verão': 2617, 'Outono': 5150, 'Inverno': 7500 }
};

let tensaoSelecionada = '127V';
let potenciaSelecionada = '4400W';
let estacaoSelecionada = 'Verão';

// Função para calcular o consumo
function calcularConsumo() {
    var tempoMinutos = document.getElementById('tempo').value;
    var tempoHoras = Math.abs(tempoMinutos) / 60; // Converter minutos em horas

    // Determina a potência com base na tensão e estação selecionadas
    let potencia;
    if (tensaoSelecionada === '127V') {
        potencia = potencias127V[potenciaSelecionada][estacaoSelecionada];
    } else if (tensaoSelecionada === '220V') {
        potencia = potencias220V[potenciaSelecionada][estacaoSelecionada];
    }

    var consumo = (potencia * tempoHoras) / 1000; // Consumo em kWh

    // Atualizar o consumo em kWh
    document.querySelector('.consumo').innerText = consumo.toFixed(2) + ' kWh';

    var precoKWh = 0.92; // Preço por kWh em reais
    var custo = consumo * precoKWh; // Cálculo do custo

    // Atualizar o custo em reais
    document.querySelector('.custo').innerText = 'R$ ' + custo.toFixed(2);

    // Tornar a seção de resultados visível
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('caixaResultado').style.display = 'flex';
}


// Lógica para mostrar/ocultar dropdowns com base nas seleções
dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');

    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            select.querySelector('span').innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');

            options.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');

            // Se tensão for selecionada, exibe a potência
            if (dropdown.closest('.selecioneTensao')) {
                tensaoSelecionada = option.innerText;
                potenciaDiv.style.display = 'flex';
            }

            // Se potência for selecionada, exibe a estação
            if (dropdown.closest('.selecionePotencia')) {
                potenciaSelecionada = option.innerText;
                estacaoDiv.style.display = 'flex';
            }

            // Se estação for selecionada, salva a seleção
            if (dropdown.closest('.selecioneEstacao')) {
                estacaoSelecionada = option.innerText;
            }
        });
    });
});
