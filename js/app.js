const criptomonedasSelect = document.querySelector('#criptomonedas');

const obtenerCriptomonedas = cripotomonedas => new Promise( resolve => {
    resolve(cripotomonedas);
});

window.onload = () => {
    consultarCriptomonedas();
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