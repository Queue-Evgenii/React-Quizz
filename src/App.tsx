import { QuizTaker } from './pages/QuizTaker';
import { QuizCreator } from './pages/QuizCreator';
import { useEffect, useState } from 'react';
import { Quiz, QuizHelper } from './models/Quiz';
import { QuizHome } from './pages/QuizHome';
import defaultQuizes from "./mock/default-quizes.json";

enum Pages {
  Home,
  QuizTaker,
  QuizCreator
}

function App() {
  const [page, setPage] = useState(Pages.Home);
  const [curQuiz, setCurQuiz] = useState<Quiz>({} as Quiz);
  const [quizes, setQuizes] = useState<Quiz[]>([])

  useEffect(() => {
    setQuizes(defaultQuizes as Quiz[]);
  }, []);

  const Distributor = () => {
    switch (page) {
      case Pages.Home:
        return (
          <QuizHome
            quizes={ quizes }
            onSelected={(index: number) => { setCurQuiz(QuizHelper.copyQuiz(quizes[index])); setPage(Pages.QuizTaker); }}
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
        return (<QuizCreator />);
      default:
        return (<QuizHome quizes={ quizes } onSelected={(index: number) => setPage(Pages.QuizTaker) } />);
    }
  }

  return (
    <div className="px-16 py-8">
      <h1 className="text-5xl font-bold">React Quiz</h1>
      <Distributor />
    </div>
  );
}

export default App;