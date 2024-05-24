import { Answer } from "./Answer";
import { Question } from "./Question";

export class Quiz {
  private _name: string;
  private _questions: Question[];

  constructor (name: string, questions: Question[]) {
    this._name = name;
    this._questions = questions;
  }
  
  get name() {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get questions() {
    return this._questions;
  }
  set questions(value: Question[]) {
    this._questions = value;
  }
}

export class QuizHelper {
  public static caclulateResult(quiz: Quiz): number {
    let result: number = 0;
    for (let question of quiz.questions) {
      for (let answer of question.answers) {
        if (answer.checked === true && answer.isCorrect === true) {
          ++result;
          break;
        }
      }
    }
    return result;
  }
  public static copyQuiz(quiz: Quiz) : Quiz {
    return new Quiz(
      quiz.name,
      quiz.questions
        .map(qEl => new Question(
          qEl.name, qEl.answers
            .map(aEl => new Answer(
              aEl.name, aEl.isCorrect
            ))
        ))
    )
  }
}