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