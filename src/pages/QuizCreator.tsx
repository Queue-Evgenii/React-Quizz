import { useState } from "react"
import { Button } from "../components/button/Button"
import { RadioInput } from "../components/radio-input/RadioInput"
import { NumberInput, TextareaInput, TextInput } from "../components/text-input/TextInput"
import { Quiz, QuizHelper } from "../models/Quiz"

export const QuizCreator = (props: Props) => {
  const [quiz, setQuiz] = useState<Quiz>(QuizHelper.getEmptyQuiz());
  const [isError, setIsError] = useState<boolean>(false);

  return (
    <div>
      <h2 className="text-3xl font-semibold my-3">Quiz creator:</h2>
      <div className="w-96">
      <TextInput
        name="Quiz name:"
        placeholder="Your quiz name"
        onChange={ (value: string) => quiz.name = value }
      />
      </div>
      <ol className="flex flex-wrap gap-x-8 gap-y-12">
        {
          quiz.questions.map((question, qIndex) => (
            <li key={ qIndex } className="my-4">
              <TextareaInput
                name={`Question ${qIndex + 1}:`}
                placeholder="Your question"
                onChange={ (value: string) => question.name = value }
              />
              <ul className="my-4 pl-4">
                {
                  question.answers.map((answer, aIndex) => (
                    <li className="flex gap-x-2 items-center" key={ aIndex }>
                      <RadioInput
                        id={ qIndex.toString() }
                        for={ qIndex.toString() }
                        name=""
                        onChange={ () => {
                          question.answers.forEach(el => el.isCorrect = false);
                          answer.isCorrect = true;
                        } }
                      />
                      <TextInput
                        placeholder="Your answer"
                        onChange={ (value: string) => answer.name = value }
                      />
                    </li>
                  ))
                }
              </ul>
              <NumberInput
                name="Points for correct answer"
                placeholder="Points"
                min={ 1 }
                max={ 100 }
                value={ question.points.toString() }
                onChange={ (value: string) => question.points = parseInt(value) }
              />
              <Button
                onClick={() => {
                  question.answers.push(QuizHelper.getEmptyAnswer());
                  setQuiz(QuizHelper.copyQuiz(quiz));
                }}
                width={ 164 }
              >
                Add answer
              </Button>
            </li>
          ))
        }
      </ol>
      <div className="my-4 flex flex-wrap gap-y-2 gap-x-4">
        <Button
          onClick={() => {
            quiz.questions.push(QuizHelper.getEmptyQuestion());
            setQuiz(QuizHelper.copyQuiz(quiz));
          }}
          width={ 164 }
        >
          Add question
        </Button>
        <Button
          onClick={() => {
            setIsError(false);
            if (!QuizHelper.isValid(quiz)) {
              setIsError(true);
              return;
            }
            props.onSave(quiz);
          }}
          width={ 164 }
        >
          Save quiz
        </Button>
        { isError ? (<span className="text-xl text-red-800">Some fields are empty or invalid! Please fix and try again!</span>) : (<></>) }
      </div>
      <Button onClick={ props.toHome } width={ 92 } isActive={ false }>Home</Button>
    </div>
  )
}

type Props = {
  onSave: (quiz: Quiz) => void,
  toHome: () => void
}