import { useContext, useEffect, useState } from "react";
import { MainScreen } from "../../AppFreind";
const Result = ({ score }) => {
  const [message, setMessage] = useState("");
  const { setHomeActive } = useContext(MainScreen);
  useEffect(() => {
    if (score < 5) setMessage("You Don't Deserve to be an Anime Fan");
    if (score >= 5 && score < 15) {
      setMessage(
        ` Opps!😶 You are among the 80% Who are able to give  "${score}" correct Answers `
      );
    } else if (score > 15) {
      setMessage(
        ` Hurrah!🥳 You are among the 30% Who are able to give  "${score}" correct Answers `
      );
    } else if (score >= 25 && score < 25) {
      setMessage(
        ` Hurrah!🥳 You are among the 5% Who are able to give  "${score}" correct Answers `
      );
    }
  }, []);
  console.log(score);
  const handleReload = () => {
    window.location.reload();
    setHomeActive(false);
  };
  return (
    <>
      <div className="result h-screen flex justify-center items-center">
        <div className="scores flex justify-center flex-col ">
          <h1 className="font-bold text-2xl w-full text-center ">
            <span className="text-black max-sm:text-red-200">{"<h1>"}</span>
            <span className=" text-white max-sm:text-white">{message}</span>
            <span className="text-black max-sm:text-red-200">{"</h1>"}</span>
          </h1>
          <div className="flex justify-center">
            <button
              className="btni  border-[2px white] px-4 py-3  rounded-lg text-xl my-4 font-bold bg-black hover:bg-gray-800 hover:border-transparent  "
              onClick={handleReload}
            >
              Ready For Another Round
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
