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
    return quiz.questions.reduce((total, question) => {
      const correctAnswer = question.answers.find(answer => answer.checked && answer.isCorrect);
      return correctAnswer ? total + question.points : total;
    }, 0);
  }
  public static getMaxPoints(quiz: Quiz): number {
    return quiz.questions.reduce((total, question) => total += question.points, 0);
  }
  public static copyQuiz(quiz: Quiz): Quiz {
    return new Quiz(
      quiz.name,
      quiz.questions
        .map(qEl => new Question(
          qEl.name, qEl.answers
            .map(aEl => new Answer(
              aEl.name, aEl.isCorrect
            )), qEl.points
        ))
    )
  }
  public static getEmptyAnswer(): Answer {
    return new Answer(
      "",
      false
    )
  }
  public static getEmptyQuestion(): Question {
    return new Question(
      "",
      [
        this.getEmptyAnswer(),
        this.getEmptyAnswer()
      ]
    );
  }
  public static getEmptyQuiz(): Quiz {
    return new Quiz(
      "",
      [
        this.getEmptyQuestion()
      ]
    )
  }
}