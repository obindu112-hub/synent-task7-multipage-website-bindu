// ===== LEARNPATH DASHBOARD =====

// Learning progress tracker
const lessonCheckboxes = document.querySelectorAll(".lesson-check");

const totalTopics = document.getElementById("total-topics");
const completedCount = document.getElementById("completed-count");
const progressPercent = document.getElementById("progress-percent");
const progressFill = document.getElementById("progress-fill");
const progressMessage = document.getElementById("progress-message");

const STORAGE_KEY = "learnpath-completed-lessons";

function getCompletedLessons() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function saveCompletedLessons(completed) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
}

function updateProgress() {
    const completed = getCompletedLessons();

    lessonCheckboxes.forEach((checkbox) => {
        checkbox.checked = completed.includes(checkbox.dataset.id);

        const item = checkbox.closest(".learning-item");
        if (item) {
            item.classList.toggle("completed", checkbox.checked);
        }
    });

    const total = lessonCheckboxes.length;
    const count = completed.filter((id) =>
        Array.from(lessonCheckboxes).some((checkbox) => checkbox.dataset.id === id)
    ).length;

    const percentage = total === 0
        ? 0
        : Math.round((count / total) * 100);

    totalTopics.textContent = total;
    completedCount.textContent = count;
    progressPercent.textContent = percentage + "%";
    progressFill.style.width = percentage + "%";

    if (percentage === 100) {
        progressMessage.textContent = "Excellent! You completed your learning plan!";
    } else if (count > 0) {
        progressMessage.textContent =
            `Great progress! You completed ${count} of ${total} topics.`;
    } else {
        progressMessage.textContent =
            "Start learning to track your progress!";
    }
}

lessonCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        let completed = getCompletedLessons();

        if (checkbox.checked) {
            if (!completed.includes(checkbox.dataset.id)) {
                completed.push(checkbox.dataset.id);
            }
        } else {
            completed = completed.filter(
                (id) => id !== checkbox.dataset.id
            );
        }

        saveCompletedLessons(completed);
        updateProgress();
    });
});

updateProgress();


// ===== INTERACTIVE PROGRAMMING QUIZ =====

const questions = [
    {
        question: "1. Which keyword is used to define a function in Python?",
        options: ["function", "def", "define", "fun"],
        answer: 1,
        explanation: "The def keyword is used to define a function in Python."
    },
    {
        question: "2. Which data type stores True or False?",
        options: ["String", "Integer", "Boolean", "List"],
        answer: 2,
        explanation: "Boolean values are True and False."
    },
    {
        question: "3. Which loop repeats while a condition is true?",
        options: ["if", "while", "print", "def"],
        answer: 1,
        explanation: "A while loop repeats as long as its condition is true."
    },
    {
        question: "4. What is the index of the first element in a Python list?",
        options: ["0", "1", "-1", "2"],
        answer: 0,
        explanation: "Python list indexing starts at 0."
    },
    {
        question: "5. Which function displays output in Python?",
        options: ["input()", "show()", "print()", "display()"],
        answer: 2,
        explanation: "The print() function displays output in Python."
    }
];

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("quiz-options");
const feedbackElement = document.getElementById("quiz-feedback");
const scoreElement = document.getElementById("quiz-score");
const nextButton = document.getElementById("next-question");
const restartButton = document.getElementById("restart-quiz");

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
    answered = false;

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;
    optionsContainer.replaceChildren();
    feedbackElement.textContent = "";

    scoreElement.textContent =
        `Question ${currentQuestion + 1} of ${questions.length} | Score: ${score}`;

    nextButton.hidden = true;
    restartButton.hidden = true;

    current.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "quiz-option";
        button.textContent = option;
        button.dataset.answer = index;

        button.addEventListener("click", () => checkAnswer(index, button));

        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedAnswer, selectedButton) {
    if (answered) return;

    answered = true;

    const current = questions[currentQuestion];
    const optionButtons = optionsContainer.querySelectorAll(".quiz-option");

    optionButtons.forEach((button) => {
        button.disabled = true;

        if (Number(button.dataset.answer) === current.answer) {
            button.classList.add("correct");
        }
    });

    if (selectedAnswer === current.answer) {
        score++;
        feedbackElement.textContent = "Correct! " + current.explanation;
    } else {
        selectedButton.classList.add("incorrect");
        feedbackElement.textContent = "Not quite. " + current.explanation;
    }

    scoreElement.textContent =
        `Question ${currentQuestion + 1} of ${questions.length} | Score: ${score}`;

    if (currentQuestion < questions.length - 1) {
        nextButton.hidden = false;
    } else {
        feedbackElement.textContent +=
            ` Quiz complete! Your final score is ${score} out of ${questions.length}.`;
        restartButton.hidden = false;
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    }
});

restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    showQuestion();
});

showQuestion();