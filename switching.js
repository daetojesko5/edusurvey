const questions = document.querySelectorAll('.question');
const answers = {};
let currentIndex = 0;

document.querySelectorAll('.btn-answer').forEach(button => {
    button.addEventListener('click', () => {
        const currentQuestion = questions[currentIndex];
        const answer = button.dataset.answer;
        const questionNumber = currentQuestion.dataset.question;

        // Store answer
        answers[`q${questionNumber}`] = answer;

        // Hide current question
        currentQuestion.classList.remove('active');

        // Show next question or thank you message
        currentIndex++;
        if (currentIndex < questions.length - 1) {
            questions[currentIndex].classList.add('active');
        } else {
            document.getElementById('thankYou').classList.add('active');
            console.log('Answers:', answers); // You can send this via fetch() if needed
        }
    });
});