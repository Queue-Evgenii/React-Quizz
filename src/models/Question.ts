import { Answer } from "./Answer";

export class Question {
  private _name: string;
  private _answers: Answer[];

  constructor(name: string, answers: Answer[]) {
    this._name = name;
    this._answers = answers;
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
}