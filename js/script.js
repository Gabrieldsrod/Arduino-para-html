const dropdowns = document.querySelectorAll('.dropdown'); // Seleciona todos os dropdowns

// Inicializa as variáveis de seleção
let tensaoSelecionada = '127V';
let potenciaSelecionada = '4400W';
let estacaoSelecionada = 'Verão';

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

// Função para calcular o consumo
function calcularConsumo(tempoSegundos) {
    // Obtém a potência com base na seleção de tensão e estação
    let potencia;
    if (tensaoSelecionada === '127V') {
        potencia = potencias127V[potenciaSelecionada][estacaoSelecionada];
    } else if (tensaoSelecionada === '220V') {
        potencia = potencias220V[potenciaSelecionada][estacaoSelecionada];
    }

    const tempoHoras = Math.abs(tempoSegundos) / 3600; // Converter segundos para horas
    const consumo = (potencia * tempoHoras) / 1000; // Consumo em kWh
    const custo = consumo * 0.92; // Custo com taxa definida (0.92 R$/kWh)

    // Atualiza a interface com os resultados
    document.querySelector('.consumo').innerText = consumo.toFixed(2) + ' kWh';
    document.querySelector('.custo').innerText = 'R$ ' + custo.toFixed(2);
    
    // Torna a seção de resultados visível
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('caixaResultado').style.display = 'flex';

    // Atualiza o tempo de banho
    document.getElementById('sample').innerText = `Tempo de banho: ${formatTime(tempoSegundos)}`;
}

// Função para formatar o tempo
function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Escuta eventos do socket
var socket = io();
socket.on('data', function (data) {
    console.log(data); // Log do dado recebido
    var tempoSegundos = data; // Supõe que os dados contêm o tempo em segundos
    calcularConsumo(tempoSegundos); // Chama a função de cálculo
});

// Adiciona eventos aos dropdowns
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
            select.querySelector('span').innerText = option.innerText; // Atualiza o texto da opção selecionada
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');

            options.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');

            // Atualiza as seleções com base na seleção do dropdown
            if (dropdown.closest('.selecioneTensao')) {
                tensaoSelecionada = option.innerText;
            }

            if (dropdown.closest('.selecionePotencia')) {
                potenciaSelecionada = option.innerText;
            }

            if (dropdown.closest('.selecioneEstacao')) {
                estacaoSelecionada = option.innerText;
            }
        });
    });
});

// Calcula o consumo ao pressionar Enter
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        // Aqui você pode adicionar uma função se necessário
    }
});
