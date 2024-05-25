import { QuizTaker } from './pages/QuizTaker';
import { QuizCreator } from './pages/QuizCreator';
import { useEffect, useState } from 'react';
import { Quiz } from './models/Quiz';
import { QuizHome } from './pages/QuizHome';
import defaultQuizes from "./mock/default-quizes.json";
import { selectQuizes, updateQuizes } from './api/quizes';
import { QuizHelper } from './helpers/QuizHelper';

enum Pages {
  Home,
  QuizTaker,
  QuizCreator
}

function App() {
  const [page, setPage] = useState(Pages.Home);
  const [curQuiz, setCurQuiz] = useState<Quiz>({} as Quiz);
  const [quizes, setQuizes] = useState<Quiz[]>([])

  const resDelegate = (res: Quiz[]) => {
    setQuizes(res);
  }

  useEffect(() => {
    selectQuizes()
      .then(resDelegate)
      .catch((err: Error) => {
        console.error(err);
        updateQuizes(defaultQuizes as Quiz[])
          .then(resDelegate);
      })
  }, []);

  const Distributor = () => {
    switch (page) {
      case Pages.Home:
        return (
          <QuizHome
            quizes={ quizes }
            onSelected={(index: number) => { setCurQuiz(QuizHelper.copyQuiz(quizes[index])); setPage(Pages.QuizTaker); }}
            toCreation={() => { setPage(Pages.QuizCreator)}}
          />
        );
      case Pages.QuizTaker:
        return (
          <QuizTaker
            quiz={curQuiz}
            toHome={ () => { setPage(Pages.Home) } }
          />
        );
      case Pages.QuizCreator:
        return (
          <QuizCreator
            onSave={(quiz: Quiz) => {
              updateQuizes([...quizes, QuizHelper.getJsonFormat(quiz) as Quiz])
                .then(resDelegate)
                .finally(() => setPage(Pages.Home));
            }}
            toHome={ () => { setPage(Pages.Home) } }
          />
        );
    }
  }

  return (
    <div className="px-4 md:px-16 py-8">
      <h1 className="text-5xl font-bold">React Quiz</h1>
      <Distributor />
    </div>
  );
}

export default App;