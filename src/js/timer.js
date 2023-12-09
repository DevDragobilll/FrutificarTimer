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
        };

        this.interval = null;
        this.remainingSeconds = 0;

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
            const inputMinutes = prompt("Coloque o seu tempo:");

            if (inputMinutes < 60) {
                this.stop();
                this.remainingSeconds = inputMinutes * 60;
                this.updateInterfaceTimer();
            }
        });

        this.el.endtimer.addEventListener("click", () => {
            this.resetTimer();
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

    start() {
        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTimer();
    
            if (this.remainingSeconds === 0) {
                this.stop();
                this.el.minutes.textContent = "00";
                this.el.seconds.textContent = "00";
                this.el.control.style.display = "none";
                this.el.reset.style.display = "none";
                
                // Substitui dinamicamente o conteúdo da timer-container pela mensagem de término
                this.el.timerContainer.style.display = "none";
                this.el.endtimer.style.display = "block";
                
                this.el.seconds.classList.add("finished");
                this.el.endtimer.classList.add("finished");
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
    }

    resetTimer() {
        this.el.control.style.display = "inline-block";
        this.el.reset.style.display = "inline-block";
        this.el.timerContainer.style.display = "block";
        this.el.endtimer.style.display = "none";
        this.el.seconds.classList.remove("finished");
        this.el.endtimer.classList.remove("finished");
        this.remainingSeconds = 0;
        this.updateInterfaceTimer();
        this.updateInterfaceControls();
    }

    static getHTML() {
        return `
            <div class="timer-container">
                <span class="timer__part timer__part--minutes">00</span>
                <span class="timer__part">:</span>
                <span class="timer__part timer__part--seconds">00</span>
            </div>
            <div class="endtimer"> ACABOU O SEU TEMPO!! </div>
            <button type="button" class="timer__btn timer__btn--control timer__btn--start">
                <img src="./src/imagens/play_arrow_FILL0_wght400_GRAD0_opsz24.png" alt="play" class="play">
            </button>
            <button type="button" class="timer__btn timer__btn--control timer__btn--reset">
                <img src="./src/imagens/device_reset_FILL0_wght400_GRAD0_opsz24.png" alt="reset" class="reset">
            </button>
        `;
    }
}
