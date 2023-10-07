const api_key = 'sk' + '-ajsaBrcQfy7vC4FL9XzLT3Blbk' + 'FJDz2eB2bEl6Qm2i8QvSpD';
const chat = document.getElementById('chat');
const userInput = document.getElementById('user-input');

function agregarMensaje(mensaje, emisor) {
    const mensajeElemento = document.createElement('div');
    mensajeElemento.classList.add(emisor);
    mensajeElemento.textContent = mensaje;
    chat.appendChild(mensajeElemento);
    chat.scrollTop = chat.scrollHeight;
}

function obtenerRespuestaGPT3(mensajeUsuario) {
    const url = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_key}`
    };

    const data = {
        'prompt': `Usuario: ${mensajeUsuario}`,
        'max_tokens': 50
    };

    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => data.choices[0].text)
    .catch(error => {
        console.error('Error al obtener la respuesta de GPT-3.5:', error);
        return 'Hubo un error al obtener la respuesta.';
    });
}

function enviarMensaje() {
    const mensajeUsuario = userInput.value;
    if (mensajeUsuario.trim() === '') return;

    agregarMensaje(mensajeUsuario, 'usuario');
    userInput.value = '';

    obtenerRespuestaGPT3(mensajeUsuario)
        .then(respuestaGPT3 => {
            agregarMensaje(respuestaGPT3, 'gpt35');
        });
}

userInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        enviarMensaje();
    }
});
