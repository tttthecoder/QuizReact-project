
import quizCompleteImg from '../assets/quiz-complete.png'
import QUESTIONS from '../questions'
export default function Summary({ userAnswers }) {
    const skippedAnswers = userAnswers.filter(answer => answer === 'not-answer')
    const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0])
    const skippedAnswersShare = Math.round(skippedAnswers.length / userAnswers.length * 100)
    const correctAnswersShare = Math.round(correctAnswers.length / userAnswers.length * 100)
    return (
        <div id='summary'>
            <img src={quizCompleteImg} alt="Trophy icon" />
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className='number'>
                        {skippedAnswersShare}%
                    </span>
                    <span className='text'>
                        Skipped
                    </span>
                </p>
                <p>
                    <span className='number'>
                        {correctAnswersShare}%
                    </span>
                    <span className='text'>
                        answered correctly
                    </span>
                </p>
                <p>
                    <span className='number'>
                        {100 - correctAnswersShare - skippedAnswersShare}%
                    </span>
                    <span className='text'>
                        answered incorrectly
                    </span>
                </p>
            </div>
            <div>
                <ol>
                    {userAnswers.map((answer, index) => {
                        let classes = 'user-answer';
                        if (answer === 'not-answer') {
                            classes += ' skipped';
                        }
                        else if (answer === QUESTIONS[index].answers[0]) {
                            classes += ' correct';
                        }
                        else {
                            classes += ' wrong';
                        }
                        return <li key={index}>
                            <h3>
                                {index + 1}
                            </h3>
                            <p className='question'>{QUESTIONS[index].text}</p>
                            <p className={classes}> {answer !== 'not-answer' ? answer : 'Skipped'}</p>
                        </li>
                        
                    })}
                </ol>
            </div>
        </div>
    )
}
