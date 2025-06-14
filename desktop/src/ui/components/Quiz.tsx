import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

type Question = {
  question: string
  picture: string
  answers: []
  category: string
  quiz: [{ question: string; answers: []; picture: string; category: string }]
}

const Quiz: React.FC = () => {
  const { category } = useParams()
  const apiUrl = window.location.origin.includes('localhost')
    ? 'http://localhost:8000'
    : 'https://general-knowledge-eta.vercel.app'
  const [gameStarted, setGameStarted] = useState(false)
  const [displayResult, setDisplayResult] = useState(true)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [nextButton, setNextButton] = useState(false)
  const [answerScore, setAnswerScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [timer, setTimer] = useState(15)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${apiUrl}/${category}`)
        .then(response => {
          document.title = `QuizVibe - ${response.data.questions[0].category} Quiz`
          setQuestions(response.data.questions)
        })
        .catch(error => {
          navigate('/')
          console.error('Error: ', error)
          toast.error(error.response.data?.message || error.message)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }

    fetchData()
  }, [apiUrl, category, navigate])

  const setNextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1)
  }

  const runTimer = () => {
    if (timer < 0) {
      setTimer(15)
      return
    }

    setInterval(() => {
      setTimer(prev => prev - 1)
    }, 1000)
  }

  const startGame = () => {
    setGameStarted(true)
    setNextButton(true)
    setCurrentQuestionIndex(0)
    runTimer()
  }

  const selectAnswer = useCallback(
    (correct: boolean, questionLength: number) => {
      setNextQuestion()
      setTimer(15)
      if (correct) {
        setAnswerScore(prev => prev + 1)
      }

      if (currentQuestionIndex === questionLength - 1) {
        setDisplayResult(true)
      }
    },
    [currentQuestionIndex]
  )

  useEffect(() => {
    if (timer < 0) {
      selectAnswer(false, questions[0].quiz.length)
      setTimer(15)
    }
  }, [questions, timer, currentQuestionIndex, selectAnswer])

  return (
    <>
      {isLoading && (
        <div className='absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 w-[90%] max-w-[90%] md:w-[800px] md:max-w-[80%] h-[50vh] bg-[#999] animate-pulse rounded-[5px] p-[10px] shadow-md'></div>
      )}
      {!isLoading && (
        <div className='absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 w-[90%] max-w-[90%] md:w-[800px] md:max-w-[80%] bg-[white] rounded-[5px] p-[10px] shadow-md min-h-[50vh] max-h-[80vh] overflow-auto'>
          {gameStarted && (
            <>
              <div>
                {questions[0].quiz.length > 0 && (
                  <>
                    {currentQuestionIndex < questions[0].quiz.length && (
                      <>
                        <div className='flex flex-col md:flex-row items-center justify-between my-[1rem] px-[1rem] gap-[1rem]'>
                          <h3 className='font-bold text-lg'>
                            Question {currentQuestionIndex + 1} of{' '}
                            {questions[0].quiz.length}
                          </h3>
                          <span
                            className={`py-[0.5rem] px-[20px] ${
                              timer <= 3 ? 'bg-[red]' : 'bg-[green]'
                            } text-white text-[1.2rem] font-bold font-mono`}
                          >
                            {timer < 10 ? '0' : ''}
                            {timer}
                          </span>
                          {nextButton && (
                            <button
                              id='next-btn'
                              className='text-[1.5rem] font-bold py-[10px] px-[20px] cursor-pointer btn'
                              onClick={() =>
                                selectAnswer(false, questions[0].quiz.length)
                              }
                            >
                              Next
                            </button>
                          )}
                          <div
                            className={` bg-[yellow] text-[black] py-[0.5rem] px-[1rem] rounded-md ${
                              displayResult ? 'block' : 'hidden'
                            }`}
                          >
                            <h4>{`Your score: ${answerScore}${
                              currentQuestionIndex >= questions[0].quiz.length
                                ? `/${questions[0].quiz.length}`
                                : ''
                            }`}</h4>
                          </div>
                        </div>
                        <div>
                          <h1>
                            {questions[0].quiz[currentQuestionIndex]?.question}
                          </h1>
                        </div>
                        <br />
                        <div className='question-picture'>
                          <img
                            loading='lazy'
                            className='w-full md:w-[20rem] h-[12rem]'
                            alt={
                              questions[0].quiz[currentQuestionIndex]?.category
                            }
                            src={
                              questions[0].quiz[currentQuestionIndex]?.picture
                            }
                          />
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-[10px] my-[20px] mx-0'>
                          {questions[0].quiz[
                            currentQuestionIndex
                          ]?.answers?.map(
                            (
                              answer: {
                                correct: boolean
                                text: string
                              },
                              index: number
                            ) => (
                              <button
                                className='btn'
                                key={index}
                                onClick={() =>
                                  selectAnswer(
                                    answer.correct,
                                    questions[0].quiz.length
                                  )
                                }
                              >
                                {answer.text}
                              </button>
                            )
                          )}
                        </div>
                      </>
                    )}
                  </>
                )}
                {currentQuestionIndex >= questions[0].quiz.length && (
                  <div className='flex flex-col items-center gap-[2rem] my-[4rem]'>
                    <h1 className='text-[#440066] font-bold text-[3rem]'>
                      Complete!
                    </h1>
                    <div
                      className={` bg-[yellow] text-[black] py-[0.5rem] px-[1rem] rounded-md ${
                        displayResult ? 'block' : 'hidden'
                      }`}
                    >
                      <h4>{`Your score: ${answerScore}${
                        currentQuestionIndex >= questions[0].quiz.length
                          ? `/${questions[0].quiz.length}`
                          : ''
                      }`}</h4>
                    </div>
                    <button
                      onClick={() => window.location.reload()}
                      className='text-[1.5rem] font-bold py-[10px] px-[20px] cursor-pointer btn'
                    >
                      Retry
                    </button>
                    <table className='w-[90%] md:w-3/4'>
                      <caption className='font-bold text-[purple] mb-[1rem]'>
                        How well did you do?
                      </caption>
                      <thead>
                        <tr>
                          <th className='border border-[black] p-[0.1rem]'>
                            Number
                          </th>
                          <th className='border border-[black] p-[0.1rem]'>
                            Question
                          </th>
                          <th className='border border-[black] p-[0.1rem]'>
                            Answer
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {questions[0]?.quiz?.map(
                          (
                            item: {
                              question: string
                              answers: { correct: boolean; text: string }[]
                            },
                            index: number
                          ) => (
                            <tr key={index}>
                              <td className='border border-[black] p-[0.1rem] text-center'>
                                {index + 1}
                              </td>
                              <td className='border border-[black] p-[0.1rem]'>
                                {item.question}
                              </td>
                              <td className='border border-[black] p-[0.1rem] text-center'>
                                {
                                  item.answers.find(answer => answer.correct)?.text ?? 'N/A'
                                }
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
          {!gameStarted && (
            <div className='flex flex-col items-center gap-[1rem] my-[2rem]'>
              <h1 className='text-[#440066] font-bold text-[3rem] underline text-center md:text-balance'>
                {questions[0]?.category} Quiz
              </h1>
              <p className='text-center md:text-balance my-[1rem] font-mono'>
                You've got 15 seconds per question. Press{' '}
                <q>
                  <span className='font-bold'>start</span>
                </q>{' '}
                when you are ready.
              </p>
            </div>
          )}
          <div className='flex justify-center items-center'>
            {!gameStarted && (
              <button
                onClick={startGame}
                className='text-[1.5rem] font-bold py-[10px] px-[20px] cursor-pointer btn'
              >
                Start
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Quiz
