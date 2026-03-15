const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

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
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

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

    consultarApi();
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

function consultarApi() {
    const {moneda, cripotomoneda} = objBusqueda;
    
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${cripotomoneda}&tsyms=${moneda}`;

    mostrarSpinner();

    fetch(url)
        .then( respuesta => respuesta.json() )
        .then( cotizacion => mostrarCotizacion(cotizacion.DISPLAY[cripotomoneda][moneda]))
};

function mostrarCotizacion(cotizacion) {
    limpiarHTML();

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE} = cotizacion;

    const precio = document.createElement('P');
    precio.classList.add('precio');
    precio.innerHTML = `El precio es: <span>${PRICE}</span>`;

    const precioAlto = document.createElement('P');
    precioAlto.innerHTML = `<p>Precio más alto del día: <span>${HIGHDAY}</span></p>`;
    
    const precioBajo = document.createElement('P');
    precioBajo.innerHTML = `<p>Precio más bajo del día: <span>${LOWDAY}</span></p>`;

    const ultimasHoras = document.createElement('P');
    ultimasHoras.innerHTML = `<p>Últimas 24 horas: <span>${CHANGEPCT24HOUR}%</span></p>`;

    const ultimaActualizacion = document.createElement('P');
    ultimaActualizacion.innerHTML = `<p>Última actualización: <span>${LASTUPDATE}%</span></p>`;

    resultado.appendChild(precio);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(ultimasHoras);
    resultado.appendChild(ultimaActualizacion);
};

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    };
};

function mostrarSpinner() {
    limpiarHTML();

    const spinner = document.createElement('DIV');
    spinner.classList.add('spinner');
    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `;

    resultado.appendChild(spinner);
};