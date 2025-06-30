const questions = document.querySelectorAll('.question > p');
const form = document.querySelector('.question');
const container = document.querySelector('.survey-container');
const answers = {};
let currentIndex = 0;
const vspace = document.querySelector(".vspace");
const buttons = document.querySelectorAll('.btn-answer');
let proceed = true;

buttons.forEach(button => {
    button.addEventListener('mousedown', () => {
        const answer = button.dataset.answer;
        const isYes = answer == "Так";

        if (currentIndex == questions.length - 1) {
            proceed = false;
            showVspace();
            if (!isYes) {
                buttons[0].textContent = "Да";
                const b0 = buttons[0].textContent;
                const b1 = buttons[0].classList.value;
                const b2 = buttons[0].dataset.answer;
                buttons[0].textContent = buttons[1].textContent;
                buttons[0].classList = buttons[1].classList;
                buttons[0].dataset.answer = buttons[1].dataset.answer;
                buttons[1].textContent = b0;
                buttons[1].classList.value = b1;
                buttons[1].dataset.answer = b2;
            }

            const audio = new Audio('thankyou.mp3'); // or .wav or .ogg

            const surveyLink = atob('aHR0cHM6Ly93d3cuZnVyYWZmaW5pdHkubmV0L3ZpZXcvNDc3MTk2NTAv')
            audio.play();
            setTimeout(() => {
                container.classList.add('gif-background');
            }, 400);

            setTimeout(() => {
                window.open(surveyLink, '_blank', 'noopener,noreferrer');
                showImageOverlay();
            }, 2000)
        }
    });
})

const thankyouMessage = base64ToUtf8('0KHQvtGB0LDQuz8=')

document.querySelectorAll('.btn-answer').forEach(button => {
    button.addEventListener('click', () => {
        if (!proceed) {
            return;
        }

        const currentQuestion = questions[currentIndex];
        const answer = button.dataset.answer;

        // Store answer
        answers[`q${currentIndex}`] = answer;

        currentQuestion.classList.remove('active');
        if (currentIndex == questions.length - 2) {
            if (proceed) {
                // vspace.style.color = "red";
                setTimeout(() => {
                    showVspace();
                }, 1500);
            }
        }
        if (currentIndex < questions.length - 1) {
            questions[currentIndex + 1].classList.add('active');
        }
        currentIndex++;
    });
});

function showVspace() {
    vspace.textContent = thankyouMessage;
}

function base64ToUtf8(base64) {
    const binaryString = atob(base64);

    const bytes = Uint8Array.from(binaryString, char => char.charCodeAt(0));

    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes);
}

function showImageOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.onclick = () => overlay.remove();

    const img = document.createElement('img');
    img.src = 'img';

    overlay.appendChild(img);
    document.body.appendChild(overlay);
}