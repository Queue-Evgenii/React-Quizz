export class Answer {
  private _name: string;
  private _isCorrect: boolean;

  constructor (name: string, isCorrect: boolean) {
    this._name = name;
    this._isCorrect = isCorrect;
  }
  
  get name() {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get isCorrect() {
    return this._isCorrect;
  }
  set isCorrect(value: boolean) {
    this._isCorrect = value;
  }
}