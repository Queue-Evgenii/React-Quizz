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
  public static getJsonFormat(quiz: Quiz) {
    return {
      name: quiz.name,
      questions: quiz.questions.map((qEl: Question) => {
        return {
          name: qEl.name,
          points: qEl.points,
          answers: qEl.answers.map(aEl => {
            return {
              name: aEl.name,
              isCorrect: aEl.isCorrect,
              checked: aEl.checked
            }
          })
        }
      }),
    }
  }
  public static isValid(quiz: Quiz): boolean {
    if (quiz.name.length === 0 || quiz.questions.length === 0) return false;

    for (let qEl of quiz.questions) {
      if (qEl.name.length === 0 || qEl.points <= 0 || qEl.answers.length < 2) return false
      for (let aEl of qEl.answers) {
        if (aEl.name.length === 0) return false;
      }

      let checkedCount = 0, correctCount = 0;
      for (let aEl of qEl.answers) {
        if (aEl.checked) checkedCount++;
        if (aEl.isCorrect) correctCount++;
      }
      if (checkedCount > 1 || correctCount !== 1) return false;
    }
    return true;
  }
}