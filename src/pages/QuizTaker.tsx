import { useState } from "react"
import { Quiz } from "../models/Quiz";
import { Answer } from "../models/Answer";
import { RadioInput } from "../components/radio-input/RadioInput";
import { Button } from "../components/button/Button";

export const QuizTaker = (props: Props) => {
  const [curQuestionNum, setCurQuestiionNum] = useState(0);

  return (
    <div >
      <h2 className="text-3xl font-semibold my-3">{ props.quiz.name }</h2>
      <h3 className="text-2xl font-semibold my-4">Question { curQuestionNum + 1 } of { props.quiz.questions.length }:</h3>
      <h3 className="text-2xl my-4">{ props.quiz.questions[curQuestionNum].name }</h3>
      <ul className="my-4">
        { 
          props.quiz.questions[curQuestionNum].answers.map((el: Answer, index: number) => {
            return (
              <li key={ index }>
                <RadioInput id={ index.toString() } for={ curQuestionNum.toString() } name={ el.name } />
              </li>
            );
          })
        }
      </ul>
      <div className="flex gap-x-1 items-center my-6">
        <Button onClick={ () => setCurQuestiionNum(curQuestionNum - 1) } width={ 128 }>Previous</Button>
        <Button onClick={ () => setCurQuestiionNum(curQuestionNum + 1) } width={ 128 }>Next</Button>
      </div>
    </div>
  )
}

type Props = {
  quiz: Quiz,
}