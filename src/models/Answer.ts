export class Answer {
  private _name: string;
  private _isCorrect: boolean;
  private _checked: boolean = false;

  constructor (name: string, isCorrect: boolean, checked?: boolean) {
    this._name = name;
    this._isCorrect = isCorrect;
    if (checked) {
      this._checked = checked;
    }
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
  get checked() {
    return this._checked;
  }
  set checked(value: boolean) {
    this._checked = value;
  }
}