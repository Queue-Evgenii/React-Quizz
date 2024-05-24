import { useEffect, useState } from "react"
import { Quiz, QuizHelper } from "../models/Quiz";
import { Answer } from "../models/Answer";
import { RadioInput } from "../components/radio-input/RadioInput";
import { Button } from "../components/button/Button";

export const QuizTaker = (props: Props) => {
  const [curQuestionNum, setCurQuestionNum] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Answer[]>([] as Answer[]);
    
  useEffect(() => {
    setAnswers(props.quiz.questions[curQuestionNum].answers);
  }, [props, curQuestionNum]);

  const check = (id: number) => {
    answers.forEach((el: Answer, index: number) => {
      if (index === id) {
        el.checked = true;
      } else {
        el.checked = false;
      }
    });
    setAnswers([...answers]);
  }
  const showResult = () => {
    setIsFinished(true);
  }

  const List = () => {
    return (
      <ul className="my-4 pl-4">
        { 
          answers.map((el: Answer, index: number) => {
            return (
              <li key={ index }>
                <RadioInput
                  id={ curQuestionNum + "_" + index }
                  for={ curQuestionNum.toString() }
                  name={ el.name }
                  checked={ el.checked }
                  onChange={ () => check(index) }
                />
              </li>
            );
          })
        }
      </ul>
    );
  }

  return (
    <div >
      <h2 className="text-3xl font-semibold my-3">{ props.quiz.name }</h2>
      { 
        isFinished ? (
          <>
            <h3 className="text-2xl font-semibold my-4">Test finished!</h3>
            <div className="text-2xl font-medium my-4 flex flex-col gap-y-2">
              <p>
                Result:
              </p>
              <p>
                <span className="font-bold">Points: </span>
                { QuizHelper.caclulateResult(props.quiz) } of { QuizHelper.getMaxPoints(props.quiz) }
              </p>
              <p>
                <span className="font-bold">Percentage: </span>
                { (QuizHelper.caclulateResult(props.quiz) * 100 / QuizHelper.getMaxPoints(props.quiz)).toFixed(2) }%
              </p>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-semibold my-4">Question { curQuestionNum + 1 } of { props.quiz.questions.length }:</h3>
            <div className="pl-4">
              <pre className="text-2xl my-4">{ props.quiz.questions[curQuestionNum].name }</pre>
              <List />
            </div>
          </>
        )
      }
      <div className="py-1">
        {
          isFinished ? (
            <></>
          ) : (
            <>
              <div className="flex gap-x-1 items-center my-6">
                <Button
                  onClick={ () => setCurQuestionNum(curQuestionNum - 1) }
                  width={ 128 }
                  disabled={ curQuestionNum === 0 }
                >
                  Previous
                </Button>
                {
                  curQuestionNum + 1 < props.quiz.questions.length ?
                  <Button onClick={ () => setCurQuestionNum(curQuestionNum + 1) } width={ 128 }>Next</Button> :
                  <Button onClick={ showResult } width={ 128 }>End</Button>
                }
              </div>
            </>
          )
        }
        <Button onClick={ props.toHome } width={ 92 } isActive={ false }>Home</Button>
      </div>
    </div>
  )
}

type Props = {
  quiz: Quiz,
  toHome: () => void,
}