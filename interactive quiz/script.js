const quiz = [
    {
        question: "Which of the following is a client-side scripting language?",
        options: ["Python", "Java", "JavaScript", "C++"],
        answer: "JavaScript"
    },
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High-level Text Management Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "What is CSS primarily used for?",
        options: ["Structuring content", "Adding interactivity", "Styling web pages", "Managing databases"],
        answer: "Styling web pages"
    },
    {
        question: "Which company developed the React JavaScript library?",
        options: ["Google", "Facebook", "Microsoft", "Apple"],
        answer: "Facebook"
    },
    {
        question: "What is the purpose of SQL?",
        options: ["Styling web pages", "Querying and managing databases", "Creating interactive animations", "Developing mobile apps"],
        answer: "Querying and managing databases"
    },
    {
        question: "What is a 'variable' in programming?",
        options: ["A fixed value that never changes", "A named storage location for data", "A type of loop", "A function declaration"],
        answer: "A named storage location for data"
    },
    {
        question: "Which of these is a version control system?",
        options: ["Jira", "Slack", "Git", "Trello"],
        answer: "Git"
    },
    {
        question: "What does API stand for?",
        options: ["Application Programming Interface", "Advanced Protocol Integration", "Automated Program Interaction", "Application Process Indicator"],
        answer: "Application Programming Interface"
    },
    {
        question: "What is the command to initialize a new Git repository?",
        options: ["git start", "git new", "git init", "git create"],
        answer: "git init"
    },
    {
        question: "Which of the following is NOT a web browser?",
        options: ["Chrome", "Firefox", "Safari", "Photoshop"],
        answer: "Photoshop"
    }
];

let currentQuestion = 0;
let score = 0;

function updateProgress() {
    document.getElementById('progress').innerText =
        `Question ${currentQuestion + 1} of ${quiz.length}`;
}

function loadQuestion() {
    const q = quiz[currentQuestion];
    document.getElementById('question').textContent = q.question;
    updateProgress();

    const optionsUl = document.getElementById('options');
    optionsUl.innerHTML = '';
    q.options.forEach(option => {
        const li = document.createElement('li');
        li.innerHTML = `<label><input type="radio" name="option" value="${option}"> ${option}</label>`;
        li.onclick = () => {
            // Remove 'selected' from others
            document.querySelectorAll('#options li').forEach(
                eli => eli.classList.remove('selected')
            );
            li.classList.add('selected');
            li.querySelector('input').checked = true;
        };
        optionsUl.appendChild(li);
    });
    document.getElementById('submitBtn').disabled = false;

    document.getElementById('result').innerText = '';
}

document.getElementById('submitBtn').onclick = function() {
    document.getElementById('submitBtn').disabled = true;
    const options = document.getElementsByName('option');
    let selected = null;
    for (const option of options) {
        if (option.checked) {
            selected = option.value;
        }
    }
    if (!selected) {
        document.getElementById('result').innerText = "Please select an answer!";
        document.getElementById('result').style.color = "#e53935";
        return;
    }

    if (selected === quiz[currentQuestion].answer) {
        score++;
        document.getElementById('result').innerText = "Correct!";
        document.getElementById('result').style.color = "#4caf50";
    } else {
        document.getElementById('result').innerText = "Incorrect! The answer was: " + quiz[currentQuestion].answer;
        document.getElementById('result').style.color = "#e53935";
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quiz.length) {
            loadQuestion();
        } else {
            document.querySelector('.quiz-container').innerHTML =
                `<h1>Quiz Completed!</h1>
                 <p class="final-score">Your score: ${score} / ${quiz.length}</p>`;
        }
    }, 1200);
};

// Initial load
window.onload = function() {
    loadQuestion();

    // Dark Mode Toggle Logic
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Function to set dark mode
    function setDarkMode(isDark) {
        if (isDark) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
        darkModeToggle.checked = isDark;
    }

    // Check for saved dark mode preference on load
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
        setDarkMode(savedDarkMode === 'true');
    } else {
        // Set default to light mode if no preference found
        setDarkMode(false);
    }

    // Event listener for toggle switch
    darkModeToggle.addEventListener('change', () => {
        const isDark = darkModeToggle.checked;
        setDarkMode(isDark);
        localStorage.setItem('darkMode', isDark);
    });
};