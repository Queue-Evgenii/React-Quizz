import { Quiz } from "../models/Quiz";

export const selectQuizes = (): Promise<Quiz[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const temp = localStorage.getItem("quizes");
      if (temp) resolve(JSON.parse(temp) as Quiz[])
      reject(new Error('Quizes not found!'))
    }, Math.random() * 1000);
  })
}

export const updateQuizes = (quizes: Quiz[]): Promise<Quiz[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      localStorage.setItem("quizes", JSON.stringify(quizes));
      selectQuizes()
        .then(res => resolve(res))
        .catch(err => reject(err));
    }, Math.random() * 1000);
  })
}