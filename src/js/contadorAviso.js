export default class contadorAviso {
    constructor() {
        this.init();
    }

    init() {
        setInterval(() => {
            const dataElement = document.querySelector("#data");
            const timeElement = document.querySelector("#relogio");
            let date = new Date();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();

            if (hours < 10) {
                hours = "0" + hours;
            }

            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            if (seconds < 10) {
                seconds = "0" + seconds;
            }

            let formattedDate = date.toLocaleDateString(); // Obtém a data formatada

            if (dataElement) {
                dataElement.textContent = formattedDate;
            }
            if (timeElement) {
                timeElement.textContent = hours + ":" + minutes + ":" + seconds;

                // Verifica se faltam menos de 30 segundos e adiciona a classe 'warning' se necessário
                let totalSeconds = hours * 3600 + minutes * 60 + seconds;
                if (totalSeconds >= 11 * 3600 + 30 * 60) {
                    timeElement.classList.remove('warning');
                } else {
                    timeElement.classList.add('warning');
                }
            }
        }, 1000);
    }
}
