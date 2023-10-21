import { useEffect, useState } from "react";
import he from "he";
import "./Quiz.css";
import { DotPulse } from "@uiball/loaders";
import Result from "../ResultScreen/Result";

const Quiz = () => {
  const [mydata, setMydata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [questionLength, setQuestionLength] = useState(1);

  useEffect(() => {
    const FetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://opentdb.com/api.php?amount=40&category=31&difficulty=easy&type=multiple`
        );
        if (!res.ok) {
          throw new Error("Please connect to the internet");
        } else {
          const data = await res.json();
          setMydata(data);
          setLoading(false);
        }
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    };
    FetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading_controller flex justify-center items-center h-screen">
        <div className="loading">
          <DotPulse size={40} speed={1.3} color="yellow" />
        </div>
      </div>
    );
  }

  if (!mydata) {
    return null;
  }

  const questions = mydata.results;
  const currentQuestion = questions[currentQuestionIndex];
  const decodedQuestion = he.decode(currentQuestion.question);
  const decodedOptions = currentQuestion.incorrect_answers.map((option) =>
    he.decode(option)
  );
  const decodedCorrectAnswer = he.decode(currentQuestion.correct_answer);

  const allOptions = [decodedCorrectAnswer, ...decodedOptions];
  const shuffledOptions = shuffleArray(allOptions);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleAnswerClick = (answer) => {
    if (answer === decodedCorrectAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex === questions.length - 1) {
      setQuizFinished(true);
    } else {
      handleNext();
    }

    setQuestionLength(questionLength + 1);
  };

  return (
    <>
      {quizFinished ? (
        <Result score={score} />
      ) : (
        <div className="section_quiz">
          <div className="quiz_controller">
            <div className="question_controller">
              <h1 className="question">
                Q{questionLength} : {decodedQuestion}
              </h1>
              {shuffledOptions.map((option, index) => (
                <a
                  className="options"
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                >
                  <span className="little_options">{`${
                    index + 1
                  }) ${option}`}</span>
                </a>
              ))}
              <div className="btons">
                <div className="score bg-black p-4 rounded-md  shadow-lg  ">
                  <span className="font-bold text-xl score">
                    Total Correct Answer: {score}/40
                    <p className="para text-center text-white">
                      Total Questions:{" "}
                      <span className="text-red-400">{questionLength}</span>/40
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default Quiz;
