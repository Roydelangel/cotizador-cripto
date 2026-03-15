const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');

const objBusqueda = {
    moneda: '',
    cripotomoneda: ''
};

const obtenerCriptomonedas = cripotomonedas => new Promise( resolve => {
    resolve(cripotomonedas);
});

window.onload = () => {
    consultarCriptomonedas();

    formulario.addEventListener('submit', submitFormulario);

    criptomonedasSelect.addEventListener('change', leerValor);
    monedaSelect.addEventListener('change', leerValor);
};

function consultarCriptomonedas() {
    const url = 'https://min-api.cryptocompare.com/documentation';

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => obtenerCriptomonedas(resultado.Data))
        .then(cripotomonedas => selectCriptomonedas(cripotomonedas))
};

function selectCriptomonedas(cripotomonedas) {
    cripotomonedas.forEach(cripto => {
        const {FullName, Name} = cripto.CoinInfo;

        const option = document.createElement('OPTION');
        option.value = Name;
        option.textContent = FullName;

        criptomonedasSelect.appendChild(option);
    });
};

function leerValor(e) {
    objBusqueda[e.target.name] = e.target.value;
};

function submitFormulario(e) {
    e.preventDefault();

    const {moneda, cripotomoneda} = objBusqueda;

    if (moneda === '' || cripotomoneda === '') {
        mostrarAlerta('Ambos campos son obligatorios');

        return;
    };
};

function mostrarAlerta(mensaje) {
    const existeError = document.querySelector('.error');

    if (!existeError) {
        const divMensaje = document.createElement('DIV');
        divMensaje.classList.add('error');
        divMensaje.textContent = mensaje;

        formulario.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    };

    
};
