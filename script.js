document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
        
        {
            type: 'text',
            question: 'Wie heißt das Biom wo Wüstentempel enstehen können?',
            options: ['dessert', 'plains', 'mountains'],
            answer: 'dessert'
        },
        {
            type: 'text',
            question: 'wie heißt das Monster das Gunpowder droppt?',
            answer: 'creeper'
        },
        {
            type: 'multiple-choice',
            question: 'Wie hoch ist die Wahrscheinlichkeit das ein Skelet auf einer spinne sitz?',
            options: ['1-100', '1-1000', '1-10', '1-110'],
            answer: '1-100'
        },
        {
            type: 'multiple-choice',
            question: 'Wann würde Minecraft veröffentlicht?',
            options: ['7. Oktober 2010', '20. Juli 2000', '17. Mai 2009', ''],
            answer: '17. Mai 2009'
        },
         {
            type: 'multiple-choice',
            question: '',
            options: ['', '', '', ''],
            answer: ''
        },
        
    ];

    let currentSlide = 0;
    let score = 0;

    const quizTitle = document.getElementById('quiz-title');
    const quizSlide = document.getElementById('quiz-slide');
    const nextButton = document.getElementById('next-button');

    function loadSlide() {
        quizSlide.innerHTML = ''; // Reset slide content
        const currentData = quizData[currentSlide];

        const questionElement = document.createElement('h2');
        questionElement.textContent = currentData.question;
        quizSlide.appendChild(questionElement);

        if (currentData.type === 'multiple-choice') {
            const ulElement = document.createElement('ul');

            currentData.options.forEach(option => {
                const liElement = document.createElement('li');
                const radioElement = document.createElement('input');
                radioElement.type = 'radio';
                radioElement.name = 'quiz';
                radioElement.value = option;

                const labelElement = document.createElement('label');
                labelElement.textContent = option;

                liElement.appendChild(radioElement);
                liElement.appendChild(labelElement);
                ulElement.appendChild(liElement);
            });

            quizSlide.appendChild(ulElement);
        } else if (currentData.type === 'text') {
            const inputElement = document.createElement('input');
            inputElement.type = 'text';
            inputElement.id = 'text-answer';
            quizSlide.appendChild(inputElement);
        }

        nextButton.classList.remove('hidden');
    }

    function checkAnswer() {
        const currentData = quizData[currentSlide];
        let userAnswer = '';

        if (currentData.type === 'multiple-choice') {
            const selectedOption = document.querySelector('input[name="quiz"]:checked');
            if (selectedOption) {
                userAnswer = selectedOption.value;
            }
        } else if (currentData.type === 'text') {
            const textInput = document.getElementById('text-answer');
            if (textInput) {
                userAnswer = textInput.value.trim();
            }
        }

        if (userAnswer === currentData.answer) {
            score++;
        }
    }

    function showResults() {
        quizSlide.innerHTML = `<h2>Ihr Ergebnis: ${score} von ${quizData.length} richtig</h2>`;
        nextButton.classList.add('hidden');
    }

    nextButton.addEventListener('click', () => {
        checkAnswer();

        currentSlide++;
        if (currentSlide < quizData.length) {
            loadSlide();
        } else {
            showResults();
        }
    });

    loadSlide();
});
