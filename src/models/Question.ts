import { Answer } from "./Answer";

export class Question {
  private _name: string;
  private _answers: Answer[];
  private _points: number = 1;

  constructor(name: string, answers: Answer[], points?: number) {
    this._name = name;
    this._answers = answers;
    if (points && points > 0) this._points = points
  }
  
  get name() {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get answers() {
    return this._answers;
  }
  set answers(value: Answer[]) {
    this._answers = value;
  }
  get points() {
    return this._points;
  }
  set points(value: number) {
    if (value > 0) this._points = value;
  }
}