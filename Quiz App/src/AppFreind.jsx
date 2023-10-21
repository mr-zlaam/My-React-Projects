import { createContext, useEffect, useState } from "react";
import Home from "./Components/HomePage/Home";
import Quiz from "./Components/QuizPage/Quiz";

export const MainScreen = createContext();
const AppFriend = () => {
  const [homeActive, setHomeActive] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setHomeActive(false);
    }, 5000);
  }, [homeActive]);
  const returnScreen = () => {
    setHomeActive(false);
  };
  return (
    <MainScreen.Provider value={{ setHomeActive, returnScreen }}>
      <div>
        {homeActive ? (
          <div className="homeComp">
            <Home />
          </div>
        ) : (
          <div className="quizComp">
            <Quiz />
          </div>
        )}
      </div>
    </MainScreen.Provider>
  );
};

export default AppFriend;
