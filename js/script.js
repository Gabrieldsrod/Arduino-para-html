const dropdowns = document.querySelectorAll('.dropdown'); // Use querySelectorAll to select all dropdowns

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li'); // Use querySelectorAll to select all li elements
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            select.querySelector('span').innerText = option.innerText; // Update the text of the selected option

            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');

            options.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');
        });
    });
});

document.getElementById('tempo').addEventListener('input', function () {
    var valor = this.value;

    // Verifica se o valor é negativo
    if (valor < 0) {
        this.value = ''; // Limpa o campo se o valor for negativo
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        calcularConsumo();
    }
});