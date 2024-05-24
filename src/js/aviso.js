export default class Aviso {
    constructor() {
        this.init();
    }

    init() {
        // Adiciona um evento de escuta ao campo de entrada para verificar continuamente o comprimento do texto
        document.getElementById('avisoInput').addEventListener('input', (event) => {
            var message = event.target.value;
            if (message.length > 210) {
                alert('O limite de caracteres foi atingido (máximo 210 caracteres).');
                // Trunca a mensagem para 210 caracteres
                event.target.value = message.substring(0, 210);
            }
        });

        // Adiciona evento ao botão para enviar aviso
        document.getElementById('btnAviso').addEventListener('click', () => {
            const aviso = document.getElementById('avisoInput').value; // Obtém o valor do input
            this.showAlert(aviso); // Mostra o alerta com o texto inserido pelo usuário
        });

        // Adiciona evento ao botão de fechar alerta
        document.getElementById('closeAlertButton').addEventListener('click', () => {
            this.closeAlert();
        });
    }

    // Função para fechar o alerta
    closeAlert() {
        document.getElementById('customAlert').style.display = 'none';
    }

    // Função para exibir o alerta com a mensagem especificada
    showAlert(message) {
        var alertMessage = document.getElementById('alertMessage');
        // Limita a mensagem a 210 caracteres e converte para caixa alta
        var truncatedMessage = message.substring(0, 210).toUpperCase();
        alertMessage.textContent = truncatedMessage;
        document.getElementById('customAlert').style.display = 'block';
    }
}
