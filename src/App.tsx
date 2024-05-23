import { QuizTaker } from './pages/QuizTaker';
import { QuizCreator } from './pages/QuizCreator';
import { useState } from 'react';
import { Quiz } from './models/Quiz';
import { Answer } from './models/Answer';
import { Question } from './models/Question';
import { QuizHome } from './pages/QuizHome';

enum Pages {
  Home,
  QuizTaker,
  QuizCreator
}

function App() {
  const [page, setPage] = useState(Pages.Home);
  const [currentQuiz] = useState<Quiz>(
    new Quiz(
      "Test",
      [
        new Question(
          "Inside which HTML element do we put the JavaScript?",
          [
            new Answer("<script>", true),
            new Answer("<body>", false),
            new Answer("<js>", false),
            new Answer("<javascript>", false),
          ],
        ),
        new Question(
          "2 Inside which HTML element do we put the JavaScript?",
          [
            new Answer("<script>", true),
            new Answer("<body>", false),
            new Answer("<js>", false),
            new Answer("<javascript>", false),
          ],
        ),
      ])
  );
  const [quizes] = useState<Quiz[]>([currentQuiz, currentQuiz])

  const Distributor = () => {
    switch (page) {
      case Pages.Home:
        return (<QuizHome quizes={ quizes } onSelected={(index: number) => setPage(Pages.QuizTaker) } />);
      case Pages.QuizTaker:
        return (<QuizTaker quiz={currentQuiz} />);
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