function toggle () {
    document.querySelector('.list-child1').classList.toggle("active")
    document.querySelector('.fa-solid').classList.toggle("rotate")
}


const questionBank = [
    {
        question :"JavaScript is the same as Java." ,
        options: [true, false],
        answer: false
    },
    {
        question :"The typeof operator returns the data type of a variable." ,
        options: [true, false],
        answer: true
    },
    {
        question :"In JavaScript, null is the same as undefined." ,
        options: [true, false],
        answer: false
    },
    {
        question :"JavaScript is a case-sensitive language." ,
        options: [true, false],
        answer: true
    },
    {
        question :"You can use single or double quotes for strings in JavaScript." ,
        options: [true, false],
        answer: true
    },

]

const quizBox = document.getElementById("quizBox") 
const result = document.getElementById("result")

let currentQuestionBankIndex = 0
let incorrectAnswers = []
let score = 0
const submitButton = document.createElement("button")
    submitButton.className = "submitButton"
    submitButton.innerHTML = `Submit`
const seeResultButton = document.createElement("button")
seeResultButton.className = "seeeResultButton"
seeResultButton.innerHTML = `See score`
const seeIncorrectAnswersButton = document.createElement("button")
seeIncorrectAnswersButton.className = "seeIncorrectAnswersButton"
seeIncorrectAnswersButton.innerHTML = `Check Incorrect Answers`
const retryButton = document.createElement("button")
retryButton.className = "retrybutton"
retryButton.innerHTML = "Retry"
function startQuiz () {
    const questionPerTime = questionBank[currentQuestionBankIndex]
    const questiondiv = document.createElement("div")
    questiondiv.className = "questiondiv"
    questiondiv.innerHTML =`${currentQuestionBankIndex + 1}. ${questionPerTime.question}` 
    const answerdiv = document.createElement("div")
    answerdiv.className = "answerdiv"

    

    const options = [...questionPerTime.options] //targeting questionBank questionpertime Object property of options
    for(let i = 0; i < options.length; i++) {
        const label = document.createElement("label")
        label.className = "label"
        label.innerHTML = "<br>"

        const radio = document.createElement("input")
        radio.type = "radio"
        radio.name = "boolean"
        radio.value = options[i]
        radio.style.marginRight = "1rem"
       

        const labelText = document.createTextNode(options[i])

        label.appendChild(radio)
        label.appendChild(labelText)

        answerdiv.appendChild(label)
    }
    quizBox.innerHTML = ""
    quizBox.appendChild(questiondiv)
    quizBox.appendChild(answerdiv)
    quizBox.appendChild(submitButton)
}

startQuiz()

function submitAnswer() {
    let selectedOption = document.querySelector('input[name="boolean"]:checked')
    if (selectedOption) {
        
        const choosenAnswer = selectedOption.value === "true"
        if(choosenAnswer === questionBank[currentQuestionBankIndex].answer) {
            
            score++
            console.log("score increased")
        }
        else {
            incorrectAnswers.push({
                question: questionBank[currentQuestionBankIndex].question,
                selectedAnswer: choosenAnswer,
                correctAnswer: questionBank[currentQuestionBankIndex].answer,
            })
        }

        currentQuestionBankIndex++

        if(currentQuestionBankIndex < questionBank.length) {
             console.log(choosenAnswer)
            startQuiz ()
        }
        else {
            finishQuiz()
        }
        
    }
    
}



function finishQuiz () {
    quizBox.innerHTML = `You have suceesfully finished the quiz`
    submitButton.style.display = "none"
    seeResultButton.style.display = "block"
    quizBox.appendChild(seeResultButton)

}

function scoreDashboard () {
    quizBox.style.display = "none"
    result.innerHTML = `Your score is: ${score} out of ${questionBank.length} which is ${(score/questionBank.length)*100}%`
    seeIncorrectAnswersButton.style.display = "block"
    result.appendChild(seeIncorrectAnswersButton)

}


function showIncorrectAnsers () {
    let incorrectText = ""
    for (let i=0; i<incorrectAnswers.length; i++) {
        incorrectText += `<h2>Incorrect Answers</h2><strong>Question:</strong> ${incorrectAnswers[i].question} <br>
        <strong>Answer:</strong> ${incorrectAnswers[i].selectedAnswer} <br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer} <br><br>`
    }

    // quizBox.innerHTML = ""
    quizBox.style.display = "block"
    quizBox.innerHTML = `${incorrectText}`
    seeIncorrectAnswersButton.style.display = "none"
    result.style.display = "none"
    quizBox.appendChild(retryButton)
    
}

function retry () {
    currentQuestionBankIndex = 0
    score = 0
    incorrectAnswers = []
    quizBox.innerHTML = ""
    startQuiz()

}

submitButton.addEventListener("click", submitAnswer)
seeResultButton.addEventListener("click", scoreDashboard)
seeIncorrectAnswersButton.addEventListener("click", showIncorrectAnsers)
retryButton.addEventListener("click", retry)

