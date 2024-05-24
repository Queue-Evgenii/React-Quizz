import { Button } from "../components/button/Button";
import { Quiz } from "../models/Quiz";

export const QuizHome = (props: Props) => {
  return (
    <div>
      <h2 className="text-3xl font-semibold my-3">Available quizes:</h2>
      <ul className="my-4 flex flex-col gap-y-4">
        { 
          props.quizes.map((el: Quiz, index: number) => {
            return (
              <li
                key={ index }
                onClick={ () => props.onSelected(index) }
                className="
                  text-2xl
                  font-medium
                  w-fit
                  cursor-pointer
                  hover:ml-4
                  hover:font-semibold
                  transition-all
                  ease-linear
                "
              >
                { el.name }
              </li>
            );
          })
        }
      </ul>
      <Button onClick={ props.toCreation }>+ Add Quiz</Button>
    </div>
  )
}

type Props = {
  quizes: Quiz[],
  onSelected: (index: number) => void,
  toCreation: () => void,
}