export default class Timer {
    constructor(root) {
        root.innerHTML = Timer.getHTML();

        this.el = {
            timerContainer: root.querySelector('.timer-container'),
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__btn--control"),
            reset: root.querySelector(".timer__btn--reset"),
            endtimer: root.querySelector(".endtimer"),
            conometro: root.querySelector(".conometro-container"),
            conometroMinutes: root.querySelector(".conometro-container .minute"),
            conometroSeconds: root.querySelector(".conometro-container .sec"),
            conometroMilliseconds: root.querySelector(".conometro-container .msec"),
        };

        this.interval = null;
        this.conometroInterval = null;
        this.remainingSeconds = 0;
        this.hasFinished = false;
        this.additionalTimeAdded = false; // Flag to track if additional time has been added

        this.el.conometro.style.display = 'none';

        this.start();
        this.stop();

        this.el.control.addEventListener("click", () => {
            if (this.interval === null) {
                this.start();
            } else {
                this.stop();
            }
        });

        this.el.reset.addEventListener("click", () => {
            let inputMinutes = prompt("Coloque o seu tempo:");

            if (!isNaN(inputMinutes)) {
                inputMinutes = parseInt(inputMinutes);
                if (inputMinutes < 60) {
                    this.stop();
                    this.remainingSeconds = inputMinutes * 60;
                    this.updateInterfaceTimer();
                    this.hasFinished = false;
                    this.additionalTimeAdded = false; // Reset the flag when the timer is reset
                } else {
                    alert("Por favor, insira um valor menor que 60.");
                }
            } else {
                alert("Por favor, insira apenas números.");
            }
        });

        this.el.endtimer.addEventListener("click", () => {
            if (this.hasFinished) {
                this.resetTimer();
            }
        });
    }

    updateInterfaceTimer() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;

        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    updateInterfaceControls() {
        if (this.interval === null) {
            this.el.control.innerHTML = `<img src="./src/imagens/play_arrow_FILL0_wght400_GRAD0_opsz24.png" alt="play" class="play">`;
            this.el.control.classList.add("timer__btn--start");
            this.el.control.classList.remove("timer__btn--stop");
        } else {
            this.el.control.innerHTML = `<img src="./src/imagens/play_arrow_FILL0_wght400_GRAD0_opsz24.png" alt="play" class="pause">`;
            this.el.control.classList.add("timer__btn--stop");
            this.el.control.classList.remove("timer__btn--start");
        }
    }

    timerEndActions() {
        this.stop();
        this.el.minutes.textContent = "00";
        this.el.seconds.textContent = "00";
        this.el.control.style.display = "none";
        this.el.reset.style.display = "none";

        this.el.timerContainer.style.display = "none";
        this.el.endtimer.style.display = "block";

        this.el.seconds.classList.add("finished");
        this.el.endtimer.classList.add("finished");

        this.el.conometro.style.display = 'block';
        this.startConometro();
        this.hasFinished = true;
    }

    startConometro() {
        let conometroMinutes = 0;
        let conometroSeconds = 0;
        let conometroMilliseconds = 0;

        this.conometroInterval = setInterval(() => {
            conometroMilliseconds++;
            if (conometroMilliseconds === 100) {
                conometroMilliseconds = 0;
                conometroSeconds++;
            }
            if (conometroSeconds === 60) {
                conometroSeconds = 0;
                conometroMinutes++;
            }

            this.el.conometroMinutes.textContent = conometroMinutes.toString().padStart(2, "0") + ":";
            this.el.conometroSeconds.textContent = conometroSeconds.toString().padStart(2, "0") + " ";
            this.el.conometroMilliseconds.textContent = conometroMilliseconds.toString().padStart(2, "0");
        }, 10);
    }

    stopConometro() {
        clearInterval(this.conometroInterval);
    }

    start() {
        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTimer();
    
            if (this.remainingSeconds <= 30) {
                this.el.timerContainer.classList.add('blinking');
            } else {
                this.el.timerContainer.classList.remove('blinking');
            }
    
            if (this.remainingSeconds === 30 && !this.additionalTimeAdded) {
                this.additionalTimeAdded = true; // Marca que a pergunta foi feita
                setTimeout(() => {
                    let addTime = confirm("Deseja acrescentar mais 5 minutos?");
                    if (addTime) {
                        this.remainingSeconds += 300; // Adiciona 5 minutos
                        this.updateInterfaceTimer(); // Atualiza a interface imediatamente após adicionar o tempo
                    }
                }, 0);
            }
    
            if (this.remainingSeconds === 0) {
                this.el.timerContainer.classList.remove('blinking');
                this.timerEndActions();
            }
        }, 1000);
    
        this.updateInterfaceControls();
    }
    
    


    stop() {
        clearInterval(this.interval);
        this.interval = null;
        this.updateInterfaceControls();
        this.el.seconds.classList.remove("finished");
        this.el.endtimer.classList.remove("finished");
        this.stopConometro();
    }

    resetTimer() {
        this.el.control.style.display = "inline-block";
        this.el.reset.style.display = "inline-block";
        this.el.timerContainer.style.display = "block";
        this.el.endtimer.style.display = "none";
        this.el.conometro.style.display = 'none';
        this.el.seconds.classList.remove("finished");
        this.el.endtimer.classList.remove("finished");
        this.remainingSeconds = 0;
        this.updateInterfaceTimer();
        this.updateInterfaceControls();
        this.additionalTimeAdded = false; // Reset the flag when the timer is reset
    }

    static getHTML() {
        return `
            <div class="timer-container">
                <span class="timer__part timer__part--minutes">00</span>
                <span class="timer__part">:</span>
                <span class="timer__part timer__part--seconds">00</span>
            </div>
            <div class="endtimer"> ACABOU O SEU TEMPO! </div>
            <div class="conometro-container"> 
            <div class="ultrapassou"> VOCÊ ULTRAPASSOU EM </div>
                <div class="watch">
                    <span class="text minute"> 00 :</span>
                    <span class="text sec">&nbsp;00 :</span>
                    <span class="text msec">&nbsp;00</span>
                </div>
            </div>
            <button type="button" class="timer__btn timer__btn--control timer__btn--start">
                <img src="./src/imagens/play_arrow_FILL0_wght400_GRAD0_opsz24.png" alt="play" class="play">
            </button>
            <button type="button" class="timer__btn timer__btn--control timer__btn--reset">
                <img src="./src/imagens/device_reset_FILL0_wght400_GRAD0_opsz24.png" alt="reset" class="reset">
            </button>
        `;
    }
}
