import QUESTIONS from '../questions'
import { useState } from 'react'
import Timer from './Timer'
import Summary from './Summary'
const questionsWithShuffledAnswers = QUESTIONS.map((question) => {
    return {
        ...question,
        answers: [...question.answers].sort(() => Math.random() - 0.5)
    }
})

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([])
    const [currentlySelectedAnswer, setCurrentlySelectedAnswer] = useState('')
    const [correctChoice, setCorrectChoice] = useState(null)
    const activeQuestionIndex = userAnswers.length;
    function handleSelectAnswer(selectedAnswer) {
        setCurrentlySelectedAnswer(prev => selectedAnswer)
    }

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
    if (quizIsComplete) {
        return <Summary userAnswers={userAnswers} />
    }
    // calculate the correct timer to output to the console.
    var classNameForButton = '';
    var timerToOutput;
    var buttonDisabled = false;
    if (correctChoice !== null) {
        function handleTimeUpWithSelection_ver3() {
            setCorrectChoice(prev => null)
            setUserAnswers(prev => [...prev, currentlySelectedAnswer])
            setCurrentlySelectedAnswer(prev => '')
        }
        buttonDisabled = true
        classNameForButton = correctChoice ? 'correct' : 'wrong'
        timerToOutput = <Timer key={correctChoice} handleTimeOut={handleTimeUpWithSelection_ver3} timeOut={1000} />;
    }
    else if (currentlySelectedAnswer !== '') {
        function handleTimeUpWithSelection() {
            if (currentlySelectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setCorrectChoice(true)
            }
            else {
                setCorrectChoice(false)
            }
        }
        buttonDisabled = true
        classNameForButton = 'selected'
        timerToOutput = <Timer key={'selected'} handleTimeOut={handleTimeUpWithSelection} timeOut={2000} />;

    }
    else {
        function handleTimeUp() {
            setUserAnswers(prev => [...prev, 'not-answer'])
        }
        timerToOutput = <Timer key={activeQuestionIndex} handleTimeOut={handleTimeUp} timeOut={15000} />;
    }

    var shuffledAnswers = [...questionsWithShuffledAnswers[activeQuestionIndex].answers]
    return <div id='quiz'>
        <div id='question'>
            <h2>{quizIsComplete ? 'You completed it all' : QUESTIONS[activeQuestionIndex].text}</h2>
            {quizIsComplete
                ||
                <ul id='answers'>
                    {shuffledAnswers.map((a) => {
                        return <li key={a} className='answer'>
                            <button className={currentlySelectedAnswer === a ? classNameForButton : ''} onClick={() => { handleSelectAnswer(a) }} disabled={buttonDisabled} >
                                {a}
                            </button>
                        </li>
                    })}
                    {timerToOutput}
                </ul>
            }
        </div>
    </div>
}