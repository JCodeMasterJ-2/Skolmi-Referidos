let codigo = document.getElementById('codigo-referido');
let referidos = document.querySelectorAll('.container-referidos div h2');

/* Generar Codigo */
function generarCodigoAlfanumerico(n) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';

    for (let i = 0; i < n; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres[indiceAleatorio];
    }

    return codigo;
}

const codigoGenerado = generarCodigoAlfanumerico(10);

codigo.textContent = codigoGenerado;

/* Copiar Texto */
document.getElementById('boton-copiar').addEventListener('click', e => {
    const codigo = document.getElementById('codigo-referido').textContent;
    const input = document.createElement('input');
    input.value = codigo;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
});

/* Abrir informacion */
referidos.forEach(referido => {
    referido.addEventListener('click', function () {
        const referidoInfo = this.nextElementSibling;
        referidoInfo.hidden = !referidoInfo.hidden;
    })
})